import styles from './mypageMember.module.css';
import common from '../common/common.module.css';
import React, { useState } from "react";
import { FaAngleLeft, FaSearch } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function MypageMember() {
    const [selectAll, setSelectAll] = useState(false); /*전체 선택 상태*/
    const [checkedItems, setCheckedItems] = useState(new Array(3).fill(false)); /*각 멤버 선택 상태 근데 데이터양에 따라 달라질게 해야함*/

    const handleSelectAll = () => {
        const newState = !selectAll;
        setSelectAll(newState);
        setCheckedItems(checkedItems.map(() => newState));
    };

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
                        <FaAngleLeft />
                        <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={styles.pink}>모임이름</div>
                            - 멤버 목록
                        </h1>
                    </div>
                    <hr className={styles.divHr} />
                </div>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                        <div className={styles.bigSearchDiv}>
                            <div onClick={handleSelectAll} style={{ cursor: "pointer" }}>
                                {selectAll ? <MdCheckBox  size={25}/> : <MdCheckBoxOutlineBlank  size={25}/>}
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
                                    <button className={styles.iconDiv}><FaSearch /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {checkedItems.map((isChecked, index) => (
                        <Profile
                            key={index}
                            isChecked={isChecked}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
                <div className={styles.lastBtn}>
                    <button type="submit" className={`${styles.flexDiv} ${styles.reportDiv}`}>
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
                <button type="submit" className={`${styles.flexDiv} ${styles.reportDiv}`}>
                    신고
                </button>
            </div>
            <hr className={styles.divHr} />
        </div>
    );
}

export default MypageMember;
