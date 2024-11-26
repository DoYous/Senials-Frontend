import styles from './MypageParty.module.css';
import React, { useState } from "react";
import common from "../common/Common.module.css";
import main from '../common/MainVer1.module.css';
import { FaAngleLeft } from "react-icons/fa";

function MypageLikedParty() {
    /*모집 상태 관리 모집 중.모집 완료*/
    const [filter, setFilter] = useState("모집 중");

    /*예비 데이터*/
    const partyData = [
        { id: 1, title: "농구 같이 할 사람~", status: "모집 중" },
        { id: 2, title: "축구 모임", status: "모집 완료" },
        { id: 3, title: "독서 모임", status: "모집 중" },
        { id: 4, title: "요리 클래스", status: "모집 완료" },
        { id: 5, title: "러닝 동호회", status: "모집 중" },
        { id: 6, title: "음악 밴드", status: "모집 완료" },
        { id: 7, title: "뮤지컬", status: "모집 중" },
    ];

    /*필터링 카드*/
    const filteredParties = partyData.filter(party => party.status === filter);

    return (
        <div className={styles.bigDiv}>
            <div className={styles.modifyDiv}>
                <div className={styles.bigName}>
                    <FaAngleLeft size={20} />
                    <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={`${styles.pink} ${styles.marginLeft}`}>좋아요</div>
                        <div className={styles.marginLeft}>한 모임</div>
                    </div>
                </div>
                <hr className={styles.divHr} />
                <div className={styles.smallDiv}>
                    <div className={styles.contentsDiv}>
                        {/* 모집 중 버튼 */}
                        <div className={styles.contentDiv1}
                            onClick={() => setFilter("모집 중")} >
                            <div className={`${common.secondFont} ${filter !== "모집 중" ? styles.gray : ""}`}>
                                모집 중
                            </div>
                        </div>
                        {/* 모집 완료 버튼 */}
                        <div className={styles.contentDiv3}
                            onClick={() => setFilter("모집 완료")} >
                            <div className={`${common.secondFont} ${filter !== "모집 완료" ? styles.gray : ""}`}>
                                모집 완료
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainDiv}>
                        <div className={styles.cardGrid}>
                            {filteredParties.map(party => (
                                <PartyCard key={party.id} title={party.title} status={party.status} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PartyCard({ title, status }) {
    return (
        <div className={main.cardContainer}>
            <div className={main.cardImage} style={{ backgroundImage: 'url(/image/cat.jpg)' }}>
                <img className={main.imgHeart} src='/image/unfilledHeart.svg' alt="heart" />
            </div>
            <div className={`${main.secondFont}`}>{title}</div>
            <div className={main.rateInfo}>
                <Rate />
            </div>
            <div className={main.memberInfo}>
                <img src='/image/people.svg' alt="people" style={{ width: '20px' }} />
                &nbsp;
                <span className={`${main.memberCount} ${main.fourthFont}`}>10명</span>
                <span className={`${main.openedParty} ${main.thirdFont}`}>{status}</span>
            </div>
        </div>
    );
}

function Rate() {
    return (
        <div className={`${main.rateInfo}`}>
            <div className={`${main.baseStar}`}>
                <div className={`${main.filledStar}`}></div>
            </div>
            <div className={`${main.baseStar}`}>
                <div className={`${main.filledStar}`}></div>
            </div>
            <div className={`${main.baseStar}`}>
                <div className={`${main.filledStar}`}></div>
            </div>
            <div className={`${main.baseStar}`}>
                <div className={`${main.filledStar}`}></div>
            </div>
            <div className={`${main.baseStar}`}>
                <div className={`${main.halfStar}`} style={{ width: '30%', marginRight: '70%' }}></div>
            </div>
        </div>
    );
}

export default MypageLikedParty;
