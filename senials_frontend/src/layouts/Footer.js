import React from 'react';
import styles from './Footer.module.css'


function Footer(){
    return(
      <div className={styles.footer}>
        <div>(주)시니얼  |  사업자등록번호:123456 |  사업자정보확인 |  |  대표:안효준  |  대표전화:123-456-789 (평일 09:00~19:00, 토/일/공휴일 휴무) |<br/>
        주소 : 경기도 남양주시 도제원로68 4층 |  이메일 sinial.naver.com |  호스팅 서비스  Amazon Web Service(AWS)</div>
    </div>
    );
}

export default Footer;