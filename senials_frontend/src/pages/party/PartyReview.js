import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PartyReview.module.css";
import common from "../common/Common.module.css";
import createApiInstance from "../common/tokenApi";

function PartyReview() {
  const [api, setApi] = useState(null);
  const navigate = useNavigate();
  const { partyNumber } = useParams(); // URL에서 partyBoardNumber 가져오기
  const [review, setReview] = useState({
    meetStartDate: "",
    meetStartTime: "",
    rating: 0,
    content: "",
  });

  useEffect(() => {
    setApi(() => {
      return createApiInstance();
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleStarClick = (index) => {
    setReview({ ...review, rating: index });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const partyReviewData = {
      partyBoardNumber: parseInt(partyNumber, 10),
      partyReviewRate: review.rating,
      partyReviewDetail: review.content,
    };

    try {
      let jsonData = JSON.stringify(partyReviewData);
      const response = await api.post(
        `/partyboards/${partyNumber}/partyreviews`,
        jsonData,
        {
          headers: {
            "Content-Type": 'application/json'
          }
        }
      );
      if (response.status === 200) {
        alert("제출되었습니다!");
        navigate(-1);
      }
    } catch (error) {
      console.error("후기 제출 실패:", error);
      alert("후기 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.bigDiv}>
      <div className={styles.smallDiv}>
        <div className={styles.formDiv}>
          <h1 className={`${styles.nameflexDiv} ${common.firstFont}`}>
            <div className={styles.pink}>후기</div>를 작성해주세요!
          </h1>
          <div className={styles.bigSelectDiv}>
            <div className={styles.selectDiv}>
              <div className={styles.flexDiv}>
                <p className={common.secondFont}>
                  <label htmlFor="meetStartDate">최초가입일</label>
                </p>
                <div className={styles.inputDiv}>
                  <input
                    type="date"
                    id="meetStartDate"
                    name="meetStartDate"
                    className={styles.inputStyle}
                    value={review.meetStartDate}
                    onChange={handleInputChange}
                  />
                  <input
                    type="time"
                    id="meetStartTime"
                    name="meetStartTime"
                    className={`${styles.marginLeft} ${styles.inputStyle}`}
                    value={review.meetStartTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles.flexDiv}>
                <p className={common.secondFont}>평점을 매겨주세요!</p>
                <div className={styles.rateInfo}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`${styles.baseStar} ${
                        star <= review.rating ? styles.filledStar : ""
                      }`}
                      onClick={() => handleStarClick(star)}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.contentDiv}>
                <p className={common.secondFont}>내용</p>
                <textarea
                  className={styles.textDiv}
                  id="content"
                  name="content"
                  placeholder="활동이 어땠는지 당신의 이야기를 적어주세요!"
                  value={review.content}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className={styles.pDiv}>
                <p className={`${common.thirdFont} ${styles.pDiv2}`}>
                  1000자 내외
                </p>
              </div>
              <div className={styles.btnDiv}>
                <button
                  type="button"
                  className={`${common.commonBtn} ${styles.marginLeftAuto}`}
                  onClick={handleCancel}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`${styles.importantBtn} ${styles.marginLeft}`}
                >
                  제출
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartyReview;
