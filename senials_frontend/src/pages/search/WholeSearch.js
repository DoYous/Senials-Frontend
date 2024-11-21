// CSS
import styles from './WholeSearch.module.css';

function WholeSearch() {

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    '<span className={styles.pointColor}>검색어</span>'의 검색 결과
                </span>
            </div>

            {/* 모임 검색결과 출력 영역 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    모임 게시판
                </span>
            </div>
            <hr />
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className={styles.flexCenter}>
                <button className={`${styles.commonBtn} ${styles.loadBtn}`}>더보기</button>
            </div>

            {/* 취미 검색결과 출력 영역 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    취미 게시판
                </span>
            </div>
            <hr />
            {/* <Row className={styles.marginBottom2}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Row>
            <div className={styles.flexCenter}>
                <button className={`${styles.commonBtn} ${styles.loadBtn}`}>더보기</button>
            </div> */}
            <div className={styles.flexCenter}>
                <span className={`${styles.noSearchResult} ${styles.firstFont}`}>검색결과가 존재하지 않습니다.</span>
            </div>
        </div>
    )
}

function Card() {
  return (
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
  )
}

export default WholeSearch;
