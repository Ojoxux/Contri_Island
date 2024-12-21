import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Goals {
  weekly: number;
  monthly: number;
}

export type ThemeColor = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export type ThemePreset = 'default' | 'ocean' | 'forest' | 'sunset';

interface Theme {
  isDarkMode: boolean;
  currentPreset: ThemePreset;
  customColors: ThemeColor;
}

const themePresets: Record<ThemePreset, ThemeColor> = {
  default: {
    primary: '#A3D977',
    secondary: '#FFF8E1',
    accent: '#F5A623',
    background: '#FFFFFF',
    text: '#333333',
  },
  ocean: {
    primary: '#64B5F6',
    secondary: '#E3F2FD',
    accent: '#00BCD4',
    background: '#FAFAFA',
    text: '#263238',
  },
  forest: {
    primary: '#66BB6A',
    secondary: '#E8F5E9',
    accent: '#FFA000',
    background: '#FCFCFC',
    text: '#1B5E20',
  },
  sunset: {
    primary: '#FF7043',
    secondary: '#FBE9E7',
    accent: '#FFB300',
    background: '#FFFFFF',
    text: '#3E2723',
  },
};

interface StoreState {
  goals: Goals;
  theme: Theme;
  setGoals: (goals: Goals) => void;
  setTheme: (theme: Partial<Theme>) => void;
  setThemePreset: (preset: ThemePreset) => void;
  setCustomColors: (colors: Partial<ThemeColor>) => void;
  getThemeColors: () => ThemeColor;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      goals: {
        weekly: 30,
        monthly: 100,
      },
      theme: {
        isDarkMode: false,
        currentPreset: 'default',
        customColors: themePresets.default,
      },
      setGoals: (goals) => set({ goals }),
      setTheme: (theme) =>
        set((state) => ({
          theme: { ...state.theme, ...theme },
        })),
      setThemePreset: (preset) =>
        set((state) => ({
          theme: {
            ...state.theme,
            currentPreset: preset,
            customColors: themePresets[preset],
          },
        })),
      setCustomColors: (colors) =>
        set((state) => ({
          theme: {
            ...state.theme,
            customColors: { ...state.theme.customColors, ...colors },
          },
        })),
      getThemeColors: () => {
        const state = get();
        const baseColors = themePresets[state.theme.currentPreset];
        const customColors = state.theme.customColors;

        if (state.theme.isDarkMode) {
          return {
            ...baseColors,
            ...customColors,
            background: '#1a1a1a',
            text: '#ffffff',
          };
        }

        return {
          ...baseColors,
          ...customColors,
        };
      },
    }),
    {
      name: 'github-contribution-island-storage',
    }
  )
);
