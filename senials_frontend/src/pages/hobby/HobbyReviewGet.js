import React from 'react';
import styles from "./HobbyReviewGet.module.css";

function HobbyReviewGet() {
    return (
        <div className={styles.body}>
            <div className={styles.write_review}>
                <div className={styles.title}>후기를 적어주세요!</div>
                <div className={styles.write_date}>작성일자 2024-10-07</div>
                <div className={styles.review_point}>
                    <div className={styles.text}>평점을 매겨주세요!</div>
                    <div className={styles.star_point}>*****</div>
                </div>

                <form className={styles.write_review_detail}>
                    <div>후기 내용</div>
                    <input type='text' className={styles.input_text} />
                    <div className={styles.select_hobby_ability}>
                        <div>몸이 불편하신 곳이 있을까요?</div>
                        <input type="radio" id="ability-yes" name="hobby_ability" value="y" />
                        <label htmlFor="ability-yes">예</label>
                        <input type="radio" id="ability-no" name="hobby_ability" value="n" />
                        <label htmlFor="ability-no">아니요</label>
                    </div>
                    <div className={styles.select_hobby_tendency}>
                        <div>다신의 성향은 어떤가요?</div>
                        <input type="radio" id="tendency-in" name="hobby_tendency" value="in" />
                        <label htmlFor="tendency-in">내향적</label>
                        <input type="radio" id="tendency-out" name="hobby_tendency" value="out" />
                        <label htmlFor="tendency-out">외향적</label>
                    </div>
                    <div className={styles.select_hobby_budget}>
                        <div>지출범위</div>
                        <input type="radio" id="budget" name="hobby_budget" value="" />
                        <label htmlFor="budget">1~1000000000</label>
                    </div>
                    <div className={styles.select_hobby_level}>
                        <div>난이도</div>
                        <input type="radio" id="level-1" name="hobby_level" value="1" />
                        <label htmlFor="level-1">쉬움</label>
                        <input type="radio" id="level-2" name="hobby_level" value="2" />
                        <label htmlFor="level-2">좀 쉬움</label>
                        <input type="radio" id="level-3" name="hobby_level" value="3" />
                        <label htmlFor="level-3">평범</label>
                        <input type="radio" id="level-4" name="hobby_level" value="4" />
                        <label htmlFor="level-4">좀 어려움</label>
                        <input type="radio" id="level-5" name="hobby_level" value="5" />
                        <label htmlFor="level-5">어려움</label>
                    </div>
                    <div className={styles.button_container}>
                        <button>취소</button>
                        <input type='submit' value="제출" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HobbyReviewGet;
