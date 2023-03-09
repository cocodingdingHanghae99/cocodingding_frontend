import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';

export default function Members() {
  const navigate = useNavigate();

  return (
    <Layout>
      <StContainer>코코딩딩 만든 사람들</StContainer>
      <StMembers>
        <div>
          <div>FE 🧑🏻‍💻 김혜성 / 김지석</div>
          <div>BE 🧑🏻‍💻 김재광 / 왕윤종 / 김현우</div>
          <div>UI & UX Designer 🎨 박서연</div>
        </div>
      </StMembers>
      <StNotion>
        <a
          href='https://simple-ixia-f79.notion.site/99-_-a26aba0c26cf479aa67507282b362c41'
          target='_blank'
        >
          팀 노션
        </a>
      </StNotion>
      <StGit>
        <a href='https://github.com/cocodingdingHanghae99' target='_blank'>
          github repo
        </a>
      </StGit>
      <StBtn
        onClick={() => {
          navigate(`/`);
        }}
      >
        <button>메인으로</button>
      </StBtn>
    </Layout>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  font-weight: 900;
  font-size: 40px;
`;

const StMembers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  margin-top: 40px;
  margin-bottom: 40px;

  & > div {
    width: 350px;
    display: flex;
    gap: 13px;
    flex-direction: column;
  }
  & > div > div {
    display: flex;
    justify-items: flex-start;
    align-items: center;
    padding-left: 20px;
    background-color: #fff7ce;
    height: 40px;
    font-weight: 500;
    border-radius: 15px;
  }
`;

const StNotion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  & > a {
    background-color: #ffe45c;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 50px;
    text-decoration: none;
    font-weight: 900;
    font-size: 25px;
    color: black;
    border: none;
    border-radius: 15px;
  }
`;

const StGit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  & > a {
    background-color: #ffe45c;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 50px;
    text-decoration: none;
    font-weight: 900;
    font-size: 25px;
    color: black;
    border: none;
    border-radius: 15px;
  }
`;
const StBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 220px;
    height: 50px;
    font-weight: 900;
    font-size: 25px;
    cursor: pointer;
    background-color: #ffe45c;
    border: none;
    border-radius: 15px;
  }
`;
