import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiMaximize2, FiX, FiPlus } from 'react-icons/fi';
import NavBar from './components/NavBar';
import TabBar from './components/TabBar';
import NewTab from './pages/NewTab';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  -webkit-app-region: drag;
`;

const TitleBar = styled.div`
  height: 32px;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  -webkit-app-region: drag;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 8px;
  -webkit-app-region: no-drag;
`;

const WindowButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const WebViewContainer = styled.div`
  flex: 1;
  position: relative;
  background: ${props => props.theme.colors.background};
`;

const WebView = styled.webview`
  width: 100%;
  height: 100%;
  border: none;
`;

const App = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Nova Aba', url: 'about:blank', favicon: null }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleMaximize = () => setIsMaximized(true);
    const handleUnmaximize = () => setIsMaximized(false);

    window.electron.on('maximize', handleMaximize);
    window.electron.on('unmaximize', handleUnmaximize);

    return () => {
      window.electron.removeListener('maximize', handleMaximize);
      window.electron.removeListener('unmaximize', handleUnmaximize);
    };
  }, []);

  const handleMinimize = () => window.electron.minimize();
  const handleMaximize = () => window.electron.maximize();
  const handleClose = () => window.electron.close();

  const addTab = () => {
    const newTab = {
      id: Date.now(),
      title: 'Nova Aba',
      url: 'about:blank',
      favicon: null
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (id) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    if (newTabs.length === 0) {
      addTab();
    } else if (activeTab === id) {
      const index = tabs.findIndex(tab => tab.id === id);
      setActiveTab(newTabs[Math.max(0, index - 1)].id);
    }
    setTabs(newTabs);
  };

  const updateTab = (id, updates) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, ...updates } : tab
    ));
  };

  const handleUrlSubmit = (url) => {
    const activeTab = tabs.find(tab => tab.id === activeTab);
    if (activeTab) {
      updateTab(activeTab.id, { url });
    }
  };

  return (
    <AppContainer>
      <TitleBar>
        <div>Aether Browser</div>
        <WindowControls>
          <WindowButton onClick={handleMinimize}>
            <FiMinus />
          </WindowButton>
          <WindowButton onClick={handleMaximize}>
            <FiMaximize2 />
          </WindowButton>
          <WindowButton onClick={handleClose}>
            <FiX />
          </WindowButton>
        </WindowControls>
      </TitleBar>

      <Content>
        <NavBar onUrlSubmit={handleUrlSubmit} />
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabSelect={setActiveTab}
          onTabClose={closeTab}
          onAddTab={addTab}
        />
        <WebViewContainer>
          <AnimatePresence mode="wait">
            {tabs.map(tab => (
              tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  {tab.url === 'about:blank' ? (
                    <NewTab onUrlSubmit={handleUrlSubmit} />
                  ) : (
                    <WebView
                      src={tab.url}
                      onDidStartLoading={() => updateTab(tab.id, { loading: true })}
                      onDidStopLoading={() => updateTab(tab.id, { loading: false })}
                      onPageTitleUpdated={(e) => updateTab(tab.id, { title: e.title })}
                      onPageFaviconUpdated={(e) => updateTab(tab.id, { favicon: e.favicons[0] })}
                    />
                  )}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </WebViewContainer>
      </Content>
    </AppContainer>
  );
};

export default App; 