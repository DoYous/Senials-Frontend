import styles from './MypageLike.module.css';
import common from '../common/Common.module.css';
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MypageLike() {
    const navigate = useNavigate();
    const [favoritesData, setFavoritesData] = useState([]);

    /* 관심사 가져오기 */
    useEffect(() => {
        const fetchFavoriteData = async () => {
            try {
                const userNumber = 1; // 사용자 아이디
                const response = await axios.get(`/users/${userNumber}/favoritesAll`);
                setFavoritesData(response.data);
            } catch (error) {
                console.error("에러:", error.response ? error.response.data : error.message);
            }
        };
        fetchFavoriteData();
    }, []);

    /* 관심사 저장 */
    const handleSave = async () => {
        try {
            const userNumber = 1; // 사용자 아이디
            const updatedFavorites = favoritesData
                .filter(item => item.favorite) // 선택된 관심사만 필터링
                .map(item => item.hobbyNumber); // 관심사 번호 추출
            console.log(typeof(JSON.stringify(updatedFavorites)));
            await axios.put(`/users/${userNumber}/favorites`, updatedFavorites);
            alert("저장 성공");
        } catch (error) {
            console.error("에러:", error);
            alert("저장 실패");
        }
    };

    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <div className={styles.bigName}>
                    <div className={styles.bigNameFlex}>
                        <FaAngleLeft size={20} onClick={() => navigate(`/user/1/meet`)} style={{ cursor: 'pointer' }} />
                        <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginName}`}>관심사</div> 설정
                        </h1>
                    </div>
                    <button className={`${common.commonBtn} ${styles.saveMargin}`} onClick={handleSave}>저장</button>
                </div>

                {favoritesData.map((data, index) => (
                    <Hash
                        key={index}
                        {...data}
                        onFavoriteChange={(isFavorite) => {
                            const updatedData = [...favoritesData];
                            updatedData[index].favorite = isFavorite;
                            setFavoritesData(updatedData);
                            console.log(updatedData);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function Hash({ hobbyNumber, categoryName, hobbyName, favorite, onFavoriteChange }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.hash}>
            <button className={styles.contentName} onClick={() => setIsOpen(!isOpen)}>
                <div className={`${common.secondFont} ${common.marginRight}`}>{categoryName}</div>
                {isOpen ? <FaAngleUp size={20} style={{ cursor: 'pointer' }} /> : <FaAngleDown size={20} style={{ cursor: 'pointer' }} />}
            </button>
            {isOpen && (
                <div className={styles.select_hobby_tendency}>
                    <input
                        type="checkbox"
                        id={hobbyName}
                        checked={favorite}
                        onChange={(e) => onFavoriteChange(e.target.checked)}
                    />
                    <label htmlFor={hobbyName} className={common.thirdFont2}>{hobbyName}</label>
                </div>
            )}
        </div>
    );
}

export default MypageLike;
