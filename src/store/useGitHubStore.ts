import { create } from 'zustand';
import { githubService, GitHubUserData } from '../services/github';

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

interface GitHubStore {
  userData: GitHubUserData | null;
  stats: ContributionStats | null;
  loading: boolean;
  error: Error | null;
  fetchUserData: () => Promise<void>;
  fetchStats: (username: string) => Promise<void>;
  reset: () => void;
}

export const useGitHubStore = create<GitHubStore>((set) => ({
  userData: null,
  stats: null,
  loading: false,
  error: null,
  fetchUserData: async () => {
    try {
      set({ loading: true, error: null });
      const userData = await githubService.getUserData();
      set({ userData });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error('Unknown error') });
    } finally {
      set({ loading: false });
    }
  },
  fetchStats: async (username: string) => {
    try {
      set({ loading: true, error: null });
      const contributions = await githubService.getContributions(username);
      const days = contributions.weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      );
      const stats = calculateStats(days);
      set({ stats });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error('Unknown error') });
    } finally {
      set({ loading: false });
    }
  },
  reset: () => {
    set({
      userData: null,
      stats: null,
      loading: false,
      error: null,
    });
  },
}));

// ユーティリティ関数
function calculateStats(
  days: { date: string; count: number }[]
): ContributionStats {
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
}
