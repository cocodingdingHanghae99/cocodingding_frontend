import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cocodingding.shop/",
});

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

const token = `${localStorage.getItem("Authorization")}`;

client.defaults.withCredentials = true;
client.defaults.headers.post["Content-Type"] = "application/json";
client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

/* interceptors */
client.interceptors.response.use(
  function (response) {
    // Status Code 200범위 내, 즉 성공했을때
    return response;
  },
  function (error) {
    // Status Code 200범위 밖, 즉 실패했을때
    console.log("에러", error);
    console.log("에러에러", error.response.status);
    if (error.response.status === 401 || error.response.status === 406) {
      window.alert("다시 로그인이 필요합니다.");
      window.location.href = "/";
    }
    // 세션이 종료되었을 때
    if (error.response.msg === "활성화된 session이 아닙니다.") {
      window.alert("세션이 만료되어 방에 입장할 수 없습니다.");
      window.location.href = "/";
    }
    if (error.response.status === 404) {
      window.alert("데이터를 찾을 수 없습니다.");
      window.location.href = "/";
    }
    if (error.response.status === 405) {
      window.alert("데이터를 찾을 수 없습니다.");
      window.location.href = "/";
    }
    if (error.response.status === 500) {
      window.alert("서버 오류가 발생하여 방에 입장할 수 없습니다.");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

/* Helper Method */
export const clearToken = () => {
  client.defaults.headers.common["Authorization"] = "";
};
