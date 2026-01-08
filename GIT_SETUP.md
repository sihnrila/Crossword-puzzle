# Git 저장소 설정 가이드

## 1. 로컬 Git 저장소 초기화

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/boin/Desktop/work/십자말풀이
git init
git add .
git commit -m "Initial commit: 십자말풀이 게임 완성

- 모바일 최적화 반응형 디자인
- 힌트 시스템 (품사/뜻풀이, 용례, 초성)
- 직접 입력 방식 및 자동 분배
- 정답 확인 및 자동 이동
- 설정 기능 (타이머, 자동 체크 등)
- JSON 기반 퍼즐 데이터 로드
- 교차 단어 처리 및 보호
- 힌트 버튼 (글자 하나씩 채우기)"
git branch -M main
```

## 2. 원격 저장소 연결 (GitHub 예시)

### GitHub에 새 저장소 생성
1. GitHub에 로그인
2. "New repository" 클릭
3. 저장소 이름 입력 (예: `crossword-puzzle-game`)
4. Public 또는 Private 선택
5. "Create repository" 클릭

### 원격 저장소 연결 및 푸시

```bash
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

또는 SSH를 사용하는 경우:

```bash
git remote add origin git@github.com:사용자명/저장소명.git
git push -u origin main
```

## 3. 자동 설정 스크립트 사용

프로젝트 루트에 있는 `setup-git.sh` 스크립트를 실행:

```bash
chmod +x setup-git.sh
./setup-git.sh
```

그 다음 원격 저장소를 추가하고 푸시:

```bash
git remote add origin <원격저장소URL>
git push -u origin main
```

## 4. 이후 업데이트

코드를 수정한 후:

```bash
git add .
git commit -m "변경 사항 설명"
git push
```

## 5. .gitignore

다음 파일/폴더는 Git에서 제외됩니다:
- `.DS_Store` (macOS 시스템 파일)
- `node_modules/` (의존성)
- `.vscode/`, `.idea/` (에디터 설정)
- `*.log` (로그 파일)
- `.env` (환경 변수)

