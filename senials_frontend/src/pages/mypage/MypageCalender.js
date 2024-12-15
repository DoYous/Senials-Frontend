import styles from './MypageCalender.module.css';
import common from '../common/Common.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar"; // 캘린더 컴포넌트
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import {jwtDecode} from "jwt-decode";

function MypageCalender() {

    const { userNumber } = useParams();

    const [events, setEvents] = useState([]); // 사용자 모임 일정
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
    /* 사용자 프로필 */
    const [nickname, setNickname] = useState("");
    const [detail, setDetail] = useState("");
    const [profileImg, setProfileImg] = useState("");

    /* 사용자 관심사 */
    const [favoriteTitles, setFavoriteTitles] = useState([]);

    /* 모임 정보 */
    const [likedPartyCount, setLikedPartyCount] = useState(0); //좋아한 모임 개수
    const [joinedPartyCount, setJoinedPartyCount] = useState(0); // 참여한 모임 개수
    const [madePartyCount, setMadePartyCount] = useState(0); // 만든 모임 개수

    const navigate = useNavigate();

    const [imgSrc, setImgSrc] = useState('/img/defaultProfile.png');
   /* const [userNumber, setUserNumber] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded JWT:", decoded);
                setUserNumber(decoded.userNumber);
                alert(userNumber)// userNumber 상태 설정
            } catch (error) {
                console.error("토큰 디코딩 오류:", error);
                navigate("/login");
            }
        } else {
            alert("로그인이 필요합니다!");
            navigate("/login");
        }
    }, [navigate]);*/

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다!")
                navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
                return;
            }
            const decodedToken = jwtDecode(token); // JWT 디코드
            const userNumber = decodedToken.userNumber; // userNumber 추출
            console.log("fetchuserdata 유저 확인", userNumber)


            if (!userNumber) {
                console.log("사용자가없네 fetchuserdata")
                return;
            }

            try {
                // 사용자 정보
                const userResponse = await axios.get(`/users/${userNumber}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Authorization 헤더 추가
                    }
                });
                const userData = userResponse.data.results.user;

                setNickname(userData.userNickname);
                setDetail(userData.userDetail);
                setProfileImg(userData.userProfileImg);

                // 관심사 정보
                const favoritesResponse = await axios.get(`/users/${userNumber}/favorites`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Authorization 헤더 추가
                    }
                });
                setFavoriteTitles(favoritesResponse.data);

                // 참여한 모임 개수
                const joinedCountResponse = await axios.get(`/users/${userNumber}/parties/count`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Authorization 헤더 추가
                    }
                });
                setJoinedPartyCount(joinedCountResponse.data.results.partiesPartyCount);

                // 만든 모임 개수
                const madeCountResponse = await axios.get(`/users/${userNumber}/made/count`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Authorization 헤더 추가
                    }
                });
                setMadePartyCount(madeCountResponse.data.results.madePartyCount);

                // 좋아한 모임 개수 가져오기
                const likedCountResponse = await axios.get(`/users/${userNumber}/like/count`, {
                    headers: {
                        'Authorization': `${token}` // Authorization 헤더 추가
                    }
                });
                setLikedPartyCount(likedCountResponse.data.results.likesPartyCount);
                // await fetchLikedPartyCount();
            }catch (error) {
                if (error.response && error.response.status === 500) {
                    alert("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
                } else {
                    console.error("에러:", error.response ? error.response.data : error.message);
                    alert("유효하지 않은 토큰입니다. 다시 로그인 해주세요.");
                    navigate('/login');
                }
            }
        };
        fetchUserData();
    }, []);


    // 좋아한 모임 개수 가져오기
    // const fetchLikedPartyCount = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             alert("로그인이 필요합니다!")
    //             navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
    //             return;
    //         }
    //         const decodedToken = jwtDecode(token); // JWT 디코드
    //         const userNumber = decodedToken.userNumber; // userNumber 추출
    //         console.log("fetchLikedPartyCount 유저 확인", userNumber)

    //         const likedCountResponse = await api.get(`/users/${userNumber}/like/count`);
    //         if (likedCountResponse.data && likedCountResponse.data.results) {
    //             setLikedPartyCount(likedCountResponse.data.results.likesPartyCount);
    //         } else {
    //             console.error("Unexpected response format:", likedCountResponse.data);
    //         }
    //     } catch (error) {
    //         console.error("좋아한 모임 개수 가져오기 에러:", error.response ? error.response.data : error.message);
    //     }
    // };


    // 사용자 모임 일정 가져오기
    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다!")
                navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
                return;
            }
            const decodedToken = jwtDecode(token); // JWT 디코드
            const userNumber = decodedToken.userNumber; // userNumber 추출
            console.log("fetchEvents 유저 확인", userNumber);
            if (!userNumber) {
                console.log("사용자가 없다네 fetchevent")
                return;
            }
            try {

                const response = await axios.get(`/users/${userNumber}/meets`);
                setEvents(response.data); // 데이터 설정
            } catch (error) {
                console.error("일정 데이터 가져오기 오류:", error.response ? error.response.data : error.message);
            }
        };
        fetchEvents();
    }, []);

    // 클릭 시 모임 페이지로 이동
    const handleEventClick = (partyBoardNumber) => {
        navigate(`/party/${partyBoardNumber}`);
    };

    // 캘린더 tileContent로 일정 표시
    /*const renderEventTiles = ({ date }) => {
        // 해당 날짜의 일정 필터링
        const dayEvents = events.filter(
            (event) =>
                new Date(event.meetStartDate).toDateString() === date.toDateString()
        );

        // 일정 시간순 정렬
        const sortedEvents = dayEvents.sort((a, b) => {
            const timeA = a.meetStartTime.split(":").map(Number); // "14:00:00" → [14, 0, 0]
            const timeB = b.meetStartTime.split(":").map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1]; // 시간 비교 후 분 비교
        });

        if (sortedEvents.length > 0) {
            return (
                <ul className={styles.eventList}>
                    {sortedEvents.map((event) => {
                        // meetNumber를 기반으로 색상 클래스 결정
                        const colorClass = `color${(event.meetNumber % 5) + 1}`; // 5가지 색상 순환

                        // 시간과 분만 표시
                        const [hours, minutes] = event.meetStartTime.split(":");

                        return (
                            <li
                                key={event.meetNumber}
                                className={`${styles.eventTile} ${styles[colorClass]}`}
                                onClick={() => handleEventClick(event.partyBoardNumber)}
                            >
                                {event.meetLocation} ({hours}:{minutes})
                            </li>
                        );
                    })}
                </ul>
            );
        }
        return null;
    };*/
    const renderEventTiles = ({date}) => {
        const dayEvents = events.filter(
            (event) => new Date(event.meetStartDate).toDateString() === date.toDateString()
        );

        const sortedEvents = dayEvents.sort((a, b) => {
            const timeA = typeof a.meetStartTime === 'string' ? a.meetStartTime.split(":").map(Number) : [0, 0];
            const timeB = typeof b.meetStartTime === 'string' ? b.meetStartTime.split(":").map(Number) : [0, 0];

            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
        });

        if (sortedEvents.length > 0) {
            return (
                <ul className={styles.eventList}>
                    {sortedEvents.map((event) => {
                        const colorClass = `color${(event.meetNumber % 5) + 1}`;
                        const [hours, minutes] = typeof event.meetStartTime === 'string'
                            ? event.meetStartTime.split(":")
                            : ['00', '00']; // 기본값 설정

                        return (
                            <li
                                key={event.meetNumber}
                                className={`${styles.eventTile} ${styles[colorClass]}`}
                                onClick={() => handleEventClick(event.partyBoardNumber)}
                            >
                                {event.meetLocation} ({hours}:{minutes})
                            </li>
                        );
                    })}
                </ul>
            );
        }
        return null;
    };


    /* 탈퇴하기 */
    const handleDeleteUser = async () => {
        // 브라우저 기본 확인 창

        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!")
            navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
            return;
        }
        const decodedToken = jwtDecode(token); // JWT 디코드
        const userNumber = decodedToken.userNumber; // userNumber 추출
        console.log("handledeleteuser 유저 확인", userNumber);

        const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.");
        if (!isConfirmed) {
            return; // 사용자가 취소를 선택하면 함수 종료
        }

        try {
            // REST API 요청으로 사용자 삭제
            await axios.delete(`/users/${userNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // JWT 토큰을 Authorization 헤더에 추가
                }
            });
            localStorage.removeItem("token");

            alert("회원 탈퇴가 성공적으로 처리되었습니다.");

            // 홈 화면으로 이동
            navigate('/');
        } catch (error) {
            console.error('탈퇴 요청 중 에러:', error);
            alert("회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };
    

    // 프로필 사진
/*     const fetchUserProfileImage = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!");
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userNumber = decodedToken.userNumber;

            // 프로필 이미지 URL 설정
            const imageUrl = userNumber ? `/img/userProfile/${userNumber}` : '/img/defaultProfile.png';
            const response = await axios.get(imageUrl, {
                headers: {
                    'Authorization': `Bearer ${token}` // JWT 토큰을 Authorization 헤더에 추가
                }
            });
            // 이미지 데이터 처리 (필요한 경우)
            return response.data; // 이미지 데이터 반환 (필요에 따라)
        } catch (error) {
            console.error("프로필 이미지 가져오기 오류:", error.response ? error.response.data : error.message);
            return '/img/defaultProfile.png'; // 오류가 발생하면 기본 이미지로 설정
        }
    };
 */

// 컴포넌트 내에서 호출
    /* useEffect(() => {
        const imgSrc = fetchUserProfileImage();
        // imgSrc를 상태로 설정하거나 다른 방식으로 사용
    }, []); */

    const handleFavoritesClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!");
            navigate('/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const userNumber = decodedToken.userNumber; // userNumber 추출
            navigate(`/user/${userNumber}/favorites`); // 네비게이션
        } catch (error) {
            console.error("토큰 디코딩 오류:", error);
            alert("유효하지 않은 토큰입니다.");
            navigate('/login');
        }
    };

    const handleLikesClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!");
            navigate('/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const userNumber = decodedToken.userNumber; // userNumber 추출
            navigate(`/user/${userNumber}/likes`); // 네비게이션
        } catch (error) {
            console.error("토큰 디코딩 오류:", error);
            alert("유효하지 않은 토큰입니다.");
            navigate('/login');
        }
    };

    const handlePartiesClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!");
            navigate('/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const userNumber = decodedToken.userNumber; // userNumber 추출
            navigate(`/user/${userNumber}/parties`); // 네비게이션
        } catch (error) {
            console.error("토큰 디코딩 오류:", error);
            alert("유효하지 않은 토큰입니다.");
            navigate('/login');
        }
    };

    const handleMadeClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!");
            navigate('/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const userNumber = decodedToken.userNumber; // userNumber 추출
            navigate(`/user/${userNumber}/made`); // 네비게이션
        } catch (error) {
            console.error("토큰 디코딩 오류:", error);
            alert("유효하지 않은 토큰입니다.");
            navigate('/login');
        }
    };

    const handleModifyClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!");
            navigate('/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const userNumber = decodedToken.userNumber; // userNumber 추출
            navigate(`/user/${userNumber}/modify`); // 네비게이션
        } catch (error) {
            console.error("토큰 디코딩 오류:", error);
            alert("유효하지 않은 토큰입니다.");
            navigate('/login');
        }
    };



    return (
        <div className={styles.bigDiv}>
            {/* 프로필 사진 */}
            <img src={`/img/userProfile/${userNumber}`} className={styles.profile} alt="User Profile" />
            <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                    <span className={common.firstFont}>{nickname}</span>
                    <span className={`${styles.oneLine} ${common.secondFont}`}>{detail}</span>
                </div>
                <div className={styles.hashDiv}>
                    <div className={styles.hash}>
                        {/* 관심사 제목 최대 5개 출력 */}
                        {favoriteTitles.slice(0, 5).map((title, index) => (
                            <p key={index}>{title}</p>
                        ))}
                    </div>
                    <button
                        type={"button"}
                        className={common.commonBtn}
                        onClick={handleFavoritesClick} // 별도의 함수 호출
                    >
                        관심사 설정
                    </button>
                </div>
                <div className={styles.contentsDiv}>
                    <div className={styles.contentDiv1} onClick={handleLikesClick}>
                        <div className={common.secondFont}>좋아요 한 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>{likedPartyCount}</div>
                    </div>
                    <div className={styles.contentDiv2} onClick={handlePartiesClick}>
                        <div className={common.secondFont}>참여 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>
                            {joinedPartyCount}
                        </div>
                    </div>
                    <div className={styles.contentDiv3} onClick={handleMadeClick}>
                        <div className={common.secondFont}>생성 모임</div>
                        <div className={`${styles.gray} ${common.secondFont}`}>
                            {madePartyCount}
                        </div>
                    </div>
                </div>

                <div className={styles.calendarContainer}>
                    <Calendar
                        value={selectedDate}
                        onChange={setSelectedDate}
                        tileContent={renderEventTiles} // 일정 표시
                        className={styles.reactCalendar}
                        // 날짜 칸 css
                        tileClassName={({ activeStartDate, date, view }) =>
                            view === "month" && date.getDate() === new Date().getDate()
                                ? styles.reactCalendarTileActive
                                : styles.reactCalendarTile
                        }
                        // 월 칸 css
                        navigationLabel={({ date, view }) => (
                            <div className={styles.navigationButton}>
                                {view === "month" ? date.toLocaleString("default", { month: "long" }) : null}
                            </div>
                        )}
                    />
                </div>

                <div className={styles.btnDiv}>
                    <button
                        className={`${common.commonBtn} ${styles.marginLeftAuto}`}
                        onClick={handleModifyClick} // 별도의 함수 호출
                    >
                        회원정보 변경
                    </button>
                    <button className={`${common.importantBtn} ${styles.marginLeft}`} onClick={handleDeleteUser}>
                        회원 탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MypageCalender;
