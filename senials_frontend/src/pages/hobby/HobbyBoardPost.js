import React from 'react';
import styles from './HobbyBoardPost.module.css';
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";

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
            <form className={styles.searchBox}>
                <input type="text" />
                <button type="submit" className={styles.searchButton}><FaSearch size={20}/></button>
            </form>
            
            <HobbyList/>
            <HobbyList/>
            
            <button className={styles.suggestHobbyButton}>취미 추가 건의</button>
        </div>
    );
}

function HobbyList(){
    return(
        <>
        <div className={styles.hobbyList}>
        <img src='/img/sampleImg3.png' className={styles.hobbyImg} alt="축구" />
        <div>
            <div className={styles.hobbyName}>축구</div>

            <div className={styles.thirdFont}>선호도 : {percentage}%</div>
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className={styles.hobbyDetail}>축구는 발로 하는 게임입니다. 어렵지 않아요~</div>
        </div>
    </div>

    <button className={styles.suggestHobbyButton}>취미 추가 건의</button>
    </>
    );
}

function HobbyCard(){
    return(
        <div className={styles.top3}>
                    <img src='/img/sampleImg3.png' className={styles.top3Img} alt="농구" />
                    <div className={styles.top3Name}>농구</div>
                    <div className={styles.th}>선호도 : {percentage}%</div>

                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
    );
}

export default HobbyBoardPost;
