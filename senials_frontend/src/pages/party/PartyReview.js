import styles from './PartyReview.module.css';
import common from '../common/Common.module.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

// Redux Slice 정의
const partyReviewSlice = createSlice({
    name: 'partyReview',
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        reviewStart(state) {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        reviewSuccess(state) {
            state.loading = false;
            state.success = true;
        },
        reviewFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { actions, reducer } = partyReviewSlice;

// Redux Store 생성 (여기서만 사용)
const store = configureStore({ reducer: { partyReview: reducer } });

function PartyReview() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.partyReview);

    const [reviewData, setReviewData] = useState({
        meetStartDate: '',
        meetStartTime: '',
        content: '',
        rating: 0,
    });

    // 취소 버튼 핸들러
    const handleCancel = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    // 제출 버튼 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(actions.reviewStart());

        try {
            await axios.post(`/partyboards/1/partyreviews`, {
                ...reviewData,
                partyReviewRate: reviewData.rating,
                partyReviewDetail: reviewData.content,
            });
            dispatch(actions.reviewSuccess());
            alert("후기가 제출되었습니다!");
            navigate(-1);
        } catch (err) {
            dispatch(actions.reviewFailure(err.message));
            alert("후기 제출 중 오류가 발생했습니다.");
        }
    };

    // 입력값 변경 핸들러
    const handleChange = (event) => {
        const { name, value } = event.target;
        setReviewData({ ...reviewData, [name]: value });
    };

    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form className={styles.formDiv} onSubmit={handleSubmit}>
                    <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={styles.pink}>후기</div>를 작성해주세요!
                    </h1>
                    <div className={styles.bigSelectDiv}>
                        <div className={styles.selectDiv}>
                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}><label htmlFor="meetStartDate">최초가입일</label></p>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="date"
                                        id="meetStartDate"
                                        name="meetStartDate"
                                        className={styles.inputStyle}
                                        value={reviewData.meetStartDate}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="time"
                                        id="meetStartTime"
                                        name="meetStartTime"
                                        className={`${styles.marginLeft} ${styles.inputStyle}`}
                                        value={reviewData.meetStartTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}>평점을 매겨주세요!</p>
                                <Star rating={reviewData.rating} setRating={(rating) => setReviewData({ ...reviewData, rating })} />
                            </div>

                            <div className={styles.contentDiv}>
                                <p className={common.secondFont}>내용</p>
                                <textarea
                                    className={styles.textDiv}
                                    id="content"
                                    name="content"
                                    placeholder="활동이 어땠는지 당신의 이야기를 적어주세요!"
                                    value={reviewData.content}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className={styles.pDiv}>
                                <p className={`${common.thirdFont} ${styles.pDiv2}`}>1000자 내외</p>
                            </div>

                            <div className={styles.btnDiv}>
                                <button type="button" className={`${common.commonBtn} ${styles.marginLeftAuto}`} onClick={handleCancel}>취소</button>
                                <button type="submit" className={`${styles.importantBtn} ${styles.marginLeft}`} disabled={loading}>
                                    {loading ? "제출 중..." : "제출"}
                                </button>
                            </div>
                            {error && <p className={styles.error}>{error}</p>}
                            {success && <p className={styles.success}>후기가 성공적으로 제출되었습니다!</p>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* 별점 컴포넌트 */
function Star({ rating, setRating }) {
    return (
        <div className={styles.rateInfo}>
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    className={`${styles.baseStar} ${star <= rating ? styles.filledStar : ""}`}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    );
}

export default PartyReview;
export { store };
