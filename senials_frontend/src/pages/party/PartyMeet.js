import styles from './PartyMeet.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";

function PartyMeet() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
        <form className={styles.formDiv}>
            <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}><div className={styles.pink}>일정</div>을 추가해주세요!</h1>
            <div className={styles.bigSelectDiv}>

                <div className={styles.selectDiv}>
                    <div className={styles.flexDiv}>
                        <h7 className={common.secondFont}><label htmlFor="meetStartDate">시작 일정</label></h7>
                        <div className={styles.inputDiv}>
                        <input type="date" id="meetStartDate" name="meetStartDate" className={styles.inputStyle}/>
                        <input type="time" id="meetStartTime" name="meetStartTime" className={`${styles.marginLeft} ${styles.inputStyle}`}/>
                    </div>
                    </div>
                    <div className={styles.flexDiv}>
                        <h7  className={common.secondFont}><label htmlFor="meetEndDate">종료 일정</label></h7>
                        <div className={styles.inputDiv}>
                        <input type="date" id="meetEndDate" name="meetEndDate"  className={styles.inputStyle}/>
                        <input type="time" id="meetEndTime" name="meetEndTime" className={`${styles.marginLeft} ${styles.inputStyle}`}/>
                        </div>
                    </div>

                    <div className={styles.flexDiv}>
                    <div className={common.secondFont}>모집인원</div>
                        <div className={styles.inputDiv}>
                            <input type="number" placeholder="모집인원을 정해주세요!"  className={styles.inputStyle}/>
                        </div>
                    </div>

                    <div className={styles.flexDiv}>
                    <div className={common.secondFont}>참가비용</div>
                        <div className={styles.inputDiv}>
                            <input type="number" placeholder="참가비용을 정해주세요!"  className={styles.inputStyle}/>
                        </div>
                    </div>

                    <div className={styles.flexDiv}>
                    <h7 className={common.secondFont}>위치</h7>
                        <div className={styles.inputDiv}>
                            <input type="text" placeholder="정확한 위치를 작성해주세요!" className={styles.inputStyle} />
                        </div>
                        </div>
                    <div className={styles.btnDiv}>
                        <button className={`${common.commonBtn} ${styles.marginLeftAuto}`}>취소</button>
                        <button className={`${common.importantBtn} ${styles.marginLeft}`}>제출</button>
                    </div>
                </div>
            </div>
        </form>
            </div>
        </div>

    );
}

export default PartyMeet;
