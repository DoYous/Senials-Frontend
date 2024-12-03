import React,{useState} from 'react';
import styles from './admin.module.css';

function ManageUser(){
    return(
        <div>
            <div className={styles.adminHeader}>
                <img className={styles.adminLogo} src='/img/adminLogo.png'/>
            </div>

            <div className={styles.adminBody}>
                <div className={styles.nav}>
                    <div className={styles.navButton}>사용자 관리</div>
                    <div className={styles.navButton}>신고 관리</div>
                    <div className={styles.navButton}>게시글 관리</div>
                    <div className={styles.navButton}>카테고리 관리</div>
                    <div className={styles.navButton}>후기 관리</div>
                    <div className={styles.navButton}>트래픽관리 관리</div>
                    <div className={styles.navButton}> 건의 내역관리 관리</div>
                </div>
                <div className={styles.mainBody}>
                    <div className={styles.mainTitle}>
                        사용자 관리
                    </div>
                    <div className={styles.mainDetail}>내용 내용</div>

                    <div className={styles.buttons}>
                        <button className={styles.activeButton}>수정하기</button>
                        <button className={styles.activeButton}>임시활동정지</button>
                        <button className={styles.activeButton}>임시활동정지해제</button>
                        <button className={styles.activeButton}>활동정지</button>
                    </div>
                </div>
              
            </div>
        </div>
    )
}
export default ManageUser;