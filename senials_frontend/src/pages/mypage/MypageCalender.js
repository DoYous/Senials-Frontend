import styles from './MypageCalender.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
{/*마이페이지+캘린더*/}

function MypageCalender() {
    return (
        <div className={styles.bigDiv}>
            {/*프로필 사진 기입*/}
            <div className={styles.profile}></div>
            <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                <div className={common.firstFont}>닉네임</div>
                <div className={`${styles.oneLine} ${common.secondFont}`}>한줄 소개</div>
                </div>
                <div className={styles.hashDiv}>
                    <div className={styles.hash}>
                        <p>해시태그</p>
                        <p>해시태그</p>
                        <p>해시태그</p>
                    </div>
                    <button type={"submit"} className={common.commonBtn}>관심사 설정</button>
                </div>
                <div className={styles.contentsDiv}>
                    <div className={styles.contentDiv1}>
                        <div className={common.secondFont}>좋아요 한 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                    </div>
                    <div className={styles.contentDiv2}>
                        <div  className={common.secondFont}>참여 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                    </div>
                    <div className={styles.contentDiv3}>
                        <div className={common.secondFont}>생성 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                    </div>
                </div>
                <div className={styles.calender}>캘린더 영역</div>

                    <div className={styles.btnDiv}>
                        <button className={`${common.commonBtn} ${styles.marginLeftAuto}`}>회원정보 변경</button>
                        <button className={`${common.importantBtn} ${styles.marginLeft}`}>회원 탈퇴</button>
                    </div>
            </div>
        </div>

    );
}

export default MypageCalender;