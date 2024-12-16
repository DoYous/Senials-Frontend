import React,{useEffect, useRef, useState} from 'react';
import styles from './Admin.module.css';
import {useDispatch,userSelector, useSelector} from "react-redux";
import AdminNav from './AdminNav.js';
import createApiInstance from '../common/tokenApi.js';


let userData={id:'sangik', name:'김상익',birth:'1999-09-09', email:'sangik9999@naver.com',gender:'male',reportCount:12}


const wrongReqeust = () => {
    alert('잘못된 요청입니다.');
}


function ManageUser(){

    let state=useSelector((state)=>state)
    let dispatch=useDispatch()

    const [api, setApi] = useState();
    const [users, setUsers] = useState([]);
    const [boxChecked, setBoxChecked] = useState([]);
    const [checkedUsers, setCheckedUsers] = useState(new Set());
    const [checkedIdx, setCheckedIdx] = useState(new Set());

    useEffect(() => {

        let api;
        const token = localStorage.getItem('token');
        if(token == null) {
            wrongReqeust();
        }

        setApi(createApiInstance);
        api = createApiInstance();

        api.get('/users-manage')
        .then(response => {
            let results = response.data.results;

            setUsers(results.users);
            let newArr = [];
            newArr.length = results.users.length;
            newArr.fill(false);
            setBoxChecked(newArr);
        })

    }, [])


    const selectUser = (e, userNumber, idx) => {
        const checked = e.target.checked;

        setCheckedUsers(state => {
            let copySet = new Set([...state]);
            if(checked) {
                copySet.add(userNumber);
            } else {
                copySet.delete(userNumber);
            }

            return copySet;
        })

        setCheckedIdx(state => {
            let copySet = new Set([...state]);
            if(checked) {
                copySet.add(idx)
            } else {
                copySet.delete(idx);
            }
            return copySet;
        })

        setBoxChecked(state => {
            let copy = [...state];

            copy[idx] = checked;

            return copy;
        })
    }


    const changeStatus = (status) => {
        let message = status === 0 ? '활동정지 해제' : status === 1 ? '임시 활동정지' : status === 2 ? '활동정지' : '';
        let confirmChange = window.confirm(`[${message}] 하시겠습니까?`);

        if(confirmChange) {

            api.put('/users', {
                checkedUsers: Array.from(checkedUsers)
                , status: status
            })
            .then(response => {
    
                setUsers(state => {
                    let copy = [...state];
    
                    for(let idx of [...checkedIdx]) {
                        copy[idx].userStatus = status;
                    }
                    return copy;
                })

                setBoxChecked(state => {
                    let copy = [...state];
                    copy.fill(false);
                    return copy;
                });
    
                if (state == 0) {
                    alert('임시 활동정지 해제제완료');
                } else if (state == 1) {
                    alert('임시 활동정지 완료')
                } else if (state == 2) {
                    alert('활동정지 완료');
                }
            })
            .catch(err => {
                alert('요청에 실패했습니다.');
            })

        }
    }


    return(
        <div>
            <div className={styles.adminHeader}>
                <img className={styles.adminLogo} src='/img/adminLogo.png'/>
            </div>

            <div className={styles.adminBody}>
                <AdminNav/>
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
                            <span>NICKNAME</span>
                            <span>NAME</span>
                            <span>BIRTH</span>
                            <span>E-MAIL</span>
                            <span>GENDER</span>
                            <span>REPORT COUNT</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        {
                            users.map((user, idx) => {
                                return <UserData key={idx} user={user} idx={idx} boxChecked={boxChecked} selectUser={selectUser} />
                            })
                        }
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.activeButton} onClick={() => changeStatus(1)}>임시활동정지</button>
                        <button className={styles.activeButton} onClick={() => changeStatus(0)}>임시활동정지해제</button>
                        <button className={styles.activeButton} onClick={() => changeStatus(2)}>활동정지</button>
                    </div>
                </div>
              
            </div>
        </div>
    )
}

function UserData({ user, idx, boxChecked, selectUser }){

    let style = user.userStatus == 1 &&
                {color: 'blue'}
                ||
                user.userStatus == 2 &&
                {color: '#999999'}
                ||
                user.userStatus == 0 &&
                {};

    return(
        <>
        <div className={styles.mainSubtitle} style={style}>
                <input type='checkbox' onChange={(e) => selectUser(e, user.userNumber, idx)} value={boxChecked[idx]}></input>
                <span>{user.userNickname}</span>
                <span>{user.userName}</span>
                <span>{user.userBirth}</span>
                <span>{user.userEmail}</span>
                <span>{user.userGender}</span>
                <span>{user.userReportCnt}</span>
        </div>
        </>
    );
}
export default ManageUser;