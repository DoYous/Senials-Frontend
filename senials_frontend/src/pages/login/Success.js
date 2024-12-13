import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

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

    //백엔드로 유저넘버 보내는법
    const sendUserNumber = async () => {
        if (userInfo && userInfo.userNumber) {
            try {
                const response = await axios.post('/sendUserNumber', { //보내고 싶은 get 주소
                    userNumber: userInfo.userNumber,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` // 인증 토큰 추가
                    }
                });

                console.log('서버 응답:', response.data);
            } catch (error) {
                console.error('서버에 데이터 전송 실패:', error);
            }
        } else {
            console.error('사용자 번호가 없습니다.');
        }
    };

    return (
        <div>
            <h2>인증 성공!</h2>
            {userInfo ? (
                <div>
                    <h3>사용자 정보:</h3>
                    <p>이름: {userInfo.nickname || '이름 없음'}</p>
                    <p>이메일: {userInfo.email || '이메일 없음'}</p>
                    <p>성별: {userInfo.gender === 0 ? '남성' : userInfo.gender === 1 ? '여성' : '알 수 없음'}</p>
                    <p>권한: {userInfo.roles ? userInfo.roles.join(', ') : '없음'}</p>
                    <p>상태: {userInfo.userStatus || '상태 없음'}</p>
                    <p>프로필 사진: {userInfo.profileImg ?
                        <img src={userInfo.profileImg} alt="프로필"/> : '사진 없음'}</p>
                    <p>가입 날짜: {userInfo.signupDate || '가입 날짜 없음'}</p>
                    <p>사용자 번호: {userInfo.userNumber || '번호 없음'}</p>
                    <p>신고 카운트: {userInfo.reportCount || '카운트 없음'}</p>
                    <p>사용자 UUID: {userInfo.userUuid || 'UUID 없음'}</p>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <p>사용자 정보를 불러오는 중...</p>
            )}
        </div>
    );
}

export default Success;
