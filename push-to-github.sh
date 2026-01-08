#!/bin/bash

# GitHub 저장소에 푸시하는 스크립트

# set -e  # 오류 발생 시 중단 (주석 처리 - 더 자세한 오류 확인을 위해)

cd /Users/boin/Desktop/work/십자말풀이

echo "========================================="
echo "GitHub 저장소 푸시 시작"
echo "========================================="

echo ""
echo "[1/6] Git 저장소 초기화 중..."
if [ ! -d .git ]; then
    git init
    echo "✓ Git 초기화 완료"
else
    echo "✓ Git 저장소가 이미 존재합니다"
fi

echo ""
echo "[2/6] 원격 저장소 설정 중..."
if git remote | grep -q "^origin$"; then
    # SSH URL로 변경 (SSH 키 인증 사용)
    git remote set-url origin git@github.com:sihnrila/Crossword-puzzle.git
    echo "✓ 원격 저장소 URL 업데이트 완료 (SSH)"
else
    git remote add origin git@github.com:sihnrila/Crossword-puzzle.git
    echo "✓ 원격 저장소 추가 완료 (SSH)"
fi

# SSH 연결 테스트
echo ""
echo "SSH 연결 테스트 중..."
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    echo "✓ SSH 인증 성공"
else
    echo "⚠ SSH 인증 실패 - SSH 키 설정이 필요할 수 있습니다"
    echo "  SSH_SETUP.md 파일을 참고하세요"
fi

echo ""
echo "[3/6] 파일 추가 중..."
git add .
echo "✓ 파일 추가 완료"

echo ""
echo "[4/6] 커밋 중..."
if git diff --cached --quiet; then
    echo "⚠ 변경사항이 없습니다. 이미 커밋되어 있을 수 있습니다."
    git log --oneline -1 || echo "커밋이 없습니다."
else
    git commit -m "Initial commit: 십자말풀이 게임 완성

- 모바일 최적화 반응형 디자인
- 힌트 시스템 (품사/뜻풀이, 용례, 초성)
- 직접 입력 방식 및 자동 분배
- 정답 확인 및 자동 이동
- 설정 기능 (타이머, 자동 체크 등)
- JSON 기반 퍼즐 데이터 로드
- 교차 단어 처리 및 보호
- 힌트 버튼 (글자 하나씩 채우기)
- 반응형 선택 화면 (모바일/태블릿/데스크톱)"
    echo "✓ 커밋 완료"
fi

echo ""
echo "[5/6] 메인 브랜치로 설정 중..."
git branch -M main
echo "✓ 메인 브랜치 설정 완료"

echo ""
echo "[6/6] 원격 저장소에 푸시 중..."
echo "⚠ 인증이 필요할 수 있습니다..."

# 먼저 일반 푸시 시도
if git push -u origin main 2>&1; then
    echo ""
    echo "========================================="
    echo "✓ 푸시 완료!"
    echo "========================================="
    echo ""
    echo "GitHub 저장소를 확인하세요:"
    echo "https://github.com/sihnrila/Crossword-puzzle"
else
    echo ""
    echo "⚠ 일반 푸시 실패, force push 시도 중..."
    echo "원격 저장소에 이미 커밋이 있을 수 있습니다."
    
    # Force push 시도 (원격 저장소가 비어있거나 덮어써도 되는 경우)
    if git push -u origin main --force-with-lease 2>&1; then
        echo ""
        echo "========================================="
        echo "✓ Force push 완료!"
        echo "========================================="
        echo ""
        echo "GitHub 저장소를 확인하세요:"
        echo "https://github.com/sihnrila/Crossword-puzzle"
    else
        echo ""
        echo "========================================="
        echo "⚠ 푸시 실패"
        echo "========================================="
        echo ""
        echo "가능한 원인:"
        echo "1. 인증 오류 - GitHub Personal Access Token 필요"
        echo "2. 원격 저장소 보호 설정"
        echo ""
        echo "해결 방법:"
        echo "1. FIX_PUSH_ERROR.md 파일을 참고하세요"
        echo "2. 수동으로 다음 명령어 실행:"
        echo "   git push -u origin main --force-with-lease"
        echo ""
        exit 1
    fi
fi