import React from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './Admin.module.css';


function AdminNav(){
    const navigate = useNavigate();
     
        const linkManageUser=()=>{
        navigate('/admin/manage-user');
        }
        const linkManageReport=()=>{
        navigate('/admin/manage-report');
        }
        const linkManageCategory=()=>{
        navigate('/admin/manage-category');
        }
        const linkManageSuggestion=()=>{
        navigate('/admin/manage-suggestion');
        }
    return(
         <div className={styles.nav}>
            <div className={styles.navButton} onClick={linkManageUser}><img src='/img/User.png'/>사용자 관리</div>
            <div className={styles.navButton} onClick={linkManageReport}><img src='/img/Bell.png'/>신고 관리</div>
            {/* <div className={styles.navButton}><img src='/img/BookOpen.png'/>게시글 관리</div> */}
            <div className={styles.navButton} onClick={linkManageCategory}><img src='/img/Bookmark.png'/>카테고리 관리</div>
            {/* <div className={styles.navButton}><img src='/img/checkSquare.png'/>후기 관리</div>
            <div className={styles.navButton}><img src='/img/GitCommit.png'/>트래픽관리 관리</div> */}
            <div className={styles.navButton} onClick={linkManageSuggestion}><img src='/img/Users.png'/>건의 내역관리 관리</div>
        </div>
    )
}
export default AdminNav;