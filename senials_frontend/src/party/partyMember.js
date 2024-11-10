import styles from './partyMember.module.css';
import React, { useState, useEffect } from "react";

function PartyMember() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <div className={styles.navDiv}>
                    <div className={styles.flexDiv}>
                        <h1>모임명 -</h1>
                        <h1>일정명</h1>
                    </div>
                    <div className={styles.flexDiv}>
                        <input type="text" placeholder="닉네임 검색"/>
                        <p>아이콘</p>
                    </div>
                </div>
                <hr className={styles.divHr}/>
                <div className={styles.bigUserDiv}>
                    <div className={styles.userDiv}>
                        <div className={styles.flexDiv2}>
                            <p className={styles.userProfileDiv}>사용자 프로필</p>
                            <p className={styles.userNameDiv}>사용자 이름</p>
                        </div>
                        <button type="submit" className={styles.flexDiv}>
                            <p>아이콘</p>신고
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartyMember;
