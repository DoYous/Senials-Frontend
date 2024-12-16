import React, {useEffect} from 'react';
import styles from './SuggestHobbyResult.module.css';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { setHobbyDetail,setHobbyTop3Card } from '../../redux/hobbySlice';
import { useSelector,useDispatch } from 'react-redux';
import {jwtDecode} from "jwt-decode";

function SuggestHobbyPost() {

    const dispatch=useDispatch();
    
    const navigate=useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const hobbyAbility = queryParams.get('hobbyAbility');
    const hobbyBudget = queryParams.get('hobbyBudget');
    const hobbyLevel = queryParams.get('hobbyLevel');
    const hobbyTendency = queryParams.get('hobbyTendency');


    const hobbyDetail=useSelector((state)=>state.hobbyDetail);
    const top3List=useSelector((state=>state.hobbyTop3List));
    
    //이전 페이지로 돌아가기 (취소) 이벤트
    const goBack=()=>{
        navigate(-1);
    }

    // 마이페이지 이동 이벤트
    const linkMyPage=()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!")
            navigate('/login'); 
            return;
        }else{
            const decodedToken = jwtDecode(token);
            const userNumber = decodedToken.userNumber;
            navigate(`/user/${userNumber}/favorites`); 
        }
        
    }

    //모임 목록 이동 이벤트
    const linkMyParty=()=>{
        navigate('/party/board');
    }

    //취미 상세 후기 페이지 이동 이벤트
    const linkHobby = (hobbyNumber) => {
        navigate(`/hobby-detail/${hobbyNumber}`);
    }


    useEffect(() => {
        axios.get(`/suggest-hobby-result?hobbyAbility=${hobbyAbility}&hobbyBudget=${hobbyBudget}&hobbyLevel=${hobbyLevel}&hobbyTendency=${hobbyTendency}`)
            .then(response => {
                dispatch(setHobbyDetail(response.data.results.hobby));
            })

        axios.get('/hobby-board/top3')
        .then((response) => {
            dispatch(setHobbyTop3Card(response.data.results.hobby));
        })
    }, [dispatch]);

    return (
        <>
        {console.log(hobbyDetail)}
            <div className={styles.page}>
            <div className={styles.title}>
                이런 <span style={{color:'#FF5391'}}>취미</span> 어떠세요?
            </div>

            <div className={styles.hobby}>
                <div className={styles.resultHobby}>
                    <img src={`/img/hobbyboard/${hobbyDetail.hobbyNumber}`} className={styles.resultHobbyImg} alt="추천 취미" />
                    <div className={styles.resultHobbyName}>
                        <span className={styles.label}>추천 취미:</span> {hobbyDetail.hobbyName}
                    </div>
                    <div className={styles.resultHobbyDetail}>
                        {hobbyDetail.hobbyExplain}
                    </div>
                </div>

                <div className={styles.otherHobby}>
                    <div className={styles.subtitle}>지금  <span style={{color:'#FF5391'}}>핫한</span> 취미들</div>         
                        <div className={styles.otherHobbyDetail}>
                            {top3List.map((item,index) => {
                                 return <OtherHobby key={index} hobby={item} linkHobby={linkHobby}/>
                            })}
                        </div>
                </div>
            </div>

            <div className={styles.selectButton}>
                <button onClick={()=>goBack()}>다시 추천 받기</button>
                <button onClick={()=>linkMyPage()}>나의 취미로 등록</button>
                <button onClick={()=>linkMyParty()}>동일한 취미 모임 찾기</button>
            </div>
            </div>
    
        </>
    );
}

function OtherHobby({ hobby,linkHobby }){
    return(
        <div onClick={()=>linkHobby(hobby.hobbyNumber)}>
            <img src={`/img/hobbyboard/${hobby.hobbyNumber}`} className={styles.otherHobbyImg} alt="다른 취미" />
            <div className={styles.otherHobbyName}>{hobby.hobbyName}</div>
        </div>
    );
}



export default SuggestHobbyPost;
