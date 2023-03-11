import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addRoom } from "../../redux/modules/roomSlice";
import { __createRoom, __postVideoToken } from "../../redux/modules/roomSlice";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";

function ModalCreateRoom({ onClose, isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomId = useSelector((state) => state.room.roomId);
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(roomId);
  }, [roomId]);

  const [post, setPost] = useState({
    category: "",
    roomTitle: "",
    status: false,
    youtubeLink: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "roomTitle" && value.length > 20) {
      return; // 20자 이상이면 입력되지 않도록 함
    }
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(__createRoom(post));
    // dispatch(__postVideoToken(id + 1));
    setTimeout(() => {}, 1000);
    navigate(`/detail/${id + 1}`);
    setTimeout(() => {
      // window.location.reload();
    }, 1000);
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <StContainer>
      <StHeader>
        <StTitle>방만들기</StTitle>
        <StCloseButton onClick={closeModal}>
          <GrClose />
        </StCloseButton>
      </StHeader>
      {/* 상단바.. */}
      <StDivider />
      {/* 방이름,  카테고리, 방만들기,취소하기 버튼. 컴포넌트 */}
      {/* <CreateRoomForm /> */}

      <form onSubmit={handleSubmit}>
        <div>
          <StInputTitle>방제목</StInputTitle>
          <Stcenter>
            <StInput
              type="text"
              placeholder="방 제목 입력 (20자 이하로 작성해주세요)"
              value={post.title}
              name="roomTitle"
              onChange={handleChange}
            />
          </Stcenter>
        </div>

        <StInputTitle>카테고리</StInputTitle>
        <Stcenter>
          <StSelect
            value={post.category}
            name="category"
            onChange={handleChange}
          >
            <option>관심 카테고리 선택</option>
            <option>개발</option>
            <option>취준</option>
            <option>직장인</option>
            <option>수능</option>
          </StSelect>
        </Stcenter>

        <StInputTitle>Youtube링크</StInputTitle>
        <Stcenter>
          <StInput
            type="text"
            placeholder="함께 시청할 영상 또는 강의, 음악의 유튜브 링크를 넣어주세요"
            value={post.youtubeLink}
            name="youtubeLink"
            onChange={handleChange}
          ></StInput>
        </Stcenter>
        <StButtons>
          <StButton onClick={closeModal}>취소하기</StButton>
          <StButton type="submit">방만들기</StButton>
        </StButtons>
      </form>
    </StContainer>
  );
}
export default ModalCreateRoom;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 704px;
  height: 772px;
  /* 최상단 위치 */
  z-index: 50;
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다.ss */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background-color: white;
  border: 1px solid #ece9e9;
  border-radius: 8px;
  padding: 3rem;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2rem 0px 2rem;
`;

const StTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const StCloseButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const StDivider = styled.hr`
  border: 0;
  border-top: 1px solid gray;
  margin: 20px 0 40px 0;
`;

const StInputTitle = styled.h3`
  margin-left: 60px;
`;

const StInput = styled.input`
  display: flex;
  width: 585px;
  height: 80px;
  border: none;
  border-radius: 0.5rem;
  border: 2px solid #a7a7a7;
`;

const StSelect = styled.select`
  width: 585px;
  height: 80px;
  border: 2px solid #a7a7a7;
  border-radius: 0.5rem;

  color: #a7a7a7;
  /* background-color: #a7a7a7; */
`;

const Stcenter = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 50px;
`;

const StButtons = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
`;

const StButton = styled.button`
  width: 272px;
  height: 80px;
  border: 2px solid #a7a7a7;
  border-radius: 0.5rem;
  background-color: white;

  cursor: pointer;
  &:hover {
    border: 2px solid #5cabff;
  }
`;
