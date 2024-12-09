import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CSS
import styles from './login.module.css';

function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const linkSignup = () => {
        navigate('/login/signup');
    };

    const handleKakaoLogin = () => {
        window.location.href = "/login/oauth2/authorization/kakao"; // 카카오 로그인 URL로 이동
    };

    const handleLogin = () => {
        // 여기에서 로그인 로직을 추가합니다.
        console.log('아이디:', userId);
        console.log('비밀번호:', password);
        // 로그인 요청을 서버에 보내는 로직을 추가할 수 있습니다.
    };

    return (
        <div className={styles.kakaocontainer}>
            <div className={styles.SimpleLogin}>간편로그인</div>
            <div className={styles.kakaoimageWrapper}>
                <img className={styles.kakaobt} src={'/image/kakaologinbt.png'} alt="카카오 로그인" onClick={handleKakaoLogin} />
            </div>
            <div className={styles.OrgLogin}>일반로그인</div>

            <div className={styles.OrginputContainer}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className={styles.OrginputField}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.OrginputField}
                />
                <button className={styles.OrgloginButton} onClick={handleLogin}>
                    확인
                </button>
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
