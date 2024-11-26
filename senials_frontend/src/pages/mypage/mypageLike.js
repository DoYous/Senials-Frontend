import styles from './mypageLike.module.css';
import common from '../common/common.module.css';
import React, { useState } from "react";
/*아이콘*/
import { FaAngleLeft, FaAngleUp, FaAngleDown } from "react-icons/fa6";

function MypageLike() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <div className={styles.bigName}>
                    <div className={styles.bigNameFlex}>
                        <FaAngleLeft size={20}/>
                        <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginName}`}>관심사</div>
                            설정
                        </h1>
                    </div>
                    <button className={`${common.commonBtn} ${styles.saveMargin}`}>저장</button>
                </div>
                <Hash title="운동" />
                <Hash title="독서" />
                <Hash title="여행" />
                <Hash title="음악" />
                <Hash title="게임" />
            </div>
        </div>
    );
}

function Hash({ title }) {
    const [isOpen, setIsOpen] = useState(false);

    /* 접고 펼치기 */
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.hash}>
            <button
                className={styles.contentName}
                onClick={toggleOpen}
            >
                <div className={`${common.secondFont} ${common.marginRight}`}>{title}</div>
                {isOpen ? <FaAngleUp size={20}/> : <FaAngleDown size={20}/>}
            </button>
            {isOpen && (
                <div className={styles.select_hobby_tendency}>
                    <input type="checkbox" id={`${title}_1`} name={`${title}_hobby`} value="1" />
                    <label htmlFor={`${title}_1`} className={common.thirdFont2}>옵션 1</label>
                    <input type="checkbox" id={`${title}_2`} name={`${title}_hobby`} value="2" />
                    <label htmlFor={`${title}_2`} className={common.thirdFont2}>옵션 2</label>
                    <input type="checkbox" id={`${title}_3`} name={`${title}_hobby`} value="3" />
                    <label htmlFor={`${title}_3`} className={common.thirdFont2}>옵션 3</label>
                    <input type="checkbox" id={`${title}_4`} name={`${title}_hobby`} value="4" />
                    <label htmlFor={`${title}_4`} className={common.thirdFont2}>옵션 4</label>
                    <input type="checkbox" id={`${title}_5`} name={`${title}_hobby`} value="5" />
                    <label htmlFor={`${title}_5`} className={common.thirdFont2}>옵션 5</label>
                    <input type="checkbox" id={`${title}_6`} name={`${title}_hobby`} value="6" />
                    <label htmlFor={`${title}_6`} className={common.thirdFont2}>옵션 6</label>
                </div>
            )}
        </div>
    );
}

export default MypageLike;
