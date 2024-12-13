import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallBack = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code"); // 카카오에서 전달된 인증 코드

    useEffect(() => {
        const kakaoLogin = async () => {
            if (!code) {
                navigate('/login'); // 코드가 없으면 로그인 페이지로 리다이렉트
                return;
            }

            try {
                const response = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                });

                console.log(response.data); // 응답 데이터 확인

                // 데이터 접근 시 조건부 접근 사용
                const kakaoName = response.data.account ? response.data.account.kakaoName : '이름 없음';
                const token = response.data.token; // 서버에서 받은 JWT

                localStorage.setItem('token', token); // JWT를 로컬 스토리지에 저장
                localStorage.setItem("name", kakaoName); // 카카오 이름 저장

                navigate('/success'); // 성공 페이지로 리다이렉트
            } catch (error) {
                console.error('카카오 로그인 오류:', error);
                navigate('/login'); // 오류 발생 시 로그인 페이지로 리다이렉트
            }
        };

        kakaoLogin();
    }, [code, navigate]);

    return (
        <div className="LoginHandler">
            <div className="notice">
                <p>로그인 중입니다.</p>
                <p>잠시만 기다려주세요.</p>
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default KakaoCallBack;
