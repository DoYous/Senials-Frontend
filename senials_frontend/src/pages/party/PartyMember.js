import styles from './PartyMember.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect, useRef } from "react";
/*리액트 아이콘 사용*/
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';
import createApiInstance from '../common/tokenApi';
import { jwtDecode } from 'jwt-decode';

function PartyMember() {
    
    const navigate = useNavigate();
    const { meetNumber } = useParams();

    /* 이전으로 이동 */
    const handleBefore = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 이전으로 이동
    };

    const [meetMembers, setMeetMembers] = useState([]);
    const [meet, setMeet] = useState({});
    
    const userNumber = useRef(0);

    useEffect(() => {

        const token = localStorage.getItem('token');
        if(token == null) {
            needLogin();
            return;
        } 

        const decodedToken = jwtDecode(token);
        const tokenUserNumber = decodedToken.userNumber;
        if(tokenUserNumber === undefined) {
            needLogin();
            return;
        } else {
            userNumber.current = tokenUserNumber;
        }

        const api = createApiInstance();

        api.get(`/meets/${meetNumber}/meetmembers`)
        .then(response => {
            let results = response.data.results;
    
            setMeetMembers(results.meetMembers);
        })
        .catch(err => {
            wrongRequest();
            return;
        })

        axios.get(`/meets/${meetNumber}`)
        .then(response => {
            let results = response.data.results;

            setMeet(results.meet);
        })


    }, [])

    const needLogin = () => {
        alert('로그인이 필요합니다.');
        navigate('/login');
    }


    const wrongRequest = () => {
        alert('잘못된 요청입니다.');
        navigate('/');
    }

    const handleReportBtn = (targetNumber) => {
        navigate(`/report?type=0&target=${targetNumber}`)
    }


    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <div className={styles.navDiv}>
                    <div className={`${styles.flexDiv} ${styles.bigName}`}>
                        <FaAngleLeft onClick={handleBefore}/>
                        {/* <h1 className={`${styles.marginLeft} ${common.firstFont}`}>모임명 - </h1> */}
                        <h1 className={common.firstFont}>&nbsp;{meet.meetLocation} - {meet.meetStartDate}</h1>
                    </div>
                    {/* <div className={`${styles.flexDiv} ${styles.searchDiv}`}>
                        <input type="text" placeholder="닉네임 검색"/>
                        <button className={styles.iconDiv}><FaSearch size={20}/></button>
                    </div> */}
                </div>
                <hr className={styles.divHr}/>
                {
                    meetMembers.map((meetMember, idx) => 
                        <Profile key={idx} meetMember={meetMember} userNumber={userNumber.current} handleReportBtn={handleReportBtn}/>
                    )
                }
            </div>
        </div>
    );
}

function Profile( {meetMember, userNumber, handleReportBtn} ) {
    return (
            <div className={styles.profile}>
                <div className={styles.bigUserDiv}>
                    <div className={styles.userDiv}>
                        <div className={styles.flexDiv2}>
                            {/*사용자 프로필로 이동*/}
                            <img className={styles.userProfileDiv} src={`/img/userProfile/${meetMember.userNumber}`} />
                            <p className={`${styles.userNameDiv} ${common.secondFont2}`}>{meetMember.userNickname}</p>
                        </div>
                        {
                            userNumber != meetMember.userNumber ?
                            <button type="submit" className={`${styles.flexDiv} ${styles.reportDiv}`} onClick={() => handleReportBtn(meetMember.userNumber)}>
                                {/*신고 페이지 만들어지면 연결*/}
                                <FaBell/>신고
                            </button>
                            :
                            null
                        }
                    </div>
                </div>
                <hr className={styles.divHr}/>
            </div>
        );
}

export default PartyMember;
