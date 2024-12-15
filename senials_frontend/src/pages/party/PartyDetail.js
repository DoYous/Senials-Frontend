import { FaBell, FaHeart, FaRegHeart, FaRegClock, FaWonSign } from "react-icons/fa";
import { FaLocationDot  } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import createApiInstance from "../common/tokenApi";

import { setMember, setPartyBoardDetail, toggleDetailLike, 
    setMeets, increaseMeetPageNumber, setHasMoreMeets, toggleMeetJoined, 
    setReviews, setHasMoreReviews, setReviewCnt, setAvgReviewRate, increaseReviewPageNumber, 
    setRecommParties, toggleRecommLike,
    addReviews,
    addMeets,
    partyBoardDetail} from "../../redux/partySlice";

// CSS
import styles from '../common/MainVer1.module.css';
import { jwtDecode } from "jwt-decode";

function PartyDetail() {

    const api = createApiInstance();

    const { partyNumber } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const tokenUserNumber = useRef(0);


    const {partyBoard, partyMaster} = useSelector(state => ({
        partyBoard: state.partyBoardDetail
        , partyMaster: state.partyBoardDetail.partyMaster
    }))

    const {meets, hasMoreMeets, meetPageNumber} = useSelector(state => ({
        meets: state.partyBoardDetailMeets.meets
        , hasMoreMeets: state.partyBoardDetailMeets.hasMoreMeets
        , meetPageNumber: state.partyBoardDetailMeets.meetPageNumber
    }))

    const { reviews, hasMoreReviews, avgReviewRate, reviewCnt, reviewPageNumber } = useSelector(state => ({
        reviews: state.partyBoardDetailReviews.reviews
        , hasMoreReviews: state.partyBoardDetailReviews.hasMoreReviews
        , reviewPageNumber: state.partyBoardDetailReviews.reviewPageNumber
        , avgReviewRate: state.partyBoardDetailReviews.avgReviewRate
        , reviewCnt: state.partyBoardDetailReviews.reviewCnt
    }))


    const recommParties = useSelector(state => state.recommParties);


    useEffect(() => { 

        const token = localStorage.getItem('token');
        if(token != null) {
            const decodedToken = jwtDecode(token);
            tokenUserNumber.current = decodedToken.userNumber;
        }

        const fetchData = async () => { 
            try { 
                const response1 = await api.get(`/partyboards/${partyNumber}`); 
                const results1 = response1.data.results; 
                let partyBoardDetail = results1.partyBoard; 
                partyBoardDetail.partyMaster = results1.partyMaster; 
                partyBoardDetail.myReview = results1.myReview; 
                partyBoardDetail.isLiked = results1.isLiked; 
                partyBoardDetail.isMember = results1.isMember; 
                partyBoardDetail.isMaster = results1.isMaster; 
                partyBoardDetail.randMembers = results1.randMembers; 
                dispatch(setPartyBoardDetail(results1.partyBoard)); 

                const response2 = await api.get(`/partyboards/${partyNumber}/meets`); 
                const results2 = response2.data.results; 
                dispatch(setMeets(results2.meets)); 
                dispatch(setHasMoreMeets(results2.hasMore)); 

                const response3 = await api.get(`/partyboards/${partyNumber}/partyreviews`); 
                const results3 = response3.data.results; 
                dispatch(setHasMoreReviews(results3.hasMoreReviews)); 
                dispatch(setReviews(results3.partyReviews)); 
                dispatch(setAvgReviewRate(results3.partyAvgReviewRate)); 
                dispatch(setReviewCnt(results3.partyReviewCnt)); 

                const response4 = await api.get(`/partyboards/recommended-parties?&partyBoardNumber=${partyNumber}`); 
                const results4 = response4.data.results; 
                dispatch(setRecommParties(results4.recommendedPartyBoards)); 

            } catch (error) { 
                console.error('Error fetching data:', error); 
            } 
        }; 
        
        fetchData(); 
    
    }, [dispatch, partyNumber]);



    const clickLike = () => {

        api.put(`/likes/partyBoards/${partyNumber}`)
        .then(result => {
            let results = result.data.results;

            if(results.code === 2) {
                alert('로그인이 필요합니다.');
            } else {
                dispatch(toggleDetailLike());
            }
        });

    }


    const joinParty = () => {

        api.post(`/partyboards/${partyNumber}/partymembers`)
        .then(result => {
            let results = result.data.results;

            if(results.code === 1){
                dispatch(setMember(true));
            } else if(results.code === 2) {
                alert('로그인이 필요합니다.');
            } else {
                alert(result.message);
            }
        })
        .catch(err => {
            alert('로그인이 필요합니다.');
        })

    }

    const quitParty = () => {

        api.delete(`/partyboards/${partyNumber}/partymembers`)
        .then(result => {

            dispatch(setMember(false));

        })
        .catch(err => {
            alert('모임 탈퇴 실패');
        })
    }


    const loadMoreMeets = () => {

        axios.get(`/partyboards/${partyNumber}/meets?pageNumber=${meetPageNumber + 1}`)
        .then(response => {
            let results = response.data.results;

            dispatch(addMeets(results.meets));
            dispatch(setHasMoreMeets(results.hasMore));
            dispatch(increaseMeetPageNumber());
        })
    }


    const loadMoreReviews = () => {

        axios.get(`/partyboards/${partyNumber}/partyreviews?pageNumber=${reviewPageNumber + 1}`)
        .then(response => {
            let results = response.data.results;

            dispatch(addReviews(results.partyReviews));
            dispatch(setHasMoreReviews(results.hasMoreReviews));
            dispatch(setReviewCnt(results.partyReviewCnt));
            dispatch(setAvgReviewRate(results.partyAvgReviewRate));
            dispatch(increaseReviewPageNumber());
        })
    }


    return (
        <div className={styles.centerContainer}>

            {/* 모임 이미지 출력 영역 */}
            <Carousel />

            {/* 모임 제목, 간단소개 출력 영역 */}
            <div className={`${styles.separator}`}>
                {/* 카테고리 */}
                <span className={`${styles.whiteIndicator}`}>{partyBoard.categoryName}</span>
                &nbsp;
                {
                    !partyBoard.isMaster ?
                        <>
                        <span className={`${styles.whiteBtn} ${styles.thirdFont}`} onClick={clickLike}>
                        {
                            partyBoard.isLiked ? 
                            <FaHeart style={{color: 'red'}}/>
                            :
                            <FaRegHeart style={{color: 'red'}}/>
                        }
                        &nbsp;&nbsp;좋아요
                        </span>
                        <span className={`${styles.whiteBtn} ${styles.thirdFont} ${styles.mlAuto}`} style={{color: 'red'}} onClick={() => navigate(`/report?type=1&target=${partyNumber}`)}>
                            <FaBell />
                            &nbsp;&nbsp;신고
                        </span>
                        </>
                    :
                        null
                }
            </div>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    {partyBoard.partyBoardName}
                </span>
            </div>
            <div className={styles.separator}>
                <div className={`${styles.secondFont}`} style={{fontWeight: 'normal', whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
                    {partyBoard.partyBoardDetail}
                </div>
            </div>
            <div className={`${styles.flex}`}>
                {/* 멤버 수, 모집상태 표시 */}
                <div className={`${styles.memberInfo} ${styles.mlAuto}`}>
                    <img style={{width: '20px'}} src='/image/people.svg' />
                    &nbsp;
                    <span className={`${styles.secondFont}`}>
                        {partyBoard.partyMemberCnt}
                    </span>
                    &nbsp;
                    {
                        partyBoard.partyBoardStatus === 0 ?
                        <span className={`${styles.openedParty} ${styles.thirdFont}`}>모집중</span>
                        :
                        <span className={`${styles.closedParty} ${styles.thirdFont}`}>모집완료</span>
                    }
                    &nbsp;
                    {
                        partyBoard.isMaster ?
                        <span className={`${styles.commonBtn}`} onClick={() => navigate(`/party/${partyNumber}/update`)}>수정</span>
                        :
                            partyBoard.isMember ?
                            <span className={`${styles.importantBtn}`} onClick={quitParty}>나가기</span>
                            :
                            <span className={`${styles.commonBtn}`} onClick={joinParty}>신청</span>
                    }
                    {/* <span className={`${styles.commonBtn} `}>신청</span> */}
                </div>                 
            </div>
            <hr />

            {/* 모임장 및 모임멤버 간단정보 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont}`}>
                    모임장
                </span>
            </div>
            <Member navigate={navigate} member={partyMaster}/>
            <hr />

            {/* 일정 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont}`}>
                    일정
                </span>
                {
                    partyBoard.isMaster ?
                    <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate(`meets`)}>
                        일정 추가
                    </span>
                    :
                    null
                }
            </div>
            {
                meets.length != 0 ?
                meets.map((meet, idx) => {
                    return <Meet key={idx} meet={meet} idx={idx} isMaster={partyBoard.isMaster} navigate={navigate} />
                })
                :
                <div className={`${styles.flexCenter} ${styles.fullWidth} ${styles.marginBottom2}`}>
                    <span className={`${styles.noSearchResult}`}>진행중인 일정이 없습니다.</span>
                </div>
            }
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                {
                    hasMoreMeets ?
                        <span className={`${styles.commonBtn}`} onClick={loadMoreMeets}>더보기</span>
                    :
                    null
                }
            </div>
            <hr />

            {/* 본인 후기 출력 영역 */}
            {
                partyBoard.myReview != null ?
                <>
                    <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                        <span className={`${styles.secondFont}`}>
                            내가 작성한 후기
                        </span>
                        {
                            partyBoard.isMember ?
                            <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate(`/party/${partyNumber}/partyreviews/${partyBoard.myReview.partyReviewNumber}`)}>수정</span>
                            :
                            null
                        }
                    </div>
                    <Review review={partyBoard.myReview} navigate={navigate} tokenUserNumber={tokenUserNumber} />
                    <hr />
                </>
                :
                null
            }

            {/* 후기 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont} ${styles.marginRight}`}>
                    후기&nbsp;&nbsp;{reviewCnt}
                </span>
                <DetailRateAverage avgReviewRate={avgReviewRate} />
                {
                    !partyBoard.isMaster && partyBoard.isMember && partyBoard.myReview == null ?
                    <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate('partyreviews')}>후기 작성</span>
                    :
                    null
                }
            </div>
            {
                reviews.length != 0 ?
                    reviews.map((review, idx) => {
                        return (
                            <Review key={idx} review={review} navigate={navigate} tokenUserNumber={tokenUserNumber} />
                        )
                    })
                    :
                    <div className={`${styles.flexCenter} ${styles.fullWidth} ${styles.marginBottom2}`}>
                        <span className={`${styles.noSearchResult}`}>아직 작성된 후기가 없습니다.</span>
                    </div>
            }
            {
                <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                    {
                        hasMoreReviews ?
                        <span className={`${styles.commonBtn} ${styles.thirdFont}`} onClick={loadMoreReviews}>더보기</span>
                        :
                        null
                    }
                </div>
            }
            <hr />

            {/* 멤버 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont} ${styles.marginRight}`}>
                    멤버&nbsp;&nbsp;{partyBoard.partyMemberCnt}
                </span>
                {
                    partyBoard.isMember || partyBoard.isMaster ?
                    <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('members')}>전체보기</span>
                    :
                    null
                }
            </div>
            {
                partyBoard.randMembers.length != 0 ?
                partyBoard.randMembers.map((member, idx) => {
                    return (
                        <Member key={idx} member={member} navigate={navigate} />
                    )
                })
                :
                <div className={`${styles.flexCenter} ${styles.fullWidth} ${styles.marginBottom2}`}>
                    <span className={`${styles.noSearchResult} ${styles.marginBottom2}`}>아직 참여중인 멤버가 없습니다.</span>
                </div>
            }
            <hr />
            
            {/* 모임 추천 영역 */}
            {
                recommParties.length != 0 ?
                <>
                <div className={`${styles.separator}`}>
                    <span className={`${styles.firstFont}`}>
                        이런 <span className={`${styles.pointColor}`}>모임</span>도 추천해요!
                    </span>
                    <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board-overview')}>전체보기</span>
                </div>
                <div className={`${styles.separatorContent}`}>
                    {
                        recommParties.map((party, idx) => {
                            return <RecommendedPartyCard key={idx} party={party} idx={idx} navigate={navigate} />
                        })   
                    }
                    {
                        recommParties.length % 4 != 0 ?
                        // 빈 카드 계산
                        Array.from({length: 4 - (recommParties.length % 4)}).map((_, i) => {
                            return <div key={i} className={`${styles.emptyCardContainer}`} />
                        })
                        :
                        null
                    }
                </div>
                </>
                :
                null
            }
        </div>
    )
}

function Carousel() {

    const { partyNumber } = useParams();
    const images = useSelector(state => state.partyBoardDetail.images)
    
    // 이미지 총 개수 - 1
    const lastIndex = images.length - 1;
    const [current, setCurrent] = useState(0);
    

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
        <div className={`${styles.flexColumn} ${styles.fullWidth} ${styles.marginBottom2}`}>
            <div className={`${styles.flex} ${styles.fullWidth}`}>
                {
                    images.length > 1 ?
                    <div className={`${styles.csPrev}`} onClick={() => prev()} />
                    :
                    null
                }
                <div className={`${styles.csContainer}`} style={{margin: '0 auto 0 auto', width: '1000px', height: '500px'}}>
                    <div className={`${styles.csInner}`} style={{transform: `translateX(-${current * 1000}px)`}}>
                        {
                            images.map((image, idx) => 
                                <div key={idx} className={`${styles.csItem}`} style={{backgroundImage: `url(/img/partyboard/${partyNumber}/thumbnail/${image.partyBoardImg})`}} />
                            )
                        }
                    </div>
                </div>
                {
                    images.length > 1 ?
                    <div className={`${styles.csNext}`} onClick={() => next()} />
                    :
                    null
                }
            </div>
        </div>
    )
}

function Member({ navigate, member }) {

    return (
        <div className={`${styles.memberContainer}`}>
            <img className={`${styles.masterProfile}`} src={`/img/userProfile/${member.userNumber}`} onClick={() => navigate(`/user/${member.userNumber}/profile`)} />
            <div className={`${styles.memberContent}`}>
                <span className={`${styles.secondFont}`}>{member.userNickname}</span>
                <span className={`${styles.secondFont}`} style={{color: '#999999'}}>
                    {member.userDetail}
                </span>
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

function DetailRate({ reviewRate }) {

    let filled = parseInt(reviewRate);
    let halfFilled = reviewRate * 100 % 100;
    let unfilled = parseInt(5 - reviewRate);
    
    return (
        <div className={`${styles.detailRateInfo}`}>
            {
                Array.from({length: filled}).map((_, idx) => {
                    return (
                        <div key={idx} className={`${styles.detailSmallBaseStar}`}>
                            <div className={`${styles.detailFilledStar}`}></div>
                        </div>
                    )
                })
            }
            {
                halfFilled > 0 ?
                    <div className={`${styles.detailSmallBaseStar}`}>
                        <div className={`${styles.detailHalfStar}`} style={{width: `${halfFilled}%`, marginRight: `${100 - halfFilled}%`}}></div>
                    </div>
                :
                    null
            }
            {
                Array.from({length: unfilled}).map((_, idx) => {
                    return (
                        <div key={idx} className={`${styles.detailSmallBaseStar}`} />
                    )
                })
            }
        </div>
    )
}

function DetailRateAverage({ avgReviewRate }) {

    let filled = parseInt(avgReviewRate);
    let halfFilled = avgReviewRate * 100 % 100;
    let unfilled = parseInt(5 - avgReviewRate);
    
    return (
        <div className={`${styles.detailRateInfo}`}>
            {
                Array.from({length: filled}).map((_, idx) => {
                    return (
                        <div key={idx} className={`${styles.detailBaseStar}`}>
                            <div className={`${styles.detailFilledStar}`}></div>
                        </div>
                    )
                })
            }
            {
                halfFilled > 0 ?
                    <div className={`${styles.detailBaseStar}`}>
                        <div className={`${styles.detailHalfStar}`} style={{width: `${halfFilled}%`, marginRight: `${100 - halfFilled}%`}}></div>
                    </div>
                :
                    null
            }
            {
                Array.from({length: unfilled}).map((_, idx) => {
                    return (
                        <div key={idx} className={`${styles.detailBaseStar}`} />
                    )
                })
            }
            <span className={`${styles.detailRateText}`}>{avgReviewRate}</span>
        </div>
    )
}

function Review({review, navigate, tokenUserNumber}) {

    // 구조분해할당으로 깊은복사 안하면 오류남
    // 아니면 이런식으로 >> const user = review.user || {}; // user가 undefined일 경우 빈 객체로 대체 
    let reviewWriter = {...review.user}

    return (
        <div className={`${styles.reviewContainer}`}>
            <img className={`${styles.masterProfile}`} src={`/img/userProfile/${reviewWriter.userNumber}`} onClick={() => navigate(`/user/${reviewWriter.userNumber}/profile`)}/>
            <div className={`${styles.reviewContent}`}>
                <div className={`${styles.flex}`}>
                    <span className={`${styles.secondFont}`}>{reviewWriter.userNickname}</span>
                    <DetailRate reviewRate={review.partyReviewRate} />
                    {
                        tokenUserNumber.current != reviewWriter.userNumber ?
                        <span className={`${styles.whiteBtn} ${styles.thirdFont} ${styles.mlAuto}`} style={{color: 'red'}} onClick={() => {navigate(`/report?type=2&target=${review.partyReviewNumber}`)}}>
                            <FaBell />
                            &nbsp;&nbsp;신고
                        </span>
                        :
                        null
                    }
                </div>
                <span className={`${styles.secondFontNormal}`}>{review.partyReviewDetail}</span>
            </div>
        </div>
    )
}

function Meet({meet, idx, isMaster, navigate}) {

    const api = createApiInstance();    

    const dispatch = useDispatch();

    let tempPresent = new Date();
    let tempOpen = new Date(meet.meetStartDate)
    let presentDate = new Date(tempPresent.getFullYear(), tempPresent.getMonth(), tempPresent.getDate());
    let openDate = new Date(tempOpen.getFullYear(), tempOpen.getMonth(), tempOpen.getDate());


    let openDateArr = meet.meetStartDate.split('-');
    let startTime = meet.meetStartTime.substring(0, meet.meetStartTime.lastIndexOf(':'));
    let finishTime = meet.meetFinishTime.substring(0, meet.meetFinishTime.lastIndexOf(':'));

    const joinMeet = () => {
        api.post(`/meets/${meet.meetNumber}/meetmembers`)
            .then(response => {
                dispatch(toggleMeetJoined({"idx" : idx, "isJoined" : true}))
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    const quitMeet = () => {
        api.delete(`/meets/${meet.meetNumber}/meetmembers`)
            .then(() => {
                dispatch(toggleMeetJoined({"idx" : idx, "isJoined" : false}));
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }


    return (
        <div className={`${styles.meetContainer}`}>
            {/* 일정 날짜 출력영역 */}
            <div className={`${styles.meetDate}`}>
                <div className={`${styles.firstFontNormal}`}>{openDateArr[1]}월</div>
                <div className={`${styles.fwBold}`} style={{fontSize: '50px'}}>{openDateArr[2]}</div>
            </div>
            {/* 일정 세부정보 출력영역 */}
            <div className={`${styles.meetInfo}`}>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <FaLocationDot className={`${styles.reactIcon}`}/>
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFont}`}>
                        {meet.meetLocation}
                    </span>
                </div>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <FaRegClock className={`${styles.reactIcon}`}/>
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFont}`}>
                        {startTime} ~ {finishTime}
                    </span>
                </div>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <FaWonSign className={`${styles.reactIcon}`}/>
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFont}`}>
                        {meet.meetEntryFee}원
                    </span>
                </div>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <BsPeopleFill className={`${styles.reactIcon}`} />
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFontNormal}`}>
                        {meet.meetMemberCnt}
                    </span>
                    <span className={`${styles.thirdFont}`}>
                        &nbsp;/&nbsp;
                        {meet.meetMaxMember} 명
                    </span>
                </div>
            </div>
            {/* 일정 버튼 영역 */}
            <div className={`${styles.meetButtons}`}>
            {
                isMaster ?
                    <>
                    <span className={`${styles.importantBtn}`} onClick={() => navigate(`meets/${meet.meetNumber}`)}>수정</span>
                    <span className={`${styles.commonBtn}`} onClick={() => navigate(`meets/${meet.meetNumber}/members`)}>참여 멤버</span>
                    </>
                : 
                (
                    meet.joined ?
                    (
                        <>
                        <span className={`${styles.commonBtn}`} onClick={() => navigate(`meets/${meet.meetNumber}/members`)}>참여 멤버</span>
                        {
                            new Date(openDate.getFullYear(), openDate.getMonth(), openDate.getDate() - 2) > presentDate ? 
                            <span className={`${styles.importantBtn}`} onClick={quitMeet}>신청 취소</span>
                            :
                            <span className={`${styles.uniqueBtn}`} onClick={quitMeet}>신청 취소</span>
                        }
                        </>
                    ) 
                    : 
                    (
                        openDate > presentDate ? 
                        <span className={`${styles.commonBtn}`} onClick={joinMeet}>신청</span>
                        :
                        (
                            meet.joined ?
                                (
                                    <>
                                        <span className={`${styles.commonBtn}`} onClick={() => navigate(`meets/${meet.number}/members`)}>참여 멤버</span>
                                        {
                                            new Date(openDate.getFullYear(), openDate.getMonth(), openDate.getDate() - 2) > presentDate ?
                                                <span className={`${styles.importantBtn}`} onClick={quitMeet}>신청 취소</span>
                                                :
                                                <span className={`${styles.uniqueBtn}`} onClick={quitMeet}>신청 취소</span>
                                        }
                                    </>
                                )
                                :
                                (
                                    openDate > presentDate ?
                                        <span className={`${styles.commonBtn}`} onClick={joinMeet}>신청</span>
                                        :
                                        <span className={`${styles.uniqueBtn}`} onClick={joinMeet}>신청</span>
                                )
                        )
                    )
                )
            }
            </div>
        </div>
    )
}


function RecommendedPartyCard({ party, idx, navigate }) {

    const api = createApiInstance();

    const dispatch = useDispatch();


    const clickHeart = (e, partyBoardNumber) => {
        e.stopPropagation();

        api.put(`/likes/partyBoards/${partyBoardNumber}`)
        .then(result => {
            let results = result.data.results;

            if(results.code === 2) {
                alert('로그인이 필요합니다.');
            } else {
                dispatch(toggleRecommLike(idx));
            }
        })
    }


    // let thumbnail = party.firstImage;
    let thumbnail = party.firstImage != null ? `url(/img/partyboard/${party.partyBoardNumber}/thumbnail/${party.firstImage})` : `url(/img/NoImage.svg)`

    return (
        <div className={styles.cardContainer} onClick={() => navigate(`/party/${party.partyBoardNumber}`)}>
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
}

export default PartyDetail;
