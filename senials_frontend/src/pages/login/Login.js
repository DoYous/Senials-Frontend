import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// CSS
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');

    const linkSignup = () => {
        navigate('/join');
    };

    const handleKakaoLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/init-kakao-login'); // 백엔드에서 카카오 로그인 초기화
            const { authUrl } = response.data; // 백엔드에서 전달받은 카카오 인증 URL

            alert("카카오 인증 URL: " + authUrl);

            // 카카오 인증 URL로 리다이렉트
            window.location.href = authUrl;
        } catch (error) {
            console.error('카카오 로그인 초기화 오류:', error);
        }
    };

    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = async () => {
        setErrorMessage('');
        try {
            const response = await axios.post('/login', {
                userName,
                userPwd
            });

            // 로그인 성공 시 처리
            console.log('로그인 성공:', response.data);
            const token = response.data.token; // 서버에서 받은 JWT
            localStorage.setItem("token", token); // JWT를 로컬 스토리지에 저장

            navigate('/success'); // 성공 페이지로 리다이렉트
        } catch (error) {
            if (error.response) {
                console.error('서버 응답 실패:', error.response.data);
                setErrorMessage(error.response.data.message || '로그인 실패');
            } else if (error.request) {
                console.error('요청이 이루어졌지만 응답이 없음:', error.request);
            } else {
                console.error('설정 중 오류 발생:', error.message);
            }
        }
    };

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token'); // URL에서 token 추출

        if (token) {
            // JWT가 URL 파라미터에 있을 경우
            localStorage.setItem("token", token); // JWT를 로컬 스토리지에 저장
            console.log('JWT 저장 완료:', token);
            navigate('/success'); // 성공 페이지로 리다이렉트
        }
    }, [navigate]);

    return (
        <div className={styles.kakaocontainer}>
            <div className={styles.SimpleLogin}>로그인</div>
            <div className={styles.OrginputContainer}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={styles.OrginputField}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={userPwd}
                    onChange={(e) => setUserPwd(e.target.value)}
                    className={styles.OrginputField}
                />
                <button className={styles.OrgloginButton} onClick={handleLogin}>
                    확인
                </button>
            </div>
            <div className={styles.kakaoimageWrapper}>
                <img className={styles.kakaobt} src={'/image/kakaologinbt.png'} alt="카카오 로그인" onClick={handleKakaoLogin} />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.simpleSignupButton} onClick={linkSignup}>
                    일반 회원가입
                </button>
            </div>
        </div>
    );
}

export default Login;
