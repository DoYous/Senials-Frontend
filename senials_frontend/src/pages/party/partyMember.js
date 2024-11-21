import styles from './partyMember.module.css';
import React, { useState, useEffect } from "react";
/*리액트 아이콘 사용*/
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

function PartyMember() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <div className={styles.navDiv}>
                    <div className={`${styles.flexDiv} ${styles.bigName}`}>
                        <FaAngleLeft/>
                        <h1 className={styles.marginLeft}>모임명 -</h1>
                        <h1>일정명</h1>
                    </div>
                    <div className={`${styles.flexDiv} ${styles.searchDiv}`}>
                        <input type="text" placeholder="닉네임 검색"/>
                        <button className={styles.iconDiv}><FaSearch /></button>
                    </div>
                </div>
                <hr className={styles.divHr}/>
                <div className={styles.bigUserDiv}>
                    <div className={styles.userDiv}>
                        <div className={styles.flexDiv2}>
                            <p className={styles.userProfileDiv}>프로필</p>
                            <p className={styles.userNameDiv}>사용자 이름</p>
                        </div>
                        <button type="submit" className={`${styles.flexDiv} ${styles.reportDiv}`}>
                            <FaBell/>신고
                        </button>
                    </div>
                </div>
                <hr className={styles.divHr}/>
            </div>
        </div>
    );
}

export default PartyMember;
