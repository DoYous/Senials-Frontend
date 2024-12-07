import styles from './MypageParty.module.css';
import React, { useState } from "react";
import common from "../common/Common.module.css";
import { FaAngleLeft } from "react-icons/fa";
import main from "../common/MainVer1.module.css";
import {useNavigate} from "react-router-dom";

function MypageParticipate() {
    /* 예비 데이터 */
    const partyData = [
        { number:1, id: 1, title: "농구 같이 할 사람~", status: "참여" },
        { number:2, id: 2, title: "축구 모임", status: "미참여" },
        { number:3, id: 3, title: "독서 모임", status: "참여" },
        { number:4, id: 4, title: "요리 클래스", status: "미참여" },
        { number:5, id: 5, title: "러닝 동호회", status: "참여" },
        { number:6, id: 6, title: "음악 밴드", status: "미참여" },
        { number:7, id: 7, title: "뮤지컬", status: "참여" },
    ];
    const navigate = useNavigate();
    /* 모임별 페이지 이동 */
    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    }
    /* 마이페이지(캘린더)로 이동 */
    const handleCalender = (userNumber) => {
        navigate(`/user/${userNumber}/meet`);
    }

    /* 후기 페이지 이동 */
    const handleReview = (partyNumber) => {
        navigate(`/party/${partyNumber}/review-write`);
    };

    /* 참여 상태 관리 */
    const [filter, setFilter] = useState("참여");

    const filteredParties = partyData.filter(party => party.status === filter);

    return (
        <div className={styles.bigDiv}>
            <div className={styles.modifyDiv}>
                <div className={styles.bigName}>
                    <FaAngleLeft size={20} onClick={handleCalender}/>
                    <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={`${styles.pink} ${styles.marginLeft}`}>참여</div>
                        <div className={styles.marginLeft}>모임</div>
                    </div>
                </div>
                <hr className={styles.divHr} />
                <div className={styles.smallDiv}>
                    <div className={styles.contentsDiv}>
                        <div
                            className={styles.contentDiv1}
                            onClick={() => setFilter("참여")}
                        >
                            <div className={`${common.secondFont} ${filter !== "참여" ? styles.gray : ""}`}>
                                일정 참여
                            </div>
                        </div>
                        <div
                            className={styles.contentDiv3}
                            onClick={() => setFilter("미참여")}
                        >
                            <div className={`${common.secondFont} ${filter !== "미참여" ? styles.gray : ""}`}>
                                일정 미 참여
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainDiv}>
                        <div className={styles.cardGrid}>
                            {filteredParties.map(party => (
                                <PartyCard key={party.id} title={party.title} status={party.status} party={party}
                                           linkParty={linkParty} handleReview={handleReview}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PartyCard({ title, status , party, linkParty, handleReview}) {
    return (
        <div className={main.cardContainer}>
            <div onClick={() => linkParty(party.number)} className={main.cardImage} style={{backgroundImage: 'url(/image/cat.jpg)'}}>
                <img className={main.imgHeart} src='/image/unfilledHeart.svg' alt="heart"/>
            </div>
            <div onClick={() => linkParty(party.number)} className={`${main.secondFont}`}>{title}</div>
            <div className={main.rateInfo}>
                <Rate/>
            </div>
            <div className={styles.memberInfo}>
                <div className={styles.memberInfo2}>
                    <img src='/image/people.svg' alt="people" style={{width: '20px'}}/>
                    &nbsp;
                    <span className={`${main.memberCount} ${main.fourthFont}`}>10명</span>
                </div>
                <button className={`${styles.outBtn} ${main.thirdFont}`}>탈퇴</button>
            </div>
            <div className={styles.btnDiv}>
                <button className={styles.commonBtn2} onClick={() => handleReview(party.number)}>후기 작성</button>
            </div>
        </div>
    );
}

function Rate() {
    return (
        <div className={`${main.rateInfo}`}>
            {[...Array(5)].map((_, index) => (
                <div key={index} className={`${main.baseStar}`}>
                    <div
                        className={`${index < 4 ? main.filledStar : main.halfStar}`}
                        style={index === 4 ? { width: '30%' } : {}}
                    ></div>
                </div>
            ))}
        </div>
    );
}

export default MypageParticipate;
