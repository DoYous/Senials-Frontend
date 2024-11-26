import styles from './MypageCalender.module.css';
import React, { useState, useEffect } from "react";
import common from "../common/Common.module.css";
{/*사용자 프로필(남보기용)*/}

function Mypage() {
    return (
        <div className={styles.bigDiv}>
                    <div className={styles.profile}></div>
                    <div className={styles.mypageSmallDiv}>
                        <div className={styles.mainDiv}>
                            <div className={common.firstFont}>닉네임</div>
                            <div className={`${styles.oneLine} ${common.secondFont}`}>한줄 소개</div>
                        </div>
                        <div className={styles.contentsDiv}>
                            <div className={styles.contentDiv1}>
                                <div className={common.secondFont}>참여 모임</div>
                                <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                            </div>
                            <div className={styles.contentDiv3}>
                                <div  className={common.secondFont}>생성 모임</div>
                                <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                            </div>
                        </div>
            </div>
        </div>

    );
}

export default Mypage;