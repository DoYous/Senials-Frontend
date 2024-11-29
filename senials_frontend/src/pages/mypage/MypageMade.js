import React, { useState, useEffect } from "react";
import styles from './MypageParty.module.css';
import common from "../common/Common.module.css";
import main from '../common/MainVer1.module.css';
import {FaAngleLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function MypageMade() {
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
    /* 멤버 관리 페이지 이동 */
    const handleMember = (partyNumber) => {
        navigate(`/party/${partyNumber}/members`);
    };
    /* 모임 수정 페이지 이동 */
    const handleBoard = (partyNumber) => {
        navigate(`/party/${partyNumber}/update`);
    };


    const filteredParties = partyData

    return (
        <div className={styles.bigDiv}>
            <div className={styles.modifyDiv}>
                <div className={styles.bigName}>
                    <FaAngleLeft size={20} onClick={handleCalender}/>
                    <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={`${styles.pink} ${styles.marginLeft}`}>생성</div>
                        <div className={styles.marginLeft}>모임</div>
                    </div>
                </div>
                <hr className={styles.divHr}/>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                        <div className={styles.cardGrid} >
                            {filteredParties.map(party => (
                            <PartyCard key={party.id} title={party.title} status={party.status} party={party}
                                       linkParty={linkParty} handleMember={handleMember} handleBoard={handleBoard}/>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
function PartyCard({ title, status , party, linkParty, handleMember,handleBoard}) {
    return (
        <div className={main.cardContainer}>
            <div  onClick={() => linkParty(party.number)} className={main.cardImage} style={{backgroundImage: 'url(/image/cat.jpg)'}}>
                {/*<img className={main.imgHeart} src='/image/unfilledHeart.svg'/>*/}
            </div>
            <div onClick={() => linkParty(party.number)} className={`${main.secondFont}`}>{title}</div>
            <div className={main.rateInfo}>
                <Rate />
            </div>
            <div className={styles.memberInfo}>
                <div className={styles.flex}>
                    <img src='/image/people.svg' alt="people" style={{width: '20px'}}/>
                    &nbsp;
                    <span className={`${main.memberCount} ${main.fourthFont}`}>10명</span>
                </div>
                <span className={`${main.openedParty} ${main.thirdFont}`}>모집중</span>
            </div>
            <div className={styles.btnDiv}>
                <button onClick={() =>handleMember(party.number)} className={`${styles.commonBtn} ${styles.marginLeftAuto}`}>멤버관리</button>
                <button onClick={() =>handleBoard(party.number)} className={`${styles.commonBtn} ${styles.marginLeft}`}>수정</button>
            </div>
        </div>
    )
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


export default MypageMade;