import { Octokit } from '@octokit/rest';
import { auth } from '../config/firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { githubProvider } from '../config/firebase';

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionData {
  total: number;
  days: ContributionDay[];
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

class GitHubService {
  private octokit: Octokit | null = null;

  private async getOctokit() {
    if (!this.octokit) {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('認証が必要です');

      try {
        // 再認証を行ってトークンを取得
        const result = await signInWithPopup(auth, githubProvider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        if (!token) {
          throw new Error('GitHubトークンの取得に失敗しました');
        }

        this.octokit = new Octokit({
          auth: token,
        });
      } catch (error) {
        console.error('GitHub token error:', error);
        throw new Error('GitHubトークンの取得に失敗しました');
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
          count: day.contributionCount,
        });
      });
    });

    return {
      total: calendar.totalContributions,
      days,
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
