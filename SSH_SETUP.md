# SSH 키 설정 가이드

## 제공된 SSH 키 정보
- 키: `sggAlYMHnDAIMsJXHGc4YpjklBBMAKCEnW6okSpR82k`

## SSH 키 설정 방법

### 1. SSH 키 확인

```bash
# SSH 키 디렉토리 확인
ls -la ~/.ssh/

# 기존 SSH 키 확인
cat ~/.ssh/id_rsa.pub
# 또는
cat ~/.ssh/id_ed25519.pub
```

### 2. SSH 키가 없는 경우 새로 생성

```bash
# SSH 키 생성 (이메일은 GitHub 이메일로 변경)
ssh-keygen -t ed25519 -C "your_email@example.com"

# 또는 RSA 키 생성
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 3. SSH 키를 GitHub에 등록

```bash
# 공개 키 복사
cat ~/.ssh/id_ed25519.pub
# 또는
cat ~/.ssh/id_rsa.pub
```

1. GitHub에 로그인
2. Settings → SSH and GPG keys
3. New SSH key 클릭
4. 복사한 공개 키 붙여넣기
5. Save 클릭

### 4. SSH 연결 테스트

```bash
# GitHub 연결 테스트
ssh -T git@github.com

# 성공 메시지:
# Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

### 5. 원격 저장소를 SSH로 변경

```bash
cd /Users/boin/Desktop/work/십자말풀이

# HTTPS에서 SSH로 변경
git remote set-url origin git@github.com:sihnrila/Crossword-puzzle.git

# 확인
git remote -v
```

### 6. 푸시 실행

```bash
# 일반 푸시
git push -u origin main

# 또는 force push (필요한 경우)
git push -u origin main --force-with-lease
```

## 문제 해결

### SSH 키 인증 실패 시

```bash
# SSH 에이전트 시작
eval "$(ssh-agent -s)"

# SSH 키 추가
ssh-add ~/.ssh/id_ed25519
# 또는
ssh-add ~/.ssh/id_rsa

# 다시 테스트
ssh -T git@github.com
```

### 여러 SSH 키 사용 시

`~/.ssh/config` 파일 생성:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

## 참고

- 공개 키는 GitHub에 등록
- 개인 키는 절대 공유하지 마세요
- 제공된 키가 전체 키가 아니라면, 전체 공개 키를 GitHub에 등록해야 합니다

