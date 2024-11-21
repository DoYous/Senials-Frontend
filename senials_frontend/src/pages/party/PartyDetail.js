import { useState } from 'react';

// CSS
import styles from './PartyDetail.module.css';

function PartyDetail() {

    return (
        <div className={styles.centerContainer}>
            {/* 최상단 버튼 영역 */}
            <div className={styles.separator}>
                <div className={`${styles.whiteBtn}`}>운동</div>
                &nbsp;
                <img style={{height: '40px'}} src='/image/unfilledHeart.svg'/>
                &nbsp;
                <button className={`${styles.whiteBtn} ${styles.flex} align-items-center`} style={{color: 'red'}}>
                    <img style={{height: '80%'}} src='/image/bell.svg'/>
                    신고
                </button>
                <button className={`${styles.commonBtn} ${styles.marginLeftAuto}`}>수정</button>
                &nbsp;
                <button className={`${styles.commonBtn}`}>신청</button>
            </div>

            {/* 모임 이미지 출력 영역 */}
            <Carousel />

            {/* 모임 제목, 간단소개 출력 영역 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    월수금 수영 같이해요!
                </span>
            </div>
            <div className={styles.separator}>
                <span className={`${styles.secondFont} fw-normal`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut tellus urna. Ut quis elementum ante. Nulla eget tortor ultrices sapien tempor fermentum. Maecenas ut metus a est malesuada sodales in at elit. Etiam id dignissim urna, porta feugiat ex. Sed laoreet tellus sed ligula accumsan, ut ultrices lectus varius. Nam ut luctus erat. In eros justo, molestie id orci quis, bibendum cursus tortor. Proin bibendum magna efficitur nulla cursus pretium. Phasellus consequat volutpat lacus eu molestie. Vestibulum eu mollis ante. Praesent tincidunt sollicitudin ligula, at tempor nisl dapibus in. Ut eu augue et est finibus pulvinar eu vitae augue.

                    Curabitur eget egestas lacus. Sed rutrum vestibulum convallis. Vivamus maximus ipsum sit amet hendrerit iaculis. Quisque nunc orci, ultrices ut arcu congue, convallis euismod enim. Aenean sed elit condimentum, condimentum arcu bibendum, ultricies dui. Nullam faucibus arcu et varius cursus. Pellentesque neque urna, placerat eget hendrerit sit amet, laoreet eu metus. Praesent maximus sapien maximus ipsum facilisis blandit. Donec eleifend tristique felis, vel lobortis mi placerat ut. Maecenas id dolor lacus.

                    Vivamus varius nunc in sapien sagittis, at fermentum tortor aliquet. Mauris rhoncus risus elit, fringilla pretium ante semper ut. In tincidunt varius venenatis. Sed placerat enim at consequat rutrum. Ut dictum, velit eu rutrum accumsan, mi lectus blandit odio, eu feugiat magna eros id quam. Nullam et suscipit risus. Quisque vitae rutrum neque.
                </span>
            </div>
            <hr />

            {/* 모임장 및 모임멤버 간단정보 출력 영역 */}
            <div className={`${styles.separator}`}>
                <div style={{width: '50%'}}>
                    <div className={`${styles.secondFont}`}>
                        모임현황
                    </div>
                </div>
                <div style={{width: '50%'}}>
                    <div className={`${styles.secondFont}`}>
                        모임장
                    </div>
                </div>
            </div>
            <div className={`${styles.separator}`}>
                <div style={{width: '50%'}}>
                    <img style={{width: '20px'}} src='/image/people.svg' />
                    &nbsp;
                    <span className={`${styles.secondFont}`}>
                        10명
                    </span>
                    &nbsp;
                    <span className={`${styles.openedParty}`}>
                        모집중
                    </span>
                </div>
                <div style={{width: '50%'}}>
                    <img className={`${styles.masterProfile}`} src='/image/cat.jpg' />
                    &nbsp;
                    <span className={`${styles.secondFont}`}>
                        취뽀기원126
                    </span>
                </div>
            </div>
            <hr />

            {/* 일정 출력 영역 */}
            <div className={`${styles.separator} mx-auto`} style={{width: '80%'}}>
                <span className={`${styles.secondFont}`}>
                    일정
                </span>
                <button className={`${styles.commonBtn} ms-auto`}>
                    일정 추가
                </button>
            </div>
            <Meet />
            <Meet />
            <Meet />
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                <button className={`${styles.commonBtn}`}>더보기</button>
            </div>
            <hr />

            {/* 본인 후기 출력 영역 */}
            <div className={`${styles.separator} mx-auto`} style={{width: '80%'}}>
                <span className={`${styles.secondFont}`}>
                    내가 작성한 후기
                </span>
                <button className={`${styles.commonBtn} ms-auto`}>수정</button>
            </div>
            <Review />
            <hr />

            {/* 후기 출력 영역 */}
            <div className={`${styles.separator} mx-auto`} style={{width: '80%'}}>
                <span className={`${styles.secondFont} ${styles.marginRight}`}>
                    후기&nbsp;&nbsp;99
                </span>
                <DetailRateAverage />
                <button className={`${styles.commonBtn} ms-auto`}>후기 작성</button>
            </div>
            <Review />
            <Review />
            <Review />
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                <button className={`${styles.commonBtn}`}>더보기</button>
            </div>
            <hr />

            {/* 멤버 출력 영역 */}
            <div className={`${styles.separator} mx-auto`} style={{width: '80%'}}>
                <span className={`${styles.secondFont} ${styles.marginRight}`}>
                    멤버&nbsp;&nbsp;99
                </span>
                <button className={`${styles.whiteBtn} ms-auto`}>전체보기</button>
            </div>
            <Member/>
            <hr/>

            <Meet />
            <Meet />
            <Meet />
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                <button className={`${styles.commonBtn}`}>더보기</button>
            </div>
            <hr />
            
            {/* 모임 추천 영역 */}
            <div className={`${styles.separator}`}>
                <span className={`${styles.firstFont}`}>
                    이런 <span className={`${styles.pointColor}`}>모임</span>도 추천해요!
                </span>
                <button className={`${styles.whiteBtn} ms-auto`}>전체보기</button>
            </div>
            <div className={`${styles.flex} ${styles.marginBottom2}`}>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
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
        <div className={`d-flex flex-column w-100 ${styles.marginBottom2}`}>
            <div className={`d-flex w-100`}>
                <div className={`${styles.csPrev}`} onClick={() => prev()} />

                <div className={`${styles.csContainer}`} style={{margin: '0 auto 0 auto', width: '1000px', height: '500px'}}>
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

function Card() {
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
            <span className={`${styles.memberCount} ${styles.fourthFont}`}>10명</span>
            <span className={`${styles.openedParty} ${styles.thirdFont}`}>모집중</span>
        </div>
    </div>
  )
}

export default PartyDetail;
