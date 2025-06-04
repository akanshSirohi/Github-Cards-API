import { vi } from 'vitest';
vi.mock('satori', () => ({ default: async () => '' }));
vi.mock('satori-html', () => ({ html: () => '' }));
vi.mock('css-color-keywords', () => ({}));
vi.mock('css-to-react-native', () => ({ default: () => [] }));
