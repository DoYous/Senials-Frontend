import React from 'react';
import style from './SuggestHobbyGet.module.css';
import { useNavigate } from 'react-router-dom';

function SuggestHobbyGet() {
    const navigate=useNavigate();

    // 맞춤형 취미 추천 입력후 제출, 결과 페이지 이동 이벤트
    const linkSubmitHobby=()=>{
        navigate('/suggest-hobby-result');
    }


    return (
        <>
            <div className={style.background}></div>
            <div className={style.suggestBox}>
                <div className={style.title}>
                    당신만의 <span className={style.pink}>&nbsp;취미</span>를 찾아보세요!
                </div>
                <form className={style.hobbyGet}>
                    <select className={style.hobbyAbility}>
                        <option value="" disabled selected>
                            신체적 특성
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <select className={style.hobbyBudget}>
                        <option value="" disabled selected>
                            사용 가능한 예산
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <select className={style.hobbyLevel}>
                        <option value="" disabled selected>
                            난이도
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <select className={style.hobbyTendency}>
                        <option value="" disabled selected>
                            성향
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <input type="submit" value="추천받기" className={style.submit} onClick={()=>linkSubmitHobby()} />
                </form>
            </div>
        </>
    );
}

export default SuggestHobbyGet;
