#!/bin/bash
# pre-commit 훅: 커밋 전 코드 품질 자동 확인

echo "🔍 코드 품질 검사 중..."

# ESLint 실행
echo "📋 ESLint 체크..."
npm run lint 2>/dev/null
if [ $? -ne 0 ]; then
  echo "❌ ESLint 오류가 발견되었습니다."
  exit 1
fi

# TypeScript 타입 체크
echo "📘 TypeScript 타입 체크..."
npx tsc --noEmit 2>/dev/null
if [ $? -ne 0 ]; then
  echo "❌ TypeScript 타입 오류가 발견되었습니다."
  exit 1
fi

echo "✅ 코드 품질 검사 완료!"
exit 0
