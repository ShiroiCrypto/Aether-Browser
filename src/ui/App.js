import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { GlobalStyle } from './styles/theme';
import NewTab from './pages/NewTab';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const TitleBar = styled.div`
  -webkit-app-region: drag;
  height: 32px;
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const WindowControls = styled.div`
  -webkit-app-region: no-drag;
  display: flex;
  gap: 8px;
`;

const WindowButton = styled(motion.button)`
  width: 24px;
  height: 24px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.card};
    border-color: ${props => props.theme.colors.accent};
  }
`;

const NavBar = styled.div`
  height: 48px;
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
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

const TabBar = styled.div`
  height: 40px;
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled(motion.div)`
  height: 32px;
  min-width: 200px;
  max-width: 300px;
  background: ${props => props.isActive ? props.theme.colors.card : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  cursor: pointer;
  border: 1px solid ${props => props.isActive ? props.theme.colors.accent : 'transparent'};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background: ${props => props.theme.colors.card};
  }
`;

const TabFavicon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: ${props => props.theme.borderRadius.sm};
`;

const TabTitle = styled.span`
  flex: 1;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.colors.text};
`;

const TabClose = styled(motion.button)`
  width: 16px;
  height: 16px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  background: transparent;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.card};
    color: ${props => props.theme.colors.text};
  }
`;

const AddTabButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  background: transparent;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.card};
  }
`;

const Content = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const App = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Nova Aba', url: 'about:blank', favicon: null }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewTab = () => {
    const newTab = {
      id: Date.now(),
      title: 'Nova Aba',
      url: 'about:blank',
      favicon: null
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const handleCloseTab = (tabId) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      let url = searchQuery;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
      const newTabs = tabs.map(tab => 
        tab.id === activeTab ? { ...tab, url, title: url } : tab
      );
      setTabs(newTabs);
    }
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <TitleBar>
        <div>Aether Browser</div>
        <WindowControls>
          <WindowButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FiMinus size={16} />
          </WindowButton>
          <WindowButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FiMaximize2 size={16} />
          </WindowButton>
          <WindowButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FiX size={16} />
          </WindowButton>
        </WindowControls>
      </TitleBar>

      <NavBar>
        <SearchBar>
          <SearchInput
            placeholder="Pesquisar ou digite um endereço"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </SearchBar>
      </NavBar>

      <TabBar>
        <AnimatePresence>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              isActive={tab.id === activeTab}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.favicon && <TabFavicon src={tab.favicon} alt="" />}
              <TabTitle>{tab.title}</TabTitle>
              <TabClose
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={12} />
              </TabClose>
            </Tab>
          ))}
        </AnimatePresence>
        <AddTabButton
          onClick={handleNewTab}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiPlus size={20} />
        </AddTabButton>
      </TabBar>

      <Content>
        <Routes>
          <Route path="/" element={<NewTab />} />
        </Routes>
      </Content>
    </AppContainer>
  );
};

export default App; 