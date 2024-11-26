import styles from './mypageMember.module.css';
import React, { useState, useEffect } from "react";
import common from "../common/common.module.css";
import main from "../mainpage/MainPage.module.css"
import {FaAngleLeft} from "react-icons/fa";

function MypageLikedParty() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.modifyDiv}>
                <div className={styles.bigName}>
                    <FaAngleLeft/>
                    <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={`${styles.pink} ${styles.marginLeft}`}>좋아요</div>
                        <div className={styles.marginLeft}>한 모임</div>
                    </div>
                </div>
                <hr className={styles.divHr}/>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                            <PartyCard/>
                    </div>
                </div>
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
                <div className={`${main.halfStar}`} style={{width: '30%', marginRight: '70%'}}></div>
            </div>
        </div>
    )
}

function DetailRate() {
    return (
        <div className={`${main.detailRateInfo}`}>
            <div className={`${main.detailSmallBaseStar}`}>
                <div className={`${main.detailFilledStar}`}></div>
            </div>
            <div className={`${main.detailSmallBaseStar}`}>
                <div className={`${main.detailFilledStar}`}></div>
            </div>
            <div className={`${main.detailSmallBaseStar}`}>
                <div className={`${main.detailFilledStar}`}></div>
            </div>
            <div className={`${main.detailSmallBaseStar}`}>
                <div className={`${main.detailFilledStar}`}></div>
            </div>
            <div className={`${main.detailSmallBaseStar}`}>
                <div className={`${main.detailHalfStar}`} style={{width: '30%', marginRight: '70%'}}></div>
            </div>
        </div>
    )
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
            </div>

    )
}
export default MypageLikedParty;