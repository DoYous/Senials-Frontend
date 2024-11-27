import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './layouts/Layout.js';

import MainPage from './pages/mainpage/MainPage.js';

import PartyDetail from './pages/party/PartyDetail.js';
import PartyBoard from './pages/party/PartyBoard.js';
import PartyBoardOverview from './pages/party/PartyBoardOverview.js';
import PartyWrite from './pages/party/PartyWrite.js';
import PartyUpdate from './pages/party/PartyUpdate.js';
import SearchWhole from './pages/search/SearchWhole.js';

import PartyMember from "./pages/party/PartyMember";
import PartyMeet from "./pages/party/PartyMeet";
import PartyReview from "./pages/party/PartyReview";
import MypageModify from "./pages/mypage/MypageModify";
import MypageCalender from "./pages/mypage/MypageCalender";
import MypageLike from "./pages/mypage/MypageLike";
import Mypage from "./pages/mypage/Mypage";
import MypageMember from "./pages/mypage/MypageMember";

import SuggestHobbyGet from './pages/suggestHobby/SuggestHobbyGet.js';
import SuggestHobbyPost from './pages/suggestHobby/SuggestHobbyPost.js';
import HobbyBoardPost from './pages/hobby/HobbyBoardPost.js';
import HobbyDetailPost from './pages/hobby/HobbyDetailPost.js';
import HobbyReviewGet from './pages/hobby/HobbyReviewGet';
import HobbyReviewModify from './pages/hobby/HobbyReviewModify';
import HobbyTagBoardPost from './pages/hobby/HobbyTagBoardPost';
import MypageLikedParty from "./pages/mypage/MypageLikedParty";
import MypageMade from "./pages/mypage/MypageMade";
import MypageParticipate from "./pages/mypage/MypageParticipate";
import PartyMeetModify from "./pages/party/PartyMeetModify";
import PartyReviewModify from "./pages/party/PartyReviewModify";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path='search-whole' element={<SearchWhole />} />
                      {/*맞춤형 취미 추천 받기 페이지*/}
                    <Route path="/suggest-hobby" element={<SuggestHobbyGet/>}/>
                    {/*맞춤형 취미 추천 결과 페이지*/}
                    <Route path="/suggest-hobby-result" element={<SuggestHobbyPost/>}/>
                    {/*취미 게시판 전체 보기*/}
                    <Route path="/hobby-board-all" element={<HobbyBoardPost/>}/>
                    {/*취미태그 게시판 전체 보기*/}
                    <Route path="/hobby-tag-board" element={<HobbyTagBoardPost/>}/>
                    {/*취미 게시판 상세 보기*/}
                    <Route path="/hobby-detail" element={<HobbyDetailPost/>}/>
                    {/*취미 게시판 후기 작성*/}
                    <Route path="/hobby-review" element={<HobbyReviewGet/>}/>
                    {/*취미 게시판 후기 수정 */}
                    <Route path="/hobby-review-modify" element={<HobbyReviewModify/>}/>
                      
                    <Route path='party'>
                        <Route path='board' element={<PartyBoard />} />
                        <Route path='board-overview' element={<PartyBoardOverview />} />
                        <Route path='party-number' element={<PartyDetail />} />
                        <Route path='write' element={<PartyWrite />} />
                        <Route path='update' element={<PartyUpdate />} />
                        {/*매칭 게시판 일정 멤버 확인*/}
                        <Route path="member" element={<PartyMember />} />
                        {/*매칭 게시판 일정 멤버 관리*/}

                        {/*매칭게시판 상세 일정 추가*/}
                        <Route path="meet" element={<PartyMeet />} />
                        {/*매칭게시판 상세 일정 수정*/}
                        <Route path="meet-modify" element={<PartyMeetModify />} />
                        {/*매칭게시판 상세 모임 후기 작성하기*/}
                        <Route path="review" element={<PartyReview />} />
                        {/*매칭게시판 상세 모임 후기 수정하기*/}
                        <Route path="review-modify" element={<PartyReviewModify />} />
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
                        {/*좋아요 한 모임*/}
                        <Route path="likedparty" element={<MypageLikedParty />}/>
                        {/*참여 한 모임*/}
                        <Route path="participate" element={<MypageParticipate />}/>
                        {/*생성 모임*/}
                        <Route path="made" element={<MypageMade />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;