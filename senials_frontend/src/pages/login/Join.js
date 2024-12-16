import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CSS
import styles from './Join.module.css';

function Join() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

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
        }finally {
            setIsLoading(false)
        }
    };




    return (
                <div className={styles.bigDiv}>
                            <div className={styles.smallDiv}>
            <h1 className={styles.signuptitle}>회원가입</h1>
            <form className={styles.signupform} onSubmit={handleSubmit}>
            <label htmlFor="username">이름</label>
                <input
                    className={styles.signupinput}
                    type="text"
                    name="username"
                    placeholder="정확한 이름을 기입해주세요!"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
                <label htmlFor="password">비밀번호</label>
                <input
                    className={styles.signupinput}
                    type="password"
                    name="password"
                    placeholder="영문,숫자,특수문자 포함해서 작성해주세요!"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
                <label htmlFor="email">이메일</label>
                <input
                    className={styles.signupinput}
                    type="email"
                    name="email"
                    placeholder="이메일 형식 지켜서 작성해주세요!"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
                <label htmlFor="nickname">닉네임</label>
                <input
                    className={styles.signupinput}
                    type="text"
                    name="nickname"
                    id="nickname"
                    placeholder="등록되어 있지 않은 이름을 작성해주세요!"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
                <label htmlFor="birth">생년월일</label>
                <input
                    className={styles.signupinput}
                    type="date"
                    name="birth"
                    id="birth"
                    placeholder="생년원일"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
                <label htmlFor="gender">성별</label>
                <select
                    className={styles.signupselect}
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                >
                    <option value="">성별 선택</option>
                    <option value="0">남성</option>
                    <option value="1">여성</option>
                    <option value="2">기타</option>
                </select>
                <button
                    className={styles.signupbutton} type="submit"
                    disabled={isLoading} // 로딩 중에는 클릭 비활성화
                >
                    {isLoading ? '회원가입 중...' : '회원가입'}
                </button>
            </form>
        </div>
        </div>
    );
}

export default Join;
