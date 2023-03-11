import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import TopbarDetail from '../components/Topbar/TopbarDetail';
import VideoRecord from '../components/VideoRecord/VideoRecord';
import Chat from '../components/Chat/Chat';
import {
  __postVideoToken,
  __postExitRoom,
  __getRoomNickname,
  __getRoom,
} from '../redux/modules/roomSlice';
import { BsMicFill } from 'react-icons/bs';
import { BsMicMuteFill } from 'react-icons/bs';
import { BsCameraVideo } from 'react-icons/bs';
import { BsCameraVideoOff } from 'react-icons/bs';

export default function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openviduRoomId } = useParams();

  //openVidu
  const [session, setSession] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [publisherConnectionId, setPublisherConnectionId] = useState(undefined);
  const [OV, setOV] = useState();
  const [isConnect, setIsConnect] = useState(false);

  ////////////////////////////////////////////////////////////////////
  const nickname = localStorage.getItem('nickname');
  const roomData = useSelector((state) => state.room.roomInfo);
  const { roomNicknames } = useSelector((state) => state.room);
  const [roomTitle, setRoomTitle] = useState(null);
  const [keyToken, setKeyToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [nicknames, setNickNames] = useState(null);
  const [videoOnOff, setVideoOnOff] = useState(true);
  const [nowSubscriber, setNowSubscriber] = useState(null);

  //리프레시토큰//
  const reIssue = async () => {
    try {
      const refreshToken = localStorage.getItem('Refresh');
      const userEmail = localStorage.getItem('userEmail');

      const data = {
        headers: { Refresh: `${refreshToken}` },
        params: { userEmail: userEmail },
      };

      const repo = await axios.post(
        'https://cocodingding.shop/user/refresh',
        null,
        data
      );

      localStorage.setItem('Authorization', repo.headers.authorization);
      localStorage.setItem('Refresh', repo.headers.refresh);
    } catch (error) {
      console.error(error);
    }
  };

  setInterval(() => {
    reIssue();
  }, 10000 * 10);

  // get한 데이터가 들어왔을 때 useState로 관리
  useEffect(() => {
    setRoomTitle(roomData.roomTitle);
    setKeyToken(roomData.enterRoomToken);
    setSessionId(roomData.sessionId);
  }, [roomData]);

  useEffect(() => {
    joinSession();
  }, [keyToken]);

  // const reload = async () => {
  //   const onReload = await axios.post(
  //     `https://cocodingding.shop/detail/room/${openviduRoomId}`
  //   );
  // };

  // window.onbeforeunload = function () {
  //   reload();
  // };

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
    subscribers.length === 0 && setSubscribers([]);
  };

  const leaveSession = () => {
    setSubscribers([]);
    setOV(undefined);
    setPublisher(null);
    setMainStreamManager(undefined);
    setKeyToken(null);
    dispatch(__postExitRoom(roomData.openviduRoomId));
    navigate(`/`);
    window.location.reload();
  };

  const joinSession = () => {
    const newOV = new OpenVidu();
    const newsession = newOV.initSession();
    setSession(newsession);
    setOV(newOV);
    newsession.on('streamCreated', (e) => {
      const newSubscriber = newsession.subscribe(e.stream, undefined);
      setSubscribers(() => [...subscribers, newSubscriber]);
      setIsConnect(true);
    });

    newsession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    newsession.on('exception', (exception) => {});

    newsession
      .connect(keyToken, { clientData: nickname })
      .then(async () => {
        await newOV
          .getUserMedia({
            audioSource: false,
            videoSource: undefined,
            resolution: '380x240',
            frameRate: 10,
          })
          .then((mediaStream) => {
            let videoTrack = mediaStream.getVideoTracks()[0];

            let newPublisher = newOV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default audio input
              videoSource: videoTrack, // The source of video. If undefined default video input
              publishAudio: true, // Whether you want to start the publishing with audio unmuted or muted
              publishVideo: true, // Whether you want to start the publishing with video enabled or disabled
              resolution: '1280x720', // The resolution of your video
              frameRate: 10, // The frame rate of your video
              insertMode: 'APPEND', // How the video will be inserted according to targetElement
              mirror: true, // Whether to mirror your local video or not
            });
            newPublisher.once('accessAllowed', () => {
              newsession.publish(newPublisher);
              setPublisher(newPublisher);
            });

            // Obtain the current video device in use
            const devices = newOV.getDevices();
            const videoDevices = devices.filter(
              (device) => device.kind === 'videoinput'
            );
            const currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            setCurrentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            // Set the main video in the page to display our webcam and store our Publisher
            setCurrentVideoDevice(currentVideoDevice);
            setPublisher(publisher);
            setMainStreamManager(publisher);
            setPublisherConnectionId(publisher.stream.connection.connectionId);
          });
      })
      .catch((error) => {
        console.warn(
          'There was an error connecting to the session:',
          error.code,
          error.message
        );
      });
  };

  const [pubVideo, setPubVideo] = useState(true);
  const [pubMic, setPubMic] = useState(true);

  const onClickPubVideoOnOff = () => {
    setPubVideo(!pubVideo);
  };

  const onClickPubMicOnOff = () => {
    setPubMic(!pubMic);
  };

  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(pubVideo);
      publisher.publishAudio(pubMic);
    }
  }, [pubVideo, pubMic]);

  return (
    <>
      <TopbarDetail />
      <Layout>
        <StTitle>
          <h1>Welcome ! {roomData.roomTitle} 방 입니다.</h1>
        </StTitle>
        <StContainer>
          <StVideoContainer>
            <StVideo>
              <div className='video-chat'>
                {session !== undefined ? (
                  <StRoomVideo>
                    {/* 메인스트림매니저가 있을 때 */}
                    {mainStreamManager !== undefined ? (
                      <StPub>
                        <VideoRecord
                          streamManager={mainStreamManager}
                          // role={location.state.role}
                          // nicknames={nicknames}
                        ></VideoRecord>
                      </StPub>
                    ) : null}

                    {/* 퍼블리셔가 있을 때 */}
                    {publisher !== null && (
                      <StSub>
                        <Stbox>
                          <div className='sub'>
                            <VideoRecord
                              streamManager={publisher}
                            ></VideoRecord>
                          </div>
                        </Stbox>

                        <Stbox>
                          {subscribers.length > 0 &&
                            subscribers.map((sub, index) => {
                              return (
                                <>
                                  <VideoRecord
                                    streamManager={sub}
                                    key={index}
                                  ></VideoRecord>
                                </>
                              );
                            })}
                        </Stbox>
                      </StSub>
                    )}
                  </StRoomVideo>
                ) : null}

                <StPlayerContainer>
                  <ReactPlayer
                    url={roomData.youtubeLink}
                    width='550px'
                    height='310px'
                    config={{
                      youtube: {
                        playerVars: {
                          start: 1,
                        },
                      },
                    }}
                    volume={1}
                    controls
                  />
                </StPlayerContainer>
              </div>
            </StVideo>

            <StcontrolBox>
              <StPersonal>
                <StVideoBtn pubVideo={pubVideo} onClick={onClickPubVideoOnOff}>
                  {pubVideo ? <BsCameraVideo /> : <BsCameraVideoOff />}
                </StVideoBtn>
                <StMicBtn pubMic={pubMic} onClick={onClickPubMicOnOff}>
                  {pubMic ? <BsMicFill /> : <BsMicMuteFill />}
                </StMicBtn>
              </StPersonal>
              <StExit>
                <StExitBtn onClick={leaveSession}>나가기</StExitBtn>
              </StExit>
            </StcontrolBox>
          </StVideoContainer>

          <StChatContainer>
            {/* 방id 파람값전달.. */}
            <Chat
              openviduRoomId={openviduRoomId}
              nickname={localStorage.getItem('userNickname')}
            />
          </StChatContainer>
        </StContainer>
      </Layout>
    </>
  );
}

const StTitle = styled.div`
  margin-top: 40px;
  & > button {
    border: 1px solid black;
    cursor: pointer;
  }
`;

const StContainer = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  width: 100%;
  height: 700px;
  margin-top: 50px;
  display: flex;
  border: 1px solid #a0a0a0;
  border-radius: 15px;
  background-color: #f6f6f6;
`;

const StVideoContainer = styled.div`
  flex-basis: 70%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StChatContainer = styled.div`
  flex-basis: 30%;
  width: 100%;
`;

const StPub = styled.div``;

const StRoomVideo = styled.div`
  height: 200px;
`;

const StSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
`;

const Stbox = styled.div`
  width: 800px;
  height: 200px;
  & > button {
    width: 200px;
    height: 30px;
  }
`;

const StnickName = styled.div``;

const StVideo = styled.div`
  height: 90%;
`;

const StcontrolBox = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #a0a0a0;
  padding: 0px 30px 0px 30px;
`;

const StPlayerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  /* display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 600px;
  height: 400px; */
  /* @media screen and (max-width: 1440px) {
    width: 758px;
    height: 426px;
  } */
`;

const StPersonal = styled.div`
  display: flex;
  gap: 20px;
`;

const StVideoBtn = styled.button`
  width: 130px;
  height: 49px;
  border: none;
  border-radius: 10px;
  background-color: ${({ pubVideo }) => (pubVideo ? '#3d8afd' : 'white')};
  color: ${({ pubVideo }) => (pubVideo ? 'white' : '#3d8afd')};
  font-size: 24px;
  cursor: pointer;
`;

const StMicBtn = styled.button`
  width: 130px;
  height: 49px;
  border: none;
  border-radius: 10px;
  background-color: ${({ pubMic }) => (pubMic ? '#3d8afd' : 'white')};
  color: ${({ pubMic }) => (pubMic ? 'white' : '#3d8afd')};
  font-size: 24px;
  cursor: pointer;
`;

const StExitBtn = styled.button`
  width: 130px;
  height: 49px;
  border: 1px solid #a0a0a0;
  border-radius: 10px;
  background-color: white;
  color: black;
  font-size: 24px;
  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
    transition: 0.5ms ease;
  }
`;

const StExit = styled.div``;
