# 커스텀 커맨드 가이드

## 📋 사용 가능한 커맨드

### `npm run fix-error`
오류 라인을 분석하고 유력한 원인과 해결 방안을 제시합니다.

**사용법:**
```bash
npm run fix-error <파일경로> <라인번호>
```

**예시:**
```bash
npm run fix-error src/app.js 42
npm run fix-error app/page.tsx 15
npm run fix-error components/Button.jsx 8
```

**출력 정보:**
- ❌ 오류가 발생한 정확한 위치
- 📋 주변 코드 컨텍스트 (오류 라인 기준 ±3줄)
- 🔍 파일 타입 및 오류 라인 내용
- 💡 일반적인 원인과 해결 방안

**지원되는 오류 패턴:**
- 변수 선언 오류 (`const`, `let`, `var`)
- 함수 정의 오류 (`function`, `=>`)
- 반환문 오류 (`return`)
- 모듈 임포트 오류 (`import`, `require`)
- 객체 접근 오류 (null/undefined)
- 비동기 처리 오류 (`async`, `await`)
- 함수 호출 오류

**예시 결과:**
```
📍 오류 위치:
파일: src/app.js
라인: 42

📋 코드 컨텍스트:
   39 | const data = fetchData();
   40 | console.log('데이터:', data);
❌ 42 | return data.name;
   43 | }

🔍 오류 분석을 위한 정보:
- 오류 라인: "return data.name;"
- 파일 타입: .js

💡 일반적인 원인과 해결 방안:
📌 객체 접근:
  - 원인: null/undefined 접근, 존재하지 않는 속성, 타입 오류
  - 해결: null 체크, 옵셔널 체이닝 (?.) 사용, 타입 확인
```

---

## 📝 커맨드 추가 방법

새로운 커맨드를 추가하려면:

1. `claude/commands/` 폴더에 새 파일 생성
   ```bash
   touch claude/commands/your-command.js
   ```

2. Node.js 스크립트 작성
   ```javascript
   #!/usr/bin/env node
   // 명령어 로직
   ```

3. `package.json`의 `scripts`에 추가
   ```json
   "your-command": "node claude/commands/your-command.js"
   ```

4. 사용
   ```bash
   npm run your-command
   ```

---

**💡 팁:** 더 복잡한 분석이 필요하면 Claude에게 직접 문의하세요!
