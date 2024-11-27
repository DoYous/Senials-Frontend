import React, {useState} from 'react';
import styles from './HobbyDetailPost.module.css';
import common from '../common/Common.module.css';
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function HobbyDetailPost() {

    const reviewList = [
        { review: { number: 1, name: "김상익", rate: 4 } },
        { review: { number: 2, name: "배민서", rate: 5 } },
        { review: { number: 3, name: "도영익", rate: 1 } }
      ];

    const navigate=useNavigate();

    //후기작성페이지 이동 이벤트
    const linkHobbyReview=()=>{
        navigate(`/hobby-review`);
    }

    //작성된 후기 수정 페이지 이동 이벤트
    const linkHobbyReviewModify=(reviewNumber)=>{
        navigate(`/hobby-review-modify${reviewNumber}`);
    }

    return (
        <>
        <div className={styles.background}>
           
        </div>
        <div className={styles.page}>
            <div className={styles.hobby}>
                <img src='/img/sampleImg4.png' className={styles.hobbyImg} alt="취미" />
                <div className={styles.hobbyText}>
                    <div className={styles.hobbyName}>축구</div>
                    <div className={styles.hobbyDetail}>공이란걸 발로 차는 운동</div>
                    <div className={styles.preference}>
                        <div>평균 선호도 : 80%</div>
                        <div className={styles.progressBarContainer}>
                            <div 
                                className={styles.progressBar} 
                                style={{ width: '80%' }} 
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.hobbyPoint}>
                <div className={styles.hobbyAbility}>성향<br />
                    <span style={{color:"#808080"}}>외향적</span>
                </div>
                <div className={styles.hobbyBudget}>지출범위<br />
                    <span style={{color:"#808080"}}>100000</span>
                </div>
                <div className={styles.hobbyLevel}>난이도<br />
                    <span style={{color:"#808080"}}>최강</span>
                </div>
            </div>
            <hr />
            <div className={styles.reviewHeader}>
                <div className={styles.reviewCount}>후기 99+</div>
                <div className={styles.reviewButton}>
                    <button className={styles.writeReview} onClick={linkHobbyReview}>후기작성</button>
                    <select className={styles.sortReview}>
                        <option value="newest">최신순</option>
                        <option value="highRate">높은별점순</option>
                        <option value="lowRate">낮은별점순</option>
                    </select>
                </div>  
            </div>         
            {reviewList.map((item,index)=>{
                return <HobbyReview key={index} review={item.review} linkHobbyReviewModify={linkHobbyReviewModify}/>
            })}
        </div>

        </>
    );
}

function HobbyReview({review,linkHobbyReviewModify}) {
    return (
        <div className={styles.hobbyReview} >
            <div className={styles.hobbyReviewDetail}>
                <div className={styles.userInfo}>
                    <img src='/img/sampleImg5.png' className={styles.userImg} alt="사용자" />
                    <div className={styles.userName}>{review.name}</div>
                    <div className={styles.reviewPoint}>별점 
                        <StarPoint />
                    </div>
                    <button className={`${styles.reportButton} ${common.reportDiv}`}>
                    <FaBell/>
                        신고
                    </button>
                </div>
                <div className={styles.reviewTitle}>축구 사랑해요!!</div>
                <div className={styles.reviewDetail}>아 축구 너무 재밌어요</div>
                <div className={styles.reviewImgContainer}>
                    <img src='/img/sampleImg4.png' className={styles.reviewImg} alt="후기" />
                    <img src='/img/sampleImg4.png' className={styles.reviewImg} alt="후기" />
                </div>
                <button className={styles.updateReviewButton} onClick={()=>linkHobbyReviewModify(review.number)}>수정</button>
            </div>
        </div>
    );
}

function StarPoint() {
    return (
        <span>
            <img className={styles.star} src='/img/starFull.png' alt='' />
            <img className={styles.star} src='/img/starFull.png' alt='' />
            <img className={styles.star} src='/img/starFull.png' alt='' />
            <img className={styles.star} src='/img/starFull.png' alt='' />
            <img className={styles.star} src='/img/starEmpty.png' alt='' />
        </span>
    );
}

export default HobbyDetailPost;
