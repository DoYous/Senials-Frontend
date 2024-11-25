import styles from './mypageMember.module.css';
import React, { useState, useEffect } from "react";
/*아이콘*/
import {FaAngleLeft, FaArrowUpRightFromSquare} from "react-icons/fa6";
import {FaBell, FaSearch} from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
{/*모임 멤버 보기*/}

function MypageMember() {
    return (
        <div>
            <div className={styles.bigDiv}>
                <div className={styles.modifyDiv}>
                    <div className={styles.bigName}>
                        <FaAngleLeft/>
                        <h1 className={styles.nameflexDiv}>
                            <div className={styles.pink}>모임이름</div>
                            - 멤버 목록
                        </h1>
                    </div>
                    <hr className={styles.divHr}/>
                </div>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                        <div className={styles.bigSearchDiv}>
                            < MdOutlineCheckBoxOutlineBlank/>
                            <div className={styles.smallSearchDiv}>
                                <div  className={`${styles.flexDiv} ${styles.searchDiv}`}>
                                    <select className={styles.selectSort}>
                                        <option value="name">이름순</option>
                                        <option value="oldest">오래된 가입일 순</option>
                                        <option value="newest">최근 가입일 순</option>
                                        <option value="participation">일정 참여 횟수 순</option>
                                    </select>
                                </div>
                                <div className={`${styles.flexDiv} ${styles.searchDiv}`}>
                                    <input type="text" placeholder="닉네임 검색"/>
                                    <button className={styles.iconDiv}><FaSearch/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainContentsDiv}>
                        < MdOutlineCheckBoxOutlineBlank/>
                        <p className={styles.userProfileDiv}>프로필</p>
                        <div className={styles.mainContentDiv}>
                            <h3>멤버 이름</h3>
                            <p>가입일</p>
                            <p>일정 참여 횟수</p>
                        </div>
                        <div className={styles.mainContentDiv}>
                            <h3 className={styles.none}>df</h3>
                            <p>YY.MM.DD</p>
                            <p>n회</p>
                        </div>
                        <button type="submit" className={`${styles.flexDiv} ${styles.reportDiv}`}>
                            <FaBell/>신고
                        </button>
                    </div>
                    <hr className={styles.divHr}/>
                </div>
                <div className={styles.lastBtn}>
                    <button type="submit" className={`${styles.flexDiv} ${styles.reportDiv}`}>
                        추방
                    </button>
                </div>
            </div>
        </div>

    );
}

export default MypageMember;