#!/bin/bash
# post-merge 훅: 머지 후 의존성 자동 설치

echo "🔄 머지 후 의존성 확인 중..."

# 현재 커밋에서 변경된 package.json 확인
if git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD | grep -q "package.json"; then
  echo "📦 package.json이 변경되었습니다."
  echo "🔧 npm install 실행 중..."

  npm install

  if [ $? -eq 0 ]; then
    echo "✅ 의존성 설치 완료!"
  else
    echo "❌ npm install 실패"
    exit 1
  fi
else
  echo "ℹ️  package.json 변경 없음"
fi

echo "✅ post-merge 작업 완료!"
exit 0
