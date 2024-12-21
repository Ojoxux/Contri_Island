import { useState, useEffect } from 'react';
import { githubService } from '../services/github';
import { useAuth } from '../contexts/AuthContext';
import { useGitHubStore } from '../store/useGitHubStore';

interface Contribution {
  date: string;
  contributionCount: number;
}

export const useContributions = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const { user } = useAuth();
  const { userData } = useGitHubStore();

  useEffect(() => {
    const fetchContributions = async () => {
      if (!userData?.login) return;

      try {
        const data = await githubService.getContributions(userData.login);
        const formattedData = data.weeks.flatMap((week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            contributionCount: day.contributionCount,
          }))
        );
        setContributions(formattedData);
      } catch (error) {
        console.error('Failed to fetch contributions:', error);
      }
    };

    fetchContributions();
  }, [userData?.login]);

  return { contributions };
};
