import React from 'react';
import styles from "./HobbyReview.module.css";
import { useNavigate,useLocation } from 'react-router-dom';

function HobbyReviewGet() {

    const navigate=useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hobbyNumber = queryParams.get('hobbyNumber');

    //이전 페이지로 돌아가기 (취소) 이벤트
    const goBack=()=>{
        navigate(`/hobby-detail/${hobbyNumber}`);
    }

    // 후기 작성후 제출 페이지 이동 이벤트
    const linkSubmitReivew=()=>{
        navigate(`/hobby-detail/${hobbyNumber}`);
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
                        <input type="radio" id="abilityYes" name="hobbyAbility" value="1" />
                        <label htmlFor="abilityYes">예</label>
                        <input type="radio" id="abilityNo" name="hobbyAbility" value="0" />
                        <label htmlFor="abilityNo">아니요</label>
                    </div>
                    <div className={styles.selectHobbyTendency}>
                        <div className={styles.text}>당신의 성향은 어떤가요?</div>
                        <input type="radio" id="tendencyIn" name="hobbyTendency" value="0" />
                        <label htmlFor="tendencyIn">내향적</label>
                        <input type="radio" id="tendencyOut" name="hobbyTendency" value="1" />
                        <label htmlFor="tendencyOut">외향적</label>
                    </div>
                    <div className={styles.selectHobbyBudget}>
                        <div className={styles.text}>지출범위</div>
                        <input type="radio" id="budget1" name="hobbyBudget" value="0" />
                        <label htmlFor="budget1">0~100,000</label>
                        <input type="radio" id="budget2" name="hobbyBudget" value="1" />
                        <label htmlFor="budget2">100,000~400,000</label>
                        <input type="radio" id="budget3" name="hobbyBudget" value="2" />
                        <label htmlFor="budget3">400,000~1,000,000</label>
                        <input type="radio" id="budget4" name="hobbyBudget" value="3" />
                        <label htmlFor="budget4">1,000,000~</label>
                    </div>
                    <div className={styles.selectHobbyLevel}>
                        <div className={styles.text}>난이도</div>
                        <input type="radio" id="level1" name="hobbyLevel" value="0" />
                        <label htmlFor="level1">쉬움</label>
                        <input type="radio" id="level2" name="hobbyLevel" value="1" />
                        <label htmlFor="level2">좀 쉬움</label>
                        <input type="radio" id="level3" name="hobbyLevel" value="2" />
                        <label htmlFor="level3">평범</label>
                        <input type="radio" id="level4" name="hobbyLevel" value="3" />
                        <label htmlFor="level4">좀 어려움</label>
                        <input type="radio" id="level5" name="hobbyLevel" value="4" />
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
