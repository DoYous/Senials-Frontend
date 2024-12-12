import React from 'react';
import styles from './Header.module.css'
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

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
    const linkMyPage=(userNumber)=>{
        navigate(`/user/${userNumber}/meet`);
    }

    //모임 목록 페이지 이동 이벤트
    const linkParty=()=>{
        navigate('/party/board');
    }

    //로그인 페이지 이동 이벤트
    const linkLogin=()=>{
        navigate('/login');
    }

    return (
        <>
        <div className={styles.line}></div>
        <div className={styles.header}>
            <img src='/img/Logo.png' alt='Logo' onClick={()=>linkMain()} />
            <img src='/img/LogoText.png' alt='Logo Text' onClick={()=>linkMain()}/>

            <form className={styles.searchBox}>
                <input type="text" placeholder='찾고싶은 모임이나 취미를 검색해보세요!'/>
                <button type="submit" className={styles.searchButton}><FaSearch size={20}/></button>
            </form>

            <img src='/img/suggestHobbyIcon.png' alt='Suggest Hobby Icon' style={{ margin: '0 10px'}} onClick={()=>linkSuggestHobby()} />
            <img src='/img/partyIcon.png' alt='Party Icon' style={{ marginTop: '-5px',marginLeft:'5px', marginRight:'10px'}} onClick={()=>linkParty()}/>
            <img src='/img/hobbyIcon.png' alt='Hobby Icon' style={{ margin: '0 10px'}}  onClick={()=>linkHobby()}/>
            <img src='/img/mypageIcon.png' alt='My Page Icon' style={{ margin: '0 10px',marginRight:'20px'}}  onClick={()=>linkMyPage()}/>
            <button className={styles.loginButton} onClick={()=>linkLogin()}>로그인</button>
        </div>
        </>
    );
};
export default Header;
