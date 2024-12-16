import React,{useEffect, useState} from 'react';
import styles1 from './Report.module.css';
import styles2 from '../common/Common.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Suggestion(){

    const navigate=useNavigate();

    const[kind,setKind]=useState(0);
    const[title,setTitle]=useState('');
    const[detail,setDetail]=useState('');

    // 이전 페이지로 돌아가기 이벤트
    const goBack = () => {
        navigate(-1);
    }
    
    // rest api 호출,제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // JSON 데이터 생성
        const suggestionData={
            suggestionTitle:title,
            suggestionType:kind,
            suggestionDetail:detail,
        }
        try {
            const token = localStorage.getItem("token");
            console.log(suggestionData);

            await axios.post(`/suggestion`, suggestionData, {
                headers: {
                    'Authorization': token // JWT 토큰을 Authorization 헤더에 추가
                }
            });
            alert('건의 요청이 완료되었습니다.');
            goBack();  
        } catch (error) {
            alert('건의 요청이 완료되지 않았습니다.');
            console.error(error); // 오류 처리
        }
    };

    return(
        <div className={styles1.container}>
            
            <div className={`${styles2.firstFont} ${styles1.marginBottom40}`}><span className={styles2.pointColor}>건의</span>하기</div>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>분류</span>
                <select className={styles1.selectLine} onChange={(e) => setKind(Number(e.target.value))}>
                    <option value="" disabled selected>건의 분류 선택</option>
                    <option value={0}>취미 추가 요청</option>
                    <option value={1}>버그 제보</option>
                </select>
            </div>

            <br/>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>제목</span>
                <input className={styles1.inputLine} placeholder='건의 제목을 입력해 주세요!' onChange={(e) => setTitle(e.target.value)}></input>
            </div>

            <div className={styles1.marginBottom20}>
                <div className={`${styles2.secondFont} ${styles1.marginBottom20}`}>내용</div>
                <textarea className={styles1.textArea} placeholder='건의 내용을 입력해주세요!'onChange={(e) => setDetail(e.target.value)}></textarea>
            </div>

            <div className={`${styles1.floatRight}`}>
                <button className={styles1.cancleButton} onClick={goBack}>취소</button>
                <button className={styles1.submitButton} onClick={handleSubmit}>제출</button>
            </div>
        </div>
        
    )
}

export default Suggestion;