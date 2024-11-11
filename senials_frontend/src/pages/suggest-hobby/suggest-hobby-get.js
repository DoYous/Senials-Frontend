import React from 'react'
import "./suggest-hobby-get.css"
function SuggestHobbyGet(){
    return(
        <>
        <header>
            {/*헤더*/}
        </header>
        <div className="suggestBox">
            <div className="title">
                당신만의 취미를 찾아보세요!
            </div>
            <form className="hobbyGet">
                <select className='hobby_ability'>
                    <option value="" disabled selected>신체적 특성</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <select className='hobby_budget'>
                    <option value="" disabled selected>사용 가능한 예산</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <select className='hobby_level'>
                    <option value="" disabled selected>난이도</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <select className='hobby_tendency'>
                    <option value="" disabled selected>성향</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <input type="submit" value="추천받기" className='submit'/>
            </form>
        </div>

        <footer>
            {/*푸터*/}
        </footer>
        </>
    );
}

export default SuggestHobbyGet