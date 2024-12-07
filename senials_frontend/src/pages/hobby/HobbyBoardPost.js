import React,{useState, useEffect} from 'react';
import styles from './HobbyBoardPost.module.css';
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { setHobbyCard } from '../../redux/hobbySlice';


const top3List = [
    { hobby: { number: 23, percentage: 23, name: "축구" } },
    { hobby: { number: 33, percentage: 33, name: "농구" } },
    { hobby: { number: 22, percentage: 22, name: "배드민턴" } }
  ];

function HobbyBoardPost() {

    const dispatch=useDispatch();
    const hobbyList=useSelector((state)=>state.hobbyList)
    const navigate = useNavigate();

    //검색 텍스트, 필터링 목록
    const[searchText, setSearchText]=useState("");
    const[filterList,setFilterList]=useState([]);

    useEffect(() => {
        axios.get('/hobby-board')
            .then((response) => {
                dispatch(setHobbyCard(response.data.results.hobby));
            })
            .catch((error) => console.error(error));
    }, [dispatch]);

    useEffect(() => {
        console.log(hobbyList);
        setFilterList(hobbyList);
    }, [hobbyList]);


    //취미 상세 후기 페이지 이동 이벤트
    const linkHobbyDetail = (hobbyNumber) => {
        navigate(`/hobby-detail/${hobbyNumber}`);
    }

    //검색 버튼 클릭시 목록 필터링 이벤트
    const textSearch=(e)=>{
        e.preventDefault();

        const filtered=hobbyList.filter(item=>item.hobbyName.includes(searchText));
        setFilterList(filtered);
    }
    return (
        <div className={styles.page}>            
            <div className={styles.title}>👑 <span style={{ color: "#FF5391" }}>인기</span> TOP3</div>
            <div className={styles.top3List}>
                
            {top3List.map((item,index) => {
                return <HobbyCard key={index} hobby={item.hobby} linkHobbyDetail={linkHobbyDetail}/>
            })}
                
            </div>
            <hr />
            <form className={styles.searchBox} onSubmit={textSearch}>
                <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                <button type="submit" className={styles.searchButton}><FaSearch size={20}/></button>
            </form>

            {filterList.map((item,index)=>{
                return <HobbyList key={index} hobby={item} linkHobbyDetail={linkHobbyDetail}/>
            })}
            
            <button className={styles.suggestHobbyButton}>취미 추가 건의</button>
        </div>
    );
}

function HobbyList({hobby,linkHobbyDetail}){
    return(
        <>
        <div className={styles.hobbyList} onClick={()=>linkHobbyDetail(hobby.hobbyNumber)}>
        <img src='/img/sampleImg3.png' className={styles.hobbyImg} alt="축구" />
        <div>
            <div className={styles.hobbyName}>{hobby.hobbyName}</div>

            <div className={styles.thirdFont}>선호도 : {hobby.percentage}%</div>
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${hobby.percentage}%` }}
                ></div>
            </div>
            <div className={styles.hobbyDetail}>{hobby.hobbyExplain}</div>
        </div>
    </div>

    <button className={styles.suggestHobbyButton}>취미 추가 건의</button>
    </>
    );
}

function HobbyCard({ hobby,linkHobby }){
    return(
        <div className={styles.top3} onClick={()=>linkHobby(hobby.number)}>
                    <img src='/img/sampleImg3.png' className={styles.top3Img} alt="농구" />
                    <div className={styles.top3Name}>농구</div>
                    <div className={styles.th}>선호도 : {hobby.percentage}%</div>

                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${hobby.percentage}%` }}
                        ></div>
                    </div>
                </div>
    );
}

export default HobbyBoardPost;
