import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from '../common/MainVer1.module.css';

const testArray4 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}];
const testArray5 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}]
const testArray6 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}]
const testArray7 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}, {number: 7}]

function PartyBoard() {

    const navigate = useNavigate();

    const linkHobby = (hobbyNumber) => {
        navigate(`/hobby/${hobbyNumber}`);
    }

    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    }

    const linkCtgr = (ctgrNumber) => {
        navigate(`/hobby/board?category=${ctgrNumber}`)
    }

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    👑&nbsp;<span className={styles.pointColor}>인기</span>&nbsp;추천&nbsp;모임
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => {navigate('/party/board-overview')}}>
                    전체보기
                </span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {testArray4.map((party, idx) => {
                    return (
                        <PartyCard key={`partyCard${idx}`} party={party} linkParty={linkParty}/>
                    )
                })}
            </div>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    <span className={styles.pointColor}>관심사</span> 기반 추천 모임
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/board-overview')}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {testArray4.map((party, idx) => {
                    return (
                        <PartyCard key={`partyCard${idx}`} party={party} linkParty={linkParty}/>
                    )
                })}
            </div>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
            <div className={`${styles.ctgrRow}`}>
                {
                    testArray7.map((ctgr, idx) => {
                        return (
                            <Category key={`ctgr${idx}`} ctgr={ctgr} linkCtgr={linkCtgr}/>
                        )
                    })
                }
                {
                    <EmptyCtgrs length={testArray7.length} maxLength={5} />
                }
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

// 줄 맞춤용 빈 카테고리 생성 컴포넌트
function EmptyCtgrs({length, maxLength}) {
    const arr = [];
    if(length % maxLength != 0) {
        const cnt = maxLength - (length % maxLength);
        for(let i = 0; i < cnt; i++) {
            arr.push(<div className={`${styles.emptyCtgrContainer}`} key={`emptyCtgr${i}`} />)
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


function Category({ctgr, linkCtgr}) {
    return (
        <div className={styles.ctgrContainer} onClick={() => {linkCtgr(ctgr.number)}}>
            <div className={`${styles.ctgrImage}`} style={{backgroundImage: 'url(/image/cat.jpg)'}}>
                <span className={`${styles.ctgrText} ${styles.thirdFont}`}>카테고리</span>
            </div>
        </div>
    )
}

export default PartyBoard;