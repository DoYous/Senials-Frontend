import styles from './MypageMember.module.css';
import common from '../common/Common.module.css';
import React, { useEffect, useState } from "react";
import {FaAngleLeft, FaBell, FaSearch} from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { partyBoardDetail, setPartyBoardDetail } from '../../redux/partySlice';
import axios from 'axios';
import createApiInstance from '../common/tokenApi';

/*모임 멤버 전체 보기*/
function MypageMember() {

    const { partyNumber } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* 이전 페이지로 이동 */
    const handleBack = (event) => {
        event.preventDefault(); // 기본 동작 방지
        navigate(-1); // 지정된 경로로 이동
    };

    const [pageNumber, setPageNumber] = useState(0);
    const [members, setMembers] = useState([]);
    const [checked, setChecked] = useState(new Set());
    const [hasMoreMembers, setHasMoreMembers] = useState(true);

    const partyBoard = useSelector(state => state.partyBoardDetail);

    /* 추방 버튼 클릭 이벤트 */

    const api = createApiInstance();

    useEffect(() => {
        
        if(!partyBoard.hasOwnProperty('partyBoardNumber') || partyBoard.partyBoardNumber != partyNumber){
            api.get(`/partyboards/${partyNumber}`)
            .then(response => {
                let results = response.data.results;
                
                let partyBoardDetail = results.partyBoard;
                partyBoardDetail.partyMaster = results.partyMaster;
                partyBoardDetail.myReview = results.myReview;
                partyBoardDetail.isLiked = results.isLiked;
                partyBoardDetail.isMember = results.isMember;
                partyBoardDetail.isMaster = results.isMaster;
                partyBoardDetail.randMembers = results.randMembers;
    
                dispatch(setPartyBoardDetail(results.partyBoard));
            })
        }

        api.get(`/partyboards/${partyNumber}/partymembers-page?pageNumber=${pageNumber}`)
        .then(response => {
            let results = response.data.results;
            
            setMembers(results.partyMembers.map(partyMember => {
                return {
                    partyMemberNumber: partyMember.partyMemberNumber
                    ,meetJoinedCnt: partyMember.meetJoinedCnt
                    , info: partyMember.user
                    , isChecked: false
                }
            }));

            if(results.partyMembers.length === 0) {
                setHasMoreMembers(false);
            }
        })
        .catch(err => {
            alert(err.response.data.message);
        })

    }, [])


    const loadMoreMembers = () => {

        api.get(`/partyboards/${partyNumber}/partymembers-page?pageNumber=${pageNumber + 1}`)
        .then(response => {
            let results = response.data.results;
            
            setMembers(state => {
                let added = results.partyMembers.map(partyMember => {
                    return {
                        partyMemberNumber: partyMember.partyMemberNumber
                        ,meetJoinedCnt: partyMember.meetJoinedCnt
                        , info: partyMember.user
                        , isChecked: false
                    }
                })
                
                return [...state, ...added];
            });
            
            setPageNumber(state => state + 1);
            if(results.partyMembers.length === 0) {
                setHasMoreMembers(false);
            }
        })
    }

    
    /* 체크 박스 설정 */
    const handleItemClick = (index) => {
        setMembers(members => {
            let copy = [...members];
            copy[index] = {...copy[index], isChecked: !copy[index].isChecked};

            return copy;
        });

        setChecked(checked => {
            let checkedCopy = new Set(checked);

            if(members[index].isChecked) {
                checkedCopy.delete(members[index].partyMemberNumber);
            }else {
                checkedCopy.add(members[index].partyMemberNumber);
            }
            
            return checkedCopy;
        })
    };

    const kickMember = () => {
        let jsonData = JSON.stringify([...checked]);
        
        api.put(`/partyboards/${partyNumber}/partymembers`, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            let results = response.data.results;

            setMembers(members => {
                return members.filter(member => {
                    return ![...checked].includes(member.partyMemberNumber);
                });
            })

            alert(response.data.message);
        })
        .catch(err => {
            alert(err);
        })
    }

    return (
        <div>
            <div className={styles.bigDiv}>
                <div className={styles.modifyDiv}>
                    <div className={styles.bigName}>
                        <FaAngleLeft size={20} onClick={handleBack}/>
                        <div className={`${styles.nameflexDiv} ${common.firstFont}`}>
                            <div className={`${styles.pink} ${styles.marginLeft}`}>{partyBoard.partyBoardName}</div>
                            <div className={styles.marginLeft}>- 멤버 목록</div>
                        </div>
                    </div>
                    <hr className={styles.divHr}/>
                </div>
                <div className={styles.smallDiv}>
                <div className={styles.mainDiv}>
                        <div className={styles.bigSearchDiv}>
                            {/* <div className={styles.flex}>
                                <div onClick={handleSelectAll} style={{ cursor: "pointer" , margin: "0px"}}>
                                    {selectAll ? <MdCheckBox  size={25}/> : <MdCheckBoxOutlineBlank  size={25}/>}
                                </div>
                                <div className={common.secondFont}>전체 선택</div>
                            </div> */}
                            {/* <div className={styles.smallSearchDiv} style={{marginLeft: 'auto'}}>
                                <div className={`${styles.flexDiv} ${styles.searchDiv}`}>
                                    <select className={styles.selectSort}>
                                        <option value="name">이름순</option>
                                        <option value="oldest">오래된 가입일 순</option>
                                        <option value="newest">최근 가입일 순</option>
                                        <option value="participation">일정 참여 횟수 순</option>
                                    </select>
                                </div>
                                <div className={`${styles.flexDiv} ${styles.searchDiv}`}>
                                    <input type="text" placeholder="닉네임 검색" />
                                    <button className={styles.iconDiv}><FaSearch size={20}/></button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* 사용자 프로필 이동 */}
                    {
                        members.length !== 0 ?
                        <>
                            {
                                members.map((member, index) => (
                                    <Profile
                                        key={index}
                                        member={member}
                                        clickEvent={() => {handleItemClick(index)}}
                                    />
                                ))
                            }
                            <div className={`${styles.flexCenter} ${styles.marginBottom2}`}>
                                {
                                    hasMoreMembers ?
                                        <span className={`${styles.commonBtn}`} onClick={loadMoreMembers}>더보기</span>
                                    :
                                    null
                                }
                            </div>
                        </>
                        :
                        <div className={`${styles.flexCenter} ${styles.fullWidth} ${styles.marginBottom2}`}>
                            <span className={`${common.firstFont}`}>참여중인 멤버가 없습니다.</span>
                        </div>
                    }
                </div>
                {/*본인이 만든 모임일시에만 추방버튼 보이게*/}
                <div className={styles.lastBtn}>
                    {
                        partyBoard.isMaster ?
                        <button className={`${styles.flexDiv} ${common.reportDiv}`} onClick={kickMember}>
                            추방
                        </button>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    );
}

function Profile({ member, clickEvent }) {
    return (
        <div className={styles.mainContentsDiv}>
            <div className={styles.smallMainContentsDiv}>
                <div className={styles.smallMainContentDiv}>
                    <div onClick={clickEvent} style={{ cursor: "pointer" }}>
                        {member.isChecked ? <MdCheckBox size={25}/> : <MdCheckBoxOutlineBlank size={25}/>}
                    </div>
                    <div className={styles.smallContentDiv}>
                        <img className={styles.userProfileDiv} src={`/img/userProfile/${member.info.userNumber}`} />
                        <div className={styles.bigProfileDiv}>
                            <h3 className={common.secondFont}>{member.info.userNickname}</h3>
                            <div className={styles.smallProfileDiv}>
                                <div className={styles.mainContentDiv}>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>가입일</div>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>일정 참여 횟수</div>
                                </div>
                                <div className={styles.mainContentDiv}>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>{member.info.userSignupDate}</div>
                                    <div className={`${common.thirdFont} ${styles.gray}`}>{member.meetJoinedCnt}회</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className={`${styles.flexDiv} ${common.reportDiv}`}>
                    <FaBell/>신고
                </button>
            </div>
            <hr className={styles.divHr} />
        </div>
    );
}

export default MypageMember;
