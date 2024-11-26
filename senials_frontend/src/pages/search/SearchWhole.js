// CSS
import styles from '../common/MainVer1.module.css';

function SearchWhole() {

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    '<span className={styles.pointColor}>검색어</span>'&nbsp;의 검색 결과
                </span>
            </div>

            {/* 모임 검색결과 출력 영역 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    모임 게시판
                </span>
            </div>
            <hr />
            <div className={`${styles.separatorContent}`}>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className={styles.flexCenter}>
                <span className={`${styles.commonBtn}`}>더보기</span>
            </div>

            {/* 취미 검색결과 출력 영역 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    취미 게시판
                </span>
            </div>
            <hr />

            <div className={styles.flexCenter}>
                <span className={`${styles.noSearchResult} ${styles.firstFont}`}>검색결과가 존재하지 않습니다.</span>
            </div>
        </div>
    )
}

function Rate() {
    return (
        <div className={`${styles.rateInfo}`}>
            <div className={`${styles.baseStar}`}>
                <div className={`${styles.filledStar}`}></div>
            </div>
            <div className={`${styles.baseStar}`}>
                <div className={`${styles.filledStar}`}></div>
            </div>
            <div className={`${styles.baseStar}`}>
                <div className={`${styles.filledStar}`}></div>
            </div>
            <div className={`${styles.baseStar}`}>
                <div className={`${styles.filledStar}`}></div>
            </div>
            <div className={`${styles.baseStar}`}>
                <div className={`${styles.halfStar}`} style={{width: '30%', marginRight: '70%'}}></div>
            </div>
        </div>
    )
}

function Card() {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.cardImage} style={{backgroundImage: 'url(/image/cat.jpg)'}}>
            <img className={styles.imgHeart} src='/image/unfilledHeart.svg'/>
        </div>
        <div className={`${styles.secondFont}`}>농구 같이 할 사람~</div>
        <div className={styles.rateInfo}>
            <Rate />
        </div>
        <div className={styles.memberInfo}>
            <img src='/image/people.svg' style={{width: '20px'}}/>&nbsp;
            <span className={`${styles.fourthFont}`}>10명</span>
            <span className={`${styles.openedParty} ${styles.thirdFont} ${styles.mlAuto}`}>모집중</span>
        </div>
    </div>
  )
}

export default SearchWhole;
