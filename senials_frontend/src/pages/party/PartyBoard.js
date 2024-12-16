import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import createApiInstance from '../common/tokenApi.js';

// actions
import { setCategories } from '../../redux/categorySlice.js';

// CSS
import styles from '../common/MainVer1.module.css';
import PopularPartyBoards from './PartyBoardComponent/PopularPartyBoards.js';
import { setLastestParties, toggleLastestLike } from '../../redux/partySlice.js';


function PartyBoard() {

    const api = createApiInstance();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    
    useEffect(() => {
        
        api.get('/partyboards/search?size=4')
        .then(result => {
            let results = result.data.results;

            dispatch(setLastestParties(results.partyBoards));
        })

        axios.get('/categories')
        .then(result => {
            dispatch(setCategories(result.data.results.categories));
        })

    }, [dispatch])


    return (
        <div className={styles.centerContainer}>
            <PopularPartyBoards />
            <hr />
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    <span className={styles.pointColor}>최근</span> 오픈한 모임
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board-overview')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                <PartyCard navigate={navigate}/>
            </div>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
            <div className={`${styles.ctgrRow}`}>
                <Category navigate={navigate}/>
            </div>
        </div>
    )
}


function Rate({averageRating}) {

    let filled = parseInt(averageRating);
    let halfFilled = averageRating * 100 % 100;
    let unfilled = parseInt(5 - averageRating);

    return (
        <div className={`${styles.rateInfo}`}>
            {
                Array.from({length: filled}).map((_, idx) => {
                    return (
                        <div key={`filledStar${idx}`} className={`${styles.baseStar}`}>
                            <div className={`${styles.filledStar}`}></div>
                        </div>
                    )
                })
            }
            {
                halfFilled > 0 ?
                    <div className={`${styles.baseStar}`}>
                        <div className={`${styles.halfStar}`} style={{width: `${halfFilled}%`, marginRight: `${100 - halfFilled}%`}}></div>
                    </div>
                :
                    null
            }
            {
                Array.from({length: unfilled}).map((_, idx) => {
                    return (
                        <div key={`unfilledStar${idx}`} className={`${styles.baseStar}`} />
                    )
                })
            }
        </div>
    )
}


// 모임 카드
function PartyCard({ navigate }) {

    const api = createApiInstance();

    const dispatch = useDispatch();

    let parties = useSelector((state) => state.lastestParties);
    let length = parties.length;
    let maxLength = 4;


    const clickHeart = (e, partyBoardNumber) => {
        e.stopPropagation();

        api.put(`/likes/partyBoards/${partyBoardNumber}`)
        .then(result => {
            let results = result.data.results;

            if(results.code === 2) {
                alert('로그인이 필요합니다.');
            } else {
                let partyIdx = parties.findIndex((party) => {
                    return party.partyBoardNumber === partyBoardNumber;
                })
                dispatch(toggleLastestLike(partyIdx));
            }
        });


    }


    return (
        <>
        {
            parties.map((party, i) => {
                // let thumbnail = party.firstImage;
                let thumbnail = party.firstImage != null ? `url(/img/partyboard/${party.partyBoardNumber}/thumbnail/${party.firstImage})` : `url(/img/NoImage.svg)`
                
                return (
                    <div key={`partyCard${i}`} className={styles.cardContainer} onClick={() => navigate(`/party/${party.partyBoardNumber}`)}>
                        {
                            <div className={styles.cardImage} style={{backgroundImage: thumbnail}}>
                                {
                                    party.liked ? 
                                    <FaHeart className={styles.imgHeart} onClick={(e) => clickHeart(e, party.partyBoardNumber)} />
                                    :
                                    <FaRegHeart className={styles.imgHeart} onClick={(e) => clickHeart(e, party.partyBoardNumber)} />
                                }
                            </div>
                        }
                        <div className={`${styles.secondFont}`}>{party.partyBoardName}</div>
                        <div className={styles.rateInfo}>
                            <Rate averageRating={party.averageRating} />
                        </div>
                        <div className={styles.memberInfo}>
                            <img src='/image/people.svg' style={{width: '20px'}} alt='participants' />&nbsp;
                            <span className={`${styles.fourthFont}`}>{party.memberCount}</span>
                            {
                                party.partyBoardStatus == 0 ?
                                <span className={`${styles.openedParty} ${styles.thirdFont} ${styles.mlAuto}`}>모집중</span>
                                :
                                <span className={`${styles.closedParty} ${styles.thirdFont} ${styles.mlAuto}`}>모집완료</span>
                            }
                            
                        </div>
                    </div>
                )
            })
        }
        {
            length % maxLength != 0 ?
            // 빈 카드 계산
            Array.from({length: maxLength - (length % maxLength)}).map((_, i) => {
                return <div key={`emptyCard${i}`} className={`${styles.emptyCardContainer}`} />
            })
            :
            null
        }
        {
            length === 0 ?
            // 결과 없음 안내
            <div className={`${styles.flexCenter} ${styles.fullWidth}`}>
                <span className={`${styles.noSearchResult}`}>서비스 준비 중</span>
            </div>
            :
            null
        }
        </>
    )
}


// 카테고리 카드
function Category({ navigate }) {

    let categories = useSelector((state) => state.categories);
    let length = categories.length;
    let maxLength = 5;

    return (
        <>
        {
            categories.map((category, idx) => {
                

                return (
                    <div key={`categoryCard${idx}`} className={styles.ctgrContainer} onClick={() => {navigate(`/hobby/board?category=${category.categoryNumber}`)}}>
                        <div className={`${styles.ctgrImage}`} style={{backgroundImage: `url(/img/category/${category.categoryNumber})`}}>
                            <span className={`${styles.ctgrText} ${styles.thirdFont}`}>{category.categoryName}</span>
                        </div>
                    </div>
                )
            })
        }
        {
            length % maxLength != 0 ?
            Array.from({length: maxLength - (length % maxLength)}).map((_, i) => {
                return <div key={`emptyCtgr${i}`} className={`${styles.emptyCtgrContainer}`} />
            })
            :
            null
        }
        {
            length === 0 ?
            // 결과 없음 안내
            <div className={`${styles.flexCenter} ${styles.fullWidth}`}>
                <span className={`${styles.noSearchResult}`}>서비스 준비 중</span>
            </div>
            :
            null
        }
        </>
    )

}

export default PartyBoard;