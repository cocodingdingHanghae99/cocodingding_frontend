//Kakao.js
//카카로 로그인 대기중. 화면...
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
// import { __kakaologin } from '../../redux/modules/LoginSlice';
import { __kakaoLogin } from '../../redux/modules/LoginSlice';
const Kakao = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginCheck = useSelector((state) => state.kakaoList.isLogin);

  // new URL 객체에서 searchParams객체의 get메소드를 사용하여 'code'키의 값을 추출
  let code = new URL(window.location.href).searchParams.get('code');

  //FIXME: 두번째 방법 code?값 보내기..
  // const code = new URL(window.location.href).search;
  //FIXME:세번째 방법 get으로 보내기.
  // const code = location.search.split('=')[1];

  // 6조 코드 그대로 들고옴.. 이거 안되면 내 잘못 아님 ㅇㅇ
  useEffect(() => {
    dispatch(__kakaoLogin(code));
    // 로그인 성공 시 메인페이지로 이동
  });

  useEffect(() => {
    loginCheck && navigate('/');
  }, [loginCheck, navigate]);

  return (
    <div>
      <div>
        <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
      </div>
    </div>
  );
};

export default Kakao;
