import React from 'react';
import { useIslandStore } from '../../store/useIslandStore';
import { acnhColors } from '../../styles/colors';

export const SettingsContent = () => {
  const { customColors, setCustomColors } = useIslandStore();

  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    setCustomColors({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium" style={{ color: acnhColors.brown }}>
          カスタマイズ
        </h3>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: acnhColors.brown }}
            >
              地面の色
            </label>
            <input
              type="color"
              value={customColors.ground}
              onChange={(e) => handleColorChange('ground', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: acnhColors.brown }}
            >
              水の色
            </label>
            <input
              type="color"
              value={customColors.water}
              onChange={(e) => handleColorChange('water', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: acnhColors.brown }}
            >
              建物の色
            </label>
            <input
              type="color"
              value={customColors.buildings}
              onChange={(e) => handleColorChange('buildings', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
