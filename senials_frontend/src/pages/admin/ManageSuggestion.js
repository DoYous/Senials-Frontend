import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';
import {useDispatch,userSelector, useSelector} from "react-redux";




let userData={name:'김상익',title:'스퀴시라는 취미를 추가해주세요',kind:'취미 추가'}


function ManageSuggestion(){

    let state=useSelector((state)=>state)
    let dispatch=useDispatch()


    return(
        <div>
            <div className={styles.adminHeader}>
                <img className={styles.adminLogo} src='/img/adminLogo.png'/>
            </div>

            <div className={styles.adminBody}>
                <div className={styles.nav}>
                    <div className={styles.navButton}><img src='/img/User.png'/>사용자 관리</div>
                    <div className={styles.navButton}><img src='/img/Bell.png'/>신고 관리</div>
                    <div className={styles.navButton}><img src='/img/BookOpen.png'/>게시글 관리</div>
                    <div className={styles.navButton}><img src='/img/Bookmark.png'/>카테고리 관리</div>
                    <div className={styles.navButton}><img src='/img/checkSquare.png'/>후기 관리</div>
                    <div className={styles.navButton}><img src='/img/GitCommit.png'/>트래픽관리 관리</div>
                    <div className={styles.navButton}><img src='/img/Users.png'/>건의 내역관리 관리</div>
                </div>
                <div className={styles.mainBody}>
                    <div className={styles.mainTitle}>
                        건의 관리
                    </div>
                    
                    <div className={styles.mainDetail}>
                    <div><input className={styles.searchBox} placeholder='검색'></input></div>
                    <br/>
                    <br/>
                        <div className={styles.mainSubtitle}>
                            <span>사용자</span>
                            <span>건의 제목</span>
                            <span>분류</span>
                     
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        <UserData/>
                        <UserData/>
                        <UserData/>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    )
}

function UserData(){
    return(
        <div className={styles.mainSubtitle}>
                <span>{userData.name}</span>
                <span>{userData.title}</span>
                <span>{userData.kind}</span>
        
        </div>
    );
}
export default ManageSuggestion;