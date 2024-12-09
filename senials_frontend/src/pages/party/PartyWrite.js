import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

// CSS
import common from '../common/MainVer1.module.css';
import styles from './PartyForm.module.css';
import { setCategoriesWithHobbies, setHobbiesForWrite } from '../../redux/categorySlice';

function PartyWrite() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { categories, hobbies } = useSelector(state => ({ categories: state.categoriesWithHobbies, hobbies: state.hobbiesForWrite }));

    
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [current, setCurrent] = useState(0);


    /* 페이지 마운트 시 카테고리 정보 로드 */
    useEffect(() => {

        axios.get('/categories?includeHobby=1')
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
        const files = Array.from(e.target.files);
        setImageFiles(files);


        imagePreviews.forEach(imagePreview => {
            URL.revokeObjectURL(imagePreview);
        })
        setImagePreviews([]);


        const newImagePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(newImagePreviews);

        setCurrent(0);
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
        dispatch(setHobbiesForWrite(categories[e.target.value].hobbies));
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
                        <div className={`${common.csPrev} ${common.fullHeight} ${common.posAbsolute}`} style={{zIndex: '1', right: '100%'}} onClick={prev}/>
                        <label htmlFor={'partyFormImage'} className={styles.partyFormImage} >
                            {
                                <Carousel imagePreviews={imagePreviews} current={current}/>
                            }
                        </label>
                        <div className={`${common.csNext} ${common.fullHeight} ${common.posAbsolute}`} style={{zIndex: '1', left: '100%'}} onClick={next}/>
                    </div>
                    <form id='partyFormImageUpload' action='/partyboardimages' method='post' encType='multipart/form-data'>
                        <input name='multifiles' id={'partyFormImage'} type='file' onChange={onUploadImage} accept='.jpg, .jpeg, .png' multiple hidden />
                    </form>
                    
                    <div className={`${styles.partyFormInfoContainer}`}>
                        <span className={`${common.secondFont} ${common.mtAuto}`}>모임명</span>
                        <div className={`${styles.inputContainer} ${common.marginBottom}`}>
                            <input className={`${styles.inputInner}`} placeholder='모임 제목을 정해주세요!' required/>
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
                            <select className={`${styles.inputInner}`} defaultValue={-1} required>
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
                    <textarea className={`${styles.partyFormText}`} placeholder='모임을 소개해주세요! 준비물, 마음가짐 등 자유롭게 기입해주세요!'></textarea>
                </div>
                <div className={`${common.separator}`}>
                    <span className={`${common.commonBtn} ${common.mlAuto}`} onClick={() => navigate('/party/board-overview')}>취소</span>
                    <span className={`${common.importantBtn} ${common.marginLeft}`}>제출</span>
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
