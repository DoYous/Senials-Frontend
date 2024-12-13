import styles from './PartyMeet.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';


function PartyMeetModify() {
    const navigate = useNavigate();
    const { partyNumber } = useParams(); // URL에서 따오기
    const { meetNumber } = useParams();
    const [meetStartDate, setMeetStartDate] = useState("") //시작날짜
    const [meetEndDate, setMeetEndDate] = useState("") //meetEndDate
    const [meetStartTime, setMeetStartTime] = useState("") //meetStartTime
    const [meetEndTime, setMeetEndTime] = useState("") //meetEndTime
    const [meetMaxMember, setMaxMember] = useState("") //meetMaxMember
    const [meetEntryFee, setMeetEntryFee] = useState("") //meetEntryFee
    const [meetLocation, setMeetLocation] = useState("") //meetLocation

       // 정보 가져오기
       useEffect(() => {
        const fetchMeetData = async () => {
            try {
                const response = await axios.get(`/partyboards/${partyNumber}/meets/${meetNumber}`);
                const meetData = response.data.results.meet;
    
                if (!meetData) {
                    throw new Error("데이터가 존재하지 않습니다.");
                }
    
                setMeetStartDate(meetData.meetStartDate || "");
                setMeetEndDate(meetData.meetEndDate || "");
                setMeetStartTime(meetData.meetStartTime || "");
                setMeetEndTime(meetData.meetFinishTime || "");
                setMaxMember(meetData.meetMaxMember || 0);
                setMeetEntryFee(meetData.meetEntryFee || 0);
                setMeetLocation(meetData.meetLocation || "");
            } catch (error) {
                console.error("API 호출 에러:", error.response ? error.response.data : error.message);
            }
        };
    
        fetchMeetData();
    }, []); // 의존성 배열에 아무 값도 넣지 않아 한번만 호출되게 함.


    /* 취소 */
    const handleCancel = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 지정된 경로로 이동
    };

    // 제출 (수정)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.put(`/partyboards/${partyNumber}/meets/${meetNumber}`,{
                meetStartDate: meetStartDate,
                meetEndDate : meetEndDate,
                meetStartTime : meetStartTime,
                meetFinishTime : meetEndTime,
                meetMaxMember : meetMaxMember,
                meetEntryFee : meetEntryFee,
                meetLocation : meetLocation,
            });

            alert("수정되었습니다!");
            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            console.error("수정 중 에러 발생:", error.response ? error.response.data : error.message);
            alert("수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    /* 삭제 */
    const handleRemove = async (event) => {
        event.preventDefault();
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await axios.delete(`/partyboards/${partyNumber}/meets/${meetNumber}`);

                alert("삭제되었습니다!");
                navigate(-1); // 이전 페이지로 이동
            } catch (error) {
                console.error("삭제 중 에러 발생:", error.response ? error.response.data : error.message);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form className={styles.formDiv} onSubmit={handleSubmit}>
                    <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}><div className={styles.pink}>일정</div>을 수정해주세요!</h1>
                    <div className={styles.bigSelectDiv}>

                        <div className={styles.selectDiv}>
                            <div className={styles.flexDiv}>
                                <h7 className={common.secondFont}><label htmlFor="meetStartDate">시작 일정</label></h7>
                                <div className={styles.inputDiv}>
                                    <input type="date" id="meetStartDate" name="meetStartDate"
                                           className={styles.inputStyle}
                                           value={meetStartDate}
                                           onChange={(e) => setMeetStartDate(e.target.value)}
                                           />
                                    <input type="time" id="meetStartTime" name="meetStartTime"
                                           className={`${styles.marginLeft} ${styles.inputStyle}`}
                                           value={meetStartTime}
                                           onChange={(e) => setMeetStartTime(e.target.value)}/>
                                </div>
                            </div>
                            <div className={styles.flexDiv}>
                                <h7 className={common.secondFont}><label htmlFor="meetEndDate">종료 일정</label></h7>
                                <div className={styles.inputDiv}>
                                    <input type="date" id="meetEndDate" name="meetEndDate"
                                           className={styles.inputStyle}
                                           value={meetEndDate}
                                           onChange={(e) => setMeetEndDate(e.target.value)}/>
                                    <input type="time" id="meetEndTime" name="meetEndTime"
                                           className={`${styles.marginLeft} ${styles.inputStyle}`}
                                           value={meetEndTime}
                                           onChange={(e) => setMeetEndTime(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <div className={common.secondFont}>모집인원</div>
                                <div className={styles.inputDiv}>
                                    <input type="number" placeholder="모집인원을 정해주세요!" className={styles.inputStyle}
                                                                            value={meetMaxMember}
                                                                            onChange={(e) => setMaxMember(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <div className={common.secondFont}>참가비용</div>
                                <div className={styles.inputDiv}>
                                    <input type="number" placeholder="참가비용을 정해주세요!" className={styles.inputStyle}
                                                                            value={meetEntryFee}
                                                                            onChange={(e) => setMeetEntryFee(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <h7 className={common.secondFont}>위치</h7>
                                <div className={styles.inputDiv}>
                                    <input type="text" placeholder="정확한 위치를 작성해주세요!" className={styles.inputStyle}
                                                                            value={meetLocation}
                                                                            onChange={(e) => setMeetLocation(e.target.value)}/>
                                </div>
                            </div>
                            <div className={styles.flex}>
                                <button type={"button"} className={styles.uniqueBtn} onClick={handleRemove}>삭제</button>
                                <div className={styles.flex2}>
                                    <button type="button" className={common.commonBtn} onClick={handleCancel}>취소</button>
                                    <button type={"submit"} className={`${common.importantBtn} ${styles.marginLeft}`}>제출</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default PartyMeetModify;