import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsBroadcast } from "react-icons/bs";
import { MdOutlinePeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __postVideoToken } from "../../redux/modules/roomSlice";

const Card = ({ room }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = !!localStorage.getItem("Authorization");

  const handleSubmit = (id) => {
    console.log(id);
    dispatch(__postVideoToken(id));
  };

  const boxList = ["수학", "심리학", "뇌과학", "철학"];

  const getColorByCategory = (category) => {
    switch (category) {
      case "수학":
        return "blue";
      case "심리학":
        return "yellow";
      case "뇌과학":
        return "red";
      case "철학":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <StCreatedRoom key={room.id}>
      {/* {boxList.map((box) => { */}
      <StContainer>
        <StRoomUpper>
          <div>
            <StCategory>#{room.category}</StCategory>
          </div>

          <StBroadcast>
            <StUser>
              <MdOutlinePeople /> 2/4
            </StUser>
            <BsBroadcast />
          </StBroadcast>
        </StRoomUpper>
        <StRoomTitle>{room.roomTitle}</StRoomTitle>
        <StNickname> 닉네임</StNickname>
      </StContainer>
      {/* })} */}
      <div>
        <StButton
          onClick={() => {
            handleSubmit(room.openviduRoomId);
            if (isLoggedIn) {
              navigate(`/detail/${room.openviduRoomId}`);
            } else {
              alert("로그인이 필요한 기능입니다.");
            }
          }}
        >
          입장하기
        </StButton>
      </div>
    </StCreatedRoom>
  );
};

export default Card;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 40px;
  /* padding: 2rem; */
  width: 320px;
  height: 270px;
  /* background-image: linear-gradient(
    to bottom,
    rgba(61, 138, 253, 0.3) 66%,
    white 34%
  ); */

  border-radius: 3rem;
  box-shadow: 4px 5px 15px rgba(0, 0, 0, 0.3);
`;

const StContainer = styled.div`
  background-color: #78b4e9;
  /* width: 100%; */
  height: 60%;
  padding: 30px 20px 0px 20px;
  border-radius: 3rem 3rem 0rem 0rem;
`;

const StRoomUpper = styled.div`
  display: flex;
  font-size: 17px;
  color: gray;
  justify-content: space-between;
`;

const StNickname = styled.div`
  margin-right: 40px;
  margin-bottom: 45px;
`;

const StCategory = styled.div``;

const StBroadcast = styled.div`
  display: flex;
  color: red;
  font-size: 25px;
`;

const StUser = styled.div`
  color: black;
  font-size: 20px;
  margin-right: 15px;
`;

const StRoomTitle = styled.h2``;

const StButton = styled.button`
  font-size: 20px;
  border: solid 2px #3d8afd;
  color: #3d8afd;
  border-radius: 30px;
  background-color: white;
  width: 164px;
  height: 40px;
  margin-left: 45px;
  cursor: pointer;
  &:hover {
    color: white;
    border: 3px solid #3d8afd;
    background-color: #3d8afd;
    transition: all 0.5s ease;
  }
`;