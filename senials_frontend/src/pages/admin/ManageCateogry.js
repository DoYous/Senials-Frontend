import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminNav from './AdminNav.js';
import axios from 'axios';
import { MdVisibility } from 'react-icons/md';

function ManageCateogry(){

    const[categoryList,setCatgoryList]=useState([]);
    const[hobbyList,setHobbyList]=useState([]);

    //카테고리 목록 조회
    useEffect(() => {
        axios.get(`/categories`)
        .then((response) => {
            setCatgoryList(response.data.results.categories);
        })
        .catch((error) => {
            console.error('카테고리 목록 조회 에러', error);
        });
    }, []);

      //취미 목록 조회
      const handleChange = (e) => {
        const categoryNumber=(e.target.value);
        if(categoryNumber==0){
            axios.get(`/hobby-board`)
            .then((response)=>{
                setHobbyList(response.data.results.hobby);
               })
               .catch((error)=>{
                console.error('취미 목록 조회 에러', error);
               })
        }
        axios.get(`/hobby-board/${categoryNumber}`)
        .then((response)=>{
         setHobbyList(response.data.results.hobby);
        })
        .catch((error)=>{
         console.error('취미 목록 조회 에러', error);
        })
     };


    const[searchText, setSearchText]=useState("");
    const[filterList,setFilterList]=useState([]);

    //로드시 처음 초기값 전체보기
    useEffect(() => {
        axios.get(`/hobby-board`)
            .then((response) => {
                const hobby = response.data.results.hobby;
                setHobbyList(hobby); 
                setFilterList(hobby);
            })
            .catch((error) => {
                console.error('취미 목록 가져오기 실패:', error);
            });
        },[])

    //검색 텍스트가 변화할 때마다 리스트 내용 변환
    useEffect(() => {
        const filtered = hobbyList.filter(item => 
            item.hobbyName.includes(searchText)
        );
        setFilterList(filtered);
    }, [searchText, hobbyList]); 

      //검색 텍스트 값 변환 핸들러
      const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    
    return(
        <div>
            <div className={styles.adminHeader}>
                <img className={styles.adminLogo} src='/img/adminLogo.png'/>
            </div>

            <div className={styles.adminBody}>
                <AdminNav/>
                <div className={styles.mainBody}>
                    <div className={styles.mainTitle}>
                        카테고리 관리
                    </div>

                    <div className={styles.sub}>
                        <div className={styles.category}>
                            <span className={styles.subTitle}>카테고리 대분류</span>
                            <select onChange={handleChange}>
                                <option value={0}>전체보기</option>
                                {categoryList.map((category)=>(
                                      <option key={category.categoryNumber} value={category.categoryNumber}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        

                        <div className={styles.categoryMainDetail}>
                        <span className={styles.subTitle}>카테고리 소분류</span>
                            <div><input className={styles.searchBox} placeholder='검색' value={searchText} onChange={handleSearchChange}></input></div>
                            <br/>
                            <br/>
                                <div className={styles.mainSubtitle}>
                                    <input type='checkbox' style={{visibility:'hidden'}}></input>
                                    <span>취미명</span>
                                    <span>간단한설명</span>
                                    <span>선호도</span>
                                </div>
                                <hr/>
                                <div className={styles.mainBox}>
                                {filterList.map((item,index)=>(
                                    <HobbyData key={index} hobby={item}/>
                                ))}
                                </div>
                        </div>

                        <div className={styles.categoryButtons}>
                            <button className={styles.activeButton}>추가</button>
                            <button className={styles.activeButton}>수정</button>
                            <button className={styles.activeButton}>삭제</button>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    )
}

function HobbyData({hobby,setPercentage}){

    const [selectedHobby, setSelectedHobby] = useState(null);

    const handleSelect = (hobbyNumber) => {
        setSelectedHobby(hobbyNumber);
    };

    return(
        <div className={styles.mainSubtitle}>

                <input type="radio"
                name="hobbyGroup"
                value={hobby.hobbyNumber}
                checked={selectedHobby === hobby.hobbyNumber}
                onChange={() => handleSelect(hobby.hobbyNumber)}/>

                <span>{hobby.hobbyName}</span>
                <span className={styles.explain}>{hobby.hobbyExplain}</span>
                <span>{setPercentage(hobby.rating)}%</span>
        </div>
    );


    function setPercentage(rating){
        
        return Math.ceil(rating*20);
    }

}

export default ManageCateogry;