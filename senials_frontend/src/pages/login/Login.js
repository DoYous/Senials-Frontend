import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// CSS
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleLogin = async () => {
        setErrorMessage('');
        setIsLoading(true); // 로딩 시작
        try {
            const response = await axios.post('/login', {
                userName,
                userPwd
            });

            // 로그인 성공 시 처리
            console.log('로그인 성공:', response.data);
            const token = response.data.token; // 서버에서 받은 JWT
            localStorage.setItem("token", token); // JWT를 로컬 스토리지에 저장

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const redirectPath = urlParams.get('redirect') || '/'; // 쿼리 파라미터에서 redirect 경로를 가져오고, 없으면 '/'로 설정

            navigate(redirectPath); // 이전 페이지로 리다이렉트
        } catch (error) {
            if (error.response) {
                alert("없는 사용자이거나 아이디나 비밀번호가 틀렸습니다.")
                console.error('서버 응답 실패:', error.response.data);
                setErrorMessage(error.response.data.message || '로그인 실패');
            } else if (error.request) {
                console.error('요청이 이루어졌지만 응답이 없음:', error.request);
            } else {
                console.error('설정 중 오류 발생:', error.message);
            }
        } finally {
            setIsLoading(false); // 로딩 종료
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
         <div className={styles.bigDiv}>
                    <div className={styles.smallDiv}>
        <div className={styles.kakaocontainer}>
            <h1 className={styles.SimpleLogin}>로그인</h1>
            <div className={styles.OrginputContainer}>
                <input
                    type="text"
                    placeholder="이름"
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
                <button
                    className={styles.OrgloginButton}
                    onClick={handleLogin}
                    disabled={isLoading} // 로딩 중에는 클릭 비활성화
                >
                    {isLoading ? '로그인 중...' : '확인'} {/* 로딩 중일 때 텍스트 변경 */}
                </button>
                {/*{errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>} /!* 에러 메시지 표시 *!/*/}
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.simpleSignupButton} onClick={linkSignup}>
                    일반 회원가입
                </button>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Login;
