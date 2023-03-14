import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '../Login/Login';
import Layout from '../Layout/Layout';
import MyPage from '../Login/MyPage';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

export default function Topbar() {
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMyPageModalOpen, setIsMyPageModalOpen] = useState(false);

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleMyPageModalOpen = () => {
    setIsMyPageModalOpen(true);
  };

  const handleMyPageModalClose = () => {
    setIsMyPageModalOpen(false);
  };

  // 로그인 상태 판별
  const isLoggedIn = !!localStorage.getItem('Authorization');

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    window.location.reload();
  };

  return (
    <StContainer>
      <Layout>
        {/* <StImg src={`${process.env.PUBLIC_URL}/img/Group 86.png`}></StImg> */}
        <StWrapBox>
          <StStudy
            onClick={() => {
              navigate(`/`);
              window.location.reload();
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/img/logo_1x.png`}></img>
          </StStudy>
          <StRight>
            {/* localStorage에 "Authorization"이 존재할때 "마이페이지", 존재하지않을때 "로그인"  */}
            {isLoggedIn ? (
              <>
                <StButton onClick={handleMyPageModalOpen}>프로필</StButton>
                <StButton onClick={handleLogout}>로그아웃</StButton>

                {isMyPageModalOpen && (
                  <MyPage onClose={handleMyPageModalClose} />
                )}
              </>
            ) : (
              <>
                <StButton onClick={handleLoginModalOpen}>로그인</StButton>
                {isLoginModalOpen && <Login onClose={handleLoginModalClose} />}
              </>
            )}
          </StRight>
        </StWrapBox>
      </Layout>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */

  /* background-color: #fafafa;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem; */
  position: sticky;
  top: 0;
  backdrop-filter: blur(30px);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StImg = styled.img`
  position: absolute;
  top: 270%;
  left: 85%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
`;

const StWrapBox = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const StStudy = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
`;

const StRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const StMyPage = styled.div`
  font-size: 25px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #3d8afd;
  }
`;
const StButton = styled.h4`
  font-size: 17px;

  padding: 10px 30px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #3d8afd;
  }
`;
