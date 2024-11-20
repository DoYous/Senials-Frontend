import React from 'react'
import style from './suggest-hobby-get.module.css';
function SuggestHobbyGet(){
    return(
        <>
        <header>
            {/*헤더*/}
        </header>
        <div className={style.suggestBox}>
            <div className={style.title}>
                당신만의 <span className={style.pink}>취미</span>를 찾아보세요!
            </div>
            <form className={style.hobbyGet}>
                <select className={style.hobby_ability}>
                    <option value="" disabled selected>
                        신체적 특성
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <select className={style.hobby_budget}>
                    <option value="" disabled selected>
                        사용 가능한 예산
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <select className={style.hobby_level}>
                    <option value="" disabled selected>
                        난이도
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <select className={style.hobby_tendency}>
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
            {/*푸터*/}
        </footer>
    </>
    );
}

export default SuggestHobbyGet