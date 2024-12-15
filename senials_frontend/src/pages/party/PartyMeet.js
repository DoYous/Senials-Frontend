import styles from './PartyMeet.module.css';
import common from '../common/Common.module.css';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import createApiInstance from '../common/tokenApi';

function PartyMeet() {
    const api = createApiInstance();
    const navigate = useNavigate();
    const { partyNumber } = useParams(); // partyBoardNumber를 URL에서 가져오기
    const [formData, setFormData] = useState({
        meetStartDate: "",
        meetEndDate: "",
        meetStartTime: "",
        meetEndTime: "",
        meetMaxMember: "",
        meetEntryFee: "",
        meetLocation: ""
    });

    /* 입력값 변경 핸들러 */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /* 취소 */
    const handleCancel = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 이전 페이지로 이동
    };

    /* 제출 */
    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 동작 방지

        const payload = {
            meetStartDate: formData.meetStartDate,
            meetEndDate: formData.meetEndDate,
            meetStartTime: formData.meetStartTime,
            meetFinishTime: formData.meetEndTime,
            meetMaxMember: parseInt(formData.meetMaxMember, 10),
            meetEntryFee: parseInt(formData.meetEntryFee, 10),
            meetLocation: formData.meetLocation
        };

        try {
            const response = await api.post(`/partyboards/${partyNumber}/meets`, payload);
            alert("일정이 성공적으로 추가되었습니다!");
            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            console.error("일정 추가 중 오류 발생:", error);
            alert("일정 추가에 실패하였습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form className={styles.formDiv} onSubmit={handleSubmit}>
                    <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={styles.pink}>일정</div>을 추가해주세요!
                    </h1>
                    <div className={styles.bigSelectDiv}>

                        <div className={styles.selectDiv}>
                            <div className={styles.flexDiv}>
                                <h7 className={common.secondFont}><label htmlFor="meetStartDate">시작 일정</label></h7>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="date"
                                        id="meetStartDate"
                                        name="meetStartDate"
                                        className={styles.inputStyle}
                                        value={formData.meetStartDate}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="time"
                                        id="meetStartTime"
                                        name="meetStartTime"
                                        className={`${styles.marginLeft} ${styles.inputStyle}`}
                                        value={formData.meetStartTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.flexDiv}>
                                <h7 className={common.secondFont}><label htmlFor="meetEndDate">종료 일정</label></h7>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="date"
                                        id="meetEndDate"
                                        name="meetEndDate"
                                        className={styles.inputStyle}
                                        value={formData.meetEndDate}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="time"
                                        id="meetEndTime"
                                        name="meetEndTime"
                                        className={`${styles.marginLeft} ${styles.inputStyle}`}
                                        value={formData.meetEndTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <div className={common.secondFont}>모집인원</div>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="number"
                                        name="meetMaxMember"
                                        placeholder="모집인원을 정해주세요!"
                                        className={styles.inputStyle}
                                        value={formData.meetMaxMember}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <div className={common.secondFont}>참가비용</div>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="number"
                                        name="meetEntryFee"
                                        placeholder="참가비용을 정해주세요!"
                                        className={styles.inputStyle}
                                        value={formData.meetEntryFee}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <h7 className={common.secondFont}>위치</h7>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="text"
                                        name="meetLocation"
                                        placeholder="정확한 위치를 작성해주세요!"
                                        className={styles.inputStyle}
                                        value={formData.meetLocation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.btnDiv}>
                                <button className={`${common.commonBtn} ${styles.marginLeftAuto}`} onClick={handleCancel}>취소</button>
                                <button type="submit" className={`${common.importantBtn} ${styles.marginLeft}`}>제출</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PartyMeet;
