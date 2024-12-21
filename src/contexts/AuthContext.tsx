import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GithubAuthProvider,
  getAuth,
  setPersistence,
  browserSessionPersistence,
  type GithubAuthProvider as GithubAuthProviderType,
} from 'firebase/auth';
import { auth } from '../config/firebase';

// GitHubプロバイダーの設定を強化
const githubProvider = new GithubAuthProvider();
githubProvider.addScope('read:user');
githubProvider.addScope('user:email');
githubProvider.addScope('repo');
githubProvider.setCustomParameters({
  allow_signup: 'false',
});

export interface User {
  name: string;
  avatarUrl: string;
  uid: string;
  accessToken?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  error: Error | null;
}

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  initialized: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const convertFirebaseUser = (
  firebaseUser: FirebaseUser,
  credential?: ReturnType<typeof GithubAuthProviderType.credentialFromResult>
): User => {
  if (!firebaseUser.displayName || !firebaseUser.photoURL) {
    throw new Error('GitHub認証に必要な情報が不足しています');
  }
  return {
    name: firebaseUser.displayName,
    avatarUrl: firebaseUser.photoURL,
    uid: firebaseUser.uid,
    accessToken: credential?.accessToken,
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);

  // 認証状態の初期化
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeAuth = async () => {
      try {
        // セッションベースの永続性を設定
        await setPersistence(auth, browserSessionPersistence);

        // 現在のユーザー状態を確認
        const currentUser = auth.currentUser;
        if (currentUser) {
          try {
            const providerData = currentUser.providerData.find(
              (provider) => provider.providerId === 'github.com'
            );

            if (!providerData) {
              throw new Error('GitHub認証が必要です');
            }

            const userData = convertFirebaseUser(currentUser, null);
            setState((prev) => ({
              ...prev,
              user: userData,
              loading: false,
              initialized: true,
            }));
          } catch (error) {
            console.error('Current user conversion error:', error);
            await signOut(auth);
            setState((prev) => ({
              ...prev,
              user: null,
              error: error as Error,
              loading: false,
              initialized: true,
            }));
          }
        } else {
          setState((prev) => ({
            ...prev,
            user: null,
            loading: false,
            initialized: true,
          }));
        }

        // 認証状態の変更を監視
        unsubscribe = onAuthStateChanged(
          auth,
          async (firebaseUser) => {
            if (firebaseUser) {
              try {
                const providerData = firebaseUser.providerData.find(
                  (provider) => provider.providerId === 'github.com'
                );

                if (!providerData) {
                  throw new Error('GitHub認証が必要です');
                }

                // セッションストレージからユーザー情報を取得
                const storedUser = sessionStorage.getItem('githubUser');
                let userData: User;

                if (storedUser) {
                  userData = JSON.parse(storedUser);
                  // セッションストレージのデータを更新
                  userData = {
                    ...userData,
                    name:
                      providerData.displayName ||
                      firebaseUser.displayName ||
                      userData.name,
                    avatarUrl:
                      providerData.photoURL ||
                      firebaseUser.photoURL ||
                      userData.avatarUrl,
                  };
                  sessionStorage.setItem(
                    'githubUser',
                    JSON.stringify(userData)
                  );
                } else {
                  // 新しいユーザー情報を作成
                  userData = {
                    name:
                      providerData.displayName ||
                      firebaseUser.displayName ||
                      '',
                    avatarUrl:
                      providerData.photoURL || firebaseUser.photoURL || '',
                    uid: firebaseUser.uid,
                    accessToken: await firebaseUser.getIdToken(),
                  };

                  if (!userData.name || !userData.avatarUrl) {
                    console.error('ユーザー情報:', userData);
                    console.error('Provider Data:', providerData);
                    console.error('Firebase User:', firebaseUser);
                    throw new Error('必要なユーザー情報が取得できませんでした');
                  }

                  sessionStorage.setItem(
                    'githubUser',
                    JSON.stringify(userData)
                  );
                }

                console.log('認証状態更新:', userData);
                setState((prev) => ({
                  ...prev,
                  user: userData,
                  loading: false,
                  initialized: true,
                }));
              } catch (error) {
                console.error('User conversion error:', error);
                await signOut(auth);
                setState((prev) => ({
                  ...prev,
                  user: null,
                  error: error as Error,
                  loading: false,
                  initialized: true,
                }));
              }
            } else {
              // ユーザーがログアウトした場合、セッションストレージをクリア
              sessionStorage.removeItem('githubUser');
              setState((prev) => ({
                ...prev,
                user: null,
                loading: false,
                initialized: true,
              }));
            }
          },
          (error) => {
            console.error('Auth state change error:', error);
            setState((prev) => ({
              ...prev,
              error: error as Error,
              loading: false,
              initialized: true,
            }));
          }
        );
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState((prev) => ({
          ...prev,
          error: error as Error,
          loading: false,
          initialized: true,
        }));
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const login = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // GitHubでログイン
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);

      if (!result.user) {
        throw new Error('ログインに失敗しました');
      }

      // GitHubプロバイダーの情報を確認
      const providerData = result.user.providerData.find(
        (provider) => provider.providerId === 'github.com'
      );

      if (!providerData) {
        throw new Error('GitHub認証が必要です');
      }

      // アクセストークンの取得を確認
      if (!credential?.accessToken) {
        throw new Error('GitHubアクセストークンの取得に失敗しました');
      }

      const userData = {
        name: providerData.displayName || result.user.displayName || '',
        avatarUrl: providerData.photoURL || result.user.photoURL || '',
        uid: result.user.uid,
        accessToken: credential.accessToken,
      };

      // ユーザー情報の検証
      if (!userData.name || !userData.avatarUrl) {
        console.error('ユーザー情報:', userData);
        throw new Error('必要なユーザー情報が取得できませんでした');
      }

      // セッションストレージにユーザー情報を保存
      sessionStorage.setItem('githubUser', JSON.stringify(userData));

      setState((prev) => ({
        ...prev,
        user: userData,
        loading: false,
      }));

      // 認証成功を確認するためにコンソールに出力
      console.log('ログイン成功:', userData);
      console.log('Provider Data:', providerData);
      console.log('Firebase User:', result.user);
    } catch (error) {
      console.error('Login failed:', error);
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await signOut(auth);
      setState((prev) => ({
        ...prev,
        user: null,
        loading: false,
      }));
      // ログアウト後にセッションストレージをクリア
      sessionStorage.clear();
      // ページをリロードして状態をリセット
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false,
      }));
      throw error;
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
