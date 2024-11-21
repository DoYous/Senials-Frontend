import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './layouts/Layout.js';
import PartyDetail from './pages/party/PartyDetail.js';
import Board from './pages/party/Board.js';
import BoardOverview from './pages/party/BoardOverview.js';
import BoardWrite from './pages/party/BoardWrite.js';
import BoardUpdate from './pages/party/BoardUpdate.js';
import WholeSearch from './pages/search/WholeSearch.js';

import PartyMember from "./pages/party/partyMember";
import PartyMeet from "./pages/party/partyMeet";
import PartyReview from "./pages/party/partyReview";
import MypageModify from "./pages/mypage/mypageModify";
import MypageCalender from "./pages/mypage/mypageCalender";
import MypageLike from "./pages/mypage/mypageLike";
import Mypage from "./pages/mypage/mypage";
import MypageMember from "./pages/mypage/mypageMember";

import SuggestHobbyGet from './pages/suggest-hobby/suggest-hobby-get';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='search-whole' element={<WholeSearch />} />
                    <Route path="/SuggestHobbyGet" element={<SuggestHobbyGet/>}/>
                      
                    <Route path='party'>
                        <Route path='board' element={<Board />} />
                        <Route path='board-overview' element={<BoardOverview />} />
                        <Route path='party-number' element={<PartyDetail />} />
                        <Route path='write' element={<BoardWrite />} />
                        <Route path='update' element={<BoardUpdate />} />
                    </Route>
  
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
                    <Route path="/mypageMember" element={<MypageMember />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
