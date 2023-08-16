export const KEYWORDS_COLOR = {
  red: {
    color: '#FF4646',
    background: 'rgba(255, 70, 70, 0.20)',
  },
  yellow: {
    color: '#FFB802',
    background: 'rgba(255, 184, 2, 0.20)',
  },
  green: {
    color: '#38C94F',
    background: 'rgba(56, 201, 79, 0.20)',
  },
  blue: {
    color: '#52A2FF',
    background: 'rgba(82, 162, 255, 0.20)',
  },
  purple: {
    color: '#968DFF',
    background: 'rgba(150, 141, 255, 0.20)',
  },
  pink: {
    color: '#FF6FC5',
    background: 'rgba(255, 111, 197, 0.20)',
  },
  brown: {
    color: '#98613A',
    background: 'rgba(152, 97, 58, 0.20)',
  },
  gray: {
    color: '#8B8B8B',
    background: 'rgba(139, 139, 139, 0.20)',
  },
} as const;

export type ColorKey = keyof typeof KEYWORDS_COLOR;
