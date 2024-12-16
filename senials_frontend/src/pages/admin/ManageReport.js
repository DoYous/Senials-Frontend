import React,{useEffect, useState} from 'react';
import styles from './Admin.module.css';
import AdminNav from './AdminNav.js';
import createApiInstance from '../common/tokenApi.js';
import { useNavigate } from 'react-router-dom';


const typeWriter = (type) => {
    switch(type) {
        case 0:
            return '불법 홍보물 게시';
            break;
        case 1:
            return '테러 조장';
            break;
        case 2:
            return '증오 또는 악의적인 콘텐츠'
            break;
        case 3:
            return '부적절한 닉네임'
            break;
    }
}


function ManageReport(){

    const navigate = useNavigate();

    const [partyBoardReports, setPartyBoardReports] = useState([]);
    const [userReports, setUserReports] = useState([]);
    const [partyReviewReports, setPartyReviewReports] = useState([]);
    const [hobbyReviewReports, setHobbyReviewReports] = useState([]);


    useEffect(() => {

        let api = createApiInstance();

        Promise.all([ 
            api.get(`/reports?type=${0}`)
            , api.get(`/reports?type=${1}`)
            , api.get(`/reports?type=${2}`)
            , api.get(`/reports?type=${3}`)
        ])
        .then(responses => {
            setUserReports(responses[0].data.results.reports);
            setPartyBoardReports(responses[1].data.results.reports);
            setPartyReviewReports(responses[2].data.results.reports);
            setHobbyReviewReports(responses[3].data.results.reports);
            console.log(responses[2])
        })
        .catch(() => {
            wrongRequest();
        })


    }, [])


    const wrongRequest = () => {
        alert('잘못된 요청입니다.');
        navigate(-1);
    }

    return(
        <div>
            <div className={styles.adminHeader}>
                <img className={styles.adminLogo} src='/img/adminLogo.png'/>
            </div>

            <div className={styles.adminBody}>
                <AdminNav/>
                <div className={styles.mainBody}>
                    <div className={styles.mainTitle}>
                        신고 관리
                    </div>

                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>사용자 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>상세 사유</span>
                            <span>날짜</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        {
                            userReports.map((report, idx) => {
                                return <Report key={idx} report={report} type={0} />
                            })
                        }
                        {
                            userReports.length == 0 &&
                            <span className={`${styles.noData}`}>해당 신고 내역이 없습니다.</span>
                        }
                        </div>
                    </div>

                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>모임 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>상세 사유</span>
                            <span>날짜</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        {
                            partyBoardReports.map((report, idx) => {
                                return <Report key={idx} report={report} type={1} />
                            })
                        }
                        {
                            partyBoardReports.length == 0 &&
                            <span className={`${styles.noData}`}>해당당 신고 내역이 없습니다.</span>
                        }
                        </div>
                    </div>

                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>모임 후기 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>상세 사유</span>
                            <span>날짜</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        {
                            partyReviewReports.map((report, idx) => {
                                return <Report key={idx} report={report} type={2} />
                            })
                        }
                        {
                            partyReviewReports.length == 0 &&
                            <span className={`${styles.noData}`}>해당당 신고 내역이 없습니다.</span>
                        }
                        </div>
                    </div>

                    <div className={styles.reportMainDetail}>
                        <span className={styles.subTitle}>취미 후기 신고 내역</span>
                        <input className={styles.searchBox} placeholder='검색'></input>
                        <div className={styles.mainSubtitle}>
                            <span>신고자</span>
                            <span>신고대상</span>
                            <span>분류</span>
                            <span>상세 사유</span>
                            <span>날짜</span>
                        </div>
                        <hr/>
                        <div className={styles.mainBox}>
                        {
                            hobbyReviewReports.map((report, idx) => {
                                return <Report key={idx} report={report} type={3} />
                            })
                        }
                        {
                            hobbyReviewReports.length == 0 &&
                            <span className={`${styles.noData}`}>해당당 신고 내역이 없습니다.</span>
                        }
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    )
}


function Report( { report, type } ){

    const navigate = useNavigate();

    return(
        <div className={styles.mainSubtitle}>
                <span>{`${report?.reporter.userNickname}(${report?.reporter.userName})`}</span>
                <span className={`${styles.link}`}>
                {
                    type === 0 &&
                    <span onClick={() => navigate(`/user/${report?.userNumber}/profile`)}>
                        {`${report?.user.userNickname}(${report?.user.userName})`}
                    </span>
                    ||
                    type === 1 &&
                    <span onClick={() => navigate(`/party/${report?.partyBoardNumber}`)}>
                        {`${report?.partyBoardName}`}
                    </span>
                    ||
                    type === 2 &&
                    <span onClick={() => navigate(`/party/${report?.partyBoardNumber}/partyreviews/${report?.partyReviewNumber}`)}>
                        {`${report?.partyReviewDetail}`}
                    </span>
                    ||
                    type === 3 &&
                    <span onClick={() => navigate(`/hobby-review-modify?hobbyNumber=${report?.hobbyNumber}&review=${report?.hobbyReviewNumber}`)}>
                        {`${report?.hobbyReviewDetail}`}
                    </span>
                }
                </span>
                <span>{typeWriter(report?.reportType)}</span>
                <span>{report?.reportDetail}</span>
                <span>{(report?.reportDate).replace('T', ' ').substring(0, report?.reportDate.lastIndexOf(':'))}</span>
        </div>
    );
}
export default ManageReport;
