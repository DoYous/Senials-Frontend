import styles from './MypageCalender.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
{/*마이페이지+캘린더*/}

function MypageCalender() {
    /* 예비 데이터 */
    const users = [{number: 1}, {number: 2}, {number: 3}];
    const user = users;

    const navigate = useNavigate();

    /* 관심사 설정 */
    const handleLike = (event,userNumber) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(`/user/${userNumber}/favorites`); // 지정된 경로로 이동
    };

    /* 좋아요한 모임 */
    const handleLikedParty = (event,userNumber) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(`/user/${userNumber}/likes`); // 지정된 경로로 이동
    };

    /* 참여 모임 */
    const handleParticipate = (event,userNumber) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(`/user/${userNumber}/parties`); // 지정된 경로로 이동
    };

    /* 생성 모임 */
    const handleMade = (event,userNumber) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(`/user/${userNumber}/made`); // 지정된 경로로 이동
    };
    /* 회원정보 수정 */
    const handleModify = (event,userNumber) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(`/user/${userNumber}/modify`); // 지정된 경로로 이동
    };


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
                    <button type={"button"} className={common.commonBtn} onClick={handleLike}>관심사 설정</button>
                </div>
                <div className={styles.contentsDiv}>
                    <div className={styles.contentDiv1}  onClick={handleLikedParty}>
                        <div className={common.secondFont}>좋아요 한 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                    </div>
                    <div className={styles.contentDiv2} onClick={handleParticipate}>
                        <div  className={common.secondFont}>참여 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                    </div>
                    <div className={styles.contentDiv3} onClick={handleMade}>
                        <div className={common.secondFont}>생성 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>00</div>
                    </div>
                </div>
                <div className={styles.calender}>캘린더 영역</div>

                    <div className={styles.btnDiv}>
                        <button className={`${common.commonBtn} ${styles.marginLeftAuto}`} onClick={handleModify}>회원정보 변경</button>
                        {/*탈퇴창으로 이동 필요*/}
                        <button className={`${common.importantBtn} ${styles.marginLeft}`}>회원 탈퇴</button>
                    </div>
            </div>
        </div>

    );
}

export default MypageCalender;