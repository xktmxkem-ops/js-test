# Git Hooks 설정 가이드

이 폴더에는 프로젝트의 Git 워크플로우를 자동화하는 훅들이 포함되어 있습니다.

## 📋 포함된 훅

### 1. `pre-commit.sh` - 커밋 전 코드 품질 검사
**언제 실행되나?** 커밋을 하려고 할 때

**수행 작업:**
- ESLint 린팅 검사
- TypeScript 타입 체크

**실패 시:** 품질 검사 실패 시 커밋이 중단됩니다.

---

### 2. `pre-push.sh` - 푸시 전 테스트 실행
**언제 실행되나?** 푸시를 하려고 할 때

**수행 작업:**
- Jest 테스트 실행
- 프로젝트 빌드 확인

**실패 시:** 테스트 또는 빌드 실패 시 푸시가 중단됩니다.

---

### 3. `post-merge.sh` - 머지 후 의존성 설치
**언제 실행되나?** 브랜치를 머지할 때

**수행 작업:**
- `package.json` 변경 감지
- 자동으로 `npm install` 실행

**효과:** 의존성이 빠진 상태로 개발하는 것을 방지합니다.

---

## 🔧 설치 방법

### macOS / Linux
```bash
# 훅 파일에 실행 권한 부여
chmod +x hooks/*.sh

# 훅을 .git/hooks에 복사
cp hooks/pre-commit.sh .git/hooks/pre-commit
cp hooks/pre-push.sh .git/hooks/pre-push
cp hooks/post-merge.sh .git/hooks/post-merge
```

### Windows (Git Bash)
```bash
# 훅 파일에 실행 권한 부여
chmod +x hooks/*.sh

# 훅을 .git/hooks에 복사
cp hooks/pre-commit.sh .git/hooks/pre-commit
cp hooks/pre-push.sh .git/hooks/pre-push
cp hooks/post-merge.sh .git/hooks/post-merge
```

### Windows (PowerShell)
```powershell
# 훅 파일을 .git/hooks에 복사
Copy-Item hooks/pre-commit.sh .git/hooks/pre-commit
Copy-Item hooks/pre-push.sh .git/hooks/pre-push
Copy-Item hooks/post-merge.sh .git/hooks/post-merge
```

---

## 🚀 사용법

### 훅 실행 확인
훅이 정상 작동하려면:
1. `.git/hooks/` 폴더에 훅 파일이 있어야 함
2. 훅 파일이 실행 가능한 권한이 있어야 함

```bash
ls -la .git/hooks/pre-commit
```

### 훅 스킵하기
특정 상황에서 훅을 무시하고 싶다면:

```bash
# 커밋 시 pre-commit 스킵
git commit --no-verify

# 푸시 시 pre-push 스킵
git push --no-verify
```

---

## 📝 훅 커스터마이징

각 훅 파일을 수정하여 프로젝트에 맞게 커스터마이징할 수 있습니다:

```bash
# 훅 파일 수정
vim hooks/pre-commit.sh

# 수정 후 .git/hooks에 다시 복사
cp hooks/pre-commit.sh .git/hooks/pre-commit
```

---

## ⚠️ 주의사항

1. **성능**: 훅이 실행되는 동안은 Git 작업이 블록됩니다.
2. **개발 속도**: 자주 훅에 막힐 경우 `--no-verify` 플래그 사용 고려
3. **팀 협업**: 팀원들이 모두 같은 훅을 설치하도록 권장

---

## 🔄 자동 설치 (권장)

프로젝트에 다음 스크립트를 추가하여 자동 설치를 권장할 수 있습니다:

`package.json`:
```json
"scripts": {
  "prepare": "chmod +x hooks/*.sh && cp hooks/*.sh .git/hooks/"
}
```

그러면 `npm install` 후 자동으로 훅이 설치됩니다!

---

## 💡 더 알아보기

- [Git Hooks 공식 문서](https://git-scm.com/docs/githooks)
- [Husky - Git Hook 자동화](https://typicode.github.io/husky/)
