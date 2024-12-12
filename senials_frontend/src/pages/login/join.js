import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CSS
import styles from './join.module.css';

function Join() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        nickname: '',
        birth: '',
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            userName: formData.username,
            userPwd: formData.password,
            userEmail: formData.email,
            userNickname: formData.nickname,
            userBirth: formData.birth,
            userGender: formData.gender
        };

        try {
            const response = await fetch('/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData), // 변경된 requestData 사용
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '회원가입에 실패했습니다.');
            }

            const data = await response.json();
            console.log('회원가입 성공:', data.message);
            alert('회원가입에 성공했습니다.')
            navigate('/login');
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
        }
    };




    return (
        <div className={styles.signupcontainer}>
            <h1 className={styles.signuptitle}>회원가입 페이지</h1>
            <hr className={styles.signupdivider} />
            <form className={styles.signupform} onSubmit={handleSubmit}>
                <input
                    className={styles.signupinput}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.signupinput}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.signupinput}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="nickname">닉네임:</label>
                <input
                    className={styles.signupinput}
                    type="text"
                    name="nickname"
                    id="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="birth">생년월일:</label>
                <input
                    className={styles.signupinput}
                    type="date"
                    name="birth"
                    id="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="gender">성별:</label>
                <select
                    className={styles.signupselect}
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">선택하세요</option>
                    <option value="0">남성</option>
                    <option value="1">여성</option>
                    <option value="2">기타</option>
                </select>
                <button className={styles.signupbutton} type="submit">
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Join;
