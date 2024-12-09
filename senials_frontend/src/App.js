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
import ManageUser from "./pages/admin/ManageUser";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage />} />

                    {/* 로그인 페이지 */}
                    <Route path="login" element={<Login />} />

                    {/* 회원가입 페이지 */}
                    <Route path="login/signup" element={<Signup />} />

                    {/*마이페이지*/}
                    <Route path="user" >
                        <Route path=":userNumber">
                            {/*사용자 프로필(남보기용)*/}
                            <Route path="profile" element={<Mypage />} />
                            {/*마이페이지 회원정보 변경*/}
                            <Route path="modify" element={<MypageModify />} />
                            {/*마이페이지+캘린더*/}
                            <Route path="meet" element={<MypageCalender />} />
                            {/*좋아요 한 모임*/}
                            <Route path="likes" element={<MypageLikedParty />}/>
                            {/*참여 한 모임*/}
                            <Route path="parties" element={<MypageParticipate />}/>
                            {/*생성 모임*/}
                            <Route path="made" element={<MypageMade />}/>
                            {/*취미 관심사 설정*/}
                            <Route path="favorites" element={<MypageLike />} />
                        </Route>
                    </Route>

                    {/* 헤더 통합검색 결과 */}
                    <Route path='search-whole' element={<SearchWhole />} />
                      {/*맞춤형 취미 추천 받기 페이지*/}
                    <Route path="/suggest-hobby" element={<SuggestHobbyGet/>}/>
                    {/*맞춤형 취미 추천 결과 페이지*/}
                    <Route path="/suggest-hobby-result" element={<SuggestHobbyPost/>}/>
                    {/*취미 게시판 전체 보기*/}
                    <Route path="/hobby-board" element={<HobbyBoardPost/>}/>
                    {/*취미태그 게시판 전체 보기*/}
                    <Route path="/hobby-tag" element={<HobbyTagBoardPost/>}/>
                    <Route path="/hobby/board" element={<HobbyTagBoardPost/>}/>
                    {/*취미 게시판 상세 보기*/}
                    <Route path="/hobby-detail" element={<HobbyDetailPost/>}/>
                    <Route path="/hobby/:hobbyNumber" element={<HobbyDetailPost/>}/>
                    {/*취미 게시판 후기 작성*/}
                    <Route path="/hobby-review" element={<HobbyReviewGet/>}/>
                    {/*취미 게시판 후기 수정 */}
                    <Route path="/hobby-review-modify" element={<HobbyReviewModify/>}/>
                      
                    <Route path='party'>
                        {/* 모임목록 */}
                        <Route path='board' element={<PartyBoard />} />
                        {/* 모임목록 전체보기 */}
                        <Route path='board-overview' element={<PartyBoardOverview />} />
                        {/* 모임 상세 */}
                        <Route path=':partyNumber'>
                            <Route index element={<PartyDetail />} />
                            {/* 모임후기 작성 */}
                            <Route path="review-write" element={<PartyReview />} />
                            {/* 모임후기 수정 */}
                            <Route path="review-modify" element={<PartyReviewModify />} />
                            {/* 모임 멤버 전체보기*/}
                            <Route path="members" element={<MypageMember />} />
                            {/* 모임 수정 */}
                            <Route path='update' element={<PartyUpdate />} />
                        </Route>
                        {/* 모임 작성 */}
                        <Route path='write' element={<PartyWrite />} />
                    </Route>

                    <Route path="meet">
                        {/*매칭게시판 상세 일정 추가*/}
                        <Route path="write" element={<PartyMeet />} />
                        <Route path=":meetNumber">
                            {/* 모임 일정 수정 */}
                            <Route path="modify" element={<PartyMeetModify />} />
                            {/* 모임 일정 멤버 목록 */}
                            <Route path="members" element={<PartyMember />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="admin">
                    {/*관리자페이지-사용자 관리*/}
                    <Route path="manage-user" element={<ManageUser/>}/>
                </Route>
            </Routes>
            
        </BrowserRouter>
    )
}

export default App;