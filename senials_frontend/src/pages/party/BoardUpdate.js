// CSS
import styles from './BoardUpdate.module.css';

import { Button, Row, Col } from 'react-bootstrap';

function BoardUpdate() {

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                {/* marinLeft css 개선 해야함 */}
                <span className={`${styles.firstFont}`}>
                    <span className={styles.pointColor}>모임</span>을 수정해주세요!
                </span>
            </div>
            <Row className={`${styles.marginBottom2}`}>
                <Col md={4}>
                    <div className={styles.partyImageContainer}>
                        <img className={styles.partyImage} src='/image/cat.jpg'/>
                    </div>
                </Col>
                <Col md={8}>
                    <div className={`${styles.flex} ${styles.fullHeight}`}>
                        <div className={`${styles.flexColumn}`}>
                            <span className={`${styles.secondFont} ${styles.marginTopAuto}`}>모임명</span>
                            <input className={`${styles.formInput} ${styles.marginBottom}`} placeholder='모임 제목을 정해주세요!'/>
                            <Row>
                                <Col md={6}>
                                    <span className={styles.secondFont}>카테고리</span>
                                    <select className={`${styles.formInput} ${styles.fullWidth} ${styles.marginBottom}`}>
                                    </select>
                                </Col>
                                <Col md={6}>
                                    <span className={styles.secondFont}>취미명</span>
                                    <select className={`${styles.formInput} ${styles.fullWidth} ${styles.marginBottom}`}>
                                    </select>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <span className={`${styles.secondFont}`}>
                모임 소개
            </span>
            <textarea className={`${styles.formTextarea}`} placeholder='모임을 소개해주세요! 준비물, 마음가짐 등 자유롭게 기입해주세요!'></textarea>
            <div className={`${styles.marginBottom}`}>
                <span className={`${styles.secondFont}`}>모집 상태</span>
                <select className={`${styles.marginLeft} ${styles.formInput} fw-bold ps-2`} style={{width: '200px', color: '#569AFF'}}>
                    <option className='fw-bold' style={{color: '#569AFF'}}>모집중</option>
                    <option className='fw-bold' style={{color: '#000000'}}>모집완료</option>
                </select>
            </div>
            <div className={`${styles.flex}`}>
                <button className={`${styles.uniqueBtn}`}>삭제</button>
                <button className={`${styles.commonBtn} ${styles.marginLeftAuto}`}>취소</button>
                <button className={`${styles.importantBtn} ${styles.marginLeft}`}>제출</button>
            </div>
        </div>
    )
}

function Card() {
  return (
    <Col md={4}>
        <div className={styles.cardContainer}>
            <div className={styles.cardImage} style={{backgroundImage: 'url(/image/cat.jpg)'}}>
                <img className={styles.heart} src='/image/unfilledHeart.svg'/>
            </div>
            <div className={`${styles.secondFont}`}>농구 같이 할 사람~</div>
            <div className={styles.rateInfo}>
                <span className={styles.filledStar}>★★★</span>
                <span className={styles.unfilledStar}>☆☆</span>
            </div>
            <div className={styles.memberInfo}>
                <img src='/image/people.svg' style={{width: '20px'}}/>&nbsp;
                <span className={`${styles.memberCount} ${styles.fourthFont}`}>10명</span>
                <span className={`${styles.openedParty} ${styles.thirdFont}`}>모집중</span>
            </div>
        </div>
    </Col>
  )
}

function Category() {
    return (
        <Col md={3}>
            <div className={styles.ctgrContainer}>
                <div style={{backgroundImage: 'url(/image/cat.jpg)', 
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    border: '1px solid grey', width: '98%', height: '90px',
                    borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <span className={`${styles.ctgrText} ${styles.thirdFont}`}>카테고리</span>
                </div>
            </div>
        </Col>
    )
}

export default BoardUpdate;