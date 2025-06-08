import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiStar, FiGlobe } from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${props => props.theme.colors.background};
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, ${props => props.theme.colors.accent}22 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Logo = styled(motion.div)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 48px;
  font-weight: 700;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 48px;
  text-shadow: 0 0 20px ${props => props.theme.colors.accent}66;
`;

const SearchContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  position: relative;
  margin-bottom: 48px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 56px;
  background: ${props => props.theme.colors.card};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  padding: 0 24px;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 4px ${props => props.theme.colors.accent}33;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  pointer-events: none;
`;

const QuickLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
`;

const QuickLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.default};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background: ${props => props.theme.colors.cardBlur};
    border-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const QuickLinkIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.accent}22;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.accent};
`;

const QuickLinkText = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const NewTab = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      let url = searchQuery;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
      window.location.href = url;
    }
  };

  return (
    <Container>
      <Logo
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Aether
      </Logo>

      <SearchContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SearchInput
          placeholder="Pesquisar na web ou digite um endereço"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
        />
        <SearchIcon size={20} />
      </SearchContainer>

      <QuickLinks>
        <QuickLink
          href="https://www.google.com"
          target="_blank"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <QuickLinkIcon>
            <FiGlobe size={20} />
          </QuickLinkIcon>
          <QuickLinkText>Google</QuickLinkText>
        </QuickLink>

        <QuickLink
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <QuickLinkIcon>
            <FiClock size={20} />
          </QuickLinkIcon>
          <QuickLinkText>Histórico Recente</QuickLinkText>
        </QuickLink>

        <QuickLink
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <QuickLinkIcon>
            <FiStar size={20} />
          </QuickLinkIcon>
          <QuickLinkText>Favoritos</QuickLinkText>
        </QuickLink>
      </QuickLinks>
    </Container>
  );
};

export default NewTab; 