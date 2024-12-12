import React,{useState} from 'react';
import style from './SuggestHobby.module.css';
import { useNavigate } from 'react-router-dom';

function SuggestHobbyGet() {
    const navigate=useNavigate();

    //맞춤형 취미를 위해 넘겨줄 데이터값 state
    const [hobbyAbility, setHobbyAbility] = useState("");
    const [hobbyBudget, setHobbyBudget] = useState("");
    const [hobbyLevel, setHobbyLevel] = useState("");
    const [hobbyTendency, setHobbyTendency] = useState("");

    // 맞춤형 취미 추천 입력후 제출, 결과 페이지 이동 이벤트, 쿼리스트링
    const linkSubmitHobby=(e)=>{
        e.preventDefault(); 
        navigate(`/suggest-hobby-result?hobbyAbility=${hobbyAbility}&hobbyBudget=${hobbyBudget}&hobbyLevel=${hobbyLevel}&hobbyTendency=${hobbyTendency}`);
    };

    return (
        <>
            <div className={style.background}></div>
            <div className={style.suggestBox}>
                <div className={style.title}>
                    당신만의 <span className={style.pink}>&nbsp;취미</span>를 찾아보세요!
                </div>
                <form className={style.hobbyGet} onSubmit={linkSubmitHobby}>
                    <select className={style.hobbyAbility} onChange={(e) => setHobbyAbility(e.target.value)} required>
                        <option value="" disabled selected>
                            신체적 특성
                        </option>
                        <option value={0}>비장애인</option>
                        <option value={1}>장애인</option>
                    </select>

                    <select className={style.hobbyBudget}  onChange={(e) => setHobbyBudget(e.target.value)} required>
                        <option value="" disabled selected>
                            사용 가능한 예산
                        </option>
                        <option value={0}>0~100,000</option>
                        <option value={1}>100,000~400,000</option>
                        <option value={2}>400,000~1,000,000</option>
                        <option value={3}>1,000,000~</option>
                    </select>

                    <select className={style.hobbyLevel}  onChange={(e) => setHobbyLevel(e.target.value)} required>
                        <option value="" disabled selected>
                            난이도
                        </option>
                        <option value={0}>쉬움</option>
                        <option value={1}>좀 쉬움</option>
                        <option value={2}>평범</option>
                        <option value={3}>좀 어려움</option>
                        <option value={4}>어려움</option>
                    </select>

                    <select className={style.hobbyTendency} onChange={(e) => setHobbyTendency(e.target.value)} required>
                        <option value="" disabled selected>
                            성향
                        </option>
                        <option value={0}>내향적</option>
                        <option value={1}>외향적</option>
                    </select>

                    <input type="submit" value="추천받기" className={style.submit}/>
                </form>
            </div>
        </>
    );
}

export default SuggestHobbyGet;
