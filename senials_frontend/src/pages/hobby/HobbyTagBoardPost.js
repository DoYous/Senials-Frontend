import React from 'react';
import styles from './HobbyBoardPost.module.css';

let percentage = 70;

function HobbyBoardPost() {
    return (
        <div className={styles.page}>
            <div className={styles.title}>👑 <span style={{ color: "#FF5391" }}>인기</span> TOP3</div>
            <div className={styles.top3List}>
            
                <HobbyCard/>
                <HobbyCard/>
                <HobbyCard/>
    
            </div>
            <hr />
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
            <div>
                <div className={styles.sort}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </div>
                <div className={styles.sort}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </div>
                <div className={styles.sort}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </div>
            </div>
        </div>
    );
}

function HobbyCard(){
    return(
        <div className={styles.top3}>
                    <img src='/img/sampleImg3.png' className={styles.top3Img} alt="농구" />
                    <div className={styles.top3Name}>농구</div>
                    <div className={styles.thirdFont}>선호도 : {percentage}%</div>

                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
    );
}

function Category() {
    return (
            <div className={styles.ctgrContainer}>
                <div style={{backgroundImage: 'url(/img/sampleImg.png)', 
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    border: '1px solid grey', width:'232px', height:'122px', borderColor: '#c7c7c7',
                    borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <span className={`${styles.ctgrText} ${styles.thirdFont}`}>카테고리</span>
                </div>
            </div>
    )
}

export default HobbyBoardPost;
