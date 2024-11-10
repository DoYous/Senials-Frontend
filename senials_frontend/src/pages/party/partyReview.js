/*매칭게시판 상세 모임 후기 작성*/
import styles from './partyReview.module.css';
import React, { useState, useEffect } from "react";

function PartyReview() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form>
                    <h1>후기를 작성해주세요</h1>
                    <div className={styles.bigSelectDiv}>
                        <div className={styles.selectDiv}>
                            <div className={styles.flexDiv}>
                                <p><label htmlFor="meetStartDate">최초가입일</label></p>
                                <input type="date" id="meetStartDate" name="meetStartDate" />
                                <input type="time" id="meetStartTime" name="meetStartTime" />
                            </div>

                            <div className={styles.flexDiv}>
                                <p>평점을 매겨주세요!</p>
                                <div>아이콘</div>
                            </div>

                            <div className={styles.contentDiv}>
                                <p>내용</p>
                                <textarea id="content" name="content" placeholder="활동이 어땠는지 당신의 이야기를 적어주세요!"></textarea>
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

export default PartyReview;
