import React, { useEffect, useRef, useState } from 'react';
import styles from "./HobbyReview.module.css";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { setHobbyReview } from '../../redux/hobbySlice';
import { useSelector,useDispatch } from 'react-redux';

function HobbyReviewGet() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hobbyNumber = queryParams.get('hobbyNumber');
    const reviewNumber = queryParams.get('review');

    const hobbyReview =useSelector((state)=>state.hobbyReview);

    const [rating, setRating] = useState(0);
    const [reviewDetail, setReviewDetail] = useState(0);
    const [healthStatus, setHealthStatus] = useState(0);
    const [tendency, setTendency] = useState(0);
    const [budget,setBudget]=useState(0)
    const [level, setLevel] = useState(0);

  // 기존 데이터 조회
  useEffect(() => {
      const token = localStorage.getItem("token");
      axios.get(`/${hobbyNumber}/hobby-review/${reviewNumber}`,{
          headers: {
              'Authorization': token // JWT 토큰을 Authorization 헤더에 추가
          }
      })
        .then(response => {
            dispatch(setHobbyReview(response.data.results.hobbyReview));
        })
}, [dispatch, hobbyNumber, reviewNumber]);

  // 현재 날짜 출력
  const [date, setDate] = useState('');
  useEffect(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      setDate(`${year}-${month}-${day}`);
  }, []); 

 // hobbyReview 조회후 값 가져오기
 useEffect(() => {
    if (hobbyReview) {
        setRating(hobbyReview.hobbyReviewRate);
        setReviewDetail(hobbyReview.hobbyReviewDetail);
        setHealthStatus(hobbyReview.hobbyReviewHealthStatus);
        setTendency(hobbyReview.hobbyReviewTendency);
        setLevel(hobbyReview.hobbyReviewLevel);
        setBudget(hobbyReview.hobbyReviewBudget);
    }
}, [hobbyReview]);

       // 이전 페이지로 돌아가기 이벤트
       const goBack = () => {
        navigate(-1);
    }

     // 별점 클릭 처리 로직
     const handleStarClick = (index) => {
         setRating(index + 1);  // 클릭한 별의 번호로 상태 변경
     }

    //해당 리뷰 삭제 이벤트
    const linkDeleteReview = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/${hobbyNumber}/hobby-review/${reviewNumber}`,{
                headers: {
                    'Authorization': token // JWT 토큰을 Authorization 헤더에 추가
                }
            });
            alert("후기가 삭제되었습니다.");
            navigate(`/hobby-detail/${hobbyNumber}`); // 삭제 후 해당 취미 상세 페이지로 이동
        } catch (error) {
            alert("후기 삭제에 실패했습니다.");
            navigate(`/hobby-detail/${hobbyNumber}`);
        }
    };

  
 // 리뷰 제출
 const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
        hobbyReviewDetail: reviewDetail,
        hobbyReviewRate: rating,
        hobbyReviewHealthStatus: healthStatus,
        hobbyReviewTendency: tendency,
        hobbyReviewLevel: level,
        hobbyReviewBudget: budget,
        hobbyReviewWriteDate: hobbyReview.hobbyReviewWriteDate
    };

    try {
        const token = localStorage.getItem("token");
        await axios.put(`/${hobbyNumber}/hobby-review/${reviewNumber}`, reviewData,{
            headers: {
                'Authorization': token // JWT 토큰을 Authorization 헤더에 추가
            }
        });
        
        alert('후기가 수정되었습니다');
        navigate(`/hobby-detail/${hobbyNumber}`);
    } catch (error) {
        alert('후기가 수정되지 않았습니다.');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.writeReview}>
                <div className={styles.title}>
                    <span style={{color: "#FF5391"}}>후기</span>를 적어주세요!
                </div>
                <div className={styles.writeDate}>
                    작성일자 <span style={{color: "#b3b3b3", fontWeight: "normal"}}>{date}</span>
                </div>
                <div className={styles.reviewPoint}>
                    <div className={styles.reviewPoint}>
                        <div className={styles.text}>평점을 매겨주세요!</div>
                        <div className={styles.starPoint}>
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} index={index} filled={index < rating} onClick={() => handleStarClick(index)}/>
                        ))}
                        </div>
                    </div>
                </div>

                <form className={styles.writeReviewDetail} onSubmit={handleSubmit}>
                    <div className={styles.text}>후기 내용</div>
                    <textarea 
                        className={styles.inputText} 
                        placeholder="후기를 적어주세요! 준비물, 마음가짐 등 자유롭게 기입해주세요!"
                        value={reviewDetail}
                        onChange={(e) => setReviewDetail(e.target.value)}
                    />
                    <div className={styles.selectHobbyAbility}>
                        <div className={styles.text}>몸이 불편하신 곳이 있을까요?</div>
                        <input type="radio" id="abilityYes" name="hobbyAbility" value="1" checked={healthStatus===1} onChange={(e) => setHealthStatus(parseInt(e.target.value))}/>
                        <label htmlFor="abilityYes">예</label>
                        <input type="radio" id="abilityNo" name="hobbyAbility" value="0"  checked={healthStatus===0} onChange={(e) => setHealthStatus(parseInt(e.target.value))}/>
                        <label htmlFor="abilityNo">아니요</label>
                    </div>
                    <div className={styles.selectHobbyTendency}>
                        <div className={styles.text}>당신의 성향은 어떤가요?</div>
                        <input type="radio" id="tendencyIn" name="hobbyTendency" value="0"  checked={tendency===0} onChange={(e) => setTendency(parseInt(e.target.value))}/>
                        <label htmlFor="tendencyIn">내향적</label>
                        <input type="radio" id="tendencyOut" name="hobbyTendency" value="1" checked={tendency===1} onChange={(e) => setTendency(parseInt(e.target.value))}/>
                        <label htmlFor="tendencyOut">외향적</label>
                    </div>
                    <div className={styles.selectHobbyBudget}>
                            <div className={styles.text}>지출범위</div>
                            <input type="radio" id="budget1" name="hobbyBudget" value="0" checked={budget===0} onChange={(e) => setBudget(parseInt(e.target.value))}/>
                            <label htmlFor="budget1">0~100,000</label>
                            <input type="radio" id="budget2" name="hobbyBudget" value="1" checked={budget===1} onChange={(e) => setBudget(parseInt(e.target.value))}/>
                            <label htmlFor="budget2">100,000~400,000</label>
                            <input type="radio" id="budget3" name="hobbyBudget" value="2" checked={budget===2} onChange={(e) => setBudget(parseInt(e.target.value))}/>
                            <label htmlFor="budget3">400,000~1,000,000</label>
                            <input type="radio" id="budget4" name="hobbyBudget" value="3" checked={budget===3} onChange={(e) => setBudget(parseInt(e.target.value))}/>
                            <label htmlFor="budget4">1,000,000~</label>
                        </div>
                    <div className={styles.selectHobbyLevel}>
                        <div className={styles.text}>난이도</div>
                        <input type="radio" id="level1" name="hobbyLevel" value="0" checked={level===0}  onChange={(e) => setLevel(parseInt(e.target.value))}/>
                        <label htmlFor="level1">쉬움</label>
                        <input type="radio" id="level2" name="hobbyLevel" value="1" checked={level===1}  onChange={(e) => setLevel(parseInt(e.target.value))}/>
                        <label htmlFor="level2">좀 쉬움</label>
                        <input type="radio" id="level3" name="hobbyLevel" value="2" checked={level===2}  onChange={(e) => setLevel(parseInt(e.target.value))}/>
                        <label htmlFor="level3">평범</label>
                        <input type="radio" id="level4" name="hobbyLevel" value="3" checked={level===3}  onChange={(e) => setLevel(parseInt(e.target.value))}/>
                        <label htmlFor="level4">좀 어려움</label>
                        <input type="radio" id="level5" name="hobbyLevel" value="4" checked={level===4}  onChange={(e) => setLevel(parseInt(e.target.value))}/>
                        <label htmlFor="level5">어려움</label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.cancleButton} type="button" onClick={()=> linkDeleteReview()}>삭제</button>
                        <button className={styles.cancleButton} type="button" onClick={()=>goBack()}>취소</button>
                        <input className={styles.submitButton}  type="submit" value="제출"/>
                    </div>
                </form>
            </div>
        </div>
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
