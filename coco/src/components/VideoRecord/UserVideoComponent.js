// import React, { useState, useEffect, useCallback } from "react";
// import { OpenVidu } from "openvidu-browser";
// import { useLocation } from "react-router-dom";
// import VideoRecord from "./VideoRecord";
// import axios from "axios";

// const UserVideoComponent = () => {
//   const location = useLocation();
//   let nickname = localStorage.getItem("nickname");
//   let tokenStuff = location.state.token;
//   let refreshtoken = localStorage.getItem("refreshtoken");
//   let accessToken = localStorage.getItem("accessToken");
//   // 오픈비듀 관련
//   const [session, setSession] = useState(undefined);
//   const [OV, setOV] = useState();
//   const [publisher, setPublisher] = useState(null);
//   const [subscribers, setSubscribers] = useState([]);
//   const [checkMyScreen, setCheckMyScreen] = useState("");
//   const [isConnect, setIsConnect] = useState(false); // 커넥팅 체크
//   const [role, setRole] = useState(location.state.role); // 역할군
//   const [chat, setChat] = useState(true); // 채팅창
//   // 신고 기능 관련
//   const [report, setReport] = useState(false);
//   const [nicknames, setNickNames] = useState(null);

//   const deleteSubscriber = (streamManagerId) => {
//     try {
//       setSubscribers((current) =>
//         current.filter(
//           (sub) => sub.stream.connection.connectionId !== streamManagerId
//         )
//       ); //e.stream.session.options.sessionId
//       setCheckMyScreen(false);
//     } catch (error) {}
//   };

//   // 브라우저 새로고침, 종료, 라우트 변경
//   const leaveload = async () => {
//     let accessToken2 = localStorage.getItem("accessToken");
//     try {
//       if (role === "master") {
//         setCheckMyScreen(false);
//         const getOutRoomMaster = await axios.delete(
//           `/room/${location.state.sessionId}`,
//           {
//             headers: {
//               authorization: accessToken2,
//               refreshtoken: refreshtoken,
//             },
//           }
//         );
//         leaveSession();
//       } else if (role === "user") {
//         setCheckMyScreen(false);
//         const getOutRoomUser = await axios.post(
//           `/room/${location.state.sessionId}/member`,
//           {},
//           {
//             headers: {
//               authorization: accessToken2,
//               refreshtoken: refreshtoken,
//             },
//           }
//         );
//       }
//     } catch (error) {}
//   };
//   const leaveSession = () => {
//     setSubscribers([]);
//     setOV(undefined);
//     setPublisher(null);
//   };
//   const joinSession = () => {
//     // openvidu 세션 생성하기
//     // 1. openvidu 객체 생성
//     const newOV = new OpenVidu();
//     // 2. initSesison 생성
//     const newsession = newOV.initSession();
//     setSession(newsession);
//     // JSON.parse(JSON.stringify(newSession))
//     // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
//     setOV(newOV);
//     // 4. session에 connect하는 과정
//     newsession.on("streamCreated", (e) => {
//       const newSubscriber = newsession.subscribe(e.stream, undefined);
//       setSubscribers((current) => [...current, newSubscriber]);
//       setIsConnect(true);
//     });
//     // 1-2 session에서 disconnect한 사용자 삭제
//     newsession.on("streamDestroyed", (e) => {
//       if (e.stream.typeOfVideo === "CUSTOM") {
//         deleteSubscriber(e.stream.connection.connectionId);
//       } else {
//         // setCheckMyScreen(true);
//       }
//     });
//     // 1-3 예외처리
//     newsession.on("exception", (exception) => {});
//     newsession
//       .connect(tokenStuff, { clientData: nickname })
//       .then(async () => {
//         await newOV
//           .getUserMedia({
//             audioSource: false,
//             videoSource: undefined,
//             resolution: "380x240",
//             frameRate: 10,
//           })
//           .then((mediaStream) => {
//             let videoTrack = mediaStream.getVideoTracks()[0];
//             let newPublisher = newOV.initPublisher(undefined, {
//               audioSource: undefined, // The source of audio. If undefined default audio input
//               videoSource: videoTrack, // The source of video. If undefined default video input
//               publishAudio: true, // Whether you want to start the publishing with audio unmuted or muted
//               publishVideo: true, // Whether you want to start the publishing with video enabled or disabled
//               // resolution: '1280x720',  // The resolution of your video
//               // frameRate: 10,   // The frame rate of your video
//               insertMode: "APPEND", // How the video will be inserted according to targetElement
//               mirror: true, // Whether to mirror your local video or not
//             });
//             // 4-b user media 객체 생성
//             newPublisher.once("accessAllowed", () => {
//               newsession.publish(newPublisher);
//               setPublisher(newPublisher);
//             });
//           });
//       })
//       .catch((error) => {
//         console.warn(
//           "There was an error connecting to the session:",
//           error.code,
//           error.message
//         );
//       });
//   };

//   // const getUserName = async () => { // 유저 계속 갱신
//   //   setNickNames(null)
//   //   try{
//   //     const repo = await axios.get(`/report?sessionID=${location.state.sessionId}`,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
//   //     setNickNames(repo.data.data)
//   //   }catch(error){
//   //   }
//   // }

//   window.onbeforeunload = function () {
//     // 브라우저 삭제 및 새로고침 시 leave
//     leaveload();
//   };

//   const handleChat = () => {
//     // 채팅창 여닫이
//     setChat((prev) => !prev);
//   };

//   const handleReport = () => {
//     // 신고 창 여닫이
//     setReport((prev) => !prev);
//   };

//   useEffect(() => {}, [subscribers]);

//   useEffect(() => {
//     // 시작과 종료를 알리는
//     joinSession();
//     return () => {};
//   }, []);

//   // useEffect(() => {
//   //   getUserName()
//   // },[publisher,subscribers]);

//   return (
//     <div className="room">
//       <div className="video-container">
//         <div className="video-header">
//           <h2>{location.state.roomTitle}</h2>
//           <div className="video-sets">
//             {/* <img
//               src={siren}
//               className="siren"
//               onClick={handleReport}
//               alt=""
//             ></img> */}
//             {/* <img
//               src={message}
//               className="message-control"
//               onClick={handleChat}
//               alt=""
//             ></img> */}
//             <a href="/main">
//               {/* <img src={exit} className="out" alt=""></img> */}
//             </a>
//           </div>
//         </div>
//         <hr></hr>
//         <div className="video-chat">
//           {role === "master" || subscribers.length > 0 ? (
//             <div className="room-video">
//               {role === "master" && publisher !== null ? (
//                 <div className="pub">
//                   <VideoRecord
//                     streamManager={publisher}
//                     role={location.state.role}
//                     nicknames={nicknames}
//                   ></VideoRecord>
//                   {subscribers.length > 0
//                     ? subscribers.map((sub, index) => {
//                         return (
//                           <VideoRecord
//                             streamManager={sub}
//                             key={index}
//                             role={location.state.role}
//                           ></VideoRecord>
//                         );
//                       })
//                     : null}
//                 </div>
//               ) : null}
//               {role === "user" && publisher !== null ? (
//                 <div className="sub">
//                   <VideoRecord
//                     streamManager={publisher}
//                     role={location.state.role}
//                   ></VideoRecord>
//                   {subscribers.length > 0
//                     ? subscribers.map((sub, index) => {
//                         return (
//                           <VideoRecord
//                             streamManager={sub}
//                             key={index}
//                             role={location.state.role}
//                           ></VideoRecord>
//                         );
//                       })
//                     : null}
//                 </div>
//               ) : null}
//             </div>
//           ) : null}
//         </div>
//         {/* <div className='video-setting'>
//           </div> */}
//       </div>
//     </div>
//   );
// };

// export default UserVideoComponent;
