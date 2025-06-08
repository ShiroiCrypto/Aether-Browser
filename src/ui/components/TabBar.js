import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';

const TabBarContainer = styled.div`
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
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.accentGradient};
    opacity: ${props => props.isActive ? 0.1 : 0};
    transition: opacity ${props => props.theme.transitions.default};
  }

  &:hover {
    background: ${props => props.theme.colors.card};
    border-color: ${props => props.theme.colors.accent};
    transform: translateY(-1px);

    &::before {
      opacity: 0.05;
    }
  }
`;

const TabFavicon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: ${props => props.theme.borderRadius.sm};
  flex-shrink: 0;
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
  flex-shrink: 0;

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
  flex-shrink: 0;

  &:hover {
    background: ${props => props.theme.colors.card};
    color: ${props => props.theme.colors.accent};
  }
`;

const TabBar = ({ tabs, activeTab, onNewTab, onCloseTab, onTabSelect }) => {
  return (
    <TabBarContainer>
      <AnimatePresence>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            isActive={tab.id === activeTab}
            onClick={() => onTabSelect(tab.id)}
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
                onCloseTab(tab.id);
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
        onClick={onNewTab}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiPlus size={20} />
      </AddTabButton>
    </TabBarContainer>
  );
};

export default TabBar; 