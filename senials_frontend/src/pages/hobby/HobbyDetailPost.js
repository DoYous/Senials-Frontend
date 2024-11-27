import React from 'react';
import styles from './HobbyDetailPost.module.css';
import common from '../common/common.module.css';
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";

function HobbyDetailPost() {
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
                    <button className={styles.writeReview}>후기작성</button>
                    <select className={styles.sortReview}>
                        <option value="newest">최신순</option>
                        <option value="highRate">높은별점순</option>
                        <option value="lowRate">낮은별점순</option>
                    </select>
                </div>  
            </div>         
            <HobbyReview />
            <HobbyReview />
        </div>

        </>
    );
}

function HobbyReview() {
    return (
        <div className={styles.hobbyReview}>
            <div className={styles.hobbyReviewDetail}>
                <div className={styles.userInfo}>
                    <img src='/img/sampleImg5.png' className={styles.userImg} alt="사용자" />
                    <div className={styles.userName}>홍길동</div>
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
                <button className={styles.updateReviewButton}>수정</button>
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
