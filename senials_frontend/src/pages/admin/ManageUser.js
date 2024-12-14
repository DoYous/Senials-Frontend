import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';
import {useDispatch,userSelector, useSelector} from "react-redux";




let userData={id:'sangik', name:'김상익',birth:'1999-09-09', email:'sangik9999@naver.com',gender:'male',reportCount:12}


function ManageUser(){

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
                        사용자 관리
                    </div>
                    
                    <div className={styles.mainDetail}>
                    <div><input className={styles.searchBox} placeholder='검색'></input></div>
                    <br/>
                    <br/>
                        <div className={styles.mainSubtitle}>
                            <input type='checkbox'></input>
                            <span>ID</span>
                            <span>NAME</span>
                            <span>BIRTH</span>
                            <span>E-MAIL</span>
                            <span>GENDER</span>
                            <span>REPORT COUNT</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        <UserData/>
                        <UserData/>
                        <UserData/>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.activeButton}>임시활동정지</button>
                        <button className={styles.activeButton}>임시활동정지해제</button>
                        <button className={styles.activeButton}>활동정지</button>
                    </div>
                </div>
              
            </div>
        </div>
    )
}

function UserData(){
    return(
        <div className={styles.mainSubtitle}>
                <input type='checkbox'></input>
                <span>{userData.id}</span>
                <span>{userData.name}</span>
                <span>{userData.birth}</span>
                <span>{userData.email}</span>
                <span>{userData.gender}</span>
                <span>{userData.reportCount}</span>
        </div>
    );
}
export default ManageUser;