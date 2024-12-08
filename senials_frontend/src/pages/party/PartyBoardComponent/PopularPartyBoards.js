import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setPopularParties, togglePopularLike } from "../../../redux/partySlice";

import styles from '../../common/MainVer1.module.css';

function PopularPartyBoards() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    
    useEffect(() => {

        axios.get('/partyboards/popular-parties?size=4')
        .then(result => {
            dispatch(setPopularParties(result.data.results.popularPartyBoards));
        });

    }, [])


    return (
        <>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    👑&nbsp;<span className={styles.pointColor}>인기</span>&nbsp;추천&nbsp;모임
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => {navigate('/party/board-overview')}}>
                    전체보기
                </span>
            </div>
            <div className={`${styles.separatorContent}`}>
                <PopularPartyCard navigate={navigate} />
            </div>
            <hr/>
        </>
    )
}


// 모임 카드
function PopularPartyCard({ navigate }) {

    const dispatch = useDispatch();

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
