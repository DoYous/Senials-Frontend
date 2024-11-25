import styles from './mypageModify.module.css';
import React, { useState, useEffect } from "react";
/*아이콘*/
import {FaAngleLeft} from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

{/*마이페이지 회원정보 변경*/}
function MypageModify() {
    return (
        <div>
            <div className={styles.bigDiv}>
                <div className={styles.modifyDiv}>
                    <div className={styles.bigName}>
                        <FaAngleLeft/>
                        <h1 className={styles.nameflexDiv}>
                            <div className={styles.pink}>회원정보 </div>
                             변경
                        </h1>
                    </div>
                    <hr className={styles.divHr}/>
                </div>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                    <div className={styles.mainName}>
                        <p>프로필 사진 변경</p>
                        <button className={styles.profileChange}>
                        <FaArrowUpRightFromSquare/>
                        </button>
                    </div>
                    <hr className={styles.divHr}/>
                    <div className={styles.flexName}>
                        <p>닉네임</p>
                        <div className={styles.flex2}>
                            <p className={styles.nickNameDiv}>기존 닉네임</p>
                            <button className={`${styles.commonBtn} ${styles.marginLeft}`}>변경</button>
                        </div>
                    </div>
                        <hr className={styles.divHr}/>
                    <p>한줄 소개</p>
                    <div className={styles.contentDiv}>기존 소개문</div>
                    <div className={styles.saveDiv}>
                        <button className={`${styles.commonBtn} ${styles.saveMargin}`}>저장</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MypageModify;
