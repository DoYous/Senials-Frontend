import React from 'react';
import styles from './Header.module.css'
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";

const Header = () => {
    return (
        <>
        <div className={styles.line}></div>
        <div className={styles.header}>
            <img src='/img/Logo.png' alt='Logo' />
            <img src='/img/LogoText.png' alt='Logo Text' />

            <form className={styles.searchBox}>
                <input type="text" placeholder='찾고싶은 모임이나 취미를 검색해보세요!'/>
                <button type="submit" className={styles.searchButton}><FaSearch size={20}/></button>
            </form>

            <img src='/img/suggestHobbyIcon.png' alt='Suggest Hobby Icon' style={{ margin: '0 10px'}} />
            <img src='/img/partyIcon.png' alt='Party Icon' style={{ marginTop: '-5px',marginLeft:'5px', marginRight:'10px'}} />
            <img src='/img/hobbyIcon.png' alt='Hobby Icon' style={{ margin: '0 10px'}}  />
            <img src='/img/mypageIcon.png' alt='My Page Icon' style={{ margin: '0 10px',marginRight:'20px'}}  />
            <button className={styles.loginButton}>로그인</button>
        </div>
        </>
    );
};
export default Header;
