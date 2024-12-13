import React,{useState} from 'react';
import styles from './Header.module.css'
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const Header = () => {

    const navigate=useNavigate();

    //메인페이지 이동 이벤트
    const linkMain=()=>{
        navigate('/');
    }

    //맞춤형 취미 추천 페이지 이동 이벤트
    const linkSuggestHobby=()=>{
        navigate('/suggest-hobby');
    }

    //취미 목록 페이지 이동 이벤트
    const linkHobby=()=>{
        navigate('/hobby-tag');
    }

    // 마이페이지 이동 이벤트
    const linkMyPage = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!")
            navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
            return;
        }

        const decodedToken = jwtDecode(token); // JWT 디코드
        const userNumber = decodedToken.userNumber; // userNumber 추출

        navigate(`/user/${userNumber}/meet`); // 마이페이지로 이동
    };

    //모임 목록 페이지 이동 이벤트
    const linkParty=()=>{
        navigate('/party/board');
    }

    //로그인 페이지 이동 이벤트
    const linkLogin=()=>{
        navigate('/login');
    }


    //로그아웃처리
    const handleLogout = () => {
        localStorage.removeItem("token"); // 토큰 삭제
        alert("로그아웃 되었습니다.")
        navigate('/login'); // 로그인 페이지로 리다이렉트
    };

    // 토큰 존재 여부 확인
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token; // 토큰이 존재하면 true, 아니면 false

    //키워드 입력 후 페이지 이동
    const [keyword, setKeyword] = useState('');

    //키워드 읽기
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const linkSearch = (e) => {
        e.preventDefault();  
        if (keyword.trim()) {
            navigate(`/search-whole?keyword=${encodeURIComponent(keyword)}`);
        }else{
            alert("빈 상태로 검색을 진행할 순 없습니다.")
        }
    };
   

    return (
        <>
        <div className={styles.line}></div>
        <div className={styles.header}>
            <img src='/img/Logo.png' alt='Logo'/>
            <img src='/img/LogoText.png' alt='Logo Text' onClick={()=>linkMain()}/>

            <form className={styles.searchBox} onSubmit={linkSearch}>
                <input type="text" placeholder='찾고싶은 모임이나 취미를 검색해보세요!' value={keyword}  onChange={handleInputChange}/>
                <button type="submit" className={styles.searchButton}><FaSearch size={20}/></button>
            </form>

            <img src='/img/suggestHobbyIcon.png' alt='Suggest Hobby Icon' style={{ margin: '0 10px'}} onClick={()=>linkSuggestHobby()} />
            <img src='/img/partyIcon.png' alt='Party Icon' style={{ marginTop: '-5px',marginLeft:'5px', marginRight:'10px'}} onClick={()=>linkParty()}/>
            <img src='/img/hobbyIcon.png' alt='Hobby Icon' style={{ margin: '0 10px'}}  onClick={()=>linkHobby()}/>
            <img src='/img/mypageIcon.png' alt='My Page Icon' style={{ margin: '0 10px',marginRight:'20px'}}  onClick={()=>linkMyPage()}/>
            {isLoggedIn ? (
                <button className={styles.loginButton} onClick={handleLogout}>로그아웃</button>
            ) : (
                <button className={styles.loginButton} onClick={linkLogin}>로그인</button>
            )}
        </div>
        </>
    );
};
export default Header;
