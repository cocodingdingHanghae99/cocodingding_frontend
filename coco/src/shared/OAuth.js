/* 
카카오 인가코드를 받기 위한 URL 페이지로 넘어가기 위한 세팅
REST API KEY와 REDIRECT URI는 왠만하면 한명의 키로 사용할것 
REST_API_KEY 는 다를수 있어도 REDIRECT URI만큼은 백앤드와 프론트 모두 맞춰서 사용할것 
*/

//지석
const CLIENT_ID = "306c476f21776ce73e2df07d1ca45995";
//재광.
// const CLIENT_ID = 'dca78b23ee6bbb566b637457b88b9de0';
//현우
// const CLIENT_ID = '88a73253d7a52357087166265d534bdd';
// ---------------------
//지석
// const REDIRECT_URI = 'http://localhost:3000/user/kakao';
const REDIRECT_URI = "https://cocodingdings.vercel.app";

// const REDIRECT_URI = 'https://coco-test-kappa.vercel.app/user/kakao';

//재광
// const REDIRECT_URI = 'http://cocodingding.shop/user/kakao';
//현우
// const REDIRECT_URI = 'https://cocodingding.shop/test/kakao';

// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email,gender`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// 1/GET방식으로 주소로 요청시 인증코드 받을수있음.
// /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.1
// Host: kauth.kakao.com

// 네이티브 앱 키	ccfd1fdfe04eae4b041410d5339ad6fc
// JavaScript 키	2630b13acd7d87daf981d810de94858f
// Admin 키	cc4118a45b2a37afa0712038d75c26e7
// REST API 키	306c476f21776ce73e2df07d1ca45995

// 지석
// Redirect URI
// http://localhost:3000/user/login
// 현우
// Redirect URI
// https://cocodingding.shop/test/kakao

// "https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code"

//시크릿키
// WeulIUQTCQSHS7yMTh7oVjelhXR5ZowN
