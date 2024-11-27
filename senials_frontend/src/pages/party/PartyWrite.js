// CSS
import common from '../common/MainVer1.module.css';
import styles from './PartyForm.module.css';

function PartyWrite() {

    return (
        <div className={styles.formCenterContainer}>
            <div className={`${styles.formInner}`}>
                <div className={common.separator}>
                    <span className={`${common.firstFont}`}>
                        <span className={common.pointColor}>모임</span>을 만들어주세요!
                    </span>
                </div>
                <div className={`${common.separator} ${common.marginBottom2}`}>
                    <div className={styles.partyFormImageContainer}>
                        <img className={styles.partyFormImage} src='/image/cat.jpg'/>
                    </div>
                    
                    <div className={`${styles.partyFormInfoContainer}`}>
                        <span className={`${common.secondFont} ${common.mtAuto}`}>모임명</span>
                        <div className={`${styles.inputContainer} ${common.marginBottom}`}>
                            <input className={`${styles.inputInner}`} placeholder='모임 제목을 정해주세요!'/>
                        </div>

                        <span className={`${common.secondFont}`}>카테고리</span>
                        <select className={`${styles.inputContainer} ${common.marginBottom}`}>
                        </select>

                        <span className={common.secondFont}>취미명</span>
                        <select className={`${styles.inputContainer}`}>
                        </select>
                    </div>
                </div>

                <div className={`${common.separator}`}>
                    <span className={`${common.secondFont}`}>
                        모임 소개
                    </span>
                </div>
                <div className={`${common.separator}`}>
                    <textarea className={`${styles.partyFormText}`} placeholder='모임을 소개해주세요! 준비물, 마음가짐 등 자유롭게 기입해주세요!'></textarea>
                </div>
                <div className={`${common.separator}`}>
                    <span className={`${common.commonBtn} ${common.mlAuto}`}>취소</span>
                    <span className={`${common.importantBtn} ${common.marginLeft}`}>제출</span>
                </div>
            </div>
        </div>
    )
}

export default PartyWrite;
