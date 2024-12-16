import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './MypageLike.module.css';
import common from '../common/Common.module.css';
import {jwtDecode} from "jwt-decode";

function MypageLike() {
    // const [userNumber] = useState(10);
    const navigate = useNavigate();
    const [favoritesData, setFavoritesData] = useState([]);
    const [groupedData, setGroupedData] = useState({});

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token); // JWT 디코드
    const userNumber = decodedToken.userNumber; // userNumber 추출

    /* 관심사 가져오기 */
    useEffect(() => {
        const fetchFavoriteData = async () => {

            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token); // JWT 디코드
            const userNumber = decodedToken.userNumber; // userNumber 추출

            try {
                const response = await axios.get(`/users/${userNumber}/favoritesAll`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Authorization 헤더 추가
                    }
                });
                const data = response.data;

                // 데이터 가공: 카테고리별로 그룹화
                const grouped = data.reduce((acc, item) => {
                    if (!acc[item.categoryName]) {
                        acc[item.categoryName] = [];
                    }
                    acc[item.categoryName].push(item);
                    return acc;
                }, {});
                setGroupedData(grouped);
            } catch (error) {
                console.error("에러:", error.response ? error.response.data : error.message);
            }
        };
        fetchFavoriteData();
    }, []);

    /* 관심사 저장 */
    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token); // JWT 디코드
        const userNumber = decodedToken.userNumber; // userNumber 추출
        try {
            const updatedFavorites = Object.values(groupedData)
                .flat()
                .filter(item => item.favorite) // 선택된 관심사만 필터링
                .map(item => item.hobbyNumber); // 관심사 번호 추출
            await axios.put(`/users/${userNumber}/favorites`, updatedFavorites, {
                headers: {
                    'Authorization': `Bearer ${token}` // Authorization 헤더 추가
                }
            });
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
                        <FaAngleLeft size={20} onClick={() => navigate(`/user/${userNumber}/meet`)} style={{ cursor: 'pointer' }} />
                        <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginName}`}>관심사</div> 설정
                        </h1>
                    </div>
                    <button className={`${common.commonBtn} ${styles.saveMargin}`} onClick={handleSave}>저장</button>
                </div>
                <div className={styles.maxScroll}>
                    {Object.entries(groupedData).map(([categoryName, hobbies]) => (
                        <CategoryGroup
                            key={categoryName}
                            categoryName={categoryName}
                            hobbies={hobbies}
                            setGroupedData={setGroupedData}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CategoryGroup({ categoryName, hobbies, setGroupedData }) {
    const [isOpen, setIsOpen] = useState(false);

    /*관심사 바꾸기*/
    const handleCheckboxChange = (hobbyNumber, isChecked) => {
        setGroupedData(prevData => {
            const updatedData = { ...prevData };
            const updatedHobbies = updatedData[categoryName].map(hobby =>
                hobby.hobbyNumber === hobbyNumber ? { ...hobby, favorite: isChecked } : hobby
            );
            updatedData[categoryName] = updatedHobbies;
            return updatedData;
        });
    };

    return (
        <div className={styles.hash}>
            <button className={styles.contentName} onClick={() => setIsOpen(!isOpen)}>
                <div className={`${common.secondFont} ${common.marginRight}`}>{categoryName}</div>
                {isOpen ? <FaAngleUp size={20} style={{ cursor: 'pointer' }} /> : <FaAngleDown size={20} style={{ cursor: 'pointer' }} />}
            </button>
            {isOpen && (
                <div className={styles.select_hobby_tendency}>
                    {/* 같은 카테고리끼리 취미 묶기*/}
                    {hobbies.map(hobby => (
                        <div key={hobby.hobbyNumber}>
                            <input
                                type="checkbox"
                                id={`hobby-${hobby.hobbyNumber}`} // 고유한 id 설정
                                checked={hobby.favorite}
                                onChange={(e) => handleCheckboxChange(hobby.hobbyNumber, e.target.checked)} // hobbyNumber로 구분
                            />
                            <label htmlFor={`hobby-${hobby.hobbyNumber}`} className={common.thirdFont2}>
                                {hobby.hobbyName}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}

export default MypageLike;
