import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TitleBarContainer = styled.div`
  height: 32px;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  -webkit-app-region: drag;
  user-select: none;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 14px;
`;

const WindowControls = styled.div`
  display: flex;
  margin-left: auto;
  -webkit-app-region: no-drag;
`;

const WindowButton = styled(motion.button)`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &#close:hover {
    background-color: ${({ theme }) => theme.colors.error};
  }
`;

const TitleBar = () => {
  const handleMinimize = () => {
    window.electron.minimize();
  };

  const handleMaximize = () => {
    window.electron.maximize();
  };

  const handleClose = () => {
    window.electron.close();
  };

  return (
    <TitleBarContainer>
      <Logo>
        <img src="/assets/logo.svg" alt="Aether" height="16" />
        Aether Browser
      </Logo>
      <WindowControls>
        <WindowButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMinimize}
        >
          ─
        </WindowButton>
        <WindowButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMaximize}
        >
          □
        </WindowButton>
        <WindowButton
          id="close"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
        >
          ×
        </WindowButton>
      </WindowControls>
    </TitleBarContainer>
  );
};

export default TitleBar; 