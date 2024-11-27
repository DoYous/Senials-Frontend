import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

// CSS
import styles from '../common/MainVer1.module.css';

function PartyBoardOverview() {

    const navigate = useNavigate();

    const testArray4 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}];
    const testArray5 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}]
    const testArray6 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}]
    const testArray7 = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}, {number: 7}]

    const testArray = useMemo(() => {
        let temp = [];
        for (let i = 0; i < 10; i++) {
            temp.push({number: i})
        }
        return temp;
    })

    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    }

    const linkPartySearch = (keyword) => {
        navigate(`/search-whole?keyword=${keyword}`);
    }

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                {/* marinLeft css 개선 해야함 */}
                <span className={`${styles.firstFont}`}>
                    👑&nbsp;<span className={styles.pointColor}>인기</span>&nbsp;추천&nbsp;모임
                </span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {
                    testArray4.map((party, idx) => {
                        return (
                            <PartyCard key={`partyCard${idx}`} party={party} linkParty={linkParty} />
                        )
                    })
                }
            </div>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    전체 모임
                </span>
                <PartySearchBar linkPartySearch={linkPartySearch}/>
                &nbsp;
                <span className={`${styles.commonBtn}`}>정렬</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                {
                    testArray.map((party, idx) => {
                        return (
                            <PartyCard key={`partyCard${idx}`} party={party} linkParty={linkParty} />
                        )
                    })
                }
                {
                    <EmptyCards length={testArray.length} maxLength={4}/>
                }
            </div>
            <div className={styles.separator}>
                <span className={`${styles.commonBtn} ${styles.mlAuto}`} onClick={() => navigate('/party/write')}>게시글 작성</span>
            </div>
            <div className={styles.flexCenter}>
                <span className={`${styles.commonBtn}`}>더보기</span>
            </div>
        </div>
    )
}

// 모임 검색창
function PartySearchBar({linkPartySearch}) {

    const [keyword, setKeyword] = useState('');

    const submit = (e) => {
        if (e.key == 'Enter') {
            if (keyword.length < 2) {
                alert('검색어는 2자 이상 입력하셔야 합니다.')
            } else {
                linkPartySearch(keyword);
            }
        }
    }


    return (
        <div className={styles.partySearch}>
            <input className={`${styles.partySearchInput}`} onKeyDown={submit} onChange={(e) => setKeyword(e.target.value)}/>
            <FaSearch className={`${styles.partySearchIcon}`} onClick={() => linkPartySearch(keyword)}/>
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

// 줄 맞춤용 빈 카드 생성 컴포넌트
function EmptyCards({length, maxLength}) {
    const arr = [];
    if(length % maxLength != 0) {
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

export default PartyBoardOverview;