import { useState, useEffect } from 'react';

// CSS
import styles from '../common/MainVer1.module.css';

function PartyBoard() {

    return (
        <div className={styles.centerContainer}>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    👑&nbsp;<span className={styles.pointColor}>인기</span>&nbsp;추천&nbsp;모임
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                <PartyCard />
                <PartyCard />
                <PartyCard />
                <PartyCard />
            </div>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    <span className={styles.pointColor}>관심사</span> 기반 추천 모임
                </span>
                <span className={`${styles.whiteBtn} ${styles.mlAuto}`}>전체보기</span>
            </div>
            <div className={`${styles.separatorContent}`}>
                <PartyCard />
                <PartyCard />
                <PartyCard />
                <PartyCard />
            </div>
            <hr/>
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
            <div className={`${styles.ctgrRow}`}>
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
            <div className={`${styles.ctgrRow}`}>
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
            <div className={`${styles.ctgrRow} ${styles.marginBottom2}`}>
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
        </div>
    )
}

function MainCarousel() {
    
    const total = 5;
    // 이미지 총 개수 - 1
    const lastIndex = total - 1;

    // 반 만큼 우측 이동(가운데 정렬) csvContainer 반 만큼 좌측 이동
    const initPos = '50% - 605px';
    const [current, setCurrent] = useState(0);
    const [posx, setPosx] = useState('');

    useEffect(() => {
        if (current === 0) {
            setPosx(`calc(${initPos})`);
        } else if (current === lastIndex) {
            setPosx(`calc(${initPos} - 440px - ${550 * (current - 2)}px)`);
        } else {
            setPosx(`calc(${initPos} - 220px - ${550 * (current - 1)}px)`);
        } 
    }, [current])

    const csArr = [
        <div className={`${styles.mcsItem}`} style={{backgroundImage: 'url(/image/1.jpg)'}} />,
        <div className={`${styles.mcsItem}`} style={{backgroundImage: 'url(/image/2.jpg)'}} />,
        <div className={`${styles.mcsItem}`} style={{backgroundImage: 'url(/image/3.jpg)'}} />,
        <div className={`${styles.mcsItem}`} style={{backgroundImage: 'url(/image/3.jpg)'}} />,
        <div className={`${styles.mcsItem}`} style={{backgroundImage: 'url(/image/3.jpg)'}} />
    ]
    

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
        <div className={`${styles.flex} ${styles.marginBottom2}`} style={{width: '100%', height: '300px'}}>
            <div className={`${styles.mcsPrev}`} onClick={() => prev()} />

            {/* width = 1210px = 1280-(버튼 * 2) */}
            <div className={`${styles.mcsContainer}`} style={{width: '100%'}}>
                <div className={`${styles.mcsInner}`} style={{width: `calc(${550 * total})px`, transform: `translateX(${posx})`}}>
                    {csArr.map(mcsItem => mcsItem)}
                </div>
            </div>

            <div className={`${styles.mcsNext}`} onClick={() => next()} />
        </div>
    )
}

function Carousel() {
    
    // 이미지 총 개수 - 1
    const lastIndex = 2;
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
        // 인디케이터 구현용 flex-column 박스
        <div className={`d-flex flex-column w-100`}>
            <div className={`d-flex w-100 ${styles.marginBottom2}`}>
                <div className={`${styles.csPrev}`} onClick={() => prev()} />

                {/* csContainer width : 내부 아이템의 width와 padding, margin의 합과 동일하게 설정 */}
                <div className={`${styles.csContainer}`} style={{width: '1000px', height: '500px'}}>
                    <div className={`${styles.csInner}`} style={{transform: `translateX(-${current * 1000}px)`}}>
                        <div className={`${styles.csItem}`} style={{backgroundImage: 'url(/image/1.jpg)'}} />
                        <div className={`${styles.csItem}`} style={{backgroundImage: 'url(/image/2.jpg)'}} />
                        <div className={`${styles.csItem}`} style={{backgroundImage: 'url(/image/3.jpg)'}} />
                    </div>
                </div>

                <div className={`${styles.csNext}`} onClick={() => next()} />
            </div>
        </div>
    )
}

function Member() {
    return (
        <div className={`${styles.memberContainer}`}>
            <img className={`${styles.masterProfile}`} src='/image/sampleProfile.png' />
            <div className={`${styles.memberContent}`}>
                <span className={`${styles.secondFont}`}>수영물개</span>
                <span className={`${styles.secondFont}`} style={{color: '#999999'}}>
                    안녕하세요. 수영 1년차 입니다~
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

function Review() {
    return (
        <div className={`${styles.reviewContainer}`}>
            <img className={`${styles.masterProfile}`} src='/image/sampleProfile.png' />
            <div className={`${styles.reviewContent}`}>
                <div className={`${styles.flex}`}>
                    <span className={`${styles.secondFont}`}>물개</span>
                    <DetailRate />
                </div>
                <span className={`${styles.secondFont} fw-normal`}>초반엔 사람 없어서 좋았는데 지금은 사람 많아요.</span>
            </div>
        </div>
    )
}

function Meet() {
    return (
        <div className={`${styles.meetContainer}`}>
            {/* 일정 날짜 출력영역 */}
            <div className={`${styles.meetDate}`}>
                <div className={`${styles.firstFont} fw-normal`}>10월</div>
                <div className='fw-bold' style={{fontSize: '50px'}}>12</div>
            </div>
            {/* 일정 세부정보 출력영역 */}
            <div className={`${styles.meetInfo}`}>
                <div>
                    <img style={{width: '20px', height: 'auto'}} src='/image/location.png' />
                    &nbsp;
                    <span className={`${styles.thirdFont}`}>
                        서울특별시 노원구 화랑로 815
                    </span>
                </div>
                <div>
                    <img style={{width: '20px', height: 'auto'}} src='/image/time.png' />
                    &nbsp;
                    <span className={`${styles.thirdFont}`}>
                        00:00 ~ 00:00
                    </span>
                </div>
                <div>
                    <img style={{width: '20px', height: 'auto'}} src='/image/coin.png' />
                    &nbsp;
                    <span className={`${styles.thirdFont}`}>
                        0000원
                    </span>
                </div>
                <div>
                    <img style={{width: '20px', height: 'auto'}} src='/image/people-black.png' />
                    &nbsp;
                    00&nbsp;/&nbsp;
                    <span className={`${styles.thirdFont}`}>
                        00 명
                    </span>
                </div>
            </div>
            {/* 일정 버튼 영역 */}
            <div className={`${styles.meetButtons}`}>
                <button className={`${styles.commonBtn}`}>참여 멤버</button>
                <button className={`${styles.commonBtn}`}>신청 취소</button>
            </div>
        </div>
    )
}

function PartyCard() {
  return (
    <div className={styles.cardContainer}>
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

function HobbyCard() {
    return (
      <div className={styles.cardContainer}>
          <div className={styles.cardImage} style={{backgroundImage: 'url(/image/1.jpg)'}} />
          <div className={`${styles.secondFont} ${styles.flex}`}>
            아웃도어
            {/* font-size: 텍스트 픽셀 - 1 */}
            <span style={{fontSize: '17px'}}>
                &nbsp;|&nbsp;
            </span>
            등산
        </div>
      </div>
    )
}

function Category() {
    return (
        <div className={styles.ctgrContainer}>
            <div className={`${styles.ctgrImage}`} style={{backgroundImage: 'url(/image/cat.jpg)'}}>
                <span className={`${styles.ctgrText} ${styles.thirdFont}`}>카테고리</span>
            </div>
        </div>
    )
}

export default PartyBoard;