import styles from './MypageModify.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
/*아이콘*/
import { FaAngleLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MypageModify() {
    const [userNumber] = useState(10); //유저 넘버
    const navigate = useNavigate();
    const [nickname, setNickname] = useState(""); // 닉네임
    const [detail, setDetail] = useState(""); // 한줄 소개
    const [profileImg, setProfileImg] = useState(""); // 프로필 이미지

    /* 테스트용 */
    axios.get('/users').then((data) => { console.log(data) });

    /* 이전으로 이동 */
    const handleBack = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 지정된 경로로 이동
    };

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/users/${userNumber}`);
                const userData = response.data.results.user;
                setNickname(userData.userNickname);
                setDetail(userData.userDetail);
                setProfileImg(userData.userProfileImg);
            } catch (error) {
                console.error("에러:", error.response ? error.response.data : error.message);
            }
        };
        fetchUserData();
    }, []);

    // 프로필 사진 변경
    const handleProfileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("profileImage", file);

            try {
                // 이미지 업로드 API 호출
                const response = await axios.post(`/users/${userNumber}/profile/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    alert("프로필 사진이 변경되었습니다.");
                    // 변경된 이미지의 URL을 설정하여 미리보기 업데이트
                    setProfileImg(`/img/userProfile/${userNumber}?t=${new Date().getTime()}`);
                } else {
                    alert("프로필 사진 변경에 실패했습니다.");
                }
            } catch (error) {
                console.error("에러:", error);
                alert("이미지 업로드 중 오류가 발생했습니다.");
            }
        }
    };



    // 데이터 저장 요청
    const handleSave = async () => {
        try {
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

    //프로필 사진
  /*  const imgSrc = `/img/userProfile/${userNumber}`;*/
    const imgSrc = `/img/userProfile/${userNumber}?t=${new Date().getTime()}`;

    return (
        <div>
            <div className={styles.bigDiv}>
                <div className={styles.modifyDiv}>
                    <div className={styles.bigName}>
                        <FaAngleLeft onClick={handleBack} />
                        <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginLeft}`}>회원정보</div>
                            <div className={styles.marginLeft}>변경</div>
                        </div>
                    </div>
                    <hr className={styles.divHr} />
                </div>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                        <div className={styles.mainName}>
                            <div className={`${common.secondFont} ${styles.margin0} ${styles.profileFlex}`}>
                                <img src={imgSrc} className={styles.profile}></img>
                            프로필 사진 변경
                        </div>
                        <label className={styles.profileChange}>
                                <FaArrowUpRightFromSquare size={20} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleProfileChange}
                                />
                            </label>
                        </div>
                        <hr className={styles.divHr} />
                        <div className={styles.flexName}>
                            <p className={`${common.secondFont} ${styles.margin0}`}>닉네임</p>
                            <div className={styles.flex2}>
                                <input
                                    type="text"
                                    className={styles.nickNameDiv}
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                                <button className={`${common.commonBtn} ${styles.marginLeft}`} onClick={handleSave}>변경</button>
                            </div>
                        </div>
                        <hr className={styles.divHr} />
                        <p className={`${common.secondFont} ${styles.margin0}`}>한줄 소개</p>
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
