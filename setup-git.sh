#!/bin/bash

# Git 저장소 초기화
cd /Users/boin/Desktop/work/십자말풀이

# Git 초기화
git init

# 사용자 정보 설정 (필요시 수정)
git config user.name "Developer"
git config user.email "dev@example.com"

# 모든 파일 추가
git add .

# 초기 커밋
git commit -m "Initial commit: 십자말풀이 게임 완성

- 모바일 최적화 반응형 디자인
- 힌트 시스템 (품사/뜻풀이, 용례, 초성)
- 직접 입력 방식 및 자동 분배
- 정답 확인 및 자동 이동
- 설정 기능 (타이머, 자동 체크 등)
- JSON 기반 퍼즐 데이터 로드
- 교차 단어 처리 및 보호
- 힌트 버튼 (글자 하나씩 채우기)"

# 메인 브랜치로 설정
git branch -M main

echo "Git 저장소가 초기화되었습니다!"
echo ""
echo "원격 저장소에 푸시하려면:"
echo "  git remote add origin <원격저장소URL>"
echo "  git push -u origin main"

