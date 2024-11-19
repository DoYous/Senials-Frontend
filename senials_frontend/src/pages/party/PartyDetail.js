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
            <div style={{width: '100%', height: '300px', border: '1px solid black', marginBottom: '16px'}}/>

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
            
            <div className={`${styles.flex} ${styles.marginBottom2}`}>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                <button className={`${styles.commonBtn}`}>더보기</button>
            </div>

            {/* 취미 검색결과 출력 영역 */}
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    취미 게시판
                </span>
            </div>
            <hr />
            {/* <Row className={styles.marginBottom2}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Row>
            <div className={styles.flexCenter}>
                <button className={`${styles.commonBtn} ${styles.loadBtn}`}>더보기</button>
            </div> */}
            <div className={styles.flexCenter}>
                <span className={`${styles.noSearchResult} ${styles.firstFont}`}>검색결과가 존재하지 않습니다.</span>
            </div>
        </div>
    )
}

function Meet() {
    return (
        <div className={`${styles.separator}`}>
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
            <span className={styles.filledStar}>★★★</span>
            <span className={styles.unfilledStar}>☆☆</span>
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
