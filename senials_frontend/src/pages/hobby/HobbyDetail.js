import React, {useEffect, useState} from 'react';
import styles from './HobbyDetail.module.css';
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
                <div className={styles.reviewCount}>{`후기 ${hobbyDetail.reviewCount}`}</div>
                <div className={styles.reviewButton}>
                    <button className={styles.writeReview} onClick={linkHobbyReview}>후기작성</button>
                    <select className={styles.sortReview}>
                        <option value="newest">최신순</option>
                        <option value="highRate">높은별점순</option>
                        <option value="lowRate">낮은별점순</option>
                    </select>
                </div>  
            </div>         
            {hobbyReviewList.map((item,index)=>{
                return <HobbyReview key={index} review={item} linkHobbyReviewModify={linkHobbyReviewModify}/>
            })}
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
                    <div className={styles.reviewPoint}>별점 
                        <StarPoint />
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
                <button className={styles.updateReviewButton} onClick={() => linkHobbyReviewModify(review.hobbyReviewNumber)}>수정</button>
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

function setPercentage(rating){
    
    return Math.ceil(rating*20);
}

export default HobbyDetailPost;
