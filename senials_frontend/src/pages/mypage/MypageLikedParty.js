import styles from './MypageParty.module.css';
import React, {useEffect, useState} from "react";
import common from "../common/Common.module.css";
import main from '../common/MainVer1.module.css';
import { FaAngleLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function MypageLikedParty({ userNumber }) {
    const [likedParties, setLikedParties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    // 좋아요한 모임 데이터 가져오기
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!")
            navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
            return;
        }

        const decodedToken = jwtDecode(token); // JWT 디코드
        const userNumber = decodedToken.userNumber; // userNumber 추출

        const fetchLikedParties = async () => {

            try {
                const response = await axios.get(`/users/${userNumber}/likes`, {
                    params: {
                        page: 1,
                        size: 9,
                    },
                    headers: {
                        'Authorization': `Bearer ${token}` // Authorization 헤더 추가
                    }
                });
                setLikedParties(response.data.results.likesParties);
            } catch (err) {
                setError("데이터를 가져오는 데 실패했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedParties();
    }, [userNumber]);

    // 상태 변환 함수: 0이면 '모집중', 1이면 '모집완료'
    const getStatusText = (status) => {
        return status === 0 ? "모집중" : status === 1 ? "모집완료" : "상태미정";
    };

    // 모임별 페이지 이동
    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    };

    //마이페이지(캘린더) 이동
    const handleCalender = () => {
        navigate(`/user/${userNumber}/meet`);
    };

    if (loading) {
        return <div className={common.loading}>로딩 중...</div>;
    }

    if (error) {
        return <div className={common.error}>{error}</div>;
    }

    return (
        <div className={styles.bigDiv}>
            <div className={styles.modifyDiv}>
                <div className={styles.bigName}>
                    <FaAngleLeft size={20} onClick={handleCalender} />
                    <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={`${styles.pink} ${styles.marginLeft}`}>좋아요</div>
                        <div className={styles.marginLeft}>한 모임</div>
                    </div>
                </div>
                <hr className={styles.divHr} />
                <div className={styles.smallDiv}>
                    <div className={styles.contentsDiv}>
                        <div className={styles.mainDiv}>
                            <div className={styles.cardGrid}>
                                {likedParties.map((party) => (
                                    <PartyCard
                                        key={party.partyBoardNumber}
                                        title={party.partyBoardName}
                                        status={getStatusText(party.partyBoardStatus)}
                                        party={party}
                                        linkParty={linkParty}
                                    />
                                ))}
                            </div>
                            {
                                likedParties.length == 0 ?
                                <div className={`${common.firstFont}`} style={{display: 'flex', justifyContent: 'center', color: '#999999'}}>
                                    <span className={`${common.noSearchResult}`}>좋아요 한 모임이 없습니다.</span>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function PartyCard({ title, status, party, linkParty }) {
    // 모집 상태에 따라 클래스 설정
    const cardClass = party.partyBoardStatus === 1
        ? `${main.thirdFont} ${main.closedParty}`
        : `${main.thirdFont} ${main.openedParty}`;
    let thumbnail = party.firstImage != null ? `url(/img/partyboard/${party.partyBoardNumber}/thumbnail/${party.firstImage})` : `url(/img/NoImage.svg)`

    return (
        <div className={main.cardContainer} onClick={() => linkParty(party.partyBoardNumber)}>
            <div
                className={main.cardImage}
                style={{backgroundImage: thumbnail}}
            >
             {/*   <img className={main.imgHeart} src='/image/unfilledHeart.svg' alt="heart" />*/}
            </div>
            <div className={`${main.secondFont}`}>{title}</div>
            <div className={main.rateInfo}>
                <Rate rating={party.averageRating} />
            </div>
            <div className={styles.memberInfo}>
                <div className={styles.flex}>
                    <img src='/image/people.svg' alt="people" style={{ width: '20px' }} />
                    &nbsp;
                    <span className={`${main.memberCount} ${main.fourthFont}`}>
                        {party.memberCount}명
                    </span>
                </div>
                <span className={cardClass}>{status}</span>
            </div>
        </div>
    );
}

function Rate({ rating }) {
    const maxStars = 5;
    const filledStars = Math.floor(rating); // 채워진 별의 개수
    const hasHalfStar = rating % 1 !== 0; // 반 별이 필요한지 여부
    const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0); // 빈 별의 개수

    return (
        <div className={`${main.rateInfo}`}>
            {/* 채워진 별 */}
            {Array(filledStars)
                .fill()
                .map((_, index) => (
                    <div key={`filled-${index}`} className={`${main.baseStar}`}>
                        <div className={`${main.filledStar}`}></div>
                    </div>
                ))}

            {/* 반 별 */}
            {hasHalfStar && (
                <div className={`${main.baseStar}`}>
                    <div className={`${main.halfStar}`} style={{ width: '50%' }}></div>
                </div>
            )}

            {/* 빈 별 */}
            {Array(emptyStars)
                .fill()
                .map((_, index) => (
                    <div key={`empty-${index}`} className={`${main.baseStar}`}></div>
                ))}
        </div>
    );
}

export default MypageLikedParty;
