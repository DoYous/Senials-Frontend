import styles from './PartyMeet.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PartyMeetModify() {
    const navigate = useNavigate();
    const { partyNumber, meetNumber } = useParams();

    const [formData, setFormData] = useState({
        meetStartDate: "",
        meetStartTime: "",
        meetEndDate: "",
        meetFinishTime: "",
        participants: "",
        fee: "",
        location: "",
    });

    const [loading, setLoading] = useState(false);

    // 데이터 가져오기
    useEffect(() => {
        setLoading(true);
        fetch(`/partyboards/${partyNumber}/meets/${meetNumber}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch meet data");
                return response.json();
            })
            .then(data => {
                const meet = data.meet;
                setFormData({
                    meetStartDate: meet.startDate,
                    meetStartTime: meet.startDate,
                    meetEndDate: meet.endDate,
                    meetFinishTime: meet.endDate,
                    participants: meet.participants,
                    fee: meet.fee,
                    location: meet.location,
                });
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                alert("데이터를 불러오는 데 실패했습니다.");
                setLoading(false);
            });
    }, [partyNumber, meetNumber]);

    // 데이터 수정
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        fetch(`/partyboards/${partyNumber}/meets/${meetNumber}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                startDate: `${formData.meetStartDate}T${formData.meetStartTime}`,
                endDate: `${formData.meetEndDate}T${formData.meetFinishTime}`,
                participants: formData.participants,
                fee: formData.fee,
                location: formData.location,
            }),
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to save meet data");
                alert("일정이 성공적으로 수정되었습니다!");
                navigate(-1);
            })
            .catch(error => {
                console.error(error);
                alert("일정을 수정하는 데 실패했습니다.");
            })
            .finally(() => setLoading(false));
    };

    // 데이터 삭제
    const handleRemove = () => {
        if (!window.confirm("정말로 이 일정을 삭제하시겠습니까?")) return;
        setLoading(true);
        fetch(`/partyboards/${partyNumber}/meets/${meetNumber}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete meet data");
                alert("일정이 삭제되었습니다!");
                navigate(-1);
            })
            .catch(error => {
                console.error(error);
                alert("일정을 삭제하는 데 실패했습니다.");
            })
            .finally(() => setLoading(false));
    };

    // 입력값 변경 핸들러
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form className={styles.formDiv} onSubmit={handleSubmit}>
                    <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={styles.pink}>일정</div>을 수정해주세요!
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
                                        value={formData.meetFinishTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.flexDiv}>
                                <div className={common.secondFont}>모집인원</div>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="number"
                                        name="participants"
                                        placeholder="모집인원을 정해주세요!"
                                        className={styles.inputStyle}
                                        value={formData.participants}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.flexDiv}>
                                <div className={common.secondFont}>참가비용</div>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="number"
                                        name="fee"
                                        placeholder="참가비용을 정해주세요!"
                                        className={styles.inputStyle}
                                        value={formData.fee}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.flexDiv}>
                                <h7 className={common.secondFont}>위치</h7>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="정확한 위치를 작성해주세요!"
                                        className={styles.inputStyle}
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.flex}>
                                <button type="button" className={styles.uniqueBtn} onClick={handleRemove}>삭제</button>
                                <div className={styles.flex2}>
                                    <button type="button" className={common.commonBtn} onClick={() => navigate(-1)}>취소</button>
                                    <button type="submit" className={`${common.importantBtn} ${styles.marginLeft}`}>제출</button>
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