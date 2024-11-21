import styles from './mypageCalender.module.css';
import React, { useState, useEffect } from "react";
{/*마이페이지+캘린더*/}

function MypageCalender() {
    return (
        <div className={styles.bigDiv}>
                <div className={styles.profile}></div>
            <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                <h1>닉네임</h1>
                <p className={styles.oneLine}>한줄 소개</p>
                </div>
                <div className={styles.hashDiv}>
                    <div className={styles.hash}>
                        <p>해시태그</p>
                        <p>해시태그</p>
                        <p>해시태그</p>
                    </div>
                    <button type={"submit"} className={styles.commonBtn}>관심사 설정</button>
                </div>
                <div className={styles.contentsDiv}>
                    <div className={styles.contentDiv1}>
                        <h3>좋아요 한 모임</h3>
                        <h3 className={styles.gray}>00</h3>
                    </div>
                    <div className={styles.contentDiv2}>
                        <h3>참여 모임</h3>
                        <h3 className={styles.gray}>00</h3>
                    </div>
                    <div className={styles.contentDiv3}>
                        <h3>생성 모임</h3>
                        <h3 className={styles.gray}>00</h3>
                    </div>
                </div>
                <div className={styles.calender}>캘린더 영역</div>

                    <div className={styles.btnDiv}>
                        <button className={`${styles.commonBtn} ${styles.marginLeftAuto}`}>회원정보 변경</button>
                        <button className={`${styles.importantBtn} ${styles.marginLeft}`}>회원 탈퇴</button>
                    </div>
            </div>
        </div>

    );
}

export default MypageCalender;