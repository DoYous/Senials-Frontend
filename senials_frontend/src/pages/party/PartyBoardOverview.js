import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import axios from 'axios';
import createApiInstance from '../common/tokenApi';

// CSS
import styles from '../common/MainVer1.module.css';

// Components
import PopularPartyBoards from './PartyBoardComponent/PopularPartyBoards';

// actions
import { setRemain, setCursor, setSortMethod, setPartyKeyword, setWholeParties, addWholeParties, toggleLike } from '../../redux/partySlice';
import { jwtDecode } from 'jwt-decode';


const api = createApiInstance();
    

function PartyBoardOverview() {

    const [api, setApi] = useState();
    const [tokenUserNumber, setTokenUserNumber] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isRemain, cursor, sortMethod, partyKeyword, wholeParties } = useSelector((state) => state);
    
    
    useEffect(() => {

        const token = localStorage.getItem('token');
        if(token != null ) {
            setTokenUserNumber(jwtDecode(token).userNumber);
        } 


        setApi(createApiInstance);
        let api = createApiInstance();


        if(wholeParties.length === 0) {

            api.get('/partyboards/search')
            .then(result => {
                let results = result.data.results;
    
                dispatch(setRemain(results.isRemain));
                dispatch(setCursor(results.cursor));
                dispatch(setPartyKeyword(''));
                dispatch(setWholeParties(results.partyBoards));
            });

        }

    }, [dispatch])


    const loadMoreParties = () => {

        axios.get(`/partyboards/search?sortMethod=${sortMethod}&keyword=${partyKeyword}&cursor=${cursor}`)
        .then(result => {
            let results = result.data.results;

            dispatch(setRemain(results.isRemain));
            dispatch(setCursor(results.cursor))
            dispatch(addWholeParties(results.partyBoards));
        });

    }


    return (
        <div className={styles.centerContainer}>
            <PopularPartyBoards />
            <hr />
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    전체 모임
                </span>
                <PartySearchBar />
            </div>
            <div className={`${styles.separatorContent}`}>
                <PartyCard navigate={navigate} />
            </div>
            {
                tokenUserNumber != null &&
                <div className={styles.separator}>
                    <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate('/party')}>게시글 작성</span>
                </div>
            }
            {
                isRemain ? 
                <div className={styles.flexCenter}>
                    <span className={`${styles.commonBtn}`} onClick={loadMoreParties}>더보기</span>
                </div>
                :
                null
            }
        </div>
    )
}


// 모임 검색창
function PartySearchBar() {

    const dispatch = useDispatch();

    const { sortMethod, partyKeyword } = useSelector((state) => state);


    useEffect(() => {

    })


    /* 정렬 방식 번경 후 자동 검색*/
    const changeSortMethod = (e) => {

        dispatch(setPartyKeyword(''));
        dispatch(setCursor(null));
        dispatch(setSortMethod(e.target.value));

        api.get(`/partyboards/search?sortMethod=${e.target.value}`)
        .then(result => {
            let results = result.data.results;

            dispatch(setRemain(results.isRemain));
            dispatch(setCursor(results.cursor));
            dispatch(setWholeParties(results.partyBoards));
        })

    }

    /* partyKeyword 변경 */
    const changePartyKeyword = e => {
        dispatch(setPartyKeyword(e.target.value));
    }

    /* input 태그 onKeyDown 이벤트 - Enter 누르면면 submit */
    const submitEnter = (e) => {
        if (e.key == 'Enter') {
            submit();
        }
    }

    /* 검색 */
    const submit = () => {

        dispatch(setCursor(null));

        api.get(`/partyboards/search?sortMethod=${sortMethod}&keyword=${partyKeyword}`)
        .then(result => {
            let results = result.data.results;

            dispatch(setRemain(results.isRemain));
            dispatch(setCursor(results.cursor));
            dispatch(setWholeParties(results.partyBoards));
        });

    }


    return (
        <>
            <select value={sortMethod} className={styles.partySearchSort} onChange={changeSortMethod}>
                <option value={'lastest'}>최신순</option>
                <option value={'oldest'}>오래된순</option>
                <option value={'mostLiked'}>좋아요순</option>
                <option value={'mostViewed'}>조회수순</option>
            </select>
            &nbsp;
            <div className={styles.partySearch}>
                <input className={`${styles.partySearchInput}`} value={partyKeyword} onKeyDown={submitEnter} onChange={changePartyKeyword}/>
                <FaSearch className={`${styles.partySearchIcon}`} onClick={submit}/>
            </div>
        </>
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

    const dispatch = useDispatch();

    let parties = useSelector((state) => state.wholeParties);
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
                dispatch(toggleLike(partyIdx));
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
            // 검색결과 없음 안내
            <div className={`${styles.flexCenter} ${styles.fullWidth}`}>
                <span className={`${styles.noSearchResult}`}>검색결과가 존재하지 않습니다.</span>
            </div>
            :
            null
        }
        </>
    )
}

export default PartyBoardOverview;
