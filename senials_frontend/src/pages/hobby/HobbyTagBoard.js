import React,{useState, useEffect} from 'react';
import styles from './HobbyBoard.module.css';
import ctr from '../common/MainVer1.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { setHobbyTop3Card } from '../../redux/hobbySlice';
import { setCategories } from '../../redux/categorySlice.js';


function HobbyBoardPost() {

    const dispatch=useDispatch();
    const navigate = useNavigate();

    const top3List=useSelector((state=>state.hobbyTop3List));

    useEffect(() => {
        //취미 top3 조회
        axios.get('/hobby-board/top3')
        .then((response) => {
            dispatch(setHobbyTop3Card(response.data.results.hobby));
        })
        .catch((error) => console.error(error));

        //카테고리 조회
        axios.get('/categories')
        .then(result => {
            dispatch(setCategories(result.data.results.categories));
        })

    }, [dispatch]);


    //취미 상세 페이지 이동 이벤트
    const linkHobbyDetail = (hobbyNumber) => {
        navigate(`/hobby-detail/${hobbyNumber}`);
    }

    //취미 목록 페이지 이동 이벤트
    const linkHobby=()=>{
        navigate('/hobby-board');
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>👑 <span style={{ color: "#FF5391" }}>인기</span> TOP3</div>
            <button className={`${ctr.whiteBtn} ${ctr.mlAuto}`} onClick={() => linkHobby()}>전체보기</button>
            <div className={styles.top3List}>
            
            {top3List.map((item,index) => {
                return <HobbyCard key={index} hobby={item} linkHobby={linkHobbyDetail}/>
            })}
    
            </div>
            <hr />
            <div className={styles.separator}>
                <span className={`${styles.firstFont}`}>
                    카테고리
                </span>
            </div>
              <div className={`${ctr.ctgrRow}`}>
                <Category navigate={navigate}/>
            </div>
        </div>
    );
}

function HobbyCard({ hobby,linkHobby }){
    return(
        <div className={styles.top3} onClick={()=>linkHobby(hobby.hobbyNumber)}>
                    <img src={`/img/hobbyboard/${hobby.hobbyNumber}`} className={styles.top3Img} alt="농구" />
                    <div className={styles.top3Name}>{hobby.hobbyName}</div>
                    <div className={styles.th}>선호도 : {setPercentage(hobby.rating)}%</div>

                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${setPercentage(hobby.rating)}%` }}
                        ></div>
                    </div>
                </div>
    );
}

// 카테고리 카드
function Category({ navigate }) {

    let categories = useSelector((state) => state.categories);
    let length = categories.length;
    let maxLength = 5;

    return (
        <>
        {
            categories.map((category, idx) => {
                

                return (
                    <div key={`categoryCard${idx}`} className={ctr.ctgrContainer} onClick={() => {navigate(`/hobby/board?category=${category.categoryNumber}`)}}>
                        <div className={`${ctr.ctgrImage}`} style={{backgroundImage: `url(/img/category/${category.categoryNumber})`}}>
                            <span className={`${ctr.ctgrText} ${ctr.thirdFont}`}>{category.categoryName}</span>
                        </div>
                    </div>
                )
            })
        }
        {
            length % maxLength != 0 ?
            Array.from({length: maxLength - (length % maxLength)}).map((_, i) => {
                return <div key={`emptyCtgr${i}`} className={`${ctr.emptyCtgrContainer}`} />
            })
            :
            null
        }
        {
            length === 0 ?
            // 결과 없음 안내
            <div className={`${ctr.flexCenter} ${ctr.fullWidth}`}>
                <span className={`${ctr.noSearchResult}`}>서비스 준비 중</span>
            </div>
            :
            null
        }
        </>
    )

}

function setPercentage(rating){
    
    return Math.ceil(rating*20);
}

export default HobbyBoardPost;
