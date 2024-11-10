import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PartyMember from "./pages/party/partyMember";
import PartyMeet from "./pages/party/partyMeet";
import PartyReview from "./pages/party/partyReview";

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
        </Routes>
      </BrowserRouter>
  );
}

export default App;
