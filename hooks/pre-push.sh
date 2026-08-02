#!/bin/bash
# pre-push 훅: 푸시 전 테스트 자동 실행

echo "🧪 테스트 실행 중..."

# 테스트 실행 (jest가 있을 경우)
if [ -f "package.json" ] && grep -q "jest" package.json; then
  echo "🏃 Jest 테스트 실행..."
  npm test 2>/dev/null
  if [ $? -ne 0 ]; then
    echo "❌ 테스트 실패! 푸시를 중단합니다."
    echo "💡 팁: git push --no-verify 로 스킵할 수 있습니다."
    exit 1
  fi
else
  echo "ℹ️  Jest 설정이 없습니다."
fi

# 빌드 확인
echo "🔨 빌드 확인 중..."
npm run build 2>/dev/null
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패! 푸시를 중단합니다."
  exit 1
fi

echo "✅ 모든 테스트 통과! 푸시 준비 완료."
exit 0
