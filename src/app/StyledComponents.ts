import styled from 'styled-components';
import { motion } from 'framer-motion';

// Layout components
export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-geist-sans);
`;

export const Main = styled.main`
  padding-top: 4rem;
  padding-bottom: 4rem;
  flex-grow: 1;
`;

export const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

export const Footer = styled.footer`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.gray[500]};
  font-size: 0.875rem;
`;

// Typography
export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  background: linear-gradient(to right, #9333ea, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.gray[600]};
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.gray[500]};
  font-size: 0.875rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

// Input
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  font-family: var(--font-geist-mono);
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.ringColor};
    border-color: ${({ theme }) => theme.primary};
  }
`;

// Error Message
export const ErrorBox = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.red[100]};
  border: 1px solid ${({ theme }) => theme.red[300]};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.red[800]};
`;

// Cards
export const ChunkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SelectorCard = styled(motion.div)`
  padding: 0.75rem;
  background-color: rgba(167, 139, 250, 0.1);
  border: 1px solid ${({ theme }) => theme.violet[200]};
  border-radius: 0.5rem;
  font-family: var(--font-geist-mono);
  font-size: 0.875rem;
  word-break: break-all;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ChunkCard = styled(motion.div)`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  font-family: var(--font-geist-mono);
  font-size: 0.875rem;
  word-break: break-all;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const EmptyMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.gray[500]};
`;

// Flex layouts
export const FlexRow = styled.div`
  display: flex;
  align-items: start;
  gap: 0.5rem;
`;

export const LabelSpan = styled.span`
  color: ${({ theme }) => theme.gray[500]};
  flex-shrink: 0;
  width: 4rem;
`;

export const ValueContainer = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: start;
`;

export const SelectorValue = styled.span`
  color: ${({ theme }) => theme.violet[700]};
  font-family: monospace;
  padding-right: 2rem;
`;

export const ChunkValue = styled.span`
  color: ${({ theme }) => theme.emerald[600]};
  font-family: monospace;
  padding-right: 2rem;
  word-break: break-all;
`;

export const CopyIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: -0.125rem;
  padding: 0.25rem;
  color: ${({ theme }) => theme.gray[500]};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Theme toggle
export const ThemeToggleButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.gray[100]};
  transition: background-color 0.2s;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${({ theme }) => theme.gray[200]};
  }
`;

// Links
export const FooterLink = styled.a`
  color: ${({ theme }) => theme.primary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: underline;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;
