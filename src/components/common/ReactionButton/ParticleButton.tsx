import * as Styled from './StyleParticleButton';
import { useEffect, useState } from 'react';
import snow from 'assets/christmas/snow.png';

type Particle = {
  scale: number;
  sec: number;
  x: number;
  y: number;
};

export default function ParticleButton() {
  const [group, setGroup] = useState<Particle[]>([]); // 타입 정의 추가

  const handleClick = () => {
    const num = Math.floor(Math.random() * 50) + 30;

    const newGroup: Particle[] = []; // 새로운 배열 생성

    for (let i = 0; i < num; i++) {
      // 크기 난수 (Max8 Min4)
      const scale = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
      // 위치 난수 (Max149 Min-100)
      const x = Math.floor(Math.random() * 150) - 100; // Max 150, Min -100
      const y = Math.floor(Math.random() * 150) - 100; // Max 150, Min -100
      // 시간 난수 (Max1699ms Min1000ms)
      const sec = Math.floor(Math.random() * 1700) + 1000;
      newGroup.push({ scale, sec, x, y });
    }

    setGroup(newGroup); // 상태 업데이트
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      <Styled.BtnContain>
        <Styled.Btn>Click Me</Styled.Btn>
        <Styled.BtnParticles>
          {group.map((shape, index) => (
            <Styled.Shape
              key={index}
              src={snow}
              scale={shape.scale}
              sec={shape.sec}
              x={shape.x}
              y={shape.y}
            />
          ))}
        </Styled.BtnParticles>
      </Styled.BtnContain>
    </>
  );
}
