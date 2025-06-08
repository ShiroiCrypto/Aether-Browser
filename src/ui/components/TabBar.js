import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';

const TabBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.xs};
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.surface : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-width: 120px;
  max-width: 200px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const TabTitle = styled.span`
  flex: 1;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TabFavicon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const TabCloseButton = styled(motion.button)`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  opacity: 0;

  ${Tab}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NewTabButton = styled(motion.button)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: ${({ theme }) => theme.spacing.xs};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const TabBar = ({ tabs, activeTab, onNewTab, onCloseTab, onTabSelect }) => {
  return (
    <TabBarContainer>
      <AnimatePresence>
        {tabs.map((tab) => (
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
            <TabCloseButton
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX size={12} />
            </TabCloseButton>
          </Tab>
        ))}
      </AnimatePresence>
      <NewTabButton
        onClick={onNewTab}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiPlus size={16} />
      </NewTabButton>
    </TabBarContainer>
  );
};

export default TabBar; 