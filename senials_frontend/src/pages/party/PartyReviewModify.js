/*매칭게시판 상세 모임 후기 수정*/
import styles from './PartyReview.module.css';
import common from '../common/Common.module.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PartyReviewModify() {
    const navigate = useNavigate();

    /* 취소 */
    const handleCancel = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 지정된 경로로 이동
    };

    /* 제출 */
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 동작 방지
        alert("제출되었습니다!");
        navigate(-1); // 지정된 경로로 이동
    };

    /* 삭제 */
    const handleRemove = (event) => {
        event.preventDefault(); // 기본 동작 방지
        alert("삭제되었습니다!");
        navigate(-1); // 지정된 경로로 이동
    };

    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form className={styles.formDiv} onSubmit={handleSubmit}> {/*폼제출용*/}
                    <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={styles.pink}>후기</div>
                        를 작성해주세요!
                    </h1>
                    <div className={styles.bigSelectDiv}>
                        <div className={styles.selectDiv}>
                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}><label htmlFor="meetStartDate">최초가입일</label></p>
                                <div className={styles.inputDiv}>
                                    <input type="date" id="meetStartDate" name="meetStartDate"
                                           className={styles.inputStyle}/>
                                    <input type="time" id="meetStartTime" name="meetStartTime"
                                           className={`${styles.marginLeft} ${styles.inputStyle}`}/>
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}>평점을 매겨주세요!</p>
                                <Star/>
                            </div>

                            <div className={styles.contentDiv}>
                                <p className={common.secondFont}>내용</p>
                                <textarea className={styles.textDiv} id="content" name="content"
                                          placeholder="활동이 어땠는지 당신의 이야기를 적어주세요!"></textarea>
                            </div>
                            <div className={styles.pDiv}>
                                <p className={`${common.thirdFont} ${styles.pDiv2}`}>1000자 내외</p>
                            </div>

                            <div className={styles.flex}>
                                <button
                                    type="button" // 기본 submit 동작 방지
                                    className={styles.uniqueBtn}
                                    onClick={handleRemove}
                                >
                                    삭제
                                </button>
                                <div className={styles.flex2}>
                                    <button
                                        type="button" // 기본 submit 동작 방지
                                        className={common.commonBtn}
                                        onClick={handleCancel}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit" // form의 onSubmit 핸들러 트리거
                                        className={`${styles.importantBtn} ${styles.marginLeft}`}
                                    >
                                        제출
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* 별점 매기기 */
function Star() {
    const [rating, setRating] = useState(0); /* 현재 별점 상태 */

    const handleStarClick = (index) => {
        setRating(index); /*클릭*/
    };

    return (
        <div className={styles.rateInfo}>
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    className={`${styles.baseStar} ${star <= rating ? styles.filledStar : ""}`}
                    onClick={() => handleStarClick(star)}
                />
            ))}
        </div>
    );
}

export default PartyReviewModify;
