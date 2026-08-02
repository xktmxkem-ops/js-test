#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 오류 라인 수정 커맨드
 * 사용법: node claude/commands/fix-error.js <파일경로> <라인번호>
 */

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ 사용법: npm run fix-error <파일경로> <라인번호>');
  console.error('예: npm run fix-error src/app.js 42');
  process.exit(1);
}

const filePath = args[0];
const lineNumber = parseInt(args[1]);

try {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  if (lineNumber < 1 || lineNumber > lines.length) {
    console.error(`❌ 유효하지 않은 라인 번호: ${lineNumber} (파일의 총 라인: ${lines.length})`);
    process.exit(1);
  }

  const errorLine = lines[lineNumber - 1];
  const contextStart = Math.max(0, lineNumber - 3);
  const contextEnd = Math.min(lines.length, lineNumber + 2);

  console.log('\n📍 오류 위치:');
  console.log(`파일: ${filePath}`);
  console.log(`라인: ${lineNumber}\n`);

  console.log('📋 코드 컨텍스트:');
  for (let i = contextStart; i < contextEnd; i++) {
    const marker = i === lineNumber - 1 ? '❌' : '  ';
    console.log(`${marker} ${String(i + 1).padStart(4, ' ')} | ${lines[i]}`);
  }

  console.log('\n🔍 오류 분석을 위한 정보:');
  console.log(`- 오류 라인: "${errorLine.trim()}"`);
  console.log(`- 파일 타입: ${path.extname(filePath)}`);

  console.log('\n💡 일반적인 원인과 해결 방안:');
  analyzeError(errorLine, path.extname(filePath));

} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}

function analyzeError(line, fileType) {
  const trimmed = line.trim();

  // 문법 오류 패턴 감지
  if (trimmed.includes('const ') || trimmed.includes('let ') || trimmed.includes('var ')) {
    console.log('📌 변수 선언:');
    console.log('  - 원인: 문법 오류, 타입 불일치, 스코프 문제');
    console.log('  - 해결: 변수 초기화 확인, 타입 체크, 스코프 범위 확인\n');
  }

  if (trimmed.includes('function') || trimmed.includes('=>')) {
    console.log('📌 함수 정의:');
    console.log('  - 원인: 함수 선언 문법, 반환값 누락, 매개변수 오류');
    console.log('  - 해결: 함수 문법 재확인, 반환값 추가, 매개변수 일치 확인\n');
  }

  if (trimmed.includes('return') && trimmed !== 'return') {
    console.log('📌 반환문:');
    console.log('  - 원인: undefined 반환, 타입 불일치, 비동기 처리 누락');
    console.log('  - 해결: 반환값 확인, async/await 사용, null/undefined 체크\n');
  }

  if (trimmed.includes('import') || trimmed.includes('require')) {
    console.log('📌 모듈 임포트:');
    console.log('  - 원인: 잘못된 경로, 존재하지 않는 모듈, 순환 참조');
    console.log('  - 해결: 파일 경로 확인, 모듈 설치 여부 확인, 순환 참조 제거\n');
  }

  if (trimmed.includes('.') && !trimmed.includes('import') && !trimmed.includes('//')) {
    console.log('📌 객체 접근:');
    console.log('  - 원인: null/undefined 접근, 존재하지 않는 속성, 타입 오류');
    console.log('  - 해결: null 체크, 옵셔널 체이닝 (?.) 사용, 타입 확인\n');
  }

  if (trimmed.includes('async') || trimmed.includes('await')) {
    console.log('📌 비동기 처리:');
    console.log('  - 원인: Promise 오류, await 누락, 콜백 지옥');
    console.log('  - 해결: try-catch 추가, await 사용, Promise.then() 체인 정리\n');
  }

  if (trimmed.includes('(') && trimmed.includes(')')) {
    console.log('📌 함수 호출:');
    console.log('  - 원인: 잘못된 매개변수, 타입 불일치, 함수 정의 없음');
    console.log('  - 해결: 함수 서명 확인, 매개변수 개수/타입 일치, 함수 존재 확인\n');
  }

  console.log('✨ 더 자세한 분석이 필요하면 Claude에게 물어보세요!');
}
