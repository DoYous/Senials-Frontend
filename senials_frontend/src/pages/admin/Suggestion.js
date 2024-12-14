import React from 'react';
import styles1 from './Report.module.css';
import styles2 from '../common/Common.module.css'

function Suggestion(){
    return(
        <div className={styles1.container}>
            
            <div className={`${styles2.firstFont} ${styles1.marginBottom40}`}><span className={styles2.pointColor}>건의</span>하기</div>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>분류</span>
                <select className={styles1.selectLine}>
                    <option value="" disabled selected>건의 분류 선택</option>
                    <option value={0}>취미 추가 요청</option>
                    <option value={1}>버그 제보</option>
                </select>
            </div>

            <br/>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>제목</span>
                <input className={styles1.inputLine} placeholder='건의 제목을 입력해 주세요!'></input>
            </div>

            <div className={styles1.marginBottom20}>
                <div className={`${styles2.secondFont} ${styles1.marginBottom20}`}>내용</div>
                <textarea className={styles1.textArea} placeholder='건의 내용을 입력해주세요!'></textarea>
            </div>

            <div className={`${styles1.floatRight}`}>
                <button className={styles1.cancleButton}>취소</button>
                <button className={styles1.submitButton}>제출</button>
            </div>
        </div>
        
    )
}

export default Suggestion;