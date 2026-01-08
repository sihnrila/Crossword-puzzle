# GitHub 푸시 명령어 (단계별)

터미널에서 다음 명령어를 **순서대로** 실행하세요:

## 1단계: 디렉토리 이동 및 Git 초기화

```bash
cd /Users/boin/Desktop/work/십자말풀이
git init
```

## 2단계: 원격 저장소 연결

```bash
git remote add origin https://github.com/sihnrila/Crossword-puzzle.git
```

이미 연결되어 있다면:
```bash
git remote set-url origin https://github.com/sihnrila/Crossword-puzzle.git
```

## 3단계: 파일 추가

```bash
git add .
```

## 4단계: 커밋

```bash
git commit -m "Initial commit: 십자말풀이 게임 완성"
```

## 5단계: 메인 브랜치 설정

```bash
git branch -M main
```

## 6단계: 푸시

```bash
git push -u origin main
```

---

## 한 번에 실행 (복사해서 붙여넣기)

```bash
cd /Users/boin/Desktop/work/십자말풀이 && \
git init && \
git remote add origin https://github.com/sihnrila/Crossword-puzzle.git 2>/dev/null || \
git remote set-url origin https://github.com/sihnrila/Crossword-puzzle.git && \
git add . && \
git commit -m "Initial commit: 십자말풀이 게임 완성" && \
git branch -M main && \
git push -u origin main
```

---

## 문제 해결

### "remote origin already exists" 오류
```bash
git remote remove origin
git remote add origin https://github.com/sihnrila/Crossword-puzzle.git
```

### 인증 오류
GitHub Personal Access Token을 사용하거나 SSH 키를 설정하세요.
자세한 내용은 `PUSH_INSTRUCTIONS.md`를 참고하세요.

### "nothing to commit" 메시지
이미 커밋되어 있을 수 있습니다. 다음 명령어로 확인:
```bash
git status
git log --oneline
```

