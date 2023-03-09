import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { __getRoom } from '../../redux/modules/roomSlice';
import { __postVideoToken } from '../../redux/modules/roomSlice';
import CreateRoomButton from './CreateRoomButton';
import Card from './Card';
import { BsBroadcast } from 'react-icons/bs';
import { MdOutlinePeople } from 'react-icons/md';

// RoomForm 컴포넌트에서 rooms state 및 rooms 데이터 가져오는 기능 구현
export default function RoomForm({ rooms, search, category }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusCode = useSelector((state) => state.room.statusCode);
  const [code, setCode] = useState(null);
  const [pageNum, setPageNum] = useState(2);
  const currentPageNum = 1;

  useEffect(() => {
    dispatch(__getRoom(currentPageNum));
  }, []);

  useEffect(() => {
    setCode(statusCode);
  }, [statusCode]);

  const filteredRooms = rooms
    .filter((room) =>
      room.roomTitle.toLowerCase().includes(search.toLowerCase())
    )
    .filter((room) => (category ? room.category === category : true));

  //로그인여부
  const isLoggedIn = !!localStorage.getItem('Authorization');

  const handleMoreBtn = () => {
    if (code === 200) {
      setPageNum(pageNum + 1);
      dispatch(__getRoom(pageNum));
    } else {
      alert('불러올 페이지가 없습니다.');
    }
  };

  return (
    <>
      <StSearch>
        <StCreateRoomButton>
          <div>
            <h2> 방에 참여해보세요.</h2>
          </div>
          <div>
            <CreateRoomButton />
          </div>
        </StCreateRoomButton>
      </StSearch>
      <StContainer>
        <StRooms>
          {filteredRooms.length === 0 ? (
            <StRoomNone>
              <div>누구나 만들수 있어요!</div>
              <h3>직접 방을 만들어 주세요.</h3>
              <img src={`${process.env.PUBLIC_URL}/img/icon_1x.png`}></img>
            </StRoomNone>
          ) : (
            <StCreateRooms>
              {filteredRooms.map((room) => {
                return <Card key={room.id} room={room} />;
              })}
            </StCreateRooms>
          )}
        </StRooms>
        <StMoreBtn>
          {filteredRooms.length % 6 === 0 && filteredRooms.length !== 0 ? (
            <button type='button' onClick={handleMoreBtn}>
              + 더보기
            </button>
          ) : null}
        </StMoreBtn>
      </StContainer>
    </>
  );
}

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StRooms = styled.div``;

const StSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StCreateRooms = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StRoomNone = styled.div`
  margin-top: 30px;
  width: 100vw;
  height: 380px;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 40px;
  padding: 2rem;
  width: 250px;
  height: 200px;
  background-image: linear-gradient(
    to bottom,
    rgba(61, 138, 253, 0.3) 66%,
    white 34%
  );
  border-radius: 3rem;
  box-shadow: 4px 5px 15px rgba(0, 0, 0, 0.3);
`;

const StCreateRoomButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const StMoreBtn = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;

  & > button {
    width: 152px;
    height: 49px;
    padding: 10px, 30px, 10px, 30px;
    border-radius: 30px;
    border: 1px solid #a0a0a0;
    background-color: #ffffff;
    color: #a0a0a0;
    font-size: 24px;
    cursor: pointer;
    &:hover {
      color: white;
      border: 1px solid #a0a0a0;
      background-color: #a0a0a0;
      transition: all 0.4s ease;
    }
  }
`;
