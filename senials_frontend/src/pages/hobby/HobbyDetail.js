import React, {useEffect, useState} from 'react';
import styles from './HobbyDetail.module.css';
import starRate from '../common/MainVer1.module.css';
import common from '../common/Common.module.css';
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { setHobbyDetail,setHobbyReview} from '../../redux/hobbySlice';
import { useParams } from 'react-router-dom';

function HobbyDetailPost() {

    const { hobbyNumber } = useParams();
    
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const hobbyDetail=useSelector((state)=>state.hobbyDetail);
    const hobbyReviewList=useSelector((state)=>state.hobbyReview);


    const [sortedReviews, setSortedReviews] = useState([]);
    const [sortOption, setSortOption] = useState('newest'); // 정렬 옵션: 'newest', 'highRate', 'lowRate'

      useEffect(()=>{
        axios.get(`/hobby-detail/${hobbyNumber}`)
            .then((response) => {
                //취미 상세 불러오기
                dispatch(setHobbyDetail(response.data.results.hobby));
                //취미 후기들 불러오기
                dispatch(setHobbyReview(response.data.results.hobbyReview));
            })
            .catch((error) => console.error(error));
      },[dispatch])

      //후기 정렬
      useEffect(() => {
        sortReviews(sortOption);
    }, [sortOption, hobbyReviewList]);

    //정렬 방식
    const sortReviews = (option) => {
        let sorted = [...hobbyReviewList];
        if (option === 'newest') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (option === 'highRate') {
            sorted.sort((a, b) => b.hobbyReviewRate - a.hobbyReviewRate);
        } else if (option === 'lowRate') {
            sorted.sort((a, b) => a.hobbyReviewRate - b.hobbyReviewRate);
        }
        setSortedReviews(sorted);
    };

    //후기작성페이지 이동 이벤트
    const linkHobbyReview=()=>{
        navigate(`/hobby-review?hobbyNumber=${hobbyNumber}`);
    }

    //작성된 후기 수정 페이지 이동 이벤트
    const linkHobbyReviewModify=(reviewNumber,hobbyNumber)=>{
        navigate(`/hobby-review-modify?review=${reviewNumber}&hobbyNumber=${hobbyNumber}`);
    }

    //성향 출력
    const getTendency = (tendency) => {
        switch (tendency) {
            case 0:
                return "외향적";
            case 1:
                return "내향적";
            default:
                return "정보 없음";
        }
    };

    //난이도 출력
    const getLevel = (level) => {
        switch (level) {
            case 0:
                return "쉬움";
            case 1:
                return "좀 쉬움";
            case 2:
                return "평범";
            case 3:
                return "좀 어려움";
            case 4:
                return "어려움";
            default:
                return "정보 없음";
        }
    };

    //비용 출력
    const getBudget = (Budget) => {
        switch (Budget) {
            case 0:
                return "0~100,000";
            case 1:
                return "100,000~400,000";
            case 2:
                return "400,000~1,000,000";
            case 3:
                return "1,000,000~";
            default:
                return "정보 없음";
        }
    };

    return (
        <>
        <div className={styles.background}>
           
        </div>
        <div className={styles.page}>
            <div className={styles.hobby}>
                <img src={`/img/hobbyboard/${hobbyNumber}`} className={styles.hobbyImg} alt="취미" />
                <div className={styles.hobbyText}>
                    <div className={styles.hobbyName}>{hobbyDetail.hobbyName}</div>
                    <div className={styles.hobbyDetail}>{hobbyDetail.hobbyExplain}</div>
                    <div className={styles.preference}>
                        <div>평균 선호도 : {setPercentage(hobbyDetail.rating)}%</div>
                        <div className={styles.progressBarContainer}>
                            <div 
                                className={styles.progressBar} 
                                style={{ width: `${setPercentage(hobbyDetail.rating)}%` }} 
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.hobbyPoint}>
                <div className={styles.hobbyAbility}>성향<br />
                    <span style={{color:"#808080"}}>
                        {getTendency(hobbyDetail.hobbyTendency)}
                    </span>
                </div>
                <div className={styles.hobbyBudget}>지출범위<br />
                    <span style={{color:"#808080"}}>
                        {getBudget(hobbyDetail.hobbyBudget)}
                    </span>
                </div>
                <div className={styles.hobbyLevel}>난이도<br/>
                    <span style={{color:"#808080"}}>
                        {getLevel(hobbyDetail.hobbyLevel)}
                    </span>
                </div>
            </div>
            <hr />
            <div className={styles.reviewHeader}>
                <div className={styles.reviewCount}>{`후기 ${hobbyDetail.reviewCount}`}</div>
                <div className={styles.reviewButton}>
                    <button className={styles.writeReview} onClick={() => linkHobbyReview(hobbyDetail.hobbyNumber)}>후기작성</button>
                    <select className={styles.sortReview}value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}>
                        <option value="newest">최신순</option>
                        <option value="highRate">높은별점순</option>
                        <option value="lowRate">낮은별점순</option>
                    </select>
                </div>  
            </div>         
            {sortedReviews.map((item, index) => (
                <HobbyReview key={index} review={item} linkHobbyReviewModify={linkHobbyReviewModify} />
            ))}
            </div>
        </>
    );
}

function HobbyReview({ review, linkHobbyReviewModify }) {
    return (
        <div className={styles.hobbyReview}>
            <div className={styles.hobbyReviewDetail}>
                <div className={styles.userInfo}>
                    <img src='/img/sampleImg5.png' className={styles.userImg} alt="사용자" />
                    <div className={styles.userName}>{review.userName}</div>
                    <div className={styles.reviewPoint}><span className={styles.star}>별점</span>
                        <Rate averageRating={review.hobbyReviewRate} />
                    </div>
                    <button className={`${styles.reportButton} ${common.reportDiv}`}>
                        <FaBell/> 신고
                    </button>
                </div>
                <div className={styles.reviewTitle}>취미 후기</div>
                <div className={styles.reviewDetail}>{review.hobbyReviewDetail}</div>
                <div className={styles.reviewImgContainer}>
                    <img src='/img/sampleImg4.png' className={styles.reviewImg} alt="후기" />
                    <img src='/img/sampleImg4.png' className={styles.reviewImg} alt="후기" />
                </div>
                <button className={styles.updateReviewButton} onClick={() => linkHobbyReviewModify(review.hobbyReviewNumber,review.hobbyNumber)}>
                    수정
                </button>
            </div>
        </div>
    );
}


function Rate({averageRating}) {

    let filled = parseInt(averageRating);
    let halfFilled = averageRating * 100 % 100;
    let unfilled = parseInt(5 - averageRating);

    return (
        <div className={`${starRate.rateInfo}`}>
            {
                Array.from({length: filled}).map((_, idx) => {
                    return (
                        <div key={`filledStar${idx}`} className={`${starRate.baseStar}`}>
                            <div className={`${starRate.filledStar}`}></div>
                        </div>
                    )
                })
            }
            {
                halfFilled > 0 ?
                    <div className={`${starRate.baseStar}`}>
                        <div className={`${starRate.halfStar}`} style={{width: `${halfFilled}%`, marginRight: `${100 - halfFilled}%`}}></div>
                    </div>
                :
                    null
            }
            {
                Array.from({length: unfilled}).map((_, idx) => {
                    return (
                        <div key={`unfilledStar${idx}`} className={`${starRate.baseStar}`} />
                    )
                })
            }
        </div>
    )
}

function setPercentage(rating){
    
    return Math.ceil(rating*20);
}

export default HobbyDetailPost;
