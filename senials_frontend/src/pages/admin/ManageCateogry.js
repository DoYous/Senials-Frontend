import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';
import {useDispatch,userSelector, useSelector} from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom';
import AdminNav from './AdminNav.js';


  

function ManageCateogry(){
    
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
                            <select>
                                <option>운동</option>
                                <option>동운운</option>
                            </select>
                        </div>
                        

                        <div className={styles.categoryMainDetail}>
                        <span className={styles.subTitle}>카테고리 소분류</span>
                            <div><input className={styles.searchBox} placeholder='검색'></input></div>
                            <br/>
                            <br/>
                                <div className={styles.mainSubtitle}>
                                    <input type='checkbox'></input>
                                    <span>취미명</span>
                                    <span>간단한설명</span>
                                    <span>선호도</span>
                                </div>
                                <hr/>
                                <div className={styles.mainBox}>
                                <hobbyData/>
                                <hobbyData/>
                                <hobbyData/>
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

function hobbyData(){
    return(
        <div className={styles.mainSubtitle}>
                <input type='checkbox'></input>
                <span>dd</span>
                <span>dd</span>
                <span>dd</span>
                <span>dd</span>
                <span>dd</span>
                <span>Dd</span>
        </div>
    );
}
export default ManageCateogry;