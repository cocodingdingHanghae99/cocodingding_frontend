import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';

const initialState = {
  chatcollect: [
    {
      chatRoomId: 1,
      createdAt: '',
      modifiedAt: '',
      friendNickname: '',
      message: '',
    },
  ],
  error: null,
  isLoading: false,
};

const config = {
  headers: {
    Authorization: localStorage.getItem('token'),
  },
};

// 채팅방 생성 post
export const __postChatopenThunk = createAsyncThunk(
  'CHAT_OPEN',
  async (payload, thunkAPI) => {
    try {
      console.log(1111, payload);
      const friendEmail = payload[0];
      const Request = await axiosInstance.post('/chats', {
        config,
        friendEmail,
      });
      console.log(1234, Request);
      return thunkAPI.fulfillWithValue(Request.data);
    } catch (e) {
      return console.log(e);
    }
  }
);

// 전체 채팅 GET요청//FIXME:
export const __getChatListThunk = createAsyncThunk(
  'GET_CHATS',
  async (_, thunkAPI) => {
    try {
      const Request = await axiosInstance.get('/chat/rooms', config);
      return thunkAPI.fulfillWithValue(Request.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 채팅리스트에서 채팅방 삭제요청
export const __removeChatListThunk = createAsyncThunk(
  'REMOVE_CHAT',
  async (payload, thunkAPI) => {
    try {
      const chatRoomId = payload;
      console.log(1111, chatRoomId);
      const Request = axiosInstance.delete(`/chats/${chatRoomId}`, config);
      if (Request.status === 200) {
        thunkAPI.dispatch(__getChatListThunk());
      }
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
      // return console.log(e)
    }
  }
);

export const chatSlice = createSlice({
  name: 'chatcollect',
  initialState,
  reducers: {},
  extraReducers: {
    [__postChatopenThunk.fulfilled]: (state, action) => {
      state.chatcollect = action.payload;
    },
    [__getChatListThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chatcollect = [action.payload];
    },
    [__getChatListThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getChatListThunk.pending]: (state) => {
      state.isLoading = true;
    },
    // [__removeChatListThunk.fulfilled]: (state, action) => {
    //   const target = state.chatcollect.findIndex(
    //     (chatcollect) => chatcollect.friendNickname === action.payload
    //   );
    //   state.chatcollect.splice(target, 1);
    // },
  },
});
export default chatSlice.reducer;
