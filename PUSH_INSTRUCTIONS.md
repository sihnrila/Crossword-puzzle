# GitHub 저장소 푸시 가이드

## 자동 스크립트 실행

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/boin/Desktop/work/십자말풀이
./push-to-github.sh
```

## 수동 실행

터미널에서 다음 명령어를 순서대로 실행하세요:

```bash
cd /Users/boin/Desktop/work/십자말풀이

# 1. Git 초기화 (이미 되어있다면 생략)
git init

# 2. 원격 저장소 연결
git remote add origin https://github.com/sihnrila/Crossword-puzzle.git
# 또는 이미 연결되어 있다면:
# git remote set-url origin https://github.com/sihnrila/Crossword-puzzle.git

# 3. 파일 추가
git add .

# 4. 커밋
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

# 5. 메인 브랜치로 설정
git branch -M main

# 6. 푸시
git push -u origin main
```

## 인증 문제 해결

GitHub에 푸시할 때 인증이 필요할 수 있습니다:

### Personal Access Token 사용 (권장)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. 권한 선택 (repo 권한 필요)
4. 토큰 생성 후 복사
5. 푸시 시 비밀번호 대신 토큰 사용

### SSH 키 사용
```bash
# SSH 키 생성 (이미 있다면 생략)
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH 키를 GitHub에 추가
# GitHub → Settings → SSH and GPG keys → New SSH key

# 원격 저장소 URL을 SSH로 변경
git remote set-url origin git@github.com:sihnrila/Crossword-puzzle.git
git push -u origin main
```

## 확인

푸시가 완료되면 다음 URL에서 확인할 수 있습니다:
https://github.com/sihnrila/Crossword-puzzle

