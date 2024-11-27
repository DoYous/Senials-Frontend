import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from '../common/MainVer1.module.css';

const testArray4 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}];
const testArray5 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}]
const testArray6 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}]


function SearchWhole() {

    const navigate = useNavigate();

    const [tarr, setTarr] = useState([...testArray6]);

    const testLoad = () => {
        setTarr(prev => [...prev, {number: 5}]);
    }

    const linkHobby = (hobbyNumber) => {
        navigate(`/hobby/${hobbyNumber}`);
    }

    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    }

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
                {
                    tarr.map((party, idx) => {
                        return (
                            <PartyCard key={`partyCard${idx}`} party={party} linkParty={linkParty}/>
                        )
                    })
                }
                {
                    <EmptyCards length={tarr.length} maxLength={4} />
                }
            </div>
            <div className={`${styles.flexCenter} ${styles.marginBottom}`}>
                <span className={`${styles.commonBtn}`} onClick={testLoad}>더보기</span>
            </div>

            {/* 취미 검색결과 출력 영역 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    취미 게시판
                </span>
            </div>
            <hr />
            <div className={`${styles.separatorContent}`}>
                {testArray4.map((hobby, idx) => {
                    return (
                        <HobbyCard key={`hobbyCard${idx}`} hobby={hobby} linkHobby={linkHobby}/>
                    )
                })}
            </div>
            <div className={`${styles.flexCenter} ${styles.marginBottom}`}>
                <span className={`${styles.commonBtn}`}>더보기</span>
            </div>

            {/* 검색결과 없음 안내 */}
            {/* <div className={styles.flexCenter}>
                <span className={`${styles.noSearchResult}`}>검색결과가 존재하지 않습니다.</span>
            </div> */}
        </div>
    )
}

// 일반 별점 컴포넌트
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

// 줄 맞춤용 빈 카드 생성 컴포넌트
function EmptyCards({length, maxLength}) {
    const arr = [];
    if(length % maxLength != 0) {
        const cnt = maxLength - (length % maxLength);
        for(let i = 0; i < cnt; i++) {
            arr.push(<div className={`${styles.emptyCardContainer}`} key={`emptyCard${i}`} />)
        }
    }
    return (
        <>
            { arr }
        </>
    )
}

// 모임 카드
function PartyCard({party, linkParty}) {
  return (
    <div className={styles.cardContainer} onClick={() => linkParty(party.number)}>
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

// 취미 카드
function HobbyCard({hobby, linkHobby}) {
    return (
      <div className={styles.cardContainer} onClick={() => linkHobby(hobby.number)}>
          <div className={styles.cardImage} style={{backgroundImage: 'url(/image/1.jpg)'}} />
          <div className={`${styles.secondFont} ${styles.flex}`}>
            아웃도어
            <span className={`${styles.separatorV}`}>
                &nbsp;|&nbsp;
            </span>
            등산
        </div>
      </div>
    )
}

export default SearchWhole;
