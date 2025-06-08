import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiRefreshCw, FiStar, FiMenu } from 'react-icons/fi';

const NavBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const UrlBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0 ${({ theme }) => theme.spacing.md};
  height: 32px;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const UrlInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const NavBar = () => {
  const [url, setUrl] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleUrlSubmit = (e) => {
    if (e.key === 'Enter') {
      let finalUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        finalUrl = 'https://' + url;
      }
      window.electron.navigate(finalUrl);
    }
  };

  const handleBack = () => {
    window.electron.goBack();
  };

  const handleForward = () => {
    window.electron.goForward();
  };

  const handleReload = () => {
    window.electron.reload();
  };

  const handleToggleDock = () => {
    window.electron.toggleDock();
  };

  return (
    <NavBarContainer>
      <NavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBack}
        disabled={!canGoBack}
      >
        <FiArrowLeft size={18} />
      </NavButton>
      <NavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleForward}
        disabled={!canGoForward}
      >
        <FiArrowRight size={18} />
      </NavButton>
      <NavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleReload}
      >
        <FiRefreshCw size={18} />
      </NavButton>
      <UrlBar>
        <UrlInput
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleUrlSubmit}
          placeholder="Digite uma URL ou pesquise..."
        />
      </UrlBar>
      <NavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiStar size={18} />
      </NavButton>
      <NavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleDock}
      >
        <FiMenu size={18} />
      </NavButton>
    </NavBarContainer>
  );
};

export default NavBar; 