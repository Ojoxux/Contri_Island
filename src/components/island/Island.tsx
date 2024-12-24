import { ContributionData } from './types';
import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { CloudGroup } from './CloudGroup';
import { Sky } from './Sky';
import { Water } from './Water';

interface IslandProps {
  contributionData: ContributionData | null;
}

export const Island = ({ contributionData }: IslandProps) => {
  return (
    <group>
      <Sky />
      <Lighting />
      <Ground contributionData={contributionData} />
      <Water position={[0, 0, 0]} size={[100, 100]} />
      <CloudGroup />
    </group>
  );
};
