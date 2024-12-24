import { useMemo, useRef } from 'react';
import { Group } from 'three';
import { GrassBlock } from './GrassBlock';
import { ContributionData } from './types';

interface GroundProps {
  contributionData: ContributionData | null;
}

export const Ground = ({ contributionData }: GroundProps) => {
  const groundRef = useRef<Group>(null);

  const blocks = useMemo(() => {
    if (!contributionData) return [];

    const blocks = [];
    const weeksCount = 20; // 20週分
    const daysInWeek = 7; // 1週間は7日
    const blockSize = 1.1; // ブロックサイズ
    const spacing = 0.1; // 間隔

    // 最新の20週間のデータを使用
    const recentWeeks = contributionData.weeks.slice(-20);

    for (let col = 0; col < weeksCount; col++) {
      // 配列を逆順にすることで最新の週を手前に
      const week = recentWeeks[recentWeeks.length - 1 - col];
      if (!week) continue;

      for (let row = 0; row < daysInWeek; row++) {
        const day = week.contributionDays[row];
        if (!day) continue;

        // GitHubスタイルのグリッド配置（最新の週が手前に）
        const x =
          -(row * (blockSize + spacing)) +
          (daysInWeek * (blockSize + spacing)) / 2;
        const z =
          -(col * (blockSize + spacing)) +
          (weeksCount * (blockSize + spacing)) / 2;

        blocks.push(
          <GrassBlock
            key={`${col}-${row}`}
            position={[x, 0, z]}
            contributionCount={day.contributionCount}
          />
        );
      }
    }

    return blocks;
  }, [contributionData]);

  return (
    <group ref={groundRef} position={[0, 0.1, 0]}>
      {blocks}
    </group>
  );
};
