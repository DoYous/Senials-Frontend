import React, { useEffect, useRef, useState } from 'react';
import styles from "./HobbyReview.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

function HobbyReviewGet() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hobbyNumber = queryParams.get('hobbyNumber');

    // 이전 페이지로 돌아가기 이벤트
    const goBack = () => {
        navigate(-1);
    }

    // 현재 날짜 출력
    const [date, setDate] = useState('');
    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        setDate(`${year}-${month}-${day}`);
    }, []); 

    const hobbyReviewDetail = useRef();
    const hobbyReviewHealthStatus = useRef();
    const hobbyReviewTendency = useRef();
    const hobbyReviewLevel = useRef();
    const hobbyReviewBudget= useRef();

     // 별점 상태 관리
     const [rating, setRating] = useState(0);

     // 별점 클릭 처리 로직
     const handleStarClick = (index) => {
         setRating(index + 1);  // 클릭한 별의 번호로 상태 변경
     }

    // form 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 각 입력 값들을 추출
        const hobbyReviewDetailValue = hobbyReviewDetail.current.value;
        const healthStatus = document.querySelector('input[name="hobbyAbility"]:checked')?.value || null;
        const tendency = document.querySelector('input[name="hobbyTendency"]:checked')?.value || null;
        const level = document.querySelector('input[name="hobbyLevel"]:checked')?.value || null;
        const budget = document.querySelector('input[name="hobbyBudget"]:checked')?.value || null;
        const reviewRate = rating; 
        const writeDate = new Date();



        // JSON 데이터 생성
        const reviewData = {
            hobbyReviewRate: reviewRate,  
            hobbyReviewDetail: hobbyReviewDetailValue, 
            hobbyReviewHealthStatus: healthStatus,  
            hobbyReviewTendency: tendency,  
            hobbyReviewLevel: level,
            hobbyReviewBudget:budget,
            hobbyReviewWriteDate: writeDate, 
        };

        try {
            const token = localStorage.getItem("token");
            await axios.post(`/${hobbyNumber}/hobby-review`, reviewData, {
                headers: {
                    'Authorization': token // JWT 토큰을 Authorization 헤더에 추가
                }
            });
            alert('후기 작성이 완료되었습니다.');
            navigate(`/hobby-detail/${hobbyNumber}`);  // 후기가 제출되면 해당 취미 상세 페이지로 이동
        } catch (error) {
            alert('후기 작성이 완료되지 않았습니다.');
            console.error(error); // 오류 처리
        }
    };

    return (
        <>    
            <div className={styles.background}></div>    
            <div className={styles.page}>
                <div className={styles.writeReview}>
                    <div className={styles.title}>
                        <span style={{ color: "#FF5391" }}>후기</span>를 적어주세요!
                    </div>
                    <div className={styles.writeDate}>
                        작성일자 <span style={{ color: "#b3b3b3", fontWeight: "normal" }}>{date}</span>
                    </div>
                    <div className={styles.reviewPoint}>
                        <div className={styles.text}>평점을 매겨주세요!</div>
                        <div className={styles.starPoint}>
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} index={index} filled={index < rating} onClick={() => handleStarClick(index)}/>
                        ))}
                        </div>
                    </div>

                    <form className={styles.writeReviewDetail} onSubmit={handleSubmit}>
                        <div className={styles.text}>후기 내용</div>
                        <textarea
                            className={styles.inputText}
                            placeholder="후기를 적어주세요! 준비물, 마음가짐 등 자유롭게 기입해주세요!"
                            ref={hobbyReviewDetail}
                        />
                        <div className={styles.selectHobbyAbility}>
                            <div className={styles.text}>몸이 불편하신 곳이 있을까요?</div>
                            <input type="radio" id="abilityYes" name="hobbyAbility" value="1" />
                            <label htmlFor="abilityYes">예</label>
                            <input type="radio" id="abilityNo" name="hobbyAbility" value="0" />
                            <label htmlFor="abilityNo">아니요</label>
                        </div>
                        <div className={styles.selectHobbyTendency}>
                            <div className={styles.text}>당신의 성향은 어떤가요?</div>
                            <input type="radio" id="tendencyIn" name="hobbyTendency" value="0" />
                            <label htmlFor="tendencyIn">내향적</label>
                            <input type="radio" id="tendencyOut" name="hobbyTendency" value="1" />
                            <label htmlFor="tendencyOut">외향적</label>
                        </div>
                        <div className={styles.selectHobbyBudget}>
                            <div className={styles.text}>지출범위</div>
                            <input type="radio" id="budget1" name="hobbyBudget" value="0" />
                            <label htmlFor="budget1">0~100,000</label>
                            <input type="radio" id="budget2" name="hobbyBudget" value="1" />
                            <label htmlFor="budget2">100,000~400,000</label>
                            <input type="radio" id="budget3" name="hobbyBudget" value="2" />
                            <label htmlFor="budget3">400,000~1,000,000</label>
                            <input type="radio" id="budget4" name="hobbyBudget" value="3" />
                            <label htmlFor="budget4">1,000,000~</label>
                        </div>
                        <div className={styles.selectHobbyLevel}>
                            <div className={styles.text}>난이도</div>
                            <input type="radio" id="level1" name="hobbyLevel" value="0" />
                            <label htmlFor="level1">쉬움</label>
                            <input type="radio" id="level2" name="hobbyLevel" value="1" />
                            <label htmlFor="level2">좀 쉬움</label>
                            <input type="radio" id="level3" name="hobbyLevel" value="2" />
                            <label htmlFor="level3">평범</label>
                            <input type="radio" id="level4" name="hobbyLevel" value="3" />
                            <label htmlFor="level4">좀 어려움</label>
                            <input type="radio" id="level5" name="hobbyLevel" value="4" />
                            <label htmlFor="level5">어려움</label>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="button" className={styles.cancleButton} onClick={goBack}>취소</button>
                            <button type="submit" className={styles.submitButton}>제출</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

function Star({ index, filled, onClick }) {
    return (
        <img
            className={styles.star}
            src={filled ? "/img/starFull.png" : "/img/starEmpty.png"}
            alt={`star-${index}`}
            onClick={onClick}
        />
    );
}

export default HobbyReviewGet;
