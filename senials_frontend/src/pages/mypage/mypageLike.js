import styles from './mypageLike.module.css';
import React, { useState, useEffect } from "react";
/*아이콘*/
import {FaAngleLeft} from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

{/*취미 관심사 설정*/}
function MypageLike() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <div className={styles.bigName}>
                    <div className={styles.bigNameFlex}>
                        <FaAngleLeft/>
                        <h1 className={styles.nameflexDiv}>
                            <div className={`${styles.pink} ${styles.marginName}`}>관심사</div>
                            설정
                        </h1>
                    </div>
                    <button className={`${styles.commonBtn} ${styles.saveMargin}`}>저장</button>
                </div>
                <button className={styles.contentName}>
                    <h3>운동</h3>
                    <FaAngleUp/>
                </button>
                <div className={styles.select_hobby_tendency}>
                    <input type="radio" id="tendency1" name="hobby_tendency" value="1"/>
                    <label htmlFor="tendency1">취미</label>
                    <input type="radio" id="tendency2" name="hobby_tendency" value="2"/>
                    <label htmlFor="tendency2">취미</label>
                    <input type="radio" id="tendency3" name="hobby_tendency" value="3"/>
                    <label htmlFor="tendency3">취미</label>
                    <input type="radio" id="tendency4" name="hobby_tendency" value="4"/>
                    <label htmlFor="tendency4">취미</label>
                    <input type="radio" id="tendency5" name="hobby_tendency" value="5"/>
                    <label htmlFor="tendency5">취미</label>
                    <input type="radio" id="tendency6" name="hobby_tendency" value="6"/>
                    <label htmlFor="tendency6">취미</label>
                </div>

                <button className={styles.contentName}>
                    <h3>운동</h3>
                    <FaAngleUp/>
                </button>
                <div className={styles.select_hobby_tendency}>
                    <input type="radio" id="tendency7" name="hobby_tendency" value="7"/>
                    <label htmlFor="tendency7">취미</label>
                    <input type="radio" id="tendency8" name="hobby_tendency" value="8"/>
                    <label htmlFor="tendency8">취미</label>
                    <input type="radio" id="tendency9" name="hobby_tendency" value="9"/>
                    <label htmlFor="tendency9">취미</label>
                    <input type="radio" id="tendency10" name="hobby_tendency" value="10"/>
                    <label htmlFor="tendency10">취미</label>
                    <input type="radio" id="tendency11" name="hobby_tendency" value="11"/>
                    <label htmlFor="tendency11">취미</label>
                    <input type="radio" id="tendency12" name="hobby_tendency" value="12"/>
                    <label htmlFor="tendency12">취미</label>
                </div>
            </div>
        </div>

    );
}

export default MypageLike;