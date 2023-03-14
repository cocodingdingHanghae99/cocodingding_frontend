import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdRefresh } from 'react-icons/md';

export default function WisdomQuote() {
  //명언기능 한번 테스트해봄.
  const wisdomList = [
    `"성공은 준비된 기회에 대한 만남이다." \n\n - 밥 프랭클린`,
    `"이루기 위해서는 꿈을 꾸어야 한다. 그리고 그 꿈을 이루기 위해 행동해야 한다." \n\n - 제임스 앨런`,
    `"할 수 있다고 믿으면 할 수 있고, 할 수 없다고 믿으면 할 수 없다." \n\n - 헨리 포드`,
    `"누구나 성공을 희망하지만, 그것을 위해서 희생과 노력을 해야 한다." \n\n - 헤이그 웰치`,
    `"우리가 성공하기 위해 필요한 것은 단지 자신의 능력을 믿는 것뿐이다." \n\n - 월트 디즈니`,
    `"당신이 매일 1%씩 성장하고 있다면, 당신은 1년 후에 37배가 성장한 것이다." \n\n - 조나스 콜마`,
    `"자신감은 열쇠다. 자신감이 있다면 어디든 갈 수 있다." \n\n - 스티브 잡스`,
    `"천천히 가도 좋다. 중요한 것은 멈추지 않는 것이다." \n\n - 코펜하겐`,
    `"자신을 믿는 것은 세상에서 가장 중요한 것이다. 당신이 믿지 않는다면, 누구도 믿지 않을 것이다." \n\n - 마이클 조던`,
    `"포기하는 순간이 가장 불안한 순간일 수 있다. 그러나 그 순간이 당신이 굳건한 의지를 가지고 있다는 것을 보여줄 때입니다." \n\n - 저스틴 트레두`,
    `"아무것도 기대하지 않으면 실망하지 않는다. 그러나 그것은 삶이 아니다." \n\n - 월터 에이너스트`,
    `"내일 죽을 것처럼 오늘을 살고, 영원히 살 것처럼 내일을 꿈꾸어라." \n\n - 제임스 딘`,
    `"인내는 쓰라린 충격과 실패를 이겨내는 가장 좋은 방법이다." \n\n - 빈스 람바르디`,
    `"성공은 실패를 극복하는 데 있어서 자신감을 잃지 않는 것이다." \n\n - 윈스턴 처칠`,
    `"이미 시간을 낭비한 청년은 젊은이가 아니다." \n\n - 솔론`,
    `"성공은 자신이 할 수 있는 최선을 다하고 더 나은 것을 원하는 것이다." \n\n - 시드니 로우`,
    `"나 자신에게 정직하라. 그러면 세상의 대부분을 속일 수 있다." \n\n - 빌리 월쉬`,
    `"성공은 자신이 믿는 것을 추구하는 것이다." \n\n - 존 우든`,
    `"꿈은 비행기다. 그러나 비행기는 공기 저항 때문에 날아간다. 꿈을 이루기 위해서는 고난과 역경을 극복해야 한다." \n\n - 벤저민 프랭클린`,
    `"공부는 인생에서 가장 중요한 일 중 하나다. 그것은 우리가 실제로 살아가는 방법을 배우는 일이다." \n\n - 존 드위드`,
  ];
  const [wisdom, setWisdom] = useState(
    wisdomList[Math.floor(Math.random() * wisdomList.length)]
  );

  useEffect(() => {
    setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
  }, []);

  const handleButtonClick = () => {
    setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
  };
  return (
    <StContainer>
      <StRefreshButton onClick={handleButtonClick}>
        <MdRefresh />
      </StRefreshButton>
      <StWisdom>
        <div>{wisdom}</div>
      </StWisdom>
    </StContainer>
  );
}

const StContainer = styled.div`
  background-color: #ececec;
  height: 250px;
  border-radius: 30px;
`;

const StRefreshButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 15px 15px 0 0;
  font-size: 33px;
  color: gray;
  background-color: transparent;
  border: none;
  /* border-radius: 5px; */
  cursor: pointer;
  :hover {
    color: #3498db;
  }
`;

const StWisdom = styled.h3`
  padding: 0 30px 0 30px;
  white-space: pre-line;
  display: flex;
  text-align: center; // 가운데 정렬
  justify-content: center;
  align-items: center;
`;
