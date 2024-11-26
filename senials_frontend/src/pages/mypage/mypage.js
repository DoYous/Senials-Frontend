import styles from './mypageCalender.module.css';
import React, { useState, useEffect } from "react";
import common from "../common/common.module.css";
{/*사용자 프로필(남보기용)*/}

function Mypage() {
    return (
        <div className={styles.bigDiv}>
                    <div className={styles.profile}></div>
                    <div className={styles.mypageSmallDiv}>
                        <div className={styles.mainDiv}>
                            <h1 className={common.firstFont}>닉네임</h1>
                            <p className={`${styles.oneLine} ${common.secondFont}`}>한줄 소개</p>
                        </div>
                        <div className={styles.contentsDiv}>
                            <div className={styles.contentDiv1}>
                                <h3 className={common.firstFont}>참여 모임</h3>
                                <h3 className={`${styles.gray} ${common.firstFont}`}>00</h3>
                            </div>
                            <div className={styles.contentDiv3}>
                                <h3  className={common.firstFont}>생성 모임</h3>
                                <h3 className={`${styles.gray} ${common.firstFont}`}>00</h3>
                            </div>
                        </div>
            </div>
        </div>

    );
}

export default Mypage;