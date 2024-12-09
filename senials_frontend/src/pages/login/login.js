import React from 'react';
import { useNavigate } from 'react-router-dom';
// CSS
import styles from './login.module.css';

function Login() {
    const navigate = useNavigate();

    const linkSignup = () => {
        navigate('/login/signup');
    };

    const handleKakaoLogin = () => {
        window.location.href = "/oauth2/authorization/kakao"; // 카카오 로그인 URL로 이동
    };

    return (
        <div className={styles.kakaocontainer}>
            <div className={styles.SimpleLogin}>간편로그인</div>
            <div className={styles.kakaoimageWrapper}>
                <img className={styles.kakaobt} src={'/image/kakaologinbt.png'} alt="카카오 로그인" onClick={handleKakaoLogin} />
            </div>
            <div className={styles.OrgLogin}>일반로그인</div>
            <div className={styles.buttonContainer}>
                <button className={styles.simpleSignupButton} onClick={linkSignup}>
                    일반 회원가입
                </button>
            </div>
        </div>
    );
}

export default Login;
