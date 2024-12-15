import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

// CSS
import common from '../common/MainVer1.module.css';
import styles from './PartyForm.module.css';
import { setCategoriesWithHobbies, setHobbiesForWrite } from '../../redux/categorySlice';
import createApiInstance from '../common/tokenApi';

function PartyWrite() {
    const api = createApiInstance();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { categories, hobbies } = useSelector(state => ({ categories: state.categoriesWithHobbies, hobbies: state.hobbiesForWrite }));

    const [imagePreviews, setImagePreviews] = useState([]);
    const [current, setCurrent] = useState(0);


    const imageFilesInput = useRef();
    const hobbyNumberInput = useRef();
    const partyBoardNameInput = useRef();
    const partyBoardDetailInput = useRef();


    /* 페이지 마운트 시 카테고리 정보 로드 */
    useEffect(() => {

        axios.get('/categories?includeHobby=true')
        .then(result => {
            let results = result.data.results;

            dispatch(setCategoriesWithHobbies(results.categories));
        })
        
    }, [dispatch])


    /* 페이지 언마운트 시 BlobURL 메모리 revoke */
    useEffect(() => {

        return () => {
            imagePreviews.forEach(imagePreview => {
                URL.revokeObjectURL(imagePreview);
            })
            setImagePreviews([]);

        }
    }, [])


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
            return;
        }


        /* 프리뷰 생성 */
        const newImagePreviews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(newImagePreviews);
    

    }


    /* 선택 카테고리에 따라 취미 option 태그 변경 */
    const selectCategory = (e) => {
        dispatch(setHobbiesForWrite(categories[e.target.value].hobbies));
    }


    const submitPartyForm = (e) => {

        const formData = new FormData();

        const imageFiles = Array.from(imageFilesInput.current.files);
        const hobbyNumber = hobbyNumberInput.current.value;
        const partyBoardName = partyBoardNameInput.current.value;
        const partyBoardDetail = partyBoardDetailInput.current.value;


        if (imageFiles.length === 0) {
            alert('이미지는 최소 1개 이상 업로드해야 합니다.');
            return;
        } else if (hobbyNumber == -1) {
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

        api.post('/partyboards', formData , {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then(result => {
            let results = result.data.results;
            console.log(result.data.message);
            navigate(`/party/${results.partyBoardNumber}`);
        })
        .catch(err => {
            console.log('[Error]: ' + err);
            alert('[에러]: ' + err);
        })

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
    

    return (
        <div className={styles.formCenterContainer}>
            <div className={`${styles.formInner}`}>
                <div className={common.separator}>
                    <span className={`${common.firstFont}`}>
                        <span className={common.pointColor}>모임</span>을 만들어주세요!
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
                            <input ref={partyBoardNameInput} className={`${styles.inputInner}`} placeholder='모임 제목을 정해주세요!' required/>
                        </div>

                        <span className={`${common.secondFont}`}>카테고리</span>
                        <div className={`${styles.inputContainer} ${common.marginBottom}`}>
                            <select className={`${styles.inputInner}`} onChange={selectCategory} defaultValue={-1} required>
                                <option value={-1} disabled>카테고리를 선택해 주세요!</option>
                                {
                                    categories.map((category, idx) => {
                                        return (
                                            <option key={idx} value={idx} >{ category.categoryName }</option>
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
                                            <option key={idx} value={hobby.hobbyNumber}>{ hobby.hobbyName }</option>
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
                    <span className={`${common.commonBtn} ${common.mlAuto}`} onClick={() => navigate('/party/board-overview')}>취소</span>
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

export default PartyWrite;
