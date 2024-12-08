import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// actions
import { setPopularParties } from '../../redux/partySlice.js';
import { setCategories } from '../../redux/categorySlice.js';

// CSS
import styles from '../common/MainVer1.module.css';
import PopularPartyBoards from './PartyBoardComponent/PopularPartyBoards.js';


function PartyBoard() {


    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    
    useEffect(() => {
        // axios.get('/partyboards/popular-parties?size=4')
        // .then(result => {
        //     dispatch(setPopularParties(result.data.results.popularPartyBoards));
        // });

        axios.get('/categories')
        .then(result => {
            dispatch(setCategories(result.data.results.categories));
        })
    }, [dispatch])


    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    }

    const linkCtgr = (ctgrNumber) => {
        navigate(`/hobby/board?category=${ctgrNumber}`)
    }


    return (
        <div className={styles.centerContainer}>
            <PopularPartyBoards />
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    <span className={styles.pointColor}>관심사</span> 기반 추천 모임
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board-overview')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                <PopularPartyCard linkParty={linkParty}/>
            </div>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
            <div className={`${styles.ctgrRow}`}>
                <Category linkCtgr={linkCtgr}/>
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


// 줄 맞춤용 빈 카드 생성 컴포넌트
function EmptyCards(length, maxLength) {

    const arr = [];
    // 마지막 한 줄에 있는 카드 개수 계산
    if(length % maxLength != 0) {
        // cnt = 마지막 한 줄에 들어가야 할 빈 카드 개수 계산
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
function PopularPartyCard({linkParty}) {

    let parties = useSelector((state) => state.popularParties);
    let length = parties.length;
    let maxLength = 4;

    return (
        <>
        {
            parties.map((party, i) => {
                let thumbnail = party.firstImage;
                
                return (
                    <div key={`partyCard${i}`} className={styles.cardContainer} onClick={() => linkParty(party.partyBoardNumber)}>
                        {
                            thumbnail != null ?
                                <div className={styles.cardImage} style={{backgroundImage: `url(/img/partyboard/${party.partyBoardNumber}/thumbnail/${thumbnail})`}}>
                                    <img className={styles.imgHeart} src='/image/unfilledHeart.svg' alt='empty_heart' />
                                </div>
                            :
                                <div className={styles.cardImage} >
                                    <img className={styles.imgHeart} src='/image/unfilledHeart.svg' alt='empty_heart' />
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
            // 빈 카드 계산
            Array.from({length: maxLength - (length % maxLength)}).map((_, i) => {
                return <div key={`emptyCard${i}`} className={`${styles.emptyCardContainer}`} />
            })
        }
        </>
    )
}


// 줄 맞춤용 빈 카테고리 생성 컴포넌트
function EmptyCtgrs({length, maxLength}) {
    const arr = [];
    if(length % maxLength != 0) {
        const cnt = maxLength - (length % maxLength);
        for(let i = 0; i < cnt; i++) {
            arr.push(<div key={`emptyCtgr${i}`} className={`${styles.emptyCtgrContainer}`} />)
        }
    }
    return (
        <>
            { arr }
        </>
    )
}


// 카테고리 카드
function Category({ctgr, linkCtgr}) {

    let categories = useSelector((state) => state.categories);
    let length = categories.length;
    let maxLength = 5;

    return (
        <>
        {
            categories.map((category, idx) => {
                

                return (
                    <div key={`categoryCard${idx}`} className={styles.ctgrContainer} onClick={() => {linkCtgr(category.categoryNumber)}}>
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
        </>
    )

}

export default PartyBoard;