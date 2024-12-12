import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from '../common/MainVer1.module.css';

const testArray4 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}];
const testArray5 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}]

function MainPage() {

    const navigate = useNavigate();

    const linkHobby = (hobbyNumber) => {
        navigate(`/hobby/${hobbyNumber}`);
    }

    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    }

    return (
        <div className={styles.centerContainer}>

            {/* 모임 이미지 출력 영역 */}
            <MainCarousel linkHobby={linkHobby} />

            {/* 이달의 인기 취미 출력 영역 */}
            <div className={`${styles.separator}`}>
                <span className={`${styles.firstFont}`}>
                    이달의&nbsp;<span className={`${styles.pointColor}`}>인기</span>&nbsp;취미
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/hobby/board')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {testArray4.map((hobby, idx) => {
                    return <HobbyCard key={`hobbyCard${idx}`} hobby={hobby} linkHobby={linkHobby}/>
                })}
            </div>
            
            {/* 핫 매칭 게시글 출력 영역 */}
            <div className={`${styles.separator}`}>
                <span className={`${styles.firstFont}`}>
                    <span className={`${styles.pointColor}`}>핫</span>&nbsp;매칭&nbsp;게시글
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {testArray4.map((party, idx) => {
                    return <PartyCard key={`partyCard${idx}`} party={party} linkParty={linkParty} />
                })}
            </div>
        </div>
    )
}

// 메인페이지 전용 캐러셀
function MainCarousel({linkHobby}) {
    
    const total = 5;
    // 이미지 총 개수 - 1
    const lastIndex = total - 1;

    // 반 만큼 우측 이동(가운데 정렬) csvContainer 반 만큼 좌측 이동
    const initPos = '50% - 605px';
    const [current, setCurrent] = useState(0);
    const [posx, setPosx] = useState('');

    useEffect(() => {
        if (current === 0) {
            setPosx(`calc(${initPos})`);
        } else if (current === lastIndex) {
            setPosx(`calc(${initPos} - 440px - ${550 * (current - 2)}px)`);
        } else {
            setPosx(`calc(${initPos} - 220px - ${550 * (current - 1)}px)`);
        } 
    }, [current])
    

    const prev = () => {
        if (current == 0) {
            setCurrent(lastIndex);
        } else {
            setCurrent(current - 1);
        }
    }

    
    const next = () => {
        if (current == lastIndex) {
            setCurrent(0);
        } else {
            setCurrent(current + 1);
        }
    }

    return (
        <div className={`${styles.flex} ${styles.marginBottom2}`} style={{width: '100%', height: '300px'}}>
            <div className={`${styles.mcsPrev}`} onClick={() => prev()} />

            {/* width = 1210px = 1280-(버튼 * 2) */}
            <div className={`${styles.mcsContainer}`} style={{width: '100%'}}>
                <div className={`${styles.mcsInner}`} style={{width: `calc(${550 * total})px`, transform: `translateX(${posx})`}}>
                    {testArray5.map((hobby, idx) => {
                        return <div className={`${styles.mcsItem}`} key={`mcsItem${idx}`} style={{backgroundImage: 'url(/image/3.jpg)'}} onClick={ () => linkHobby(hobby.number) } />
                    })}
                </div>
            </div>

            <div className={`${styles.mcsNext}`} onClick={() => next()} />
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

export default MainPage;
