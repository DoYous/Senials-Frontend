import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setPopularParties } from '../../redux/partySlice';

// CSS
import styles from '../common/MainVer1.module.css';
import PopularPartyBoards from '../party/PartyBoardComponent/PopularPartyBoards';


function MainPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hobbies, setHobbies] = useState([]);
    const popularParties = useSelector(state => state.popularParties);

    useEffect(() => {
        if(hobbies.length == 0) {
            axios.get('hobby-board/top3?size=4&minReviewCnt=0')
            .then(response => {
                let results = response.data.results;
    
                let hobbyList = [];
                for(let i = 0; i < results.hobby.length || i < 4; i++) {
                    hobbyList.push(results.hobby[i]);
                }
    
                setHobbies(results.hobby);
            })
        }

        if(popularParties.length == 0) {
            axios.get('/partyboards/popular-parties?size=4')
            .then(result => {
                dispatch(setPopularParties(result.data.results.popularPartyBoards));
            });
        }

    }, []);

    return (
        <div className={styles.centerContainer}>

            {/* 모임 이미지 출력 영역 */}
            <MainCarousel navigate={navigate} />
            
            {/* 이달의 인기 취미 출력 영역 */}
            <div className={`${styles.separator}`}>
                <span className={`${styles.firstFont}`}>
                    ⭐이달의&nbsp;<span className={`${styles.pointColor}`}>인기</span>&nbsp;취미
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/hobby/board')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {
                    hobbies.map((hobby, idx) => {
                        return <HobbyCard key={`hobbyCard${idx}`} hobby={hobby} navigate={navigate}/>
                    })
                }
                {
                    hobbies.length % 4 != 0 ?
                    // 빈 카드 계산
                    Array.from({length: 4 - (hobbies.length % 4)}).map((_, i) => {
                        return <div key={i} className={`${styles.emptyCardContainer}`} />
                    })
                    :
                    null
                }
            </div>
            <hr />
            {/* 핫 매칭 게시글 출력 영역 */}
            <PopularPartyBoards printAllBtn={true} />
            {/* <div className={`${styles.separator}`}>
                <span className={`${styles.firstFont}`}>
                    <span className={`${styles.pointColor}`}>핫</span>&nbsp;매칭&nbsp;게시글
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {
                    popularParties.map((party, idx) => {
                        return <PartyCard key={idx} party={party} navigate={navigate} />
                    })
                }
                {
                    popularParties.length % 4 != 0 ?
                    // 빈 카드 계산
                    Array.from({length: 4 - (popularParties.length % 4)}).map((_, i) => {
                        return <div key={i} className={`${styles.emptyCardContainer}`} />
                    })
                    :
                    null
                }
            </div> */}
        </div>
    )
}

// 메인페이지 전용 캐러셀
function MainCarousel({navigate}) {

    const [categories, setCategories] = useState([]);
    
    const total = categories.length;
    const lastIndex = total - 1;

    // 반 만큼 우측 이동(가운데 정렬) csvContainer 반 만큼 좌측 이동
    const initPos = '50% - 605px';
    const [current, setCurrent] = useState(0);
    const [posx, setPosx] = useState('');

    const localImages = [
        { id: 1, src: "/img/1.png", alt: "이미지 1" },
        { id: 2, src: "/img/2.png", alt: "이미지 2" },
        { id: 3, src: "/img/3.png", alt: "이미지 3" },
        { id: 4, src: "/img/4.png", alt: "이미지 4" },
    ];
    useEffect(() => {
        // axios.get('/categories?asRandom=true')
        // .then(response => {
        //     let results = response.data.results;
        //     setCategories(results.categories);
        // })
        setCategories(localImages);
    }, [])


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
                    {categories.map((category, idx) => {
                        return <div className={`${styles.mcsItem}`} key={`mcsItem${idx}`} style={{ backgroundImage: `url(${category.src})`}} onClick={ () => {} } />
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


// 취미 카드
function HobbyCard({hobby, navigate}) {
    return (
      <div className={styles.cardContainer} onClick={() => navigate(`/hobby/${hobby.hobbyNumber}`)}>
          <div className={styles.cardImage} style={{backgroundImage: `url(/img/hobbyboard/${hobby.hobbyNumber})`}} />
          <div className={`${styles.secondFont} ${styles.flex}`}>
            {hobby.categoryName}
            <span className={`${styles.separatorV}`}>
                &nbsp;|&nbsp;
            </span>
            {hobby.hobbyName}
        </div>
      </div>
    )
}

export default MainPage;
