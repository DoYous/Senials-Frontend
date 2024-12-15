import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';
import AdminNav from './AdminNav.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



let userData={name:'김상익',title:'스퀴시라는 취미를 추가해주세요',kind:'취미 추가',date:'2024-01-20'}


function ManageSuggestion(){

    const navigate= useNavigate();

    const [suggestionList,setSuggestionList]=useState([]);

    const[searchText, setSearchText]=useState("");
    const[filterList,setFilterList]=useState([]);

    //검색 텍스트가 변화할 때마다 리스트 내용 변환
    useEffect(() => {
        const filtered = suggestionList.filter(item => 
            item.suggestionTitle.includes(searchText)
        );
        setFilterList(filtered);
    }, [searchText, suggestionList]); 

    //검색 텍스트 값 변환 핸들러
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };


    useEffect(()=>{
        axios.get(`/suggestion`)
        .then((response)=>{
            //가장 최신 글이 위로 올라오게끔 변경
            const sortedSuggestions = response.data.results.suggestionDTOList.sort((a, b) => {
                const dateA = new Date(b.suggestionDate);
                const dateB = new Date(a.suggestionDate);
                return dateA - dateB;
            });
            setSuggestionList(sortedSuggestions);
        })
    },[]);

    //건의 글 상세보기
    const linkSuggestion=(suggestionNumber)=>{
        navigate(`/suggestionDetail?suggestionNumber=${suggestionNumber}`);
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
                        건의 관리
                    </div>
                    
                    <div className={styles.mainDetail}>
                    <div><input className={styles.searchBox} placeholder='검색'  value={searchText} onChange={handleSearchChange}></input></div>
                    <br/>
                    <br/>
                        <div className={styles.mainSubtitle}>
                            <span>사용자</span>
                            <span>건의 제목</span>
                            <span>분류</span>
                            <span>날짜</span>
                     
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        {filterList.map((item, index)=>(
                            <UserData key={index} suggestion={item} linkSuggestion={linkSuggestion}/>
                        ))}
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    )
}

function UserData({suggestion,linkSuggestion}){
    return(
        <div className={styles.mainSubtitle} onClick={()=>linkSuggestion(suggestion.suggestionNumber)}>
                <span>{suggestion.userName}</span>
                <span>{suggestion.suggestionTitle}</span>
                <span>{convertSuggestionType(suggestion.suggestionType)}</span>
                <span>{convertDate(suggestion.suggestionDate)}</span>
        </div>
    );
}

function convertSuggestionType(suggestionType){
    switch(suggestionType){
        case 0:
            return "취미추가";
        case 1:
            return "버그제보";
        default:
            return "알수없음"
    }

}

function convertDate(datetime){
    const date = new Date(datetime); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export default ManageSuggestion;