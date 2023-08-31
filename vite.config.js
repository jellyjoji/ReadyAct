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
