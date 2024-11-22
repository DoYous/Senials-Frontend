import styles from './partyMeet.module.css';
import React, { useState, useEffect } from "react";

function PartyMeet() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
        <form className={styles.formDiv}>
            <h1 className={styles.nameflexDiv}><div className={styles.pink}>일정</div>을 추가해주세요!</h1>
            <div className={styles.bigSelectDiv}>

                <div className={styles.selectDiv}>
                    <div className={styles.flexDiv}>
                        <p><label htmlFor="meetStartDate">시작 일정</label></p>
                        <div className={styles.inputDiv}>
                        <input type="date" id="meetStartDate" name="meetStartDate" className={styles.inputStyle}/>
                        <input type="time" id="meetStartTime" name="meetStartTime" className={`${styles.marginLeft} ${styles.inputStyle}`}/>
                    </div>
                    </div>
                    <div className={styles.flexDiv}>
                        <p><label htmlFor="meetEndDate">종료 일정</label></p>
                        <div className={styles.inputDiv}>
                        <input type="date" id="meetEndDate" name="meetEndDate"  className={styles.inputStyle}/>
                        <input type="time" id="meetEndTime" name="meetEndTime" className={`${styles.marginLeft} ${styles.inputStyle}`}/>
                        </div>
                    </div>

                    <div className={styles.flexDiv}>
                    <p>모집인원</p>
                        <div className={styles.inputDiv}>
                            <input type="number" placeholder="모집인원을 정해주세요!"  className={styles.inputStyle}/>
                        </div>
                    </div>

                    <div className={styles.flexDiv}>
                    <p>참가비용</p>
                        <div className={styles.inputDiv}>
                            <input type="number" placeholder="참가비용을 정해주세요!"  className={styles.inputStyle}/>
                        </div>
                    </div>

                    <div className={styles.flexDiv}>
                    <p>위치</p>
                        <div className={styles.inputDiv}>
                            <input type="text" placeholder="정확한 위치를 작성해주세요!" className={styles.inputStyle} />
                        </div>
                        </div>
                    <div className={styles.btnDiv}>
                        <button className={`${styles.commonBtn} ${styles.marginLeftAuto}`}>취소</button>
                        <button className={`${styles.importantBtn} ${styles.marginLeft}`}>제출</button>
                    </div>
                </div>
            </div>
        </form>
            </div>
        </div>

    );
}

export default PartyMeet;
