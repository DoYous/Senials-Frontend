import React,{useEffect, useState} from 'react';
import styles1 from './Report.module.css';
import styles2 from '../common/Common.module.css'
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function SuggestionDetail(){

    const navigate=useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const suggestionNumber = queryParams.get('suggestionNumber');

    const[kind,setKind]=useState(0);
    const[title,setTitle]=useState('데이터 없음');
    const[detail,setDetail]=useState('데이터 없음');

    useEffect(() => {
        if (suggestionNumber) {
            axios.get(`/suggestion/${suggestionNumber}`)
                .then((response) => {
                    setKind(response.data.results.suggestionDTO.suggestionType);
                    setTitle(response.data.results.suggestionDTO.suggestionTitle);
                    setDetail(response.data.results.suggestionDTO.suggestionDetail);
                })
                .catch((error) => {
                    console.error("API 호출 실패:", error);
                });
        }
    }, [suggestionNumber]);

    // 이전 페이지로 돌아가기 이벤트
    const goBack = () => {
        navigate(-1);
    }

    //삭제 이벤트
    const deleteSuggetion = () => {
        try {
            axios.delete(`/suggestion/${suggestionNumber}`)
                .then(() => {
                    alert('해당 건의안은 삭제되었습니다.');
                    navigate(-1);
                })
        } catch (error) {
            alert("삭제 중 오류가 발생했습니다.");
        }
    }

    return(
        <div className={styles1.container}>
            
            <div className={`${styles2.firstFont} ${styles1.marginBottom40}`}><span className={styles2.pointColor}>건의</span>하기</div>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>분류</span>
                <select className={styles1.selectLine}  value={kind} disabled>
                    <option value={0}>취미 추가 요청</option>
                    <option value={1}>버그 제보</option>
                </select>
            </div>

            <br/>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>제목</span>
                <input className={styles1.inputLine} value={title} readOnly></input>
            </div>

            <div className={styles1.marginBottom20}>
                <div className={`${styles2.secondFont} ${styles1.marginBottom20}`}>내용</div>
                <textarea className={styles1.textArea} value={detail} readOnly></textarea>
            </div>

            <div className={`${styles1.floatRight}`}>
                <button className={styles1.cancleButton} onClick={deleteSuggetion}>삭제</button>
                <button className={styles1.submitButton} onClick={goBack}> 확인</button>
            </div>
        </div>
        
    )
}

export default SuggestionDetail;