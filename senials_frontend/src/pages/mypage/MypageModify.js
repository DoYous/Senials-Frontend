import styles from './MypageModify.module.css';
import common from '../common/Common.module.css';
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
                        <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginLeft}`}>회원정보</div>
                            <div className={styles.marginLeft}>변경</div>
                        </div>
                    </div>
                    <hr className={styles.divHr}/>
                </div>
                <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                    <div className={styles.mainName}>
                        <div className={`${common.secondFont} ${styles.margin0} ${styles.profileFlex}`}><div className={styles.profile}></div>프로필 사진 변경</div>
                        <button className={styles.profileChange}>
                        <FaArrowUpRightFromSquare size={20}/>
                        </button>
                    </div>
                    <hr className={styles.divHr}/>
                    <div className={styles.flexName}>
                        <p className={`${common.secondFont} ${styles.margin0}`}>닉네임</p>
                        <div className={styles.flex2}>
                            <p className={styles.nickNameDiv}>기존 닉네임</p>
                            <button className={`${common.commonBtn} ${styles.marginLeft}`}>변경</button>
                        </div>
                    </div>
                        <hr className={styles.divHr}/>
                    <p className={`${common.secondFont} ${styles.margin0}`}>한줄 소개</p>
                    <textarea className={styles.contentDiv}>기존 소개문</textarea>
                    <div className={styles.saveDiv}>
                        <button className={`${common.commonBtn} ${styles.saveMargin}`}>저장</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MypageModify;
