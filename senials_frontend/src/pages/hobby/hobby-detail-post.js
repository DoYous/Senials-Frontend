import React from 'react'
import "./hobby-detail-post.css"
function HobbyDetailPost(){
    return(
        <>
            <div className='hobby'>
                <img src='' className='hobby_img'></img>
                <div className='hobby_text'>
                    <div className='hobby_name'>축구</div>
                    <div className='hobby_detail'>공이란걸 발로 차는 운동</div>
                </div>
            </div>
            <div className='hobby_point'>
                <div className='hobby_ability'>성향<br></br>외향적</div>
                <div className='hobby_budget'>지출범위<br></br>100000</div>
                <div className='hobby_level'>난이도<br></br>최강</div>
            </div>
            <hr/>
            <div className='review_header'>
                <div className='review_count'>후기 99+</div>
                <div className='review_button'>
                    <button className='write_review'>후기작성</button>
                    <button className='sort_review'>정렬</button>
                </div>  
            </div>
            
            <div className='hobby_review'>
                <div className='hobby_review_detail'>
                <div className='user_info'>
                    <img src='' className='user_img'></img>
                    <div className='user_name'>홍길동</div>
                    <div className='review_point'>별점 * * * * *</div>
                    <button className='report_button'>신고</button>
                </div>
                    <div className='review_title'>축구 사랑해요!!</div>
                    <div className='review_detail'>아 축구 너무 재밌어요</div>
                    <img className='review_img'></img>
                    <button className='update_review_button'>수정</button>
                </div>
            </div>
            

        </>
    );
}

export default HobbyDetailPost