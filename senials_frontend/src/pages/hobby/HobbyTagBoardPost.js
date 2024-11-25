import React from 'react';
import styles from './HobbyBoardPost.module.css';

import { Button, Row, Col } from 'react-bootstrap';

let percentage = 70;

function HobbyBoardPost() {
    return (
        <div className={styles.page}>
            <div className={styles.title}>👑 <span style={{ color: "#FF5391" }}>인기</span> TOP3</div>
            <button className={styles.sellAllButton}>전체보기</button>
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
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
                <Row className={styles.marginBottom}>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </Row>
            </div>
        </div>
    );
}

function HobbyCard(){
    return(
        <div className={styles.top3}>
                    <img src='/img/sampleImg3.png' className={styles.top3Img} alt="농구" />
                    <div className={styles.top3Name}>농구</div>
                    <div>선호도 : {percentage}%</div>

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
        <Col md={3}>
            <div className={styles.ctgrContainer}>
                <div style={{backgroundImage: 'url(/img/sampleImg.png)', 
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    border: '1px solid grey', width: '98%', height: '90px', borderColor: '#c7c7c7',
                    borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <span className={`${styles.ctgrText} ${styles.thirdFont}`}>카테고리</span>
                </div>
            </div>
        </Col>
    )
}

export default HobbyBoardPost;
