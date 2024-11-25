import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './layouts/Layout.js';

import MainPage from './pages/mainpage/MainPage.js';

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
import SuggestHobbyPost from './pages/suggest-hobby/suggest-hobby-post';
import HobbyBoardPost from './pages/hobby/hobby-board-post';
import HobbyDetailPost from './pages/hobby/HobbyDetailPost.js';
import HobbyReviewGet from './pages/hobby/HobbyReviewGet';
import HobbyReviewModify from './pages/hobby/HobbyReviewModify';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path='search-whole' element={<WholeSearch />} />
                    <Route path="/SuggestHobbyGet" element={<SuggestHobbyGet/>}/>
                    {/*맞춤형 취미 추천 결과 페이지*/}
                    <Route path="/SuggestHobbyPost" element={<SuggestHobbyPost/>}/>
                    {/*취미 게시판 전체 보기*/}
                    <Route path="/HobbyBoardPost" element={<HobbyBoardPost/>}/>
                    {/*취미 게시판 상세 보기*/}
                    <Route path="/HobbyDetailPost" element={<HobbyDetailPost/>}/>
                    {/*취미 게시판 후기 작성*/}
                    <Route path="/HobbyReviewGet" element={<HobbyReviewGet/>}/>
                    {/*취미 게시판 후기 수정 */}
                    <Route path="/HobbyReviewModify" element={<HobbyReviewModify/>}/>
                      
                    <Route path='party'>
                        <Route path='board' element={<Board />} />
                        <Route path='board-overview' element={<BoardOverview />} />
                        <Route path='party-number' element={<PartyDetail />} />
                        <Route path='write' element={<BoardWrite />} />
                        <Route path='update' element={<BoardUpdate />} />
                        {/*매칭 게시판 멤버 확인*/}
                        <Route path="member" element={<PartyMember />} />
                        {/*매칭게시판 상세 일정 추가*/}
                        <Route path="meet" element={<PartyMeet />} />
                        {/*매칭게시판 상세 모임 후기 작성하기*/}
                        <Route path="review" element={<PartyReview />} />
                    </Route>

                    <Route path='mypage'>
                        {/*마이페이지 회원정보 변경*/}
                        <Route path="modify" element={<MypageModify />} />
                        {/*마이페이지+캘린더*/}
                        <Route path="calender" element={<MypageCalender />} />
                        {/*취미 관심사 설정*/}
                        <Route path="like" element={<MypageLike />} />
                        {/*사용자 프로필(남보기용)*/}
                        <Route path="" element={<Mypage />} />
                        {/*모임 전체 멤버 관리*/}
                        <Route path="member" element={<MypageMember />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;