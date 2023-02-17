import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import CreateRoomButton from "./CreateRoomButton";
import Topbar from "../Topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { __getRoom } from "../../redux/modules/roomSlice";
import { __postVideoRoom } from "../../redux/modules/roomSlice";

// RoomForm 컴포넌트에서 rooms state 및 rooms 데이터 가져오는 기능 구현
export default function RoomForm() {
  const APPLICATION_SERVER_URL = "https://cocodingding.shop/";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getRoom());
  }, [dispatch]);

  const { rooms } = useSelector((state) => state.room);
  console.log(rooms);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };
  // rooms 상태정의, setRooms 함수 정의
  // const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  // useEffect(() => {
  //   async function fetchRooms() {
  //     // localhost:3001/rooms에서 데이터 가져오기
  //     const response = await axios.get("https://cocodingding.shop/chat/rooms");
  //     // const response = await axios.get('http://localhost:3001/rooms');

  //     // 가져온 데이터를 rooms 상태에 넣기
  //     setRooms(response.data);
  //     console.log(response);
  //   }
  //   // 함수 호출
  //   fetchRooms();
  // }, []);

  useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) =>
        room.roomName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, rooms]);

  const selectCategory = (category) => {
    setFilteredRooms(rooms.filter((room) => room.category === category));
    // 검색어 상태(search) 초기화
    setSearch("");
  };

  //로그인여부
  const isLoggedIn = !!localStorage.getItem("Authorization");

  const [sessionid, setSessionid] = useState(null);
  const [token, setToken] = useState(null);

  const handleEnter = () => {
    getToken();
  };

  const getToken = async () => {
    const sessionId = await createSession();
    return await createToken(sessionId);
  };

  const createSession = async () => {
    const sessionResponse = await axios.post(
      APPLICATION_SERVER_URL + "detail/room",
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    setSessionid(sessionResponse.data);
    return sessionResponse.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const tokenResponse = await axios.post(
      APPLICATION_SERVER_URL + "detail/room/" + sessionId,
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    setToken(tokenResponse.data);
    return tokenResponse.data; // The token
  };

  console.log(sessionid);
  console.log(token);

  return (
    <div>
      <StSearch>
        <StInput
          type="text"
          placeholder="참여하고싶은 방을 찾아보세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StCategorys>
          {Array.from(new Set(rooms.map((room) => room.category))).map(
            (category) => (
              <StCategory
                key={category}
                onClick={() => selectCategory(category)}
              >
                #{category}
              </StCategory>
            )
          )}
        </StCategorys>
        <StCreateRoomButton>
          <div>
            <h2> 방에 참여해보세요.</h2>
          </div>
          <div>
            <CreateRoomButton />
          </div>
        </StCreateRoomButton>
      </StSearch>
      {/* <StCreateRooms>
        {filteredRooms.map((room) => (
          <StCreatedRoom key={room.id}>
            <div>{room.roomName}</div>
            <div> 닉네임</div>
            <div>#{room.category}</div>
            <div>
              <StButton
                onClick={() => {
                  navigate(`/Detail/${room.id}`);
                }}
              >
                입장하기
              </StButton>
            </div>
          </StCreatedRoom>
        ))}
      </StCreateRooms> */}
      <StCreateRooms>
        <Slider {...settings}>
          {filteredRooms.map((room) => (
            <div key={room.id}>
              <StCreatedRoom>
                <div>{room.roomName}</div>
                <div> 닉네임</div>
                <div>#{room.category}</div>
                <div>
                  <StButton
                    onClick={() => {
                      handleEnter();
                      if (isLoggedIn) {
                        navigate(`/detail/${room.id}`, {
                          state: {
                            token: token,
                            sessionId: sessionid,
                          },
                        });
                      } else {
                        alert("로그인이 필요한 기능입니다.");
                      }
                    }}
                  >
                    입장하기
                  </StButton>
                </div>
              </StCreatedRoom>
            </div>
          ))}
        </Slider>
      </StCreateRooms>{" "}
    </div>
  );
}
const StSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const StCreateRooms = styled.div`
//   display: flex;
//   /* overflow: scroll; */
//   overflow-y: auto;
//   //   // 뭔진 모르겠는데 스크롤 숨기는 기능임...
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: transparent;
//   }

//   white-space: nowrap;
// `;
const StCreateRooms = styled.div`
  z-index: -1;
`;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 10px;
  padding: 2rem;
  width: 250px;
  height: 200px;
  background-color: gray;
  border: solid 1px gray;
  border-radius: 3rem;
`;

const StCategorys = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StCategory = styled.div`
  border: solid 1px black;
  border-radius: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;

  padding: 0.7rem;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const StInput = styled.input`
  width: 35%;
  height: 35px;
  border: solid 1px black;
  border-radius: 0.5rem;
  background-color: white; ;
`;

const StButton = styled.button`
  width: 5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  width: 200px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const StCreateRoomButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;
