# 푸시 오류 해결 방법

## 오류: "failed to push some refs"

이 오류는 원격 저장소에 이미 커밋이 있어서 발생합니다.

## 해결 방법

### 방법 1: Force Push (권장 - 빈 저장소인 경우)

원격 저장소가 비어있거나 덮어써도 되는 경우:

```bash
cd /Users/boin/Desktop/work/십자말풀이
git push -u origin main --force
```

또는 더 안전한 방법:

```bash
git push -u origin main --force-with-lease
```

### 방법 2: 원격 저장소 내용 가져오기 후 병합

원격 저장소에 중요한 내용이 있을 수 있는 경우:

```bash
cd /Users/boin/Desktop/work/십자말풀이

# 원격 저장소 내용 가져오기
git fetch origin

# 원격 저장소 내용 병합 (allow-unrelated-histories 옵션 사용)
git pull origin main --allow-unrelated-histories

# 충돌 해결 후 푸시
git push -u origin main
```

### 방법 3: 원격 저장소 초기화 후 푸시

원격 저장소를 완전히 새로 시작하려면:

```bash
cd /Users/boin/Desktop/work/십자말풀이

# 원격 저장소 내용 무시하고 강제 푸시
git push -u origin main --force
```

## 단계별 실행 (추천)

```bash
cd /Users/boin/Desktop/work/십자말풀이

# 1. 현재 상태 확인
git status
git log --oneline -3

# 2. 원격 저장소 확인
git remote -v

# 3. Force push (원격 저장소가 비어있거나 덮어써도 되는 경우)
git push -u origin main --force-with-lease
```

## 주의사항

- `--force` 옵션은 원격 저장소의 기존 커밋을 덮어씁니다
- 다른 사람과 협업 중이라면 `--force-with-lease`를 사용하세요
- 원격 저장소에 중요한 내용이 있다면 먼저 백업하세요

