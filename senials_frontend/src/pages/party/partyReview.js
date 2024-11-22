/*매칭게시판 상세 모임 후기 작성*/
import styles from './partyReview.module.css';
import common from '../common/common.module.css';
import React, { useState, useEffect } from "react";

function PartyReview() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form className={styles.formDiv}>
                    <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={styles.pink}>후기</div>
                        를 작성해주세요!
                    </h1>
                    <div className={styles.bigSelectDiv}>
                        <div className={styles.selectDiv}>
                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}><label htmlFor="meetStartDate">최초가입일</label></p>
                                <div className={styles.inputDiv}>
                                <input type="date" id="meetStartDate" name="meetStartDate"  className={styles.inputStyle}/>
                                <input type="time" id="meetStartTime" name="meetStartTime"  className={`${styles.marginLeft} ${styles.inputStyle}`}/>
                                </div>
                                </div>

                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}>평점을 매겨주세요!</p>
                                <div className={styles.rateInfo}>
                                    <span className={styles.filledStar}>★★★</span>
                                    <span className={styles.unfilledStar}>☆☆</span>
                                </div>
                            </div>

                            <div className={styles.contentDiv}>
                                <p className={common.secondFont}>내용</p>
                                <textarea className={styles.textDiv} id="content" name="content" placeholder="활동이 어땠는지 당신의 이야기를 적어주세요!"></textarea>
                            </div>
                            <div className={styles.pDiv}>
                                <p className={`${common.thirdFont} ${styles.pDiv2}`}>1000자 내외</p>
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

export default PartyReview;
