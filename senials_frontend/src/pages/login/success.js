import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Success() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUserInfo(decoded); // 사용자 정보 상태에 저장
        } catch (error) {
            console.error('토큰 디코드 오류:', error);
            navigate('/login'); // 오류 발생 시 로그인 페이지로 리다이렉트
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // 토큰 삭제
        navigate('/login'); // 로그인 페이지로 리다이렉트
    };

    return (
        <div>
            <h2>인증 성공!</h2>
            {userInfo ? (
                <div>
                    <h3>사용자 정보:</h3>
                    <p>이름: {userInfo.sub || '이름 없음'}</p>
                    <p>이메일: {userInfo.email || '이메일 없음'}</p>
                    <p>성별: {userInfo.gender || '성별 없음'}</p>
                    <p>권한: {userInfo.roles ? userInfo.roles.join(', ') : '없음'}</p>
                    <p>상태: {userInfo.status || '상태 없음'}</p>
                    <p>프로필 사진: {userInfo.profile_picture ?
                        <img src={userInfo.profile_picture} alt="프로필"/> : '사진 없음'}</p>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <p>사용자 정보를 불러오는 중...</p>
            )}
        </div>
    );
}

export default Success;
