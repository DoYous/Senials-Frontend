import React from 'react';
import styles from './hobby-detail-post.module.css';



function HobbyDetailPost() {
    return (
        <>
            <div className={styles.hobby}>
                <img src='/img/sampleImg4.png' className={styles.hobby_img} alt="취미" />
                <div className={styles.hobby_text}>
                    <div className={styles.hobby_name}>축구</div>
                    <div className={styles.hobby_detail}>공이란걸 발로 차는 운동</div>

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
                   <div className={styles.hobby_point}>
                <div className={styles.hobby_ability}>성향<br/>
                    <span style={{color:"#808080"}}>외향적</span></div>
                <div className={styles.hobby_budget}>지출범위<br />
                    <span style={{color:"#808080"}}>100000</span></div>
                <div className={styles.hobby_level}>난이도<br />
                    <span style={{color:"#808080"}}>최강</span></div>
            </div>
            <hr />
            <div className={styles.review_header}>
                <div className={styles.review_count}>후기 99+</div>
                <div className={styles.review_button}>
                    <button className={styles.write_review}>후기작성</button>
                    <button className={styles.sort_review}>정렬</button>
                </div>  
            </div>         
            <HobbyReview />
        </>
    );
}

function HobbyReview() {
    return (
        <div className={styles.hobby_review}>
            <div className={styles.hobby_review_detail}>
                <div className={styles.user_info}>
                    <img src='' className={styles.user_img} alt="사용자" />
                    <div className={styles.user_name}>홍길동</div>
                    <div className={styles.review_point}>별점 * * * * *</div>
                    <button className={styles.report_button}>신고</button>
                </div>
                <div className={styles.review_title}>축구 사랑해요!!</div>
                <div className={styles.review_detail}>아 축구 너무 재밌어요</div>
                <img className={styles.review_img} alt="후기" />
                <button className={styles.update_review_button}>수정</button>
            </div>
        </div>
    );
}

export default HobbyDetailPost;
