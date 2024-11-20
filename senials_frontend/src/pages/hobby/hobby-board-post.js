import React from 'react';
import styles from './hobby-board-post.module.css';

let percentage=70;

function HobbyBoardPost() {
    return (
        <>
            <div className={styles.title}>👑 <span style={{color:"#FF5391"}}>인기</span> TOP3</div>
            <div className={styles.top3_list}>
                <div className={styles.top3}>
                    <img src='/img/sampleImg3.png' className={styles.top3_img} alt="농구" />
                    <div className={styles.top3_name}>농구</div>
                    <div>선호도 : {percentage}%</div>

                    <div className={styles.progressBarContainer}>
                        <div 
                            className={styles.progressBar} 
                            style={{ width: `${percentage}%` }} 
                        ></div>
                    </div>

                </div>
                <div className={styles.top3}>
                    <img src='/img/sampleImg3.png' className={styles.top3_img} alt="축구" />
                    <div className={styles.top3_name}>축구</div>
                    <div>선호도 :{percentage}%</div>

                    <div className={styles.progressBarContainer}>
                        <div 
                            className={styles.progressBar} 
                            style={{ width: `${percentage}%` }} 
                        ></div>
                    </div>

                </div>
                <div className={styles.top3}>
                    <img src='/img/sampleImg3.png' className={styles.top3_img} alt="낚시" />
                    <div className={styles.top3_name}>낚시</div>
                    <div>선호도 : {percentage}%</div>

                    <div className={styles.progressBarContainer}>
                        <div 
                            className={styles.progressBar} 
                            style={{ width: `${percentage}%` }} 
                        ></div>
                    </div>

                </div>
            </div>
            <hr />
            <form className={styles.searchBox}>
                <input type="text"/>
                <button type="submit" className={styles.searchButton}>🔍</button>
            </form>
            <div className={styles.hobby_list}>
                <img src='/img/sampleImg3.png' className={styles.hobby_img} alt="농구" />
                <div>
                    <div className={styles.hobby_name}>농구</div>

                    <div>선호도 : {percentage}%</div>
                    <div className={styles.progressBarContainer}>
                        <div 
                            className={styles.progressBar} 
                            style={{ width: `${percentage}%` }} 
                        ></div>
                    </div>

                    <div className={styles.hobby_detail}>농구는 손으로 하는 게임입니다. 어렵지 않아요~</div>
                </div>
            </div>

            <div className={styles.hobby_list}>
                <img src='/img/sampleImg3.png' className={styles.hobby_img} alt="축구" />
                <div>
                    <div className={styles.hobby_name}>축구</div>

                    <div>선호도 : {percentage}%</div>
                    <div className={styles.progressBarContainer}>
                        <div 
                            className={styles.progressBar} 
                            style={{ width: `${percentage}%` }} 
                        ></div>
                    </div>
                    <div className={styles.hobby_detail}>축구는 발로 하는 게임입니다. 어렵지 않아요~</div>
                </div>
            </div>

            <button className={styles.suggest_hobby_button}>취미 추가 건의</button>
        </>
    );
}

export default HobbyBoardPost;
