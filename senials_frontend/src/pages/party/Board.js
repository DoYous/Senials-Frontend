// CSS
import styles from './Board.module.css';

import { Button, Row, Col } from 'react-bootstrap';

function Board() {

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                {/* marinLeft css 개선 해야함 */}
                <span className={`${styles.firstFont}`}>
                    👑 <span className={styles.pointColor}>인기</span> TOP 3
                </span>
                <button className={`${styles.showAllBtn}`}>전체보기</button>
            </div>
            <Row>
                <Card />
                <Card />
                <Card />
            </Row>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    <span className={styles.pointColor}>관심사</span> 기반 추천 모임
                </span>
                <button className={`${styles.showAllBtn}`}>전체보기</button>
            </div>
            <Row>
                <Card />
                <Card />
                <Card />
            </Row>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
            <div>
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
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

export default Board;