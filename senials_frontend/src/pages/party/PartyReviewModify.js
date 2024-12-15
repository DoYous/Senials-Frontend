import styles from './PartyReview.module.css';
import common from '../common/Common.module.css';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import api from '../common/tokenApi';
import createApiInstance from '../common/tokenApi';

const wrongRequest = () => {
    alert('잘못된 접근입니다.');
}

function PartyReviewModify() {

    const [api, setApi] = useState(null);
    
    const navigate = useNavigate();
    const { partyNumber } = useParams(); // URL에서 따오기
    const { partyReviewNumber } = useParams();
    const [meetStartDate, setMeetStartDate] = useState(""); // 시작 날짜
    const [meetStartTime, setMeetStartTime] = useState(""); // 시작 시간
    const [rating, setRating] = useState(0);                // 별점
    const [content, setContent] = useState("");             // 내용


    // 정보 가져오기
    useEffect(() => {
    const fetchMeetData = async () => {

        const token = localStorage.getItem('token');
        if(token == null) {
            wrongRequest();
        }
        
        const api = createApiInstance();

        try {
            const response = await api.get(`/partyboards/${partyNumber}/partyreviews/${partyReviewNumber}`);
            const meetData = response.data.results;

            if (!meetData) {
                throw new Error("데이터가 존재하지 않습니다.");
            }

            setMeetStartDate(meetData.startDate || "");
            setMeetStartTime(meetData.startTime || "");
            setRating(meetData.rating || 0);
            setContent(meetData.content || "");
        } catch (error) {
            console.error("API 호출 에러:", error.response ? error.response.data : error.message);
        }
    };

    fetchMeetData();
}, []); // 의존성 배열에 아무 값도 넣지 않아 한번만 호출되게 함.


    // 제출 (수정)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.put(`/partyboards/${partyNumber}/partyreviews/${partyReviewNumber}`,{
                partyReviewRate: rating,
                partyReviewDetail: content,
                partyReviewWriteDate: `${meetStartDate}T${meetStartTime}`,
            });
            alert("수정되었습니다!");
            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            console.error("수정 중 에러 발생:", error.response ? error.response.data : error.message);
            alert("수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 삭제
    const handleRemove = async (event) => {
        event.preventDefault();
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await axios.delete(`/partyboards/${partyNumber}/partyreviews/${partyReviewNumber}`);

                alert("삭제되었습니다!");
                navigate(-1); // 이전 페이지로 이동
            } catch (error) {
                console.error("삭제 중 에러 발생:", error.response ? error.response.data : error.message);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    // 취소
    const handleCancel = (event) => {
        event.preventDefault();
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className={styles.bigDiv}>
            <div className={styles.smallDiv}>
                <form className={styles.formDiv} onSubmit={handleSubmit}> {/* 폼 제출용 */}
                    <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
                        <div className={styles.pink}>후기</div>
                        를 수정해주세요!
                    </h1>
                    <div className={styles.bigSelectDiv}>
                        <div className={styles.selectDiv}>
                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}><label htmlFor="meetStartDate">최초 가입일</label></p>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="date"
                                        id="meetStartDate"
                                        name="meetStartDate"
                                        className={styles.inputStyle}
                                        value={meetStartDate}
                                        onChange={(e) => setMeetStartDate(e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        id="meetStartTime"
                                        name="meetStartTime"
                                        className={`${styles.marginLeft} ${styles.inputStyle}`}
                                        value={meetStartTime}
                                        onChange={(e) => setMeetStartTime(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.flexDiv}>
                                <p className={common.secondFont}>평점을 매겨주세요!</p>
                                <Star rating={rating} setRating={setRating} />
                            </div>

                            <div className={styles.contentDiv}>
                                <p className={common.secondFont}>내용</p>
                                <textarea
                                    className={styles.textDiv}
                                    id="content"
                                    name="content"
                                    placeholder="활동이 어땠는지 당신의 이야기를 적어주세요!"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className={styles.pDiv}>
                                <p className={`${common.thirdFont} ${styles.pDiv2}`}>1000자 내외</p>
                            </div>

                            <div className={styles.flex}>
                                <button
                                    type="button"
                                    className={styles.uniqueBtn}
                                    onClick={handleRemove}
                                >
                                    삭제
                                </button>
                                <div className={styles.flex2}>
                                    <button
                                        type="button"
                                        className={common.commonBtn}
                                        onClick={handleCancel}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className={`${styles.importantBtn} ${styles.marginLeft}`}
                          
                                    >
                                        제출
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* 별점 매기기 */
function Star({ rating, setRating }) {
    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        setSelectedRating(rating); // 부모 컴포넌트에서 전달받은 값으로 초기화
    }, [rating]);

    const handleStarClick = (index) => {
        setSelectedRating(index);
        setRating(index);
    };

    return (
        <div className={styles.rateInfo}>
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    className={`${styles.baseStar} ${star <= selectedRating ? styles.filledStar : ""}`}
                    onClick={() => handleStarClick(star)}
                />
            ))}
        </div>
    );
}

export default PartyReviewModify;
