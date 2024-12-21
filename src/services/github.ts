import { Octokit } from '@octokit/rest';
import { auth } from '../config/firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { githubProvider } from '../config/firebase';

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionData {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

export interface GitHubUserData {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
}

export const fetchGitHubContributions = async (
  accessToken: string
): Promise<ContributionData> => {
  try {
    const octokit = new Octokit({
      auth: accessToken,
    });

    // GraphQLクエリを使用して貢献データを取得
    const query = `
      query {
        viewer {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await octokit.graphql(query);
    console.log('GitHub API Response:', response);

    const contributionCalendar = (response as any).viewer
      .contributionsCollection.contributionCalendar;
    return {
      totalContributions: contributionCalendar.totalContributions,
      weeks: contributionCalendar.weeks,
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw new Error('GitHubの貢献データの取得に失敗しました');
  }
};

export const getContributionColor = (count: number): string => {
  // 貢献度に応じて色を変更（より明るい草色）
  if (count === 0) return '#EBEDF0'; // 貢献なし（薄いグレー）
  if (count <= 3) return '#9BE9A8'; // 少ない貢献（明るい草色）
  if (count <= 6) return '#40C463'; // 中程度の貢献（中間の草色）
  if (count <= 9) return '#30A14E'; // 多い貢献（濃い草色）
  return '#216E39'; // とても多い貢献（最も濃い草色）
};

class GitHubService {
  private octokit: Octokit | null = null;
  private accessToken: string | null = null;

  private async getOctokit() {
    if (!this.octokit) {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('認証が必要です');

      try {
        if (!this.accessToken) {
          // GitHubで再認証を行い、新しいトークンを取得
          const result = await signInWithPopup(auth, githubProvider);
          const credential = GithubAuthProvider.credentialFromResult(result);
          this.accessToken = credential?.accessToken ?? null;

          if (!this.accessToken) {
            throw new Error('GitHubトークンの取得に失敗しました');
          }
        }

        this.octokit = new Octokit({
          auth: this.accessToken,
        });
      } catch (error) {
        console.error('GitHub token error:', error);
        // トークンをクリアして次回再試行できるようにする
        this.accessToken = null;
        this.octokit = null;
        throw error;
      }
    }
    return this.octokit;
  }

  async getUserData(): Promise<GitHubUserData> {
    const octokit = await this.getOctokit();
    const { data } = await octokit.users.getAuthenticated();

    return {
      login: data.login,
      name: data.name || data.login,
      avatarUrl: data.avatar_url,
      bio: data.bio || '',
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
    };
  }

  async getContributions(username: string): Promise<ContributionData> {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const octokit = await this.getOctokit();
    const response = await octokit.graphql(query, { username });
    const calendar = (response as any).user.contributionsCollection
      .contributionCalendar;

    const days: ContributionDay[] = [];
    calendar.weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        days.push({
          date: day.date,
          contributionCount: day.contributionCount,
          color: day.color,
        });
      });
    });

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };
  }

  async getRecentActivity(username: string) {
    const octokit = await this.getOctokit();
    const { data } = await octokit.activity.listPublicEventsForUser({
      username,
      per_page: 10,
    });

    return data;
  }
}

export const githubService = new GitHubService();
