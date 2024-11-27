import React from 'react';
import styles from './HobbyBoardPost.module.css';
import { useNavigate } from 'react-router-dom';

const top3List = [
    { hobby: { number: 23, percentage: 63, name: "축구" } },
    { hobby: { number: 33, percentage: 33, name: "농구" } },
    { hobby: { number: 22, percentage: 22, name: "배드민턴" } }
  ];

function HobbyBoardPost() {

    const navigate = useNavigate();

    //취미 상세 페이지 이동 이벤트
    const linkHobby = (hobbyNumber) => {
        navigate(`/hobby-detail/${hobbyNumber}`);
    }

    //취미 목록 페이지 이동 이벤트
    const linkHobbyCategory=()=>{
        navigate('/hobby-board');
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>👑 <span style={{ color: "#FF5391" }}>인기</span> TOP3</div>
            <div className={styles.top3List}>
            
            {top3List.map((item,index) => {
                return <HobbyCard key={index} hobby={item.hobby} linkHobby={linkHobby}/>
            })}
    
            </div>
            <hr />
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
            <div>
                <div className={styles.sort}>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    
                </div>
                <div className={styles.sort}>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                </div>
                <div className={styles.sort}>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                    <Category  linkHobbyCategory={linkHobbyCategory}/>
                </div>
            </div>
        </div>
    );
}

function HobbyCard({hobby,linkHobby}){
    return(
        <div className={styles.top3}  onClick={()=>linkHobby(hobby.number)}>
                    <img src='/img/sampleImg3.png' className={styles.top3Img} alt="농구" />
                    <div className={styles.top3Name}>{hobby.name}</div>
                    <div className={styles.thirdFont}>선호도 : {hobby.percentage}%</div>

                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${hobby.percentage}%` }}
                        ></div>
                    </div>
                </div>
    );
}

function Category({linkHobbyCategory}) {
    return (
            <div className={styles.ctgrContainer} onClick={()=>linkHobbyCategory()}>
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
