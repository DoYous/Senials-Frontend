import styles from './MypageModify.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
/*아이콘*/
import {FaAngleLeft} from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import axios from "axios";

{/*마이페이지 회원정보 변경*/}
function MypageModify() {

    const navigate = useNavigate();
    const [nickname, setNickname] = useState(""); // 닉네임
    const [detail, setDetail] = useState(""); // 한줄 소개
    const [profileImg, setProfileImg] = useState(""); // 프로필 이미지

    /* 테스트용 */
    axios.get('/users').then((data)=>{console.log(data)});

    /* 이전으로 이동 */
    const handleBack = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 지정된 경로로 이동
    };

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const userNumber = 1; // 사용자 아이디 - 나중에 받아와야함
                const response = await axios.get(`/users/${userNumber}`);

                const userData = response.data.results.user;
                setNickname(userData.userNickname);
                setDetail(userData.userDetail);
                setProfileImg(userData.userProfileImg);
            } catch (error) {
                console.error("에러:",  error.response ? error.response.data : error.message);
            }
        };
        fetchUserData();
    }, []);

    // 데이터 저장 요청
    const handleSave = async () => {
        try {
            const userNumber = 1; // 사용자 아이디 - 나중에 받아와야함
            const response = await axios.put(`/users/${userNumber}/modify`, {
                userNickname: nickname,
                userDetail: detail,
                userProfileImg: profileImg
            });
            alert("저장 성공");
        } catch (error) {
            console.error("에러:", error);
            alert("저장 실패");
        }
    };


    return (
        <div>
            <div className={styles.bigDiv}>
                <div className={styles.modifyDiv}>
                    <div className={styles.bigName}>
                        <FaAngleLeft onClick={handleBack}/>
                        <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginLeft}`}>회원정보</div>
                            <div className={styles.marginLeft}>변경</div>
                        </div>
                    </div>
                    <hr className={styles.divHr}/>
                </div>
                <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                    <div className={styles.mainName}>
                        <div className={`${common.secondFont} ${styles.margin0} ${styles.profileFlex}`}>
                            <div className={styles.profile}>
                           {/* <div className={styles.profile} onChange={(e) => setProfileImg(e.target.value)}>*/}
                            </div>프로필 사진 변경</div>
                        <button className={styles.profileChange}>
                        <FaArrowUpRightFromSquare size={20}/>
                        </button>
                    </div>
                    <hr className={styles.divHr}/>
                    <div className={styles.flexName}>
                        <p className={`${common.secondFont} ${styles.margin0}`}>닉네임</p>
                        <div className={styles.flex2}>
                            {/*기존 닉네임*/}
                            <input
                                type="text"
                                className={styles.nickNameDiv}
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            {/*변경 누르면 변경되게 */}
                            <button className={`${common.commonBtn} ${styles.marginLeft}`} onClick={handleSave}>변경</button>
                        </div>
                    </div>
                    <hr className={styles.divHr}/>
                    <p className={`${common.secondFont} ${styles.margin0}`}>한줄 소개</p>
                    {/*기존 소개문*/}
                    <textarea
                        className={styles.contentDiv}
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                    />
                    <div className={styles.saveDiv}>
                        <button type={"submit"} className={`${common.commonBtn} ${styles.saveMargin}`} onClick={handleSave}>저장</button>
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
}

export default MypageModify;
