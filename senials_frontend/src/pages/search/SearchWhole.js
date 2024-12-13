import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

// CSS
import styles from '../common/MainVer1.module.css';

function SearchWhole() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const keyword = searchParams.get("keyword");

    const [hobbyList, setHobbyList] = useState([]);
    const [partyList, setPartyList] = useState([]);
    const [hobbyPage, setHobbyPage] = useState(0);
    const [partyPage, setPartyPage] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // 기존 상태 유지
    const [hasMoreParty, setHasMoreParty] = useState(true); // 더보기 여부
    const [hasMoreHobby, setHasMoreHobby] = useState(true); // 더보기 여부

    // useEffect로 데이터 가져오기
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [partyResponse, hobbyResponse] = await Promise.all([
                    axios.get(`search-whole/party?keyword=${keyword}&page=0&size=4`),
                    axios.get(`search-whole/hobby?keyword=${keyword}&page=0&size=4`),
                ]);
                setPartyList(partyResponse.data.results.partyBoardDTOForCardList);
                setHobbyList(hobbyResponse.data.results.hobbyCardDTOList);
                setHasMoreParty(partyResponse.data.results.partyBoardDTOForCardList.length === 4);
                setHasMoreHobby(hobbyResponse.data.results.hobbyCardDTOList.length === 4);
                setIsInitialLoad(false); // 초기 로드 완료
            } catch (error) {
                console.error("초기 데이터 로드 실패", error);
            }
        };

        fetchInitialData();
    }, [keyword]); // keyword가 변경될 때마다 초기 데이터 로드

    // "더보기" 클릭 시 데이터 추가 로드
    const nextPartyList = async () => {
        if (!hasMoreParty) return; // 더이상 데이터가 없으면 리턴
        try {
            const nextPage = partyPage + 1;
            const response = await axios.get(`search-whole/party?keyword=${keyword}&page=${nextPage}&size=4`);
            const newPartyList = response.data.results.partyBoardDTOForCardList;
            setPartyList((prevList) => [...prevList, ...newPartyList]);
            setPartyPage(nextPage);
            // 새로운 데이터가 4개 이하이거나 비어있으면 더보기 버튼 숨기기
            setHasMoreParty(newPartyList.length === 4);
        } catch (error) {
            console.error("모임 데이터 로드 실패", error);
        }
    };

    const nextHobbyList = async () => {
        if (!hasMoreHobby) return; // 더이상 데이터가 없으면 리턴
        try {
            const nextPage = hobbyPage + 1;
            const response = await axios.get(`search-whole/hobby?keyword=${keyword}&page=${nextPage}&size=4`);
            const newHobbyList = response.data.results.hobbyCardDTOList;
            setHobbyList((prevList) => [...prevList, ...newHobbyList]);
            setHobbyPage(nextPage);
            // 새로운 데이터가 4개 이하이거나 비어있으면 더보기 버튼 숨기기
            setHasMoreHobby(newHobbyList.length === 4);
        } catch (error) {
            console.error("취미 데이터 로드 실패", error);
        }
    };

    const linkHobby = (hobbyNumber) => {
        navigate(`/hobby/${hobbyNumber}`);
    };

    const linkParty = (partyNumber) => {
        navigate(`/party/${partyNumber}`);
    };

    // 그리드에서 한 줄에 들어갈 카드 개수
    const maxLength = 4;

    // 모임 게시판과 취미 게시판 각각 검색 결과가 비어있는지 확인
    const isPartyEmpty = partyList.length === 0;
    const isHobbyEmpty = hobbyList.length === 0;

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    '<span className={styles.pointColor}>&nbsp;{keyword}&nbsp;</span>'의 검색 결과
                </span>
            </div>

            {/* 모임 게시판 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    모임 게시판
                </span>
            </div>
            <hr />
            {isPartyEmpty ? (
                <div className={styles.flexCenter}>
                    <span className={`${styles.noSearchResult}`}>모임 게시판에 대한 검색결과가 존재하지 않습니다.</span>
                </div>
            ) : (
                <div className={`${styles.separatorContent}`}>
                    {partyList.map((party, index) => (
                        <PartyCard key={index} party={party} linkParty={linkParty} />
                    ))}
                    {/* 빈 카드로 그리드 맞추기 */}
                    <EmptyCards length={partyList.length} maxLength={maxLength} />
                    {hasMoreParty && (
                        <div style={{ margin: 'auto' }} className={`${styles.flexCenter} ${styles.marginBottom}`}>
                            <span className={`${styles.commonBtn}`} onClick={nextPartyList}>더보기</span>
                        </div>
                    )}
                </div>
            )}

            {/* 취미 게시판 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    취미 게시판
                </span>
            </div>
            <hr />
            {isHobbyEmpty ? (
                <div className={styles.flexCenter}>
                    <span className={`${styles.noSearchResult}`}>취미 게시판에 대한 검색결과가 존재하지 않습니다.</span>
                </div>
            ) : (
                <div className={`${styles.separatorContent}`}>
                    {hobbyList.map((hobby, index) => (
                        <HobbyCard key={index} hobby={hobby} linkHobby={linkHobby} />
                    ))}
                    {/* 빈 카드로 그리드 맞추기 */}
                    <EmptyCards length={hobbyList.length} maxLength={maxLength} />
                    {hasMoreHobby && (
                        <div style={{ margin: 'auto' }} className={`${styles.flexCenter} ${styles.marginBottom}`}>
                            <span className={`${styles.commonBtn}`} onClick={nextHobbyList}>더보기</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 일반 별점 컴포넌트
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
function EmptyCards({ length, maxLength }) {
    const arr = [];
    if (length % maxLength !== 0) {
        const cnt = maxLength - (length % maxLength);
        for (let i = 0; i < cnt; i++) {
            arr.push(<div className={`${styles.emptyCardContainer}`} key={`emptyCard${i}`} />);
        }
    }
    return (
        <>
            {arr}
        </>
    );
}

// 모임 카드
function PartyCard({ party, linkParty }) {
    return (
        <div className={styles.cardContainer} onClick={() => linkParty(party.partyBoardNumber)}>
            <div className={styles.cardImage} style={{ backgroundImage: `url(/img/partyboard/${party.partyBoardNumber}/thumbnail/${party.firstImage})` }}>
            </div>
            <div className={`${styles.secondFont}`}>{party.partyBoardName}</div>
            <div className={styles.rateInfo}>
                <Rate averageRating={party.averageRating}/>
            </div>
            <div className={styles.memberInfo}>
                <img src='/image/people.svg' style={{ width: '20px' }} />&nbsp;
                <span className={`${styles.fourthFont}`}>{party.memberCount}</span>
                {
                    party.partyBoardStatus == 0 ?
                    <span className={`${styles.openedParty} ${styles.thirdFont} ${styles.mlAuto}`}>모집중</span>
                    :
                    <span className={`${styles.closedParty} ${styles.thirdFont} ${styles.mlAuto}`}>모집완료</span>
                }
            </div>
        </div>
    );
}

// 취미 카드
function HobbyCard({ hobby, linkHobby }) {
    return (
        <div className={styles.cardContainer} onClick={() => linkHobby(hobby.hobbyNumber)}>
            <div className={styles.cardImage} style={{ backgroundImage: `url(/img/hobbyboard/${hobby.hobbyNumber})`}} />
            <div className={`${styles.secondFont} ${styles.flex}`}>
                {hobby.hobbyName}
            </div>
        </div>
    );
}

export default SearchWhole;
