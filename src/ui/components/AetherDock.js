import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiX, FiStar, FiClock, FiMusic, FiFileText, FiRss } from 'react-icons/fi';

const DockContainer = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-left: 1px solid ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const DockHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
`;

const DockTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const DockContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const DockSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DockItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const DockIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
`;

const DockItemTitle = styled.span`
  font-size: 14px;
`;

const AetherDock = ({ onClose }) => {
  return (
    <DockContainer
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <DockHeader>
        <DockTitle>AetherDock</DockTitle>
        <CloseButton
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiX size={20} />
        </CloseButton>
      </DockHeader>
      <DockContent>
        <DockSection>
          <SectionTitle>Favoritos</SectionTitle>
          <DockItem whileHover={{ x: 4 }}>
            <DockIcon>
              <FiStar size={16} />
            </DockIcon>
            <DockItemTitle>Adicionar aos Favoritos</DockItemTitle>
          </DockItem>
        </DockSection>

        <DockSection>
          <SectionTitle>Histórico</SectionTitle>
          <DockItem whileHover={{ x: 4 }}>
            <DockIcon>
              <FiClock size={16} />
            </DockIcon>
            <DockItemTitle>Ver Histórico Completo</DockItemTitle>
          </DockItem>
        </DockSection>

        <DockSection>
          <SectionTitle>Mídia</SectionTitle>
          <DockItem whileHover={{ x: 4 }}>
            <DockIcon>
              <FiMusic size={16} />
            </DockIcon>
            <DockItemTitle>Miniplayer</DockItemTitle>
          </DockItem>
        </DockSection>

        <DockSection>
          <SectionTitle>Notas</SectionTitle>
          <DockItem whileHover={{ x: 4 }}>
            <DockIcon>
              <FiFileText size={16} />
            </DockIcon>
            <DockItemTitle>Nova Nota</DockItemTitle>
          </DockItem>
        </DockSection>

        <DockSection>
          <SectionTitle>Feed</SectionTitle>
          <DockItem whileHover={{ x: 4 }}>
            <DockIcon>
              <FiRss size={16} />
            </DockIcon>
            <DockItemTitle>AetherFeed</DockItemTitle>
          </DockItem>
        </DockSection>
      </DockContent>
    </DockContainer>
  );
};

export default AetherDock; 