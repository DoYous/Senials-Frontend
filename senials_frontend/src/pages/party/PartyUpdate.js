import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import createApiInstance from '../common/tokenApi';

// CSS
import common from '../common/MainVer1.module.css';
import styles from './PartyForm.module.css';
import { setPartyBoardDetail } from '../../redux/partySlice';
import { setCategoriesWithHobbies } from '../../redux/categorySlice';

function PartyUpdate() {
    const api = createApiInstance();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { partyNumber } = useParams();


    const partyBoard = useSelector(state => state.partyBoardDetail);
    const { categories } = useSelector(state => ({ 
        categories: state.categoriesWithHobbies
    }));


    const [imagePreviews, setImagePreviews] = useState([]);
    const [current, setCurrent] = useState(0);
    const [hobbies, setHobbies] = useState([]);


    const imageFilesInput = useRef();
    const categoryNumberInput = useRef();
    const hobbyNumberInput = useRef();
    const partyBoardNameInput = useRef();
    const partyBoardDetailInput = useRef();
    const partyBoardStatusInput = useRef();


    useEffect(() => {

        if(!partyBoard.hasOwnProperty('partyBoardNumber')) {
            
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

                setImagePreviews(partyBoardDetail.images.map(image => {
                    return `/img/partyboard/${partyNumber}/thumbnail/${image.partyBoardImg}`
                }))
            })
        } else {
            setImagePreviews(partyBoard.images.map(image => {
                return `/img/partyboard/${partyNumber}/thumbnail/${image.partyBoardImg}`
            }))
        }

        if(categories.length === 0) {

            axios.get('/categories?includeHobby=true')
            .then(result => {
                let results = result.data.results;
    
                dispatch(setCategoriesWithHobbies(results.categories));
            })
        }

    }, [dispatch])


    useEffect(() => {
        // partyBoard 데이터가 들어가 있는지 검사
        if (partyBoard.hasOwnProperty('partyBoardNumber')) {
            partyBoardNameInput.current.value = partyBoard.partyBoardName;
            partyBoardDetailInput.current.value = partyBoard.partyBoardDetail;

            partyBoardStatusInput.current.value = partyBoard.partyBoardStatus;
            partyBoardStatusInput.current.style.color = partyBoard.partyBoardStatus == 0 ? '#569aff' : 'black';
        }
    }, [partyBoard])


    useEffect(() => {
        if(categories.length !== 0 && partyBoard.hasOwnProperty('partyBoardNumber')) {
            categoryNumberInput.current.value = partyBoard.categoryNumber;
            let foundCategory = categories.find(category => category.categoryNumber == partyBoard.categoryNumber);
            setHobbies(foundCategory.hobbies);
            hobbyNumberInput.current.value = partyBoard.hobbyNumber;
        }
    }, [categories])
    


    /* 이미지 선택 시 프리뷰 */
    const onUploadImage = (e) => {
        
        const newFiles = Array.from(e.target.files);
        const allowedTypes = ['image/png', 'image/jpeg']


        /* 이미지 프리뷰 초기화 */
        imagePreviews.forEach(imagePreview => {
            URL.revokeObjectURL(imagePreview);
        })
        setImagePreviews([]);
        setCurrent(0);


        /* 업로드 이미지 개수 검사 */
        if(newFiles.length > 3) {
            e.target.value = '';
            alert('이미지는 3개 이하로 업로드 가능합니다.');
            setImagePreviews(partyBoard.images.map(image => {
                return `/img/partyboard/${partyNumber}/thumbnail/${image.partyBoardImg}`
            }))
            return;
        }


        /* 확장자 검사 */
        const invalidFile = newFiles.some(newFile => {
            if(!allowedTypes.includes(newFile.type)) {
                e.target.value = '';
                alert('이미지 파일만 업로드 가능합니다.(JPG, JPEG, PNG)');
                return true;
            }
            return false;
        })
        if(invalidFile) {
            setImagePreviews(partyBoard.images.map(image => {
                return `/img/partyboard/${partyNumber}/thumbnail/${image.partyBoardImg}`
            }))
            return;
        }


        /* 프리뷰 생성 */
        const newImagePreviews = newFiles.map(file => URL.createObjectURL(file));
        if(newImagePreviews.length !== 0) {
            setImagePreviews(newImagePreviews);
        } else {
            setImagePreviews(partyBoard.images.map(image => {
                return `/img/partyboard/${partyNumber}/thumbnail/${image.partyBoardImg}`
            }))
        }
        
    }
    

    // 이미지 마지막 인덱스
    const prev = () => {
        if(imagePreviews.length != 0) {
            if (current == 0) {
                setCurrent(imagePreviews.length - 1);
            } else {
                setCurrent(current - 1);
            }
        }
    }
    const next = () => {

        if(imagePreviews.length != 0) {
            if (current == imagePreviews.length - 1) {
                setCurrent(0);
            } else {
                setCurrent(current + 1);
            }
        }
    }


    /* 선택 카테고리에 따라 취미 option 태그 변경 */
    const selectCategory = (e) => {
        hobbyNumberInput.current.value = -1;

        setHobbies(categories.find(category => {
            if(category.categoryNumber == e.target.value) {
                return true;
            } else {
                return false;
            }
        }).hobbies)
    }

    /* 모집 상태 변경 시 색상 변경 */
    const selectStatus = (e) => {
        partyBoardStatusInput.current.style.color = e.target.value == 0 ? '#569aff' : 'black';
    }


    const submitPartyForm = (e) => {

        const formData = new FormData();

        const imageFiles = Array.from(imageFilesInput.current.files);
        const hobbyNumber = hobbyNumberInput.current.value;
        const partyBoardName = partyBoardNameInput.current.value;
        const partyBoardDetail = partyBoardDetailInput.current.value;


        if (hobbyNumber == -1) {
            alert('취미를 선택하셔야 합니다.');
            return;
        } else if (partyBoardName.length < 2) {
            alert('모임명은 2자 이상 입력하셔야 합니다.');
            return;
        } else if (partyBoardDetail.length < 50) {
            alert('모임 소개는 50자 이상 입력하셔야 합니다.');
            return;
        }


        imageFiles.forEach(imageFile => {
            formData.append('imageFiles', imageFile);
        })
        formData.append('hobbyNumber', hobbyNumberInput.current.value);
        formData.append('partyBoardName', partyBoardNameInput.current.value);
        formData.append('partyBoardDetail', partyBoardDetailInput.current.value);
        formData.append('partyBoardStatus', partyBoardStatusInput.current.value);

        api.put(`/partyboards/${partyNumber}`, formData)
        .then(result => {
            console.log(result.data.message);
            navigate(`/party/${partyNumber}`);
        })
        .catch(err => {
            console.log('[Error]: ' + err);
            alert('[에러]: ' + err);
        })

    }


    const deleteParty = () => {
        if(window.confirm('정말 삭제하시겠습니까?')){
            axios.delete(`/partyboards/${partyNumber}`)
            .then(response => {
                navigate(`/party/board-overview`);
            })
            .catch(err => {
                alert('글 삭제 실패');
                navigate(-1);
            })
        }
    }


    return (
        <div className={styles.formCenterContainer}>
            <div className={`${styles.formInner}`}>
                <div className={common.separator}>
                    <span className={`${common.firstFont}`}>
                        <span className={common.pointColor}>모임</span>을 수정해주세요!
                    </span>
                </div>
                <div className={`${common.separator} ${common.marginBottom2}`}>
                    <div className={`${styles.partyFormImageContainer} ${common.flexColumn} ${common.posRelative}`}>
                        <label htmlFor={'partyFormImage'} className={styles.partyFormImage} >
                            {
                                <Carousel imagePreviews={imagePreviews} current={current}/>
                            }
                        </label>
                        {
                            imagePreviews.length > 1 ?
                            <>
                            <div className={`${common.csPrev} ${common.fullHeight} ${common.posAbsolute}`} style={{zIndex: '1', right: '100%'}} onClick={prev}/>
                            <div className={`${common.csNext} ${common.fullHeight} ${common.posAbsolute}`} style={{zIndex: '1', left: '100%'}} onClick={next}/>
                            </>
                            :
                            null
                        }
                    </div>
                    <input ref={imageFilesInput} id={'partyFormImage'} type='file' onChange={onUploadImage} accept='.jpg, .jpeg, .png' multiple hidden />
                    
                    <div className={`${styles.partyFormInfoContainer}`}>
                        <span className={`${common.secondFont} ${common.mtAuto}`}>모임명</span>
                        <div className={`${styles.inputContainer} ${common.marginBottom}`}>
                            <input ref={partyBoardNameInput} className={`${styles.inputInner}`} placeholder='모임 제목을 정해주세요!' />
                        </div>

                        <span className={`${common.secondFont}`}>카테고리</span>
                        <div className={`${styles.inputContainer} ${common.marginBottom}`}>
                            <select ref={categoryNumberInput} className={`${styles.inputInner}`} onChange={selectCategory} defaultValue={-1} required>
                                <option value={-1} disabled>카테고리를 선택해 주세요!</option>
                                {
                                    categories.map((category, idx) => {
                                        return (
                                            <option key={idx} value={category.categoryNumber} >{ category.categoryName }</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <span className={common.secondFont}>취미명</span>
                        <div className={`${styles.inputContainer}`}>
                            <select ref={hobbyNumberInput} className={`${styles.inputInner}`} defaultValue={-1} required>
                                <option value={-1} disabled>취미를 선택해 주세요!</option>
                                {
                                    hobbies.map((hobby, idx) => {
                                        return (
                                            <option key={idx} value={hobby.hobbyNumber}> {hobby.hobbyName} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className={`${common.separator}`}>
                    <span className={`${common.secondFont}`}>
                        모임 소개
                    </span>
                </div>
                <div className={`${common.separator}`}>
                    <textarea ref={partyBoardDetailInput} className={`${styles.partyFormText}`} placeholder='모임을 소개해주세요! 준비물, 마음가짐 등 자유롭게 기입해주세요!'></textarea>
                </div>

                <div className={`${common.separator}`}>
                    <span className={`${common.secondFont}`}>모집 상태</span>
                    {/* 선택사항 변경 시 color css 변경해야함 */}
                    <select ref={partyBoardStatusInput} className={`${common.marginLeft} ${styles.statusContainer}`} onChange={selectStatus}>
                        <option className={`${styles.statusOpened}`} value={0} >모집중</option>
                        <option className={`${styles.statusClosed}`} value={1} >모집완료</option>
                    </select>
                </div>

                <div className={`${common.separator}`}>
                    <span className={`${common.uniqueBtn}`} onClick={deleteParty}>삭제</span>
                    <span className={`${common.commonBtn} ${common.mlAuto}`} onClick={() => navigate(-1)}>취소</span>
                    <span className={`${common.importantBtn} ${common.marginLeft}`} onClick={submitPartyForm}>제출</span>
                </div>
            </div>
        </div>
    )
}

function Carousel({ imagePreviews, current }) {

    return (
        <div className={`${common.csContainer}`} style={{width: '300px', height: '300px'}}>
            <div className={`${common.csInner}`} style={{transform: `translateX(-${current * 300}px)`}}>
                {
                    imagePreviews.map((imagePreview, idx) => <div key={idx} className={`${common.csItem}`} style={{backgroundImage: `url(${imagePreview})`}} />)
                }
                {
                    imagePreviews.length == 0 ?
                    <img src='/img/Noimage.svg' />
                    :
                    null
                }
            </div>
        </div>
    )
}

export default PartyUpdate;
