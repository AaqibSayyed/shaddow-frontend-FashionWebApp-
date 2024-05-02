import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(10px); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

const SpinnerLoader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2); 
  border-top: 4px solid whitesmoke; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

// Functional component for the loader
const Loader = () => {
  return (
    <LoaderContainer>
      <SpinnerLoader />
    </LoaderContainer>
  );
};

export default Loader;
