import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiRefreshCw, FiStar, FiMoreVertical } from 'react-icons/fi';

const NavContainer = styled.div`
  height: 48px;
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const NavButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background: ${props => props.theme.colors.card};
    border-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.accent};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchBar = styled.div`
  flex: 1;
  height: 36px;
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  padding: 0 16px;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.default};

  &:focus-within {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.accent}33;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  padding: 8px;
  outline: none;

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Favicon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-right: 8px;
`;

const LoadingBar = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.full};
`;

const NavBar = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [favicon, setFavicon] = useState(null);

  useEffect(() => {
    // Eventos do Electron
    window.electron.onUrlUpdate((newUrl) => {
      setUrl(newUrl);
    });

    window.electron.onTitleUpdate((title) => {
      document.title = title;
    });

    window.electron.onFaviconUpdate((newFavicon) => {
      setFavicon(newFavicon);
    });

    window.electron.onLoadingStart(() => {
      setIsLoading(true);
    });

    window.electron.onLoadingEnd(() => {
      setIsLoading(false);
    });

    window.electron.onLoadingFailed(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      let searchUrl = url;
      if (!searchUrl.startsWith('http://') && !searchUrl.startsWith('https://')) {
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchUrl)}`;
      }
      window.electron.navigate(searchUrl);
    }
  };

  return (
    <NavContainer>
      <NavButton
        onClick={() => window.electron.goBack()}
        disabled={!canGoBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowLeft size={18} />
      </NavButton>

      <NavButton
        onClick={() => window.electron.goForward()}
        disabled={!canGoForward}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowRight size={18} />
      </NavButton>

      <NavButton
        onClick={() => window.electron.reload()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiRefreshCw size={18} />
      </NavButton>

      <SearchBar>
        {favicon && <Favicon src={favicon} alt="" />}
        <SearchInput
          placeholder="Pesquisar ou digite um endereço"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleSearch}
        />
      </SearchBar>

      <NavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiStar size={18} />
      </NavButton>

      <NavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMoreVertical size={18} />
      </NavButton>

      {isLoading && (
        <LoadingBar
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
    </NavContainer>
  );
};

export default NavBar; 