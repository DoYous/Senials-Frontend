import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';

let userData={name:'김상익',path:'http://localhost:3000/admin/manage-report', kind:'재물손괴',reason:'횡령'}


function ManageReport(){

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
        </div>
    );
}
export default ManageReport;