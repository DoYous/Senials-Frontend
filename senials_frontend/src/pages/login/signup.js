import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
//CSS
import styles from './signup.module.css';

function Signup(){
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 처리 로직 (예: API 호출) 추가
        console.log(formData);
        // 회원가입 후 페이지 이동 (예: 로그인 페이지)
        navigate('/');
    };

    return (
        <div>
            <h1>회원가입 페이지</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /> <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /> <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /> <br />

                <label htmlFor="nickname">닉네임:</label>
                <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                /> <br />

                <label htmlFor="birth">생년월일:</label>
                <input
                    type="date"
                    name="birth"
                    id="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                /> <br />

                <label htmlFor="gender">성별:</label>
                <select
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
                </select> <br />

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;