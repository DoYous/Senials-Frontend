// CSS
import styles from './BoardOverview.module.css';

import { Button, Row, Col } from 'react-bootstrap';

function BoardOverview() {

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                {/* marinLeft css 개선 해야함 */}
                <span className={`${styles.firstFont}`}>
                    👑 <span className={styles.pointColor}>인기</span> TOP 3
                </span>
            </div>
            <Row className={styles.marginBottom2}>
                <Card />
                <Card />
                <Card />
            </Row>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont} me-auto`}>
                    전체 모임
                </span>
                <div className={styles.partySearch}>
                    <input className={styles.innerInput}/>
                    <img className={styles.searchIcon} src='/image/search.svg'/>
                </div>
                &nbsp;
                <button className={`${styles.commonBtn}`}>정렬</button>
            </div>
            <Row className={styles.marginBottom2}>
                <Card />
                <Card />
                <Card />
            </Row>
            <Row className={styles.marginBottom2}>
                <Card />
                <Card />
                <Card />
            </Row>
            <div className={styles.separator}>
                <button className={`${styles.commonBtn} ${styles.marginLeftAuto}`}>게시글 작성</button>
            </div>
            <div className={styles.flexCenter}>
                <button className={`${styles.commonBtn} ${styles.loadBtn}`}>더보기</button>
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

export default BoardOverview;