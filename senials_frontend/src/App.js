import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PartyMember from "./pages/party/partyMember";
import PartyMeet from "./pages/party/partyMeet";
import PartyReview from "./pages/party/partyReview";
import MypageModify from "./pages/mypage/mypageModify";
import MypageCalender from "./pages/mypage/mypageCalender";
import MypageLike from "./pages/mypage/mypageLike";
import Mypage from "./pages/mypage/mypage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* 매칭 멤버 조회 */}
          <Route path="/partyMember" element={<PartyMember />} />
          {/*매칭게시판 상세 일정 추가*/}
          <Route path="/partyMeet" element={<PartyMeet />} />
            {/*매칭게시판 상세 모임 후기 작성하기*/}
            <Route path="/partyReview" element={<PartyReview />} />

            {/*마이페이지 회원정보 변경*/}
            <Route path="/mypageModify" element={<MypageModify />} />
            {/*마이페이지+캘린더*/}
            <Route path="/mypageCalender" element={<MypageCalender />} />
            {/*취미 관심사 설정*/}
            <Route path="/mypageLike" element={<MypageLike />} />
            {/*사용자 프로필(남보기용)*/}
            <Route path="/mypage" element={<Mypage />} />

            {/*모임 전체 멤버 관리*/}

        </Routes>
      </BrowserRouter>
  );
}

export default App;
