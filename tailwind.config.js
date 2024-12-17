/** @type {import('tailwindcss').Config} */
module.exports = {
  // コンテンツソースの定義（どのファイルでTailwindクラスを使用するか）
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  // テーマのカスタマイズ
  theme: {
    // デフォルトのブレイクポイント拡張
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    // カスタムカラーの追加
    extend: {
      colors: {
        // プロジェクト固有のカラーパレット
        primary: '#A3D977',
        secondary: '#FFF8E1',
        accent: '#F5A623',
        neutral: '#FAF3E0',

        // グラデーションや特殊な色合いの定義
        'gradient-start': '#81C7F5',
        'gradient-end': '#A3D977',
      },

      // カスタムフォントファミリー
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },

      // カスタムスペーシング
      spacing: {
        128: '32rem',
        144: '36rem',
      },

      // カスタムボーダーRadius
      borderRadius: {
        custom: '0.625rem', // 10px
      },

      // カスタムボックスシャドウ
      boxShadow: {
        custom:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },

  // プラグインの設定
  plugins: [
    // DaisyUIプラグイン
    require('daisyui'),

    // カスタムプラグインの追加が可能
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],

  // DaisyUIのテーマ設定
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#A3D977',
          secondary: '#FFF8E1',
          accent: '#F5A623',
          neutral: '#FAF3E0',
          'base-100': '#ffffff',
        },
      },
      'light',
      'dark',
    ],
    darkTheme: 'dark', // ダークモードのデフォルトテーマ
    base: true, // デフォルトのBase色を適用
    styled: true, // テーマ付きコンポーネントにスタイルを適用
    utils: true, // ユーティリティクラスを追加
    prefix: '', // テーマ接頭辞
    logs: true, // ログ出力
  },
};
