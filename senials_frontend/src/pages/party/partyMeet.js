import styles from './partyMeet.module.css';
import React, { useState, useEffect } from "react";

function PartyMeet() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
        <form>
            <h1>일정을 추가해주세요!</h1>
            <div className={styles.bigSelectDiv}>

                <div className={styles.selectDiv}>
                    <div className={styles.flexDiv}>
                        <p><label htmlFor="meetStartDate">시작 일정</label></p>
                        <input type="date" id="meetStartDate" name="meetStartDate" />
                        <input type="time" id="meetStartTime" name="meetStartTime" />
                    </div>
                    <div className={styles.flexDiv}>
                        <p><label htmlFor="meetEndDate">종료 일정</label></p>
                        <input type="date" id="meetEndDate" name="meetEndDate" />
                        <input type="time" id="meetEndTime" name="meetEndTime" />
                    </div>

                    <div className={styles.flexDiv}>
                    <p>모집인원</p>
                    <input type="number" placeholder="모집인원을 정해주세요!" />
                    </div>

                    <div className={styles.flexDiv}>
                    <p>참가비용</p>
                    <input type="number" placeholder="참가비용을 정해주세요!" />
                    </div>

                    <div className={styles.flexDiv}>
                    <p>위치</p>
                    <input type="text" placeholder="정확한 위치를 작성해주세요!" />
                    </div>
                <div className={styles.btnDiv}>
                    <button>취소</button>
                    <button type={"submit"}>제출</button>
                </div>
                </div>
            </div>
        </form>
            </div>
        </div>

    );
}

export default PartyMeet;
