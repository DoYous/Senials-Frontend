import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setPopularParties } from "../../../redux/partySlice";

import styles from '../../common/MainVer1.module.css';

function PopularPartyBoards({ printAllBtn = false }) {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    
    useEffect(() => {

        axios.get('/partyboards/popular-parties?size=4')
        .then(result => {
            dispatch(setPopularParties(result.data.results.popularPartyBoards));
        });

    }, [dispatch])


    return (
        <>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    👑<span className={styles.pointColor}>인기</span>&nbsp;추천&nbsp;모임
                </span>
                {
                    printAllBtn ? 
                    <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board')}>전체보기</span>
                    :
                    null
                }
            </div>
            <div className={`${styles.separatorContent}`}>
                <PopularPartyCard navigate={navigate} />
            </div>
        </>
    )
}


// 모임 카드
function PopularPartyCard({ navigate }) {

    
    let parties = useSelector((state) => state.popularParties);
    let length = parties.length;
    let maxLength = 4;


    return (
        <>
        {
            parties.map((party, i) => {
                // let thumbnail = party.firstImage;
                let thumbnail = party.firstImage != null ? `url(/img/partyboard/${party.partyBoardNumber}/thumbnail/${party.firstImage})` : `url(/img/NoImage.svg)`
                
                return (
                    <div key={`partyCard${i}`} className={styles.cardContainer} onClick={() => navigate(`/party/${party.partyBoardNumber}`)}>
                        <div className={styles.cardImage} style={{backgroundImage: thumbnail}} />
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

export default PopularPartyBoards;
