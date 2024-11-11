import React from 'react'
import "./hobby-board-post.css"
function HobbyBoardPost(){
    return(
        <>
         <div className='title'>인기 TOP3</div>
            <div className='top3_list'>
                <div className='top3'>
                    <img src='' className='top3_img'></img>
                    <div className='top3_name'>농구</div>
                </div>
                <div className='top3'>
                    <img src='' className='top3_img'></img>
                    <div className='top3_name'>축구</div>
                </div>
                <div className='top3'>
                    <img src='' className='top3_img'></img>
                    <div className='top3_name'>낚시</div>
                </div>
            </div>
            <hr/>
            <div className='hobby_list'>
                <img src='' className='hobby_img'></img>
                <div>
                    <div className='hobby_name'>농구</div>
                    <div className='hobby_detail'>농구는 손으로 하는 게임입니다. 어렵지 않아요~</div>
                </div>
                
            </div>

            <div className='hobby_list'>
                <img src='' className='hobby_img'></img>
                <div>
                    <div className='hobby_name'>축구</div>
                    <div className='hobby_detail'>축구는 발로 하는 게임입니다. 어렵지 않아요~</div>
                </div>
            </div>
        </>
    );
}

export default HobbyBoardPost
