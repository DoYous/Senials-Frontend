import { FaBell, FaHeart, FaRegHeart, FaRegClock, FaWonSign } from "react-icons/fa";
import { FaLocationDot  } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setPartyBoardDetail } from "../../redux/partySlice";

// CSS
import styles from '../common/MainVer1.module.css';

function PartyDetail() {

    const testArray3 = [{number: 1}, {number: 2}, {number: 3}];
    const testArray4 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}];


    const { partyNumber } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();


    // const {party, setParty} =  useState({});

    const partyBoard = useSelector(state => state.partyBoardDetail);
    const partyMaster = useSelector(state => state.partyBoardDetail.partyMaster);


    useEffect(() => {

        axios.get(`/partyboards/${partyNumber}`)
        .then(response => {
            let results = response.data.results;
            
            let partyBoardDetail = results.partyBoard;
            partyBoardDetail.partyMaster = results.partyMaster;
            
            dispatch(setPartyBoardDetail(results.partyBoard));
        })
    }, []);



    return (
        <div className={styles.centerContainer}>

            {/* 모임 이미지 출력 영역 */}
            <Carousel />

            {/* 모임 제목, 간단소개 출력 영역 */}
            <div className={`${styles.separator}`}>
                {/* 카테고리 */}
                <span className={`${styles.whiteIndicator}`}>{partyBoard.categoryName}</span>
                &nbsp;
                {/* 좋아요 누르기 전은 FaRegHeart */}
                {/* <span className={`${styles.whiteBtn} ${styles.thirdFont} ${styles.mrAuto}`}>
                    <FaHeart style={{color: 'red'}}/>
                    &nbsp;&nbsp;좋아요
                </span> */}
                <span className={`${styles.whiteBtn} ${styles.thirdFont}`}>
                    <FaHeart style={{color: 'red'}}/>
                    &nbsp;&nbsp;좋아요
                </span>

                <span className={`${styles.whiteBtn} ${styles.thirdFont} ${styles.mlAuto}`} style={{color: 'red'}} onClick={() => navigate(`/report?party=${partyNumber}`)}>
                    <FaBell />
                    &nbsp;&nbsp;신고
                </span>
            </div>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    {partyBoard.partyBoardName}
                </span>
            </div>
            <div className={styles.separator}>
                <span className={`${styles.secondFont}`} style={{fontWeight: 'normal'}}>
                    {partyBoard.partyBoardDetail}
                </span>
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
                        <span className={`${styles.closedParty} ${styles.thirdFont}`}>모집중</span>
                    }
                    &nbsp;
                    <span className={`${styles.commonBtn} `}>신청</span>
                    {/* <span className={`${styles.commonBtn}`}>수정</span> */}   
                </div>                 
            </div>
            <hr />

            {/* 모임장 및 모임멤버 간단정보 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont}`}>
                    모임장
                </span>
            </div>
            <Member navigate={navigate} user={partyMaster}/>
            <hr />

            {/* 일정 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont}`}>
                    일정
                </span>
                <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate(`/meet/write?partyNumber=${partyNumber}`)}>
                    일정 추가
                </span>
            </div>
            {
                testArray4.map((meet, idx) => {
                    return <Meet key={`meetCard${idx}`} meet={meet} navigate={navigate} />
                })
            }
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                <span className={`${styles.commonBtn}`}>더보기</span>
            </div>
            <hr />

            {/* 본인 후기 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont}`}>
                    내가 작성한 후기
                </span>
                <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate('review-modify')}>수정</span>
            </div>
            <Review review={{number: 99}} navigate={navigate}/>
            <hr />

            {/* 후기 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont} ${styles.marginRight}`}>
                    후기&nbsp;&nbsp;99
                </span>
                <DetailRateAverage />
                <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate('review-write')}>후기 작성</span>
            </div>
            {
                testArray3.map((review, idx) => {
                    return (
                        <Review key={`reviewCard${idx}`} review={review} navigate={navigate} />
                    )
                })
            }
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                <span className={`${styles.commonBtn} ${styles.thirdFont}`}>더보기</span>
            </div>
            <hr />

            {/* 멤버 출력 영역 */}
            <div className={`${styles.separator} ${styles.mxAuto}`} style={{width: '85%'}}>
                <span className={`${styles.secondFont} ${styles.marginRight}`}>
                    멤버&nbsp;&nbsp;99
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('members')}>전체보기</span>
            </div>
            {
                testArray3.map((member, idx) => {
                    return (
                        <Member key={`memberCard${idx}`} user={member} navigate={navigate} />
                    )
                })
            }
            <hr />
            
            {/* 모임 추천 영역 */}
            <div className={`${styles.separator}`}>
                <span className={`${styles.firstFont}`}>
                    이런 <span className={`${styles.pointColor}`}>모임</span>도 추천해요!
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board-overview')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {
                    testArray4.map((party, idx) => {
                        return (
                            <PartyCard key={`partyCard${idx}`} party={party} navigate={navigate} />
                        )
                    })
                }
            </div>
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
            setCurrent(2);
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

function Member({ navigate, user }) {

    const partyBoard = useSelector(state => state.partyBoardDetail);

    return (
        <div className={`${styles.memberContainer}`}>
            <img className={`${styles.masterProfile}`} src='/image/sampleProfile.png' onClick={() => navigate(`/user/${partyBoard.userNumber}/profile`)} />
            <div className={`${styles.memberContent}`}>
                <span className={`${styles.secondFont}`}>{user.userNickname}</span>
                <span className={`${styles.secondFont}`} style={{color: '#999999'}}>
                    {user.userDetail}
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

function DetailRate() {
    return (
        <div className={`${styles.detailRateInfo}`}>
            <div className={`${styles.detailSmallBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailSmallBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailSmallBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailSmallBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailSmallBaseStar}`}>
                <div className={`${styles.detailHalfStar}`} style={{width: '30%', marginRight: '70%'}}></div>
            </div>
        </div>
    )
}

function DetailRateAverage() {
    return (
        <div className={`${styles.detailRateInfo}`}>
            <div className={`${styles.detailBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailBaseStar}`}>
                <div className={`${styles.detailFilledStar}`}></div>
            </div>
            <div className={`${styles.detailBaseStar}`}>
                <div className={`${styles.detailHalfStar}`} style={{width: '30%', marginRight: '70%'}}></div>
            </div>
            <span className={`${styles.detailRateText}`}>4.3</span>
        </div>
    )
}

function Review({review, navigate}) {
    return (
        <div className={`${styles.reviewContainer}`}>
            <img className={`${styles.masterProfile}`} src='/image/sampleProfile.png' onClick={() => navigate(`/user/${review.number}/profile`)}/>
            <div className={`${styles.reviewContent}`}>
                <div className={`${styles.flex}`}>
                    <span className={`${styles.secondFont}`}>물개</span>
                    <DetailRate />
                </div>
                <span className={`${styles.secondFontNormal}`}>초반엔 사람 없어서 좋았는데 지금은 사람 많아요.</span>
            </div>
        </div>
    )
}

function Meet({meet, navigate}) {
    return (
        <div className={`${styles.meetContainer}`}>
            {/* 일정 날짜 출력영역 */}
            <div className={`${styles.meetDate}`}>
                <div className={`${styles.firstFontNormal}`}>10월</div>
                <div className={`${styles.fwBold}`} style={{fontSize: '50px'}}>12</div>
            </div>
            {/* 일정 세부정보 출력영역 */}
            <div className={`${styles.meetInfo}`}>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <FaLocationDot className={`${styles.reactIcon}`}/>
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFont}`}>
                        서울특별시 노원구 화랑로 815
                    </span>
                </div>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <FaRegClock className={`${styles.reactIcon}`}/>
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFont}`}>
                        00:00 ~ 00:00
                    </span>
                </div>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <FaWonSign className={`${styles.reactIcon}`}/>
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFont}`}>
                        0000원
                    </span>
                </div>
                <div className={`${styles.flex} ${styles.alCenter}`}>
                    <BsPeopleFill className={`${styles.reactIcon}`} />
                    &nbsp;&nbsp;
                    <span className={`${styles.thirdFontNormal}`}>
                        00
                    </span>
                    <span className={`${styles.thirdFont}`}>
                        &nbsp;/&nbsp;
                        00 명
                    </span>
                </div>
            </div>
            {/* 일정 버튼 영역 */}
            <div className={`${styles.meetButtons}`}>
                <span className={`${styles.commonBtn}`} onClick={() => navigate(`/meet/${meet.number}/members`)}>참여 멤버</span>
                <span className={`${styles.commonBtn}`}>신청 취소</span>
            </div>
        </div>
    )
}


// 모임 카드
function PartyCard({party, navigate}) {
    return (
      <div className={styles.cardContainer} onClick={() => navigate(`/party/${party.number}`)}>
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

export default PartyDetail;
