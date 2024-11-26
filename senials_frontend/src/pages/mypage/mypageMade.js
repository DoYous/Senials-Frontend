import styles from './mypageMember.module.css';
import React, { useState, useEffect } from "react";
import common from "../common/common.module.css";
import {FaAngleLeft} from "react-icons/fa";

function MypageMade() {
    return (
        <div className={styles.bigDiv}>
            <div className={styles.modifyDiv}>
                <div className={styles.bigName}>
                    <FaAngleLeft/>
                    <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={`${styles.pink} ${styles.marginLeft}`}>생성</div>
                        <div className={styles.marginLeft}>모임</div>
                    </div>
                </div>
                <hr className={styles.divHr}/>
                <div className={styles.smallDiv}>
                    <div className={styles.mainDiv}>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MypageMade;