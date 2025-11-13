# Figma Script

Figma 또는 웹 페이지에 삽입할 수 있는 경량 JavaScript 라이브러리입니다. TypeScript로 작성되었으며 GitHub Pages를 통해 자동으로 배포됩니다.

## 🚀 빠른 시작

웹 페이지에서 이 스크립트를 사용하려면 HTML에 다음 코드를 추가하세요:

```html
<script src="https://gmanio.github.io/figma-script/iframe.js" type="text/javascript" async crossorigin="anonymous"></script>
```

## 📋 기능

- **DOMContentLoaded 이벤트 리스너**: 페이지가 로드되면 자동으로 실행됩니다
- **iframe 함수**: 필요에 따라 호출할 수 있는 유틸리티 함수
- **TypeScript 지원**: 타입 안정성과 최신 JavaScript 기능 사용
- **자동 배포**: GitHub Actions를 통한 자동 빌드 및 배포

## 🛠️ 개발 환경 설정

### 필수 요구사항

- Node.js 24 이상
- npm

### 설치

```bash
# 저장소 클론
git clone https://github.com/gmanio/figma-script.git
cd figma-script

# 의존성 설치
npm install
```

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

## 📁 프로젝트 구조

```
figma-script/
├── src/
│   └── iframe.ts          # TypeScript 소스 코드
├── dist/                  # 빌드된 JavaScript 파일
│   ├── iframe.js
│   ├── iframe.js.map
│   ├── iframe.d.ts
│   └── iframe.d.ts.map
├── .github/
│   └── workflows/
│       └── gh-page.yml    # GitHub Actions 워크플로우
├── package.json
├── tsconfig.json
└── readme.md
```

## 🔧 기술 스택

- **TypeScript 5.9.3**: 타입 안정성과 최신 JavaScript 기능
- **ESNext**: 최신 ECMAScript 표준 사용
- **GitHub Actions**: CI/CD 자동화
- **GitHub Pages**: 정적 파일 호스팅

## 📦 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다.

### 배포 프로세스

1. `main` 브랜치에 코드를 푸시하면 자동으로 워크플로우가 실행됩니다
2. Node.js 의존성을 설치하고 TypeScript를 빌드합니다
3. Jekyll을 사용하여 `dist/` 폴더를 정적 사이트로 변환합니다
4. GitHub Pages에 자동으로 배포됩니다

배포된 파일은 `https://gmanio.github.io/figma-script/`에서 접근할 수 있습니다.

## 💡 사용 예시

### 기본 사용

스크립트를 포함하면 DOMContentLoaded 시 자동으로 콘솔에 로그가 출력됩니다:

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://gmanio.github.io/figma-script/iframe.js" type="text/javascript" async crossorigin="anonymous"></script>
</head>
<body>
    <!-- 페이지가 로드되면 콘솔에 "DOMContentLoaded"가 출력됩니다 -->
</body>
</html>
```

### iframe 함수 사용

```javascript
// 스크립트가 로드된 후
import { iframe } from 'https://gmanio.github.io/figma-script/iframe.js';

iframe(); // 콘솔에 "iframe" 출력
```

## 🔍 TypeScript 설정

이 프로젝트는 다음과 같은 TypeScript 설정을 사용합니다:

- **Target & Module**: ESNext (최신 JavaScript 기능)
- **Strict Mode**: 엄격한 타입 검사 활성화
- **Source Maps**: 디버깅을 위한 소스맵 생성
- **Declaration Files**: TypeScript 선언 파일 생성

## 📝 라이센스

이 프로젝트의 라이센스는 별도로 명시되지 않았습니다.

## 🤝 기여

기여를 환영합니다! 이슈를 생성하거나 Pull Request를 제출해 주세요.

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.
