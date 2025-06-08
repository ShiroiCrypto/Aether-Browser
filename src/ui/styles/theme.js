import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#0A0F2C', // Azul galáctico
    backgroundAlt: '#0B1E3D',
    accent: '#38E8E1', // Ciano etéreo
    accentGradient: 'linear-gradient(90deg, #38E8E1 0%, #6C5CE7 100%)',
    tabActive: '#6C5CE7', // Roxo profundo
    tabHover: '#5F27CD',
    text: '#EAF6FF', // Branco azulado
    textSecondary: '#F1F9FE',
    border: '#2C2F38', // Cinza névoa
    divider: '#3A3F4B',
    card: 'rgba(44,47,56,0.6)',
    cardBlur: 'rgba(44,47,56,0.4)',
    shadow: '0 4px 24px 0 rgba(56, 232, 225, 0.08)',
    error: '#ff3b30',
    success: '#34c759',
    warning: '#ff9500',
  },
  fonts: {
    title: 'Poppins, Arial, Helvetica, sans-serif',
    body: 'Inter, Arial, Helvetica, sans-serif',
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '8px',
    md: '16px', // rounded-2xl
    full: '9999px',
  },
  transitions: {
    default: '0.25s cubic-bezier(.4,0,.2,1)',
    fast: '0.15s cubic-bezier(.4,0,.2,1)',
    slow: '0.4s cubic-bezier(.4,0,.2,1)',
  },
  shadows: {
    md: '0 4px 24px 0 rgba(56, 232, 225, 0.08)',
    glass: '0 8px 32px 0 rgba(10, 15, 44, 0.24)',
  },
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.text};
    font-weight: 700;
  }

  button, input, textarea {
    font-family: inherit;
    color: inherit;
    background: none;
    border: none;
    outline: none;
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.default};
    &:hover {
      color: ${props => props.theme.colors.tabActive};
      filter: brightness(1.2);
    }
  }

  .card {
    background: ${props => props.theme.colors.card};
    border-radius: ${props => props.theme.borderRadius.md};
    box-shadow: ${props => props.theme.shadows.md};
    backdrop-filter: blur(12px);
    border: 1px solid ${props => props.theme.colors.border};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundAlt};
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.tabActive};
  }

  // Efeito de partículas e paralaxe podem ser adicionados via componentes React
`;

export default theme; 