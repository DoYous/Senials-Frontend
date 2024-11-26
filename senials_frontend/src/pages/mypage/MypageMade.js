import React, { useState, useEffect } from "react";
import styles from './MypageParty.module.css';
import common from "../common/Common.module.css";
import main from '../common/MainVer1.module.css';
import {FaAngleLeft} from "react-icons/fa";

function MypageMade() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.modifyDiv}>
                <div className={styles.bigName}>
                    <FaAngleLeft size={20}/>
                    <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={`${styles.pink} ${styles.marginLeft}`}>생성</div>
                        <div className={styles.marginLeft}>모임</div>
                    </div>
                </div>
                <hr className={styles.divHr}/>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                        <div className={styles.cardGrid}>
                            <PartyCard/>
                            <PartyCard/>
                            <PartyCard/>
                            <PartyCard/>
                            <PartyCard/>
                            <PartyCard/>
                            <PartyCard/>
                            <PartyCard/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
function PartyCard() {
    return (
        <div className={main.cardContainer}>
            <div className={main.cardImage} style={{backgroundImage: 'url(/image/cat.jpg)'}}>
                <img className={main.imgHeart} src='/image/unfilledHeart.svg'/>
            </div>
            <div className={`${main.secondFont}`}>농구 같이 할 사람~</div>
            <div className={main.rateInfo}>
                <Rate />
            </div>
            <div className={main.memberInfo}>
                <img src='/image/people.svg' style={{width: '20px'}}/>&nbsp;
                <span className={`${main.memberCount} ${main.fourthFont}`}>10명</span>
                <span className={`${main.openedParty} ${main.thirdFont}`}>모집중</span>
            </div>
                <div className={styles.btnDiv}>
                    <button className={`${styles.commonBtn} ${styles.marginLeftAuto}`}>멤버관리</button>
                    <button className={`${styles.commonBtn} ${styles.marginLeft}`}>수정</button>
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