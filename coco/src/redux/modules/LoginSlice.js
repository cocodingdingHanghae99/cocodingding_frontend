import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;
const initialState = {
  kakaoList: {},
  isLoading: false,
  error: null,
  isLogin: false,
};

//로그인 POST요청
export const __kakaoLogin = createAsyncThunk(
  'login',
  async (code, thunkAPI) => {
    try {
      console.log(code);
      //FIXME:방법1 post로 파람값 혹은 {제이슨}
      //   const { data } = await axios.post(
      //     `https://cocodingding.shop/user/kakao`,
      //     code,
      //     {
      //       withCredentials: true,
      //     }
      //   );

      //FIXME:방법2 get으로 쿼리스트링 요청.
      const { data } = await axios
        .get(`https://cocodingding.shop/user/kakao?code=${code}`)

        .then((res) => {
          console.log(res);
          // const accessToken = res.headers.authorization;
          // localStorage.setItem('Authorization', accessToken);

          localStorage.setItem(
            'Authorization',
            res.headers.get('Authorization')
          );

          console.log('로그인정보', res);
          const userNickname = res.data.userNickname;
          console.log(userNickname);
          localStorage.setItem('userNickname', userNickname);

          return res;
        });
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const kakaoList = createSlice({
  name: 'kakaoList',
  initialState,
  reducers: {},
  extraReducers: {
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
    },
  },
});

export default kakaoList.reducer;
