import React from 'react';
import style from './SuggestHobbyGet.module.css';

function SuggestHobbyGet() {
    return (
        <>
            <header>
                {/* 헤더 */}
            </header>
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

                    <input type="submit" value="추천받기" className={style.submit} />
                </form>
            </div>
            <footer>
                {/* 푸터 */}
            </footer>
        </>
    );
}

export default SuggestHobbyGet;
