import React, { useEffect, useState, useRef } from 'react';
import styles1 from './Report.module.css';
import styles2 from '../common/Common.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom';
import createApiInstance from '../common/tokenApi';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function ReportComponent(){

    const navigate = useNavigate();
    const [api, setApi] = useState();

    // 쿼리스트링
    const [searchParams, setSearchParams] = useSearchParams();

    const types = [0, 1, 2, 3];
    const reportTargetType = useRef();
    const reportTargetNumber = useRef();
    const reportTargetParentNumber = useRef();

    const reportTypeInput = useRef();
    const reportDetailInput = useRef();

    const [aboutTarget, setAboutTarget] = useState('');


    useEffect(() => {
        let api = createApiInstance();
        setApi(createApiInstance);

        const token = localStorage.getItem('token');

        if(token == null) {

            needLogin();

        } else {

            let type = parseInt(searchParams.get('type'));
            if(type != NaN && types.includes(type)) {
                reportTargetType.current = type;
            } else {
                wrongRequest();
                return;
            }
    
    
            let target = parseInt(searchParams.get('target'));
            if(target != NaN) {
                reportTargetNumber.current = target;
            } else {
                wrongRequest();
                return;
            }
    
    
            if(searchParams.get('targetParent') != null) {
                let targetParent = parseInt(searchParams.get('targetParent'));
                if(targetParent != NaN) {
                    reportTargetParentNumber.current = targetParent;
                } else {
                    wrongRequest();
                    return;
                }
            }
            
            const fetchUser = () => axios.get(`/users/${reportTargetNumber.current}`);
            const fetchPartyBoard = () => axios.get(`/partyboards/${reportTargetNumber.current}`);
            const fetchPartyReview = () => axios.get(`/partyreviews/${reportTargetNumber.current}`);
            const fetchHobbyReview = () => api.get(`/hobbyreviews/${reportTargetNumber.current}`);
            
            let fetchPromise;
        
            switch (reportTargetType.current) {
                case 0:
                    fetchPromise = fetchUser();
                    break;
                case 1:
                    fetchPromise = fetchPartyBoard();
                    break;
                case 2:
                    fetchPromise = fetchPartyReview();
                    break;
                case 3:
                    fetchPromise = fetchHobbyReview();
                    break;
                default:
                    wrongRequest();
                    return;
            }
        
            fetchPromise
            .then(response => {
                let results = response.data.results;
                switch (reportTargetType.current) {
                    case 0:
                        setAboutTarget(`[사용자] ${results.user.userNickname}`);
                        break;
                    case 1:
                        setAboutTarget(`[모임 게시글] ${results.partyBoard.partyBoardName}`);
                        break;
                    case 2:
                        setAboutTarget(`[모임 후기] ${results.partyReview.partyReviewDetail}`);
                        break;
                    case 3:
                        setAboutTarget(`[취미 후기] ${results.hobbyReview.hobbyReviewDetail}`);
                        break;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                wrongRequest();
                return;
            });

        }

    }, []);

    const needLogin = () => {
        alert('로그인이 필요합니다.');
        navigate('/login');
    }
    
    const wrongRequest = () => {
        alert('잘못된 요청입니다.');
        navigate('/');
    }


    const submitReport = () => {

        let reportData = {
            reportTargetNumber: reportTargetNumber.current
            , reportTargetType: reportTargetType.current
            , reportType: reportTypeInput.current.value
            , reportDetail: reportDetailInput.current.value
        }

        api.post(`/reports`, reportData)
        .then(response => {
            let results = response.data.results;

            alert('신고가 완료되었습니다.');
            navigate(-1);
        })
    }


    return(
        <div className={styles1.container}>
            <div className={`${styles2.firstFont} ${styles1.marginBottom40}`}><span className={styles2.pointColor}>신고</span>하기</div>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>대상</span>
                {

                }
                <input value={aboutTarget} className={styles1.inputLine} readOnly />
            </div>
            
            <br/>

            <div className={styles1.marginBottom40}>
                <span className={styles2.secondFont}>분류</span>
                <select ref={reportTypeInput} className={styles1.selectLine} defaultValue={-1}>
                    <option value={-1} disabled>신고 분류 선택</option>
                    <option value={0}>불법 홍보물 게시</option>
                    <option value={1}>테러 조장</option>
                    <option value={2}>증오 또는 악의적인 콘텐츠</option>
                    <option value={3}>부적절한 닉네임</option>
                </select>
            </div>

            <div className={styles1.marginBottom20}>
                <div className={`${styles2.secondFont} ${styles1.marginBottom20}`}>내용</div>
                <textarea ref={reportDetailInput} className={styles1.textArea} placeholder="경고! 허위 신고 시 재제 받을 수 있습니다. &#13;&#10;상세 사유를 작성해주세요!"></textarea>
            </div>

            <div className={`${styles1.floatRight}`}>
                <button className={styles1.cancleButton} onClick={() => navigate(-1)}>취소</button>
                <button className={styles1.submitButton} onClick={submitReport}>제출</button>
            </div>
        </div>
    )
}

export default ReportComponent;