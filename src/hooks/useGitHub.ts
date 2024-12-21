import { useState, useEffect } from 'react';
import { githubService, GitHubUserData } from '../services/github';
import { useAuth } from '../contexts/AuthContext';

interface ContributionStats {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
  trends: {
    weekly: number;
    monthly: number;
  };
}

export const useGitHub = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [githubUser, setGithubUser] = useState<GitHubUserData | null>(null);
  const [stats, setStats] = useState<ContributionStats | null>(null);

  const calculateStats = (days: { date: string; count: number }[]) => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const dailyContributions =
      days.find((day) => day.date === now.toISOString().split('T')[0])?.count ||
      0;

    const weeklyContributions = days
      .filter((day) => {
        const date = new Date(day.date);
        return now.getTime() - date.getTime() <= oneWeek;
      })
      .reduce((sum, day) => sum + day.count, 0);

    const monthlyContributions = days
      .filter((day) => {
        const date = new Date(day.date);
        return now.getTime() - date.getTime() <= oneMonth;
      })
      .reduce((sum, day) => sum + day.count, 0);

    // 前週と前月のデータを取得して傾向を計算
    const previousWeekContributions = days
      .filter((day) => {
        const date = new Date(day.date);
        const timeDiff = now.getTime() - date.getTime();
        return timeDiff > oneWeek && timeDiff <= 2 * oneWeek;
      })
      .reduce((sum, day) => sum + day.count, 0);

    const previousMonthContributions = days
      .filter((day) => {
        const date = new Date(day.date);
        const timeDiff = now.getTime() - date.getTime();
        return timeDiff > oneMonth && timeDiff <= 2 * oneMonth;
      })
      .reduce((sum, day) => sum + day.count, 0);

    const weeklyTrend =
      previousWeekContributions === 0
        ? 100
        : Math.round(
            ((weeklyContributions - previousWeekContributions) /
              previousWeekContributions) *
              100
          );

    const monthlyTrend =
      previousMonthContributions === 0
        ? 100
        : Math.round(
            ((monthlyContributions - previousMonthContributions) /
              previousMonthContributions) *
              100
          );

    return {
      daily: dailyContributions,
      weekly: weeklyContributions,
      monthly: monthlyContributions,
      total: days.reduce((sum, day) => sum + day.count, 0),
      trends: {
        weekly: weeklyTrend,
        monthly: monthlyTrend,
      },
    };
  };

  const fetchData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // GitHubユーザー情報を取得
      const userData = await githubService.getUserData();
      setGithubUser(userData);

      // コントリビューションデータを取得
      const contributions = await githubService.getContributions(
        userData.login
      );
      const days = contributions.weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      );
      setStats(calculateStats(days));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Unknown error occurred')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    loading,
    error,
    githubUser,
    stats,
    refetch: fetchData,
  };
};
