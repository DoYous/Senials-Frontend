import React from 'react';
import styles from './SuggestHobbyResult.module.css';
import { useNavigate } from 'react-router-dom';

function SuggestHobbyPost() {

    const navigate=useNavigate();

    //이전 페이지로 돌아가기 (취소) 이벤트
    const goBack=()=>{
        navigate(-1);
    }

    // 마이페이지 이동 이벤트
    const linkMyPage=()=>{
        navigate('/mypage/calender');
    }

    //모임 목록 이동 이벤트
    const linkMyParty=()=>{
        navigate('/party/board');
    }

    return (
        <>
            <div className={styles.page}>
            <div className={styles.title}>
                이런 <span style={{color:'#FF5391'}}>취미</span> 어떠세요?
            </div>

            <div className={styles.hobby}>
                <div className={styles.resultHobby}>
                    <img src="/img/sampleImg.png" className={styles.resultHobbyImg} alt="추천 취미" />
                    <div className={styles.resultHobbyName}>
                        <span className={styles.label}>추천 취미:</span> 낚시
                    </div>
                    <div className={styles.resultHobbyDetail}>
                        낚시는 물고기를 잡기 위해 낚싯대, 낚싯줄, 미끼 등을 사용하는 활동입니다. 오랜 역사를 가진 낚시는 과거에는 생계를 위한 수단이었으나,
                        오늘날에는 스포츠, 레저, 취미 활동으로도 널리 즐겨집니다.
                    </div>
                </div>

                <div className={styles.otherHobby}>
                    <div className={styles.subtitle}>비슷한 취미들</div>         
                        <div className={styles.otherHobbyDetail}>
                            <img src="/img/sampleImg2.png" className={styles.otherHobbyImg} alt="다른 취미" />
                            <div className={styles.otherHobbyName}>명상하기</div>
                            <img src="/img/sampleImg2.png" className={styles.otherHobbyImg} alt="다른 취미" />
                            <div className={styles.otherHobbyName}>명상하기</div>
                            <img src="/img/sampleImg2.png" className={styles.otherHobbyImg} alt="다른 취미" />
                            <div className={styles.otherHobbyName}>명상하기</div>
                        </div>
                </div>
            </div>

            <div className={styles.selectButton}>
                <button onClick={()=>goBack()}>다시 추천 받기</button>
                <button onClick={()=>linkMyPage()}>나의 취미로 등록</button>
                <button onClick={()=>linkMyParty()}>동일한 취미 모임 찾기</button>
            </div>
            </div>
    
        </>
    );
}



export default SuggestHobbyPost;
