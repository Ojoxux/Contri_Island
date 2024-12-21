import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IslandFeature = {
  id: string;
  type: 'tree' | 'flower' | 'building' | 'bridge' | 'decoration';
  position: [number, number, number];
  rotation: number;
  scale: number;
  color?: string;
  unlocked: boolean;
  requiredContributions: number;
};

export type IslandLevel = {
  level: number;
  name: string;
  requiredContributions: number;
  features: IslandFeature[];
};

interface IslandState {
  currentLevel: number;
  totalContributions: number;
  unlockedFeatures: string[];
  customColors: {
    ground: string;
    water: string;
    trees: string;
    buildings: string;
  };
  islandLevels: IslandLevel[];
  // アクション
  setCurrentLevel: (level: number) => void;
  setTotalContributions: (contributions: number) => void;
  unlockFeature: (featureId: string) => void;
  setCustomColors: (colors: Partial<IslandState['customColors']>) => void;
}

// 島の発展レベルとフィーチャーの定義
const defaultIslandLevels: IslandLevel[] = [
  {
    level: 1,
    name: '無人島',
    requiredContributions: 0,
    features: [
      {
        id: 'basic-tree-1',
        type: 'tree',
        position: [-1, 0, -1],
        rotation: 0,
        scale: 1,
        unlocked: true,
        requiredContributions: 0,
      },
    ],
  },
  {
    level: 2,
    name: 'キャンプ場',
    requiredContributions: 10,
    features: [
      {
        id: 'tent-1',
        type: 'building',
        position: [0, 0, 0],
        rotation: 0,
        scale: 1,
        unlocked: false,
        requiredContributions: 10,
      },
      {
        id: 'flower-1',
        type: 'flower',
        position: [1, 0, 1],
        rotation: 0,
        scale: 1,
        unlocked: false,
        requiredContributions: 15,
      },
    ],
  },
  {
    level: 3,
    name: '発展途上の島',
    requiredContributions: 30,
    features: [
      {
        id: 'bridge-1',
        type: 'bridge',
        position: [0, 0.5, 0],
        rotation: Math.PI / 4,
        scale: 1,
        unlocked: false,
        requiredContributions: 30,
      },
      {
        id: 'house-1',
        type: 'building',
        position: [2, 0, 2],
        rotation: 0,
        scale: 1,
        unlocked: false,
        requiredContributions: 40,
      },
    ],
  },
  {
    level: 4,
    name: '発展した島',
    requiredContributions: 100,
    features: [
      {
        id: 'lighthouse-1',
        type: 'building',
        position: [-2, 0, -1],
        rotation: 0,
        scale: 1,
        unlocked: false,
        requiredContributions: 100,
      },
    ],
  },
];

export const useIslandStore = create<IslandState>()(
  persist(
    (set) => ({
      currentLevel: 1,
      totalContributions: 0,
      unlockedFeatures: ['basic-tree-1'],
      customColors: {
        ground: '#88C9A1',
        water: '#8ECBDE',
        trees: '#4FC1A6',
        buildings: '#B69B7D',
      },
      islandLevels: defaultIslandLevels,

      setCurrentLevel: (level) => set({ currentLevel: level }),
      setTotalContributions: (contributions) =>
        set((state) => {
          const newState = { ...state, totalContributions: contributions };

          // レベルの更新
          const newLevel = state.islandLevels.reduce((maxLevel, levelData) => {
            if (contributions >= levelData.requiredContributions) {
              return Math.max(maxLevel, levelData.level);
            }
            return maxLevel;
          }, 1);

          // 新しいフィーチャーのアンロック
          const newUnlockedFeatures = new Set(state.unlockedFeatures);
          state.islandLevels.forEach((levelData) => {
            levelData.features.forEach((feature) => {
              if (
                contributions >= feature.requiredContributions &&
                !newUnlockedFeatures.has(feature.id)
              ) {
                newUnlockedFeatures.add(feature.id);
              }
            });
          });

          return {
            ...newState,
            currentLevel: newLevel,
            unlockedFeatures: Array.from(newUnlockedFeatures),
          };
        }),

      unlockFeature: (featureId) =>
        set((state) => ({
          unlockedFeatures: [...state.unlockedFeatures, featureId],
        })),

      setCustomColors: (colors) =>
        set((state) => ({
          customColors: { ...state.customColors, ...colors },
        })),
    }),
    {
      name: 'island-storage',
    }
  )
);
