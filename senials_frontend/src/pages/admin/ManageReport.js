import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';
import AdminNav from './AdminNav.js';

let userData={name:'김상익',path:'http://localhost:3000/admin/manage-report', kind:'재물손괴',reason:'횡령',date:'2024-01-20'}

function ManageReport(){
    return(
        <div>
            <div className={styles.adminHeader}>
                <img className={styles.adminLogo} src='/img/adminLogo.png'/>
            </div>

            <div className={styles.adminBody}>
                <AdminNav/>
                <div className={styles.mainBody}>
                    <div className={styles.mainTitle}>
                        신고 관리
                    </div>
                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>게시글 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>사유</span>
                            <span>날짜</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        <UserData/>
                        <UserData/>
                        <UserData/>
                        </div>
                    </div>

                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>사용자 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>사유</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        <UserData/>
                        <UserData/>
                        <UserData/>
                        </div>
                    </div>

                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>모임 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>사유</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        <UserData/>
                        <UserData/>
                        <UserData/>
                        </div>
                    </div>

                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>취미 후기 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>사유</span>
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
                <span>{userData.path}</span>
                <span>{userData.kind}</span>
                <span>{userData.reason}</span>
                <span>{userData.date}</span>
        </div>
    );
}
export default ManageReport;