import React from 'react';
import styles1 from './Report.module.css';
import styles2 from '../common/Common.module.css'

function ReportComponent(){
    return(
        <div className={styles1.container}>
            <div className={`${styles2.firstFont} ${styles1.marginBottom40}`}><span className={styles2.pointColor}>신고</span>하기</div>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>대상</span>
                <input className={styles1.inputLine} placeholder='[게시글/사용자] 게시글 명/ 사용자 명'></input>
            </div>
            
            <br/>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>분류</span>
                <select className={styles1.selectLine}>
                    <option value="" disabled selected>신고 분류 선택</option>
                    <option value={0}>사용자 신고</option>
                    <option value={1}>게시글 신고고</option>
                </select>
            </div>

            <div className={styles1.marginBottom20}>
                <div className={`${styles2.secondFont} ${styles1.marginBottom20}`}>내용</div>
                <textarea className={styles1.textArea} placeholder="경고! 허위 신고 시 재제 받을 수 있습니다. &#13;&#10;상세 사유를 작성해주세요!"></textarea>
            </div>

            <div className={`${styles1.floatRight}`}>
                <button className={styles1.cancleButton}>취소</button>
                <button className={styles1.submitButton}>제출</button>
            </div>
        </div>
    )
}

export default ReportComponent;