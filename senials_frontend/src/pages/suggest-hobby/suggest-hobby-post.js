import React from 'react'
import "./suggest-hobby-post.css"
function SuggestHobbyPost(){
    return(
        <>
        <header>
            {/*헤더*/}
        </header>
        <div className='title'>
            이런 취미 어떠세요?
        </div>
        <div className='hobby'>
            <div className='result_hobby'>
                <img src='' className='result_hobby_img'></img>
                <div className='result_hobby_name'>
                    추천 취미 낚시
                </div>
                <div className='result_hobby_detail'>
                    낚시는 물고기를 잡기 위해 낚싯대, 낚싯줄, 미끼 등을 사용하는 활동입니다. 오랜 역사를 가진 낚시는 과거에는 생계를 위한 수단이었으나,
                     오늘날에는 스포츠, 레저, 취미 활동으로도 널리 즐겨집니다.
                </div>
            </div>
            <div className='other_hobby'>
                <div className='other_hobby_detail'>
                    <img src='' className='other_hobby_img'></img>
                    <div className='other_hobby_name'>명상하기</div>
                </div>
            </div>
        </div>

        <div className='select_button'>
            <button>다시 추천 받기</button>
            <button>나의 취미로 등록</button>
            <button>동일한 취미 모임 찾기</button>

        </div>

        <footer>
            {/*푸터*/}
        </footer>
        
        </>
    );
}

export default SuggestHobbyPost


