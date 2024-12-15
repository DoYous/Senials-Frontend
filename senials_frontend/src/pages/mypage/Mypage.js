import styles from './MypageCalender.module.css';
import React, { useState, useEffect } from "react";
import common from "../common/Common.module.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
{/*사용자 프로필(남보기용)*/}

function Mypage() {
    const { userNumber } = useParams();

    /* 사용자 프로필 */
    const [nickname, setNickname] = useState("");
    const [detail, setDetail] = useState("");
    const [profileImg, setProfileImg] = useState("");

    /* 모임 정보 */
    const [joinedPartyCount, setJoinedPartyCount] = useState(0); // 참여한 모임 개수
    const [madePartyCount, setMadePartyCount] = useState(0); // 만든 모임 개수

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

    //프로필 사진
    const imgSrc = `/img/userProfile/${userNumber}`;

    return (
        <div className={styles.bigDiv}>
            <img src={imgSrc} className={styles.profile}></img>
            <div className={styles.mypageSmallDiv}>
                        <div className={styles.mainDiv}>
                            <div className={common.firstFont}>{nickname}</div>
                            <div className={`${styles.oneLine} ${common.secondFont}`}>{detail}</div>
                        </div>
                        <div className={styles.contentsDiv}>
                            <div className={styles.contentDiv1}>
                                <div className={common.secondFont}>참여 모임</div>
                                <div className={`${styles.gray} ${common.secondFont}`}>{joinedPartyCount}</div>
                            </div>
                            <div className={styles.contentDiv3}>
                                <div  className={common.secondFont}>생성 모임</div>
                                <div className={`${styles.gray} ${common.secondFont}`}>{madePartyCount}</div>
                            </div>
                        </div>
            </div>
        </div>

    );
}

export default Mypage;