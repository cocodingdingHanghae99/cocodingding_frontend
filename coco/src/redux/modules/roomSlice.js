import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { client } from "../config/axiosInstance";

/* Action Type */
export const actionType = {
  room: {
    POST_ROOM: "POST_ROOM",
    GET_ROOM: "GET_ROOM",
    GET_ROOM_INFO: "GET_ROOM_INFO",
    GET_ROOM_NICKNAME: "GET_ROOM_NICKNAME",
    POST_VIDEO_ROOM: "POST_VIDEO_ROOM",
    POST_VIDEO_TOKEN: "POST_VIDEO_TOKEN",
    POST_EXIT_ROOM: "POST_EXIT_ROOM",
  },
};

const token = `${localStorage.getItem("Authorization")}`;
const nickname = `${localStorage.getItem("userNickname")}`;

//detail/room으로 변경하기

/* 방 만들기 POST */
export const __createRoom = createAsyncThunk(
  actionType.room.POST_ROOM,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.post(
        `https://cocodingding.shop/detail/room`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          params: {
            name: payload.roomTitle,
          },
        },
        { withCredentials: true }
      );

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 방 전체 조회 GET */
export const __getRoom = createAsyncThunk(
  actionType.room.GET_ROOM,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(
        `https://cocodingding.shop/detail/room/${payload}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 상세 페이지 조회 GET */
export const __getRoomInfo = createAsyncThunk(
  actionType.room.GET_ROOM_INFO,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(
        `https://cocodingding.shop/detail/room/${payload}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: token,
          },
        },
        { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////////// RTC ///////////////////

/* 화상채팅 방 생성 POST */
export const __postVideoRoom = createAsyncThunk(
  actionType.room.POST_VIDEO_ROOM,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.post(
        `https://cocodingding.shop/detail/room`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 화상채팅 방 입장 (토큰 생성) POST */
export const __postVideoToken = createAsyncThunk(
  actionType.room.POST_VIDEO_TOKEN,
  async (payload, thunkAPI) => {
    try {
      const result = await client.post(
        process.env.REACT_APP_BASE_URL + `/detail/room/${payload}`,
        // `https://cocodingding.shop/detail/room/${payload}`,
        { password: "" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
        { withCredentials: true }
      );

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 방 나가기 POST */
export const __postExitRoom = createAsyncThunk(
  actionType.room.POST_EXIT_ROOM,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.post(
        `https://cocodingding.shop/detail/room/exit/${payload}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
        { withCredentials: true }
      );
      console.log(result.data);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 방에 있는 사람 닉네임 get */
export const __getRoomNickname = createAsyncThunk(
  actionType.room.GET_ROOM_NICKNAME,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(
        `https://cocodingding.shop/detail/roomMember/${payload}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: token,
          },
        },
        { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* initial state */
const initialState = {
  rooms: [],
  roomInfo: [],
  roomNicknames: [],
  roomId: null,
  error: null,
  isSuccess: false,
  isLoading: false,
  statusCode: null,
};

/* slice */
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 방 추가하기
      .addCase(__createRoom.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(__createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomId = action.payload.openviduRoomId;
        state.roomInfo = action.payload;
        // state.roomInfo = action.payload;
        // state.roomInfo = action.payload;
        // window.location.reload();
      })
      .addCase(__createRoom.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      // 방 전체 조회하기
      .addCase(__getRoom.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(__getRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload.getRoomResponseDtos;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(__getRoom.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      // 방 단일 조회하기
      .addCase(__getRoomInfo.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(__getRoomInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomInfo = action.payload;
      })
      .addCase(__getRoomInfo.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      // 방 입장 POST
      .addCase(__postVideoToken.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(__postVideoToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomInfo = action.payload;
      })
      .addCase(__postVideoToken.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      // 방 나가기
      .addCase(__postExitRoom.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(__postExitRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        window.location.reload();
      })
      .addCase(__postExitRoom.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      // 닉네임 GET
      .addCase(__getRoomNickname.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(__getRoomNickname.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomNicknames = action.payload;
      })
      .addCase(__getRoomNickname.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// const roomSlice = createSlice({
//   name: 'room',
//   initialState,
//   reducers: {
//     addRoom: (state, action) => {
//       state.rooms.push(action.payload);
//     },
//   },
// });

export const { addRoom } = roomSlice.actions;

export default roomSlice.reducer;
