import styles from './MypageCalender.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MypageCalender() {
    const [userNumber] = useState(1);

    /* 사용자 프로필 */
    const [nickname, setNickname] = useState("");
    const [detail, setDetail] = useState("");
    const [profileImg, setProfileImg] = useState("");

    /* 사용자 관심사 */
    const [favoriteTitles, setFavoriteTitles] = useState([]);

    /* 모임 정보 */
    const [likedPartyCount, setLikedPartyCount] = useState(0); //좋아한 모임 개수
    const [joinedPartyCount, setJoinedPartyCount] = useState(0); // 참여한 모임 개수
    const [madePartyCount, setMadePartyCount] = useState(0); // 만든 모임 개수

    const navigate = useNavigate();

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 사용자 정보
                const userResponse = await axios.get(`/users/${userNumber}`);
                const userData = userResponse.data.results.user;

                setNickname(userData.userNickname);
                setDetail(userData.userDetail);
                setProfileImg(userData.userProfileImg);

                // 관심사 정보
                const favoritesResponse = await axios.get(`/users/${userNumber}/favorites`);
                setFavoriteTitles(favoritesResponse.data);

                // 참여한 모임 개수
                const joinedCountResponse = await axios.get(`/users/${userNumber}/parties/count`);
                setJoinedPartyCount(joinedCountResponse.data.results.partiesPartyCount);

                // 만든 모임 개수
                const madeCountResponse = await axios.get(`/users/${userNumber}/made/count`);
                setMadePartyCount(madeCountResponse.data.results.madePartyCount);

            } catch (error) {
                console.error("에러:", error.response ? error.response.data : error.message);
            }
        };
        fetchUserData();
    }, []);

    // 좋아한 모임 개수 가져오기 이거 안댐
    const fetchLikedPartyCount = async () => {
        try {
            const likedCountResponse = await axios.get(`/users/${userNumber}/likes/count`);
            setLikedPartyCount(likedCountResponse.data.result.likesPartyCount);
        } catch (error) {
            console.error("좋아한 모임 개수 가져오기 에러:", error.response ? error.response.data : error.message);
        }
    };
    const handleRefreshLikedCount = () => {
        fetchLikedPartyCount();
    };

    return (
        <div className={styles.bigDiv}>
            {/* 프로필 사진 */}
            <div className={styles.profile}></div>
            <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                    <input
                        className={common.firstFont}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <textarea
                        className={`${styles.oneLine} ${common.secondFont}`}
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                    />
                </div>
                <div className={styles.hashDiv}>
                    <div className={styles.hash}>
                        {/* 관심사 제목 */}
                        {favoriteTitles.map((title, index) => (
                            <p key={index}>{title}</p>
                        ))}
                    </div>
                    <button
                        type={"button"}
                        className={common.commonBtn}
                        onClick={() => navigate(`/user/1/favorites`)}
                    >
                        관심사 설정
                    </button>
                </div>
                <div className={styles.contentsDiv}>
                    <div className={styles.contentDiv1} onClick={() => navigate(`/user/1/likes`)}>
                        <div className={common.secondFont}>좋아요 한 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>{likedPartyCount}</div>
                    </div>
                    <div className={styles.contentDiv2} onClick={() => navigate(`/user/1/parties`)}>
                        <div className={common.secondFont}>참여 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>
                            {joinedPartyCount}
                        </div>
                    </div>
                    <div className={styles.contentDiv3} onClick={() => navigate(`/user/1/made`)}>
                        <div className={common.secondFont}>생성 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>
                            {madePartyCount}
                        </div>
                    </div>
                </div>
                <div className={styles.calender}>캘린더 영역</div>
                <div className={styles.btnDiv}>
                    <button
                        className={`${common.commonBtn} ${styles.marginLeftAuto}`}
                        onClick={() => navigate(`/user/1/modify`)}
                    >
                        회원정보 변경
                    </button>
                    <button className={`${common.importantBtn} ${styles.marginLeft}`}>회원 탈퇴</button>
                </div>
            </div>
        </div>
    );
}

export default MypageCalender;
