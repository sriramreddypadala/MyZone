import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const float = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -10px) rotate(2deg);
  }
  50% {
    transform: translate(0, -15px) rotate(0deg);
  }
  75% {
    transform: translate(-10px, -10px) rotate(-2deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.02;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.04;
  }
  100% {
    transform: scale(1);
    opacity: 0.02;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(
    150deg,
    #1a1f2c 0%,
    #161b27 45%,
    #12151f 100%
  );

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(
      circle at center,
      rgba(62, 84, 172, 0.02) 0%,
      rgba(62, 84, 172, 0.01) 25%,
      rgba(62, 84, 172, 0) 50%
    );
    transform: rotate(-12deg);
    pointer-events: none;
  }
`;

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    rgba(62, 84, 172, 0.02),
    rgba(62, 84, 172, 0.04)
  );
  opacity: 0.08;
  will-change: transform;
  pointer-events: none;
  box-shadow: 0 0 60px rgba(62, 84, 172, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: inherit;
    filter: blur(30px);
  }

  ${props => {
    switch (props.size) {
      case 'large':
        return css`
          width: 800px;
          height: 800px;
          top: -300px;
          right: -300px;
          animation: ${float} 30s ease-in-out infinite,
                     ${rotate} 60s linear infinite;
          animation-delay: -2s;
        `;
      case 'medium':
        return css`
          width: 600px;
          height: 600px;
          bottom: -200px;
          left: -200px;
          animation: ${float} 35s ease-in-out infinite;
          animation-delay: -1s;
        `;
      case 'small':
        return css`
          width: 400px;
          height: 400px;
          top: 40%;
          right: 15%;
          animation: ${float} 40s ease-in-out infinite;
          animation-delay: -3s;
        `;
      default:
        return '';
    }
  }}

  @media (max-width: 768px) {
    ${props => {
      switch (props.size) {
        case 'large':
          return css`
            width: 400px;
            height: 400px;
            top: -150px;
            right: -150px;
          `;
        case 'medium':
          return css`
            width: 300px;
            height: 300px;
            bottom: -100px;
            left: -100px;
          `;
        case 'small':
          return css`
            width: 200px;
            height: 200px;
          `;
        default:
          return '';
      }
    }}
  }
`;

const FloatingOrb = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(62, 84, 172, 0.15);
  animation: ${pulse} 3s ease-in-out infinite;
  pointer-events: none;
  will-change: transform;
  box-shadow: 0 0 15px rgba(62, 84, 172, 0.08);

  @media (max-width: 768px) {
    width: 2px;
    height: 2px;
  }
`;

const AnimatedBackground = () => {
  // Create an array of random positions for orbs
  const orbPositions = Array.from({ length: 25 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`
  }));

  return (
    <BackgroundContainer>
      <Shape size="large" />
      <Shape size="medium" />
      <Shape size="small" />
      
      {orbPositions.map((pos, index) => (
        <FloatingOrb
          key={index}
          style={{
            top: pos.top,
            left: pos.left,
            animationDelay: pos.delay
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;
