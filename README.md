# 멋쟁이사자처럼 6기 ReadyAct 팀의 React 팀프로젝트 

## 설치 

```bash
pnpm add -D tailwindcss postcss autoprefixer postcss-import

pnpm tailwindcss init -p
```

**tailwind.css**

```jsx
/* tailwind.css */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";


```

**vite.config.js**

```js
import react from "@vitejs/plugin-react";
import { resolve } from "node:path"; // Node.js 런타임이 기본 제공하는 모듈(파일 경로)
import { defineConfig } from "vite";
import { env } from "node:process";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import imageminGifSicle from "imagemin-gifsicle";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngQuant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
// import path from 'node:path';

// 개발을 하다보면 외부로 알려지면 안되는 API_KEY나 db관련 정보 등등 보안이 필요한 값들이 있습니다. 이러한 값들을 보안이나 유지보수를 용이하게 하기 위해 .env 파일에 환경변수로 만들어 변수를 꺼내와 사용하는 것입니다.
const isDev = env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        gif: imageminGifSicle(),
        svg: imageminSvgo(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
        },
      },
    }),
  ],
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: isDev
        ? "[name]_[local]__[hash:base64:5]"
        : "[hash:base64:4]",
    },
  },
  resolve: {
    // 배열 방식
    // alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    // 객체 방식
    alias: {
      // '@': path.resolve(__dirname, './src'),
      "@": resolve(__dirname, "./src"),
    },
  },
  // 빌드 시, 청크 파일 생성 매뉴얼 구성
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactRouter: ["react-router-dom"],
          animations: ["framer-motion", "gsap"],
          extra: ["zustand", "immer", "ramda", "@tanstack/react-query"],
        },
      },
    },
  },
});
```

**tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/hero.jpg")',
      },
    },
  },
  plugins: [],
};
```

**postcss.config.js**

```js
export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
**package.json**

`"pocketbase": "pocketbase/pocketbase serve"` 추가

```jsx
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "pocketbase": "pocketbase/pocketbase serve"
  },
```

## 설치

```bash
pnpm add @tanstack/react-query
pnpm add @tanstack/react-query-devtools
pnpm add framer-motion
pnpm add immer
pnpm add pocketbase
pnpm add prop-types
pnpm add react-helmet-async
pnpm add react-hot-toast
pnpm add zustand
```

이 모든것을 한번에 하고싶다면 ? pnpm add

```bash
pnpm add framer-motion immer pocketbase prop-types react-helmet-async react-hot-toast zustand
```

**package.json**
이미지 최적화 추가

```jsx
    "imagemin-gifsicle": "7.0.0",
    "imagemin-mozjpeg": "10.0.0",
    "imagemin-pngquant": "9.0.2",
    "imagemin-svgo": "10.0.1",
    "imagemin-webp": "8.0.0"
```

```jsx
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.15",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.29",
    "postcss-import": "^15.1.0",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5",
    "imagemin-gifsicle": "7.0.0",
    "imagemin-mozjpeg": "10.0.0",
    "imagemin-pngquant": "9.0.2",
    "imagemin-svgo": "10.0.1",
    "imagemin-webp": "8.0.0"
  }
```

`pnpm i`

**jsconfig.json**

```jsx
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
**.gitignore**
`pocketbase` 최상단에 추가

```jsx
pocketbase

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```
**.eslintrc.cjs**
```jsx
module.exports = {
  root: true,
  env: {browser: true, es2020: true, node: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    'pocketbase',
    // 'src/learn',
    'src/views',
    '.eslintrc.cjs',
  ],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {react: {version: '18.2'}},
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'error',
    'react-refresh/only-export-components': [
      'off',
      {allowConstantExport: true},
    ],
  },
};
```

## pocketbase 설치

https://pockethost.io 

가입후 

https://pocketbase.io/

포켓 베이스 설치하여 파일을 최상으로 옮기기
파일 이름은 pocketbase 로 변경하기
