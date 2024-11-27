import React from 'react';
import styles from "./HobbyReviewGet.module.css";
import { useNavigate } from 'react-router-dom';

function HobbyReviewGet() {

    const navigate=useNavigate();

    //이전 페이지로 돌아가기 (취소) 이벤트
    const goBack=()=>{
        navigate(-1);
    }

    const linkSubmitReivew=()=>{
        navigate('/hobby-detail');
    }

    return (
        <>    
            <div className={styles.background}></div>    
            <div className={styles.page}>
            <div className={styles.writeReview}>
                <div className={styles.title}>
                    <span style={{color: "#FF5391"}}>후기</span>를 적어주세요!
                </div>
                <div className={styles.writeDate}>
                    작성일자 <span style={{color: "#b3b3b3", fontWeight: "normal"}}>2024-10-07</span>
                </div>
                <div className={styles.reviewPoint}>
                    <div className={styles.text}>평점을 매겨주세요!</div>
                    <div className={styles.starPoint}><StarPoint /></div>
                </div>

                <form className={styles.writeReviewDetail}>
                    <div className={styles.text}>후기 내용</div>
                    <textarea 
                        className={styles.inputText} 
                        placeholder="후기를 적어주세요! 준비물, 마음가짐 등 자유롭게 기입해주세요!" 
                    />
                    <div className={styles.selectHobbyAbility}>
                        <div className={styles.text}>몸이 불편하신 곳이 있을까요?</div>
                        <input type="radio" id="abilityYes" name="hobbyAbility" value="y" />
                        <label htmlFor="abilityYes">예</label>
                        <input type="radio" id="abilityNo" name="hobbyAbility" value="n" />
                        <label htmlFor="abilityNo">아니요</label>
                    </div>
                    <div className={styles.selectHobbyTendency}>
                        <div className={styles.text}>당신의 성향은 어떤가요?</div>
                        <input type="radio" id="tendencyIn" name="hobbyTendency" value="in" />
                        <label htmlFor="tendencyIn">내향적</label>
                        <input type="radio" id="tendencyOut" name="hobbyTendency" value="out" />
                        <label htmlFor="tendencyOut">외향적</label>
                    </div>
                    <div className={styles.selectHobbyBudget}>
                        <div className={styles.text}>지출범위</div>
                        <input type="radio" id="budget" name="hobbyBudget" value="" />
                        <label htmlFor="budget">1~1000000000</label>
                    </div>
                    <div className={styles.selectHobbyLevel}>
                        <div className={styles.text}>난이도</div>
                        <input type="radio" id="level1" name="hobbyLevel" value="1" />
                        <label htmlFor="level1">쉬움</label>
                        <input type="radio" id="level2" name="hobbyLevel" value="2" />
                        <label htmlFor="level2">좀 쉬움</label>
                        <input type="radio" id="level3" name="hobbyLevel" value="3" />
                        <label htmlFor="level3">평범</label>
                        <input type="radio" id="level4" name="hobbyLevel" value="4" />
                        <label htmlFor="level4">좀 어려움</label>
                        <input type="radio" id="level5" name="hobbyLevel" value="5" />
                        <label htmlFor="level5">어려움</label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.cancleButton} onClick={()=>goBack()}>취소</button>
                        <input className={styles.submitButton} type="submit" value="제출" onClick={()=>linkSubmitReivew()} />
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

function StarPoint() {
    return (
        <span>
            <img className={styles.star} src="/img/starFull.png" alt="" />
            <img className={styles.star} src="/img/starFull.png" alt="" />
            <img className={styles.star} src="/img/starFull.png" alt="" />
            <img className={styles.star} src="/img/starFull.png" alt="" />
            <img className={styles.star} src="/img/starEmpty.png" alt="" />
        </span>
    );
}

export default HobbyReviewGet;
