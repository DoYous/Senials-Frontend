import styles from './MypageMember.module.css';
import common from '../common/Common.module.css';
import React, { useState } from "react";
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import {useNavigate} from "react-router-dom";
/*모임 멤버 전체 보기*/
function MypageMember() {
    const navigate = useNavigate();

    /* 이전 페이지로 이동 */
    const handleBack = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 지정된 경로로 이동
    };

    /* 전체 선택 */
    const [selectAll, setSelectAll] = useState(false); /*전체 선택 상태*/
    const [checkedItems, setCheckedItems] = useState(new Array(3).fill(false)); /*각 멤버 선택 상태 근데 데이터양에 따라 달라질게 해야함*/

    const handleSelectAll = () => {
        const newState = !selectAll;
        setSelectAll(newState);
        setCheckedItems(checkedItems.map(() => newState));
    };
    /* 체크 박스 설정 */
    const handleItemClick = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);

        /*전체선택 새로고침*/
        const allSelected = newCheckedItems.every(item => item);
        setSelectAll(allSelected);
    };

    return (
        <div>
            <div className={styles.bigDiv}>
                <div className={styles.modifyDiv}>
                    <div className={styles.bigName}>
                        <FaAngleLeft size={20} onClick={handleBack}/>
                        <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginLeft}`}>모임이름</div>
                            <div className={styles.marginLeft}>- 멤버 목록</div>
                        </div>
                    </div>
                    <hr className={styles.divHr}/>
                </div>
                <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                        <div className={styles.bigSearchDiv}>
                            <div className={styles.flex}>
                                <div onClick={handleSelectAll} style={{ cursor: "pointer" , margin: "0px"}}>
                                    {selectAll ? <MdCheckBox  size={25}/> : <MdCheckBoxOutlineBlank  size={25}/>}
                                </div>
                                <div className={common.secondFont}>전체 선택</div>
                            </div>
                            <div className={styles.smallSearchDiv}>
                                <div className={`${styles.flexDiv} ${styles.searchDiv}`}>
                                    <select className={styles.selectSort}>
                                        <option value="name">이름순</option>
                                        <option value="oldest">오래된 가입일 순</option>
                                        <option value="newest">최근 가입일 순</option>
                                        <option value="participation">일정 참여 횟수 순</option>
                                    </select>
                                </div>
                                <div className={`${styles.flexDiv} ${styles.searchDiv}`}>
                                    <input type="text" placeholder="닉네임 검색" />
                                    <button className={styles.iconDiv}><FaSearch size={20}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 사용자 프로필 이동 */}
                    {checkedItems.map((isChecked, index) => (
                        <Profile
                            key={index}
                            isChecked={isChecked}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
                {/*본인이 만든 모임일시에만 추방버튼 보이게*/}
                <div className={styles.lastBtn}>
                    <button type="submit" className={`${styles.flexDiv} ${common.reportDiv}`}>
                        추방
                    </button>
                </div>
            </div>
        </div>
    );
}

function Profile({ isChecked, onClick }) {
    return (
        <div className={styles.mainContentsDiv}>
            <div className={styles.smallMainContentsDiv}>
                <div className={styles.smallMainContentDiv}>
                    <div onClick={onClick} style={{ cursor: "pointer" }}>
                        {isChecked ? <MdCheckBox size={25}/> : <MdCheckBoxOutlineBlank size={25}/>}
                    </div>
                    <div className={styles.smallContentDiv}>
                        <p className={styles.userProfileDiv}>프로필</p>
                        <div className={styles.bigProfileDiv}>
                            <h3 className={common.secondFont}>멤버 이름</h3>
                            <div className={styles.smallProfileDiv}>
                                <div className={styles.mainContentDiv}>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>가입일</div>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>일정 참여 횟수</div>
                                </div>
                                <div className={styles.mainContentDiv}>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>YY.MM.DD</div>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>n회</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className={`${styles.flexDiv} ${common.reportDiv}`}>
                    <FaBell/>신고
                </button>
            </div>
            <hr className={styles.divHr} />
        </div>
    );
}

export default MypageMember;
