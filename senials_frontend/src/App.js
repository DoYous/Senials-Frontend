import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './layouts/Layout.js';

import ScrollToTop from './pages/common/ScrollToTop.js'

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

import SuggestHobbyResult from './pages/suggestHobby/SuggestHobbyResult.js';
import SuggestHobby from './pages/suggestHobby/SuggestHobby.js';
import HobbyBoard from './pages/hobby/HobbyBoard.js';
import HobbyDetail from './pages/hobby/HobbyDetail.js';
import HobbyReview from './pages/hobby/HobbyReview.js';
import HobbyReviewModify from './pages/hobby/HobbyReviewModify';
import HobbyTagBoard from './pages/hobby/HobbyTagBoard.js';

import MypageLikedParty from "./pages/mypage/MypageLikedParty";
import MypageMade from "./pages/mypage/MypageMade";
import MypageParticipate from "./pages/mypage/MypageParticipate";
import PartyMeetModify from "./pages/party/PartyMeetModify";
import PartyReviewModify from "./pages/party/PartyReviewModify";

import Login from "./pages/login/Login";
import Join from "./pages/login/Join";
import Success from "./pages/login/Success";
import KakaoCallBack from "./pages/login/KakaoCallBack";

import Suggestion from './pages/admin/Suggestion.js';
import Report from './pages/admin/ReportComponent.js';
import ManageUser from "./pages/admin/ManageUser";
import ManageReport from './pages/admin/ManageReport.js';
import ManageSuggestion from './pages/admin/ManageSuggestion.js';
import ManageCateogry from './pages/admin/ManageCateogry.js';
import SuggestionDetail from './pages/admin/SuggestionDetail.js';


function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage />} />

                    {/* 로그인 페이지 */}
                    <Route path="login" element={<Login />} />
                    <Route path="/login/oauth2/code/kakao" element={<KakaoCallBack />} />

                    {/* 회원가입 페이지 */}
                    <Route path="join" element={<Join />} />
                    {/*test 성공페이지*/}
                    <Route path="success" element={<Success />} />

                    {/* 신고페이지지 */}
                    <Route path="report" element={<Report />} />

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
                    <Route path="/suggest-hobby" element={<SuggestHobby/>}/>
                    {/*맞춤형 취미 추천 결과 페이지*/}
                    <Route path="/suggest-hobby-result" element={<SuggestHobbyResult/>}/>
                    {/*취미 게시판 전체 보기*/}
                    <Route path="/hobby-board" element={<HobbyBoard/>}/>
                    {/*취미태그 게시판 전체 보기*/}
                    <Route path="/hobby-tag" element={<HobbyTagBoard/>}/>
                    <Route path="/hobby/board" element={<HobbyBoard/>}/>
                    {/*취미 게시판 상세 보기*/}
                    <Route path="/hobby-detail/:hobbyNumber" element={<HobbyDetail/>}/>
                    <Route path="/hobby/:hobbyNumber" element={<HobbyDetail/>}/>
                    {/*취미 게시판 후기 작성*/}
                    <Route path="/hobby-review" element={<HobbyReview/>}/>
                    {/*취미 게시판 후기 수정 */}
                    <Route path="/hobby-review-modify" element={<HobbyReviewModify/>}/>
                    {/* 취미 게시판 건의 */}
                    <Route path="/suggestion" element={<Suggestion/>}/>
                    {/* 건의 readOnly */}
                    <Route path="/suggestionDetail" element={<SuggestionDetail/>}/>

                    <Route path='party'>
                        {/* 모임 작성 */}
                        <Route index element={<PartyWrite />} />
                        {/* 모임목록 */}
                        <Route path='board' element={<PartyBoard />} />
                        {/* 모임목록 전체보기 */}
                        <Route path='board-overview' element={<PartyBoardOverview />} />
                        {/* 모임 상세 */}
                        <Route path=':partyNumber'>
                            <Route index element={<PartyDetail />} />
                            {/* 모임후기 작성 */}
                            <Route path="partyreviews" element={<PartyReview />} />
                            {/* 모임후기 수정 */}
                            <Route path="partyreviews/:partyReviewNumber" element={<PartyReviewModify />} />

                            <Route path="meets">
                                <Route index element={<PartyMeet />} />
                                <Route path=":meetNumber">
                                    {/* 모임 일정 수정 */}
                                    <Route index element={<PartyMeetModify />} />
                                    {/* 모임 일정 멤버 목록 */}
                                    <Route path="members" element={<PartyMember />} />
                                </Route>
                            </Route>
                            {/* 모임 수정 */}
                            <Route path='update' element={<PartyUpdate />} />
                            {/* 모임 멤버 전체보기*/}
                            <Route path="members" element={<MypageMember />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="admin">
                    {/*관리자페이지-사용자 관리*/}
                    <Route index element={<ManageUser/>}/>
                    <Route path="manage-user" element={<ManageUser/>}/>
                    {/*관리자페이지-신고 관리*/}
                    <Route path="manage-report" element={<ManageReport/>}/>
                    {/*관리자페이지-건의 관리*/}
                    <Route path="manage-suggestion" element={<ManageSuggestion/>}/>
                    {/*관리자페이지-카테고리 관리*/}
                    <Route path="manage-category" element={<ManageCateogry/>}/>
                </Route>
            </Routes>
            
        </BrowserRouter>
    )
}

export default App;