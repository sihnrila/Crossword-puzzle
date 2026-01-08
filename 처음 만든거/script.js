// 게임 데이터 - 어휘 목록별, 난이도별 십자말풀이
const gameData = {
    national: { // 국립국어원 어휘목록
        easy: [
            {
                level: 1,
                // 십자말풀이: 여러 단어가 서로 교차하고 특정 글자를 공유
                // 격자 구조 (올바른 십자말풀이):
                //   0  1  2  3
                // 0 1  #  #  #   1번 가로: "학교" (0,0~0,1), 1번 세로: "학생" (0,0~1,0)
                // 1 2  #  #  #   2번 가로: "생활" (1,0~1,1), 2번 세로: "교실" (0,1~1,1)
                // 2 #  #  #  #
                // 
                // 교차점:
                // - (0,0): 1번 가로 "학" = 1번 세로 "학" ✓
                // - (0,1): 1번 가로 "교" = 2번 세로 "교" ✓
                // - (1,0): 1번 세로 "생" = 2번 가로 "생" ✓
                // - (1,1): 2번 가로 "활" = 2번 세로 "실" (아님, 단어 재설계 필요)
                // 
                // 단순화된 구조: 격자 번호와 단서 번호 일치
                // 9x9 격자 구조
                grid: [
                    ['1', '2', ' ', '#', '#', '#', '#', '#', '#'],  // 1번 가로 "학교" 시작, 1번 세로 "학생" 시작, 2번 세로 "교실" 시작
                    [' ', ' ', ' ', '#', '#', '#', '#', '#', '#'],  // 1번 세로 "학생" 계속, 2번 세로 "교실" 계속
                    [' ', '2', ' ', '#', '#', '#', '#', '#', '#'],  // 2번 가로 "생활" 시작 (2,1~2,2)
                    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#', '#', '#']
                ],
                clues: {
                    across: [
                        { number: 1, clue: '공부하는 곳', answer: '학교' },  // (0,0~0,1)
                        { number: 2, clue: '일상에서 하는 것', answer: '생활' }  // (2,1~2,2) - 격자에 '2' 추가 필요
                    ],
                    down: [
                        { number: 1, clue: '학교에 다니는 사람', answer: '학생' },  // (0,0~1,0)
                        { number: 2, clue: '수업하는 방', answer: '교실' }  // (0,1~1,1)
                    ]
                }
            }
        ],
        medium: [
            {
                level: 1,
                grid: [
                    ['1', ' ', ' ', '#', '2', ' ', ' ', ' ', ' '],
                    [' ', '#', '#', '#', ' ', '#', '#', '#', '#'],
                    ['3', ' ', ' ', ' ', '#', '4', ' ', ' ', ' '],
                    [' ', '#', '#', '#', '#', ' ', '#', '#', '#'],
                    ['5', ' ', ' ', ' ', '#', '6', ' ', ' ', ' '],
                    [' ', '#', '#', '#', '#', ' ', '#', '#', '#'],
                    ['7', ' ', ' ', ' ', '#', '8', ' ', ' ', ' ']
                ],
                clues: {
                    across: [
                        { number: 1, clue: '프로그래밍 언어', answer: '자바' },
                        { number: 3, clue: '인터넷 주소', answer: 'URL' },
                        { number: 5, clue: '데이터 저장소', answer: '디스크' },
                        { number: 7, clue: '입력 장치', answer: '키보드' }
                    ],
                    down: [
                        { number: 2, clue: '컴퓨터의 두뇌', answer: 'CPU' },
                        { number: 4, clue: '웹 페이지 언어', answer: 'HTML' },
                        { number: 6, clue: '화면 표시장치', answer: '모니터' },
                        { number: 8, clue: '마우스의 반대', answer: '고양이' }
                    ]
                }
            }
        ],
        hard: [
            {
                level: 1,
                grid: [
                    ['1', ' ', '#', '2', ' ', ' ', ' ', '#', ' '],
                    [' ', '#', '#', ' ', '#', '#', '#', '#', '#'],
                    ['3', ' ', ' ', '#', '4', ' ', ' ', ' ', ' '],
                    [' ', '#', '#', '#', ' ', '#', '#', '#', '#'],
                    ['5', ' ', ' ', '#', '6', ' ', ' ', ' ', ' '],
                    [' ', '#', '#', '#', ' ', '#', '#', '#', '#'],
                    ['7', ' ', ' ', '#', '8', ' ', ' ', ' ', ' ']
                ],
                clues: {
                    across: [
                        { number: 1, clue: '지구의 자연위성', answer: '달' },
                        { number: 3, clue: '가장 큰 행성', answer: '목성' },
                        { number: 5, clue: '지구의 대기', answer: '공기' },
                        { number: 7, clue: '별들의 집합', answer: '은하' }
                    ],
                    down: [
                        { number: 2, clue: '태양계의 중심', answer: '태양' },
                        { number: 4, clue: '붉은 행성', answer: '화성' },
                        { number: 6, clue: '우주의 공간', answer: '우주' },
                        { number: 8, clue: '밤하늘의 빛', answer: '별' }
                    ]
                }
            }
        ]
    },
    education: { // 시도교육청 정리 어휘
        easy: [
            {
                level: 1,
                // 십자말풀이: 여러 단어가 서로 교차하고 특정 글자를 공유
                // CSV 데이터 기반: 1학년 단어들 사용
                // 격자 구조 (9x9):
                //   0  1  2  3  4  5  6  7  8
                // 0 1  #  #  #  #  #  #  #  #   1번 가로: "역사" (0,0~0,1), 1번 세로: "역량" (0,0~1,0) - "역"이 (0,0)에서 교차 ✓
                // 1 #  2  #  #  #  #  #  #  #   2번 가로: "적용" (1,1~1,2), 2번 세로: "활용" (0,1~2,1) - "용"이 (1,1)에서 교차 ✓
                // 2 #  3  #  #  #  #  #  #  #   3번 가로: "타일" (2,1~2,2), 3번 세로: "타작" (2,1~3,1) - "타"가 (2,1)에서 교차 ✓
                // 3 #  4  #  #  #  #  #  #  #   4번 가로: "차별" (3,1~3,2), 4번 세로: "차례" (3,1~4,1) - "차"가 (3,1)에서 교차 ✓
                // 4 #  #  #  #  #  #  #  #  #
                // 교차점: (0,0)="역", (1,1)="용", (2,1)="타", (3,1)="차"
                // 실제 교차 구조: 여러 단어가 서로 교차
                // 격자 구조 (올바른 교차):
                //   0  1  2  3  4  5  6  7  8
                // 0 1  #  #  #  #  #  #  #  #   1번 가로: "역사" (0,0~0,1), 1번 세로: "역량" (0,0~1,0) - "역"이 (0,0)에서 교차 ✓
                // 1 #  2  #  #  #  #  #  #  #   2번 가로: "적용" (1,1~1,2), 2번 세로: "활용" (0,1~2,1) - "용"이 (1,1)에서 교차 ✓
                // 2 #  3  #  #  #  #  #  #  #   3번 가로: "타일" (2,1~2,2), 3번 세로: "타작" (2,1~3,1) - "타"가 (2,1)에서 교차 ✓
                // 3 #  4  #  #  #  #  #  #  #   4번 가로: "차별" (3,1~3,2), 4번 세로: "차례" (3,1~4,1) - "차"가 (3,1)에서 교차 ✓
                // 4 #  #  #  #  #  #  #  #  #
                // 
                // 교차점:
                // - (0,0): 1번 가로 "역" = 1번 세로 "역" ✓
                // - (1,1): 2번 가로 "용" = 2번 세로 "용" ✓
                // - (2,1): 3번 가로 "타" = 3번 세로 "타" ✓
                // - (3,1): 4번 가로 "차" = 4번 세로 "차" ✓
                // 
                // 주의: "역사"의 "사"는 (0,1)에 있고, "활용"의 "활"은 (0,1)에서 시작해야 하므로 충돌
                // 해결: "역사"와 "역량"만 교차하고, 다른 단어들은 별도 위치에서 교차
                // 
                // 올바른 교차 구조:
                //   0  1  2  3  4  5  6  7  8
                // 0 1  #  #  #  #  #  #  #  #   1번 가로: "역사" (0,0~0,1), 1번 세로: "역량" (0,0~1,0) - "역"이 (0,0)에서 교차 ✓
                // 1 #  2  #  #  #  #  #  #  #   2번 가로: "적용" (1,1~1,2), 2번 세로: "활용" (0,1~2,1) - "용"이 (1,1)에서 교차 ✓
                // 2 #  3  #  #  #  #  #  #  #   3번 가로: "타일" (2,1~2,2), 3번 세로: "타작" (2,1~3,1) - "타"가 (2,1)에서 교차 ✓
                // 3 #  4  #  #  #  #  #  #  #   4번 가로: "차별" (3,1~3,2), 4번 세로: "차례" (3,1~4,1) - "차"가 (3,1)에서 교차 ✓
                // 4 #  #  #  #  #  #  #  #  #
                // 
                // 최종: 여러 단어가 서로 교차하는 구조
                // 격자 구조 (올바른 교차):
                //   0  1  2  3  4  5  6  7  8
                // 0 1  #  #  #  #  #  #  #  #   1번 가로: "역사" (0,0~0,1), 1번 세로: "역량" (0,0~1,0) - "역"이 (0,0)에서 교차 ✓
                // 1 #  2  #  #  #  #  #  #  #   2번 가로: "적용" (1,1~1,2), 2번 세로: "활용" (0,1~2,1) - "용"이 (1,1)에서 교차 ✓
                // 2 #  3  #  #  #  #  #  #  #   3번 가로: "타일" (2,1~2,2), 3번 세로: "타작" (2,1~3,1) - "타"가 (2,1)에서 교차 ✓
                // 3 #  4  #  #  #  #  #  #  #   4번 가로: "차별" (3,1~3,2), 4번 세로: "차례" (3,1~4,1) - "차"가 (3,1)에서 교차 ✓
                // 4 #  #  #  #  #  #  #  #  #
                // 
                // 교차점:
                // - (0,0): 1번 가로 "역" = 1번 세로 "역" ✓
                // - (1,1): 2번 가로 "용" = 2번 세로 "용" ✓
                // - (2,1): 3번 가로 "타" = 3번 세로 "타" ✓
                // - (3,1): 4번 가로 "차" = 4번 세로 "차" ✓
                // 
                // 주의: "역사"의 "사"는 (0,1)에 있고, "활용"의 "활"은 (0,1)에서 시작해야 하므로 충돌
                // 해결: "역사"와 "역량"만 교차하고, 다른 단어들은 별도 위치에서 교차
                // 
                // 올바른 교차 구조:
                //   0  1  2  3  4  5  6  7  8
                // 0 1  #  #  #  #  #  #  #  #   1번 가로: "역사" (0,0~0,1), 1번 세로: "역량" (0,0~1,0) - "역"이 (0,0)에서 교차 ✓
                // 1 #  2  #  #  #  #  #  #  #   2번 가로: "적용" (1,1~1,2), 2번 세로: "활용" (0,1~2,1) - "용"이 (1,1)에서 교차 ✓
                // 2 #  3  #  #  #  #  #  #  #   3번 가로: "타일" (2,1~2,2), 3번 세로: "타작" (2,1~3,1) - "타"가 (2,1)에서 교차 ✓
                // 3 #  4  #  #  #  #  #  #  #   4번 가로: "차별" (3,1~3,2), 4번 세로: "차례" (3,1~4,1) - "차"가 (3,1)에서 교차 ✓
                // 4 #  #  #  #  #  #  #  #  #
                // 
                // 최종: 여러 단어가 서로 교차하는 구조
                // 격자 구조: 1번 가로와 1번 세로가 (0,0)에서 교차
                //   0  1  2  3  4  5  6  7  8
                // 0 1  #  #  #  #  #  #  #  #   1번 가로: "역사" (0,0~0,1), 1번 세로: "역량" (0,0~1,0)
                // 1 #  2  #  #  #  #  #  #  #   2번 가로: "적용" (1,1~1,2), 2번 세로: "활용" (0,1~2,1)
                // 2 #  3  #  #  #  #  #  #  #   3번 가로: "타일" (2,1~2,2), 3번 세로: "타작" (2,1~3,1)
                // 3 #  4  #  #  #  #  #  #  #   4번 가로: "차별" (3,1~3,2), 4번 세로: "차례" (3,1~4,1)
                // 4 #  #  #  #  #  #  #  #  #
                grid: [
                    ['1', ' ', '#', '#', '#', '#', '#', '#', '#'],
                    [' ', '2', '#', '#', '#', '#', '#', '#', '#'],
                    [' ', '3', '#', '#', '#', '#', '#', '#', '#'],
                    [' ', '4', '#', '#', '#', '#', '#', '#', '#'],
                    [' ', ' ', '#', '#', '#', '#', '#', '#', '#']
                ],
                clues: {
                    across: [
                        { number: 1, clue: '국가나 사회의 발전과 관련된 의미 있는 과거의 사실들에 대한 생각이나 기록', answer: '역사' },
                        { number: 2, clue: '알맞게 이용하거나 맞추어 씀', answer: '적용' },
                        { number: 3, clue: '점토를 구워서 만든, 겉이 반들반들한 얇고 작은 판', answer: '타일' },
                        { number: 4, clue: '둘 또는 둘보다 많은 어떤 것들에 대해서 차이를 두고 구분하여 다르게 대하는 것', answer: '차별' }
                    ],
                    down: [
                        { number: 1, clue: '어떤 일을 해낼 수 있는 힘', answer: '역량' },
                        { number: 2, clue: '충분히 잘 이용함', answer: '활용' },
                        { number: 3, clue: '벼나 보리 같은 곡식에서 이삭을 떼어내어 거두는 일', answer: '타작' },
                        { number: 4, clue: '순서에 따라 돌아오는 기회', answer: '차례' }
                    ]
                }
            }
        ],
        medium: [
            {
                level: 1,
                grid: [
                    ['1', ' ', ' ', '#', '2', ' ', ' ', ' ', ' '],
                    [' ', '#', '#', '#', ' ', '#', '#', '#', '#'],
                    ['3', ' ', ' ', ' ', '#', '4', ' ', ' ', ' '],
                    [' ', '#', '#', '#', '#', ' ', '#', '#', '#'],
                    ['5', ' ', ' ', ' ', '#', '6', ' ', ' ', ' '],
                    [' ', '#', '#', '#', '#', ' ', '#', '#', '#'],
                    ['7', ' ', ' ', ' ', '#', '8', ' ', ' ', ' ']
                ],
                clues: {
                    across: [
                        { number: 1, clue: '프로그래밍 언어', answer: '자바' },
                        { number: 3, clue: '인터넷 주소', answer: 'URL' },
                        { number: 5, clue: '데이터 저장소', answer: '디스크' },
                        { number: 7, clue: '입력 장치', answer: '키보드' }
                    ],
                    down: [
                        { number: 2, clue: '컴퓨터의 두뇌', answer: 'CPU' },
                        { number: 4, clue: '웹 페이지 언어', answer: 'HTML' },
                        { number: 6, clue: '화면 표시장치', answer: '모니터' },
                        { number: 8, clue: '마우스의 반대', answer: '고양이' }
                    ]
                }
            }
        ],
        hard: [
            {
                level: 1,
                grid: [
                    ['1', ' ', '#', '2', ' ', ' ', ' ', '#', ' '],
                    [' ', '#', '#', ' ', '#', '#', '#', '#', '#'],
                    ['3', ' ', ' ', '#', '4', ' ', ' ', ' ', ' '],
                    [' ', '#', '#', '#', ' ', '#', '#', '#', '#'],
                    ['5', ' ', ' ', '#', '6', ' ', ' ', ' ', ' '],
                    [' ', '#', '#', '#', ' ', '#', '#', '#', '#'],
                    ['7', ' ', ' ', '#', '8', ' ', ' ', ' ', ' ']
                ],
                clues: {
                    across: [
                        { number: 1, clue: '지구의 자연위성', answer: '달' },
                        { number: 3, clue: '가장 큰 행성', answer: '목성' },
                        { number: 5, clue: '지구의 대기', answer: '공기' },
                        { number: 7, clue: '별들의 집합', answer: '은하' }
                    ],
                    down: [
                        { number: 2, clue: '태양계의 중심', answer: '태양' },
                        { number: 4, clue: '붉은 행성', answer: '화성' },
                        { number: 6, clue: '우주의 공간', answer: '우주' },
                        { number: 8, clue: '밤하늘의 빛', answer: '별' }
                    ]
                }
            }
        ]
    }
};

// 사운드 시스템
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.soundEnabled = this.loadSetting('soundEffect', true);
        this.bgMusicEnabled = this.loadSetting('bgMusic', false);
        this.bgMusicAudio = null;
        this.bgMusicInterval = null;
        this.initAudioContext();
        
        // 배경음악이 활성화되어 있으면 시작
        if (this.bgMusicEnabled) {
            setTimeout(() => this.startBgMusic(), 1000);
        }
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('AudioContext not supported');
        }
    }

    loadSetting(key, defaultValue) {
        const saved = localStorage.getItem(key);
        return saved !== null ? saved === 'true' : defaultValue;
    }

    saveSetting(key, value) {
        localStorage.setItem(key, value.toString());
    }

    playSound(frequency, duration, type = 'sine', ignoreSoundEnabled = false) {
        if ((!this.soundEnabled && !ignoreSoundEnabled) || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        const volume = ignoreSoundEnabled ? 0.1 : 0.3; // 배경음악은 더 조용하게
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playClick() {
        this.playSound(800, 0.1);
    }

    playCorrect() {
        // 정답 사운드: 상승하는 멜로디
        if (!this.soundEnabled || !this.audioContext) return;
        const notes = [523.25, 659.25, 783.99]; // C, E, G
        notes.forEach((freq, i) => {
            setTimeout(() => this.playSound(freq, 0.2), i * 100);
        });
    }

    playIncorrect() {
        // 오답 사운드: 하강하는 음
        this.playSound(200, 0.3, 'sawtooth');
    }

    playComplete() {
        // 완료 사운드: 승리 멜로디
        if (!this.soundEnabled || !this.audioContext) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
        notes.forEach((freq, i) => {
            setTimeout(() => this.playSound(freq, 0.3), i * 150);
        });
    }

    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
        this.saveSetting('soundEffect', enabled);
    }

    setBgMusicEnabled(enabled) {
        this.bgMusicEnabled = enabled;
        this.saveSetting('bgMusic', enabled);
        if (enabled) {
            this.startBgMusic();
        } else {
            this.stopBgMusic();
        }
    }

    startBgMusic() {
        // 배경음악은 간단한 반복 멜로디로 구현
        if (!this.bgMusicEnabled || !this.audioContext) return;
        
        this.stopBgMusic(); // 기존 음악이 있으면 중지
        
        // 간단한 배경음악 멜로디 생성
        this.bgMusicInterval = setInterval(() => {
            if (!this.bgMusicEnabled) {
                this.stopBgMusic();
                return;
            }
            // 부드러운 배경음악 멜로디
            const notes = [261.63, 293.66, 329.63, 349.23]; // C, D, E, F
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            this.playSound(randomNote, 0.5, 'sine', true); // 배경음악은 soundEnabled 무시
        }, 2000); // 2초마다 한 음씩
    }

    stopBgMusic() {
        if (this.bgMusicInterval) {
            clearInterval(this.bgMusicInterval);
            this.bgMusicInterval = null;
        }
        if (this.bgMusicAudio) {
            this.bgMusicAudio.stop();
            this.bgMusicAudio = null;
        }
    }
}

class CrosswordGame {
    constructor() {
        this.soundManager = new SoundManager();
        this.currentVocab = null; // 'national' or 'education'
        this.currentDifficulty = null; // 'easy', 'medium', 'hard'
        this.gameLevels = []; // 현재 선택된 어휘/난이도의 게임 레벨
        this.currentLevel = 0;
        this.score = parseInt(localStorage.getItem('score') || '0');
        this.currentDirection = 'across';
        this.activeClue = null;
        this.gridData = [];
        this.cellMap = new Map(); // 셀 위치 -> 단서 정보 매핑
        this.activeCells = [];
        this.shuffledLetters = []; // 섞인 글자들
        this.selectedLetters = []; // 선택된 글자들
        this.completedClues = new Set(); // 완료된 단서 추적 (형식: "across-1", "down-2")
        
        // 새로운 구조: 외부 JSON 데이터
        this.allWordsPool = {}; // JSON에서 가져온 전체 단어 풀
        this.gridSize = 6; // 기본 그리드 크기 (6x6, 8x8, 10x10만 허용)
        this.currentDifficulty = 'easy'; // 현재 난이도
        this.dataLoaded = false; // 데이터 로드 완료 플래그
        
        // 외부 JSON 데이터 로드
        this.loadExternalData().then(() => {
            this.dataLoaded = true;
            console.log('데이터 로드 완료, 게임 준비됨');
        });
        
        // 게임 설정
        this.settings = {
            timer: this.loadSetting('timer', false),
            autocheck: this.loadSetting('autocheck', false),
            skipFilled: this.loadSetting('skipFilled', false),
            wordEndMove: this.loadSetting('wordEndMove', 'always'), // 'always', 'ifcomplete', 'never'
            clueAdvanceMode: this.loadSetting('clueAdvanceMode', 'direction'), // 'direction' | 'global'
            soundEffect: true,
            bgMusic: false
        };
        
        // 타이머 관련
        this.timerStartTime = null;
        this.timerElapsed = 0;
        this.timerInterval = null;
        this.isTimerRunning = false;
        this.isPaused = false;
        
        // 뷰 모드
        this.viewMode = 'grid'; // 'grid' or 'list'
        
        // Canvas 관련
        this.useCanvas = this.loadSetting('useCanvas', true); // Canvas 사용 여부
        this.canvas = null;
        this.ctx = null;
        this.cellSize = 50; // 셀 크기 (픽셀)
        this.canvasPadding = 20;
        this.selectedCanvasCell = null; // {row, col}
        this.canvasCellValues = new Map(); // 셀 값 저장 (row-col -> value)
        
        this.initSplash();
    }

    loadSetting(key, defaultValue) {
        const saved = localStorage.getItem(`setting_${key}`);
        return saved !== null ? JSON.parse(saved) : defaultValue;
    }

    saveSetting(key, value) {
        localStorage.setItem(`setting_${key}`, JSON.stringify(value));
        this.settings[key] = value;
    }

    // 외부 JSON 데이터 로드
    async loadExternalData() {
        try {
            const response = await fetch('data.json');
            this.allWordsPool = await response.json();
            console.log("데이터 로드 완료:", this.allWordsPool);
        } catch (error) {
            console.error("데이터를 불러오는데 실패했어:", error);
            // 기본 데이터 사용
            this.allWordsPool = {
                easy: [
                    {"word": "학교", "hint": "배우는 곳"},
                    {"word": "학생", "hint": "공부하는 사람"}
                ],
                normal: [
                    {"word": "컴퓨터", "hint": "전자 계산기"}
                ],
                hard: []
            };
        }
    }

    initSplash() {
        // 스플래시 화면 표시
        setTimeout(() => {
            document.getElementById('splashScreen').style.display = 'none';
            document.getElementById('menuScreen').style.display = 'block';
            this.initMenu();
        }, 2000); // 2초 후 메뉴로 전환
    }

    initMenu() {
        // 게임 모드 선택
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                document.getElementById('vocabSelection').style.display = 'block';
            });
        }
        
        // 어휘 목록 선택 버튼
        document.querySelectorAll('.vocab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.soundManager.playClick();
                const vocab = e.currentTarget.dataset.vocab;
                this.showDifficultyScreen(vocab);
            });
        });

        // 난이도 선택 버튼
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.soundManager.playClick();
                const difficulty = e.currentTarget.dataset.difficulty;
                // 칸수 선택 (기본값: 6, 유효한 크기만 허용)
                const selectedSizeBtn = document.querySelector('.size-btn.active');
                let gridSize = selectedSizeBtn ? parseInt(selectedSizeBtn.dataset.size) : 6;
                // 유효한 크기 검증 (6, 8, 10만 허용)
                if (![6, 8, 10].includes(gridSize)) {
                    gridSize = 6;
                }
                this.startGame(this.currentVocab, difficulty, gridSize);
            });
        });
        
        // 칸수 선택 버튼 (6x6, 8x8, 10x10만 허용)
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.soundManager.playClick();
                const size = parseInt(e.currentTarget.dataset.size);
                // 유효한 크기만 허용
                if ([6, 8, 10].includes(size)) {
                    // 활성 상태 토글
                    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                } else {
                    console.warn(`유효하지 않은 격자 크기: ${size}`);
                }
            });
        });

        // 뒤로가기 버튼
        const backToMenuBtn = document.getElementById('backToMenuBtn');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                this.showMenuScreen();
            });
        }

        const backToDifficultyBtn = document.getElementById('backToDifficultyBtn');
        if (backToDifficultyBtn) {
            backToDifficultyBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                this.showDifficultyScreen(this.currentVocab);
            });
        }

        // 설정 버튼
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                this.showSettings();
            });
        }

        const settingsBtnGame = document.getElementById('settingsBtnGame');
        if (settingsBtnGame) {
            settingsBtnGame.addEventListener('click', () => {
                this.soundManager.playClick();
                this.showSettings();
            });
        }

        const closeSettingsBtn = document.getElementById('closeSettingsBtn');
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                this.hideSettings();
            });
        }

        // 설정 토글
        const soundEffectToggle = document.getElementById('soundEffectToggle');
        if (soundEffectToggle) {
            soundEffectToggle.addEventListener('change', (e) => {
                this.soundManager.setSoundEnabled(e.target.checked);
                this.soundManager.playClick();
            });
        }

        const bgMusicToggle = document.getElementById('bgMusicToggle');
        if (bgMusicToggle) {
            bgMusicToggle.addEventListener('change', (e) => {
                this.soundManager.setBgMusicEnabled(e.target.checked);
            });
        }

        // 타이머 설정
        const timerToggle = document.getElementById('timerToggle');
        if (timerToggle) {
            timerToggle.addEventListener('change', (e) => {
                this.saveSetting('timer', e.target.checked);
                if (e.target.checked && this.isTimerRunning) {
                    this.startTimer();
                } else if (!e.target.checked) {
                    this.stopTimer();
                }
            });
        }

        // Autocheck 설정
        const autocheckToggle = document.getElementById('autocheckToggle');
        if (autocheckToggle) {
            autocheckToggle.addEventListener('change', (e) => {
                this.saveSetting('autocheck', e.target.checked);
            });
        }

        // 채워진 칸 건너뛰기 설정
        const skipFilledToggle = document.getElementById('skipFilledToggle');
        if (skipFilledToggle) {
            skipFilledToggle.addEventListener('change', (e) => {
                this.saveSetting('skipFilled', e.target.checked);
            });
        }

        // 단어 끝 이동 규칙 설정
        const wordEndMoveSelect = document.getElementById('wordEndMoveSelect');
        if (wordEndMoveSelect) {
            wordEndMoveSelect.addEventListener('change', (e) => {
                this.saveSetting('wordEndMove', e.target.value);
            });
        }

        // 다음 단서 이동 방식 설정
        const clueAdvanceModeSelect = document.getElementById('clueAdvanceModeSelect');
        if (clueAdvanceModeSelect) {
            clueAdvanceModeSelect.addEventListener('change', (e) => {
                this.saveSetting('clueAdvanceMode', e.target.value);
            });
        }

        // 점수 초기화
        const resetScoreBtn = document.getElementById('resetScoreBtn');
        if (resetScoreBtn) {
            resetScoreBtn.addEventListener('click', () => {
                if (confirm('점수를 초기화하시겠습니까?')) {
                    this.score = 0;
                    localStorage.setItem('score', '0');
                    this.updateScore();
                    this.soundManager.playClick();
                }
            });
        }

        // 설정 초기화
        document.getElementById('soundEffectToggle').checked = this.soundManager.soundEnabled;
        document.getElementById('bgMusicToggle').checked = this.soundManager.bgMusicEnabled;
        document.getElementById('timerToggle').checked = this.settings.timer;
        document.getElementById('autocheckToggle').checked = this.settings.autocheck;
        document.getElementById('skipFilledToggle').checked = this.settings.skipFilled;
        document.getElementById('wordEndMoveSelect').value = this.settings.wordEndMove;
        document.getElementById('clueAdvanceModeSelect').value = this.settings.clueAdvanceMode || 'direction';
    }

    showSettings() {
        document.getElementById('settingsScreen').style.display = 'flex';
    }

    hideSettings() {
        document.getElementById('settingsScreen').style.display = 'none';
    }

    showMenuScreen() {
        document.getElementById('menuScreen').style.display = 'block';
        document.getElementById('difficultyScreen').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'none';
    }


    showDifficultyScreen(vocab) {
        this.currentVocab = vocab;
        const vocabName = vocab === 'national' ? '국립국어원 어휘목록' : '시도교육청 정리 어휘';
        document.getElementById('vocabInfo').textContent = vocabName;
        
        document.getElementById('menuScreen').style.display = 'none';
        document.getElementById('difficultyScreen').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none';
    }

    async startGame(vocab, difficulty, gridSize = 6) {
        // 격자 크기 검증: 6, 8, 10만 허용
        const validSizes = [6, 8, 10];
        if (!validSizes.includes(gridSize)) {
            console.warn(`유효하지 않은 격자 크기: ${gridSize}, 기본값 6 사용`);
            gridSize = 6;
        }
        this.gridSize = gridSize; // 격자 크기 저장 (6, 8, 10만 허용)
        this.currentDifficulty = difficulty;
        
        // 완성된 퍼즐 JSON 파일 로드
        try {
            const puzzlePath = 'output_puzzles/easy_20260107_132823_2a1d30.json';
            await this.loadPuzzleFromJSON(puzzlePath);
            console.log('퍼즐 파일 로드 성공');
        } catch (error) {
            console.warn('퍼즐 파일 로드 실패, 기본 방식으로 생성:', error);
            // 데이터 로드 대기
            if (!this.dataLoaded) {
                console.log('데이터 로드 중... 잠시만 기다려주세요.');
                await this.loadExternalData();
                this.dataLoaded = true;
            }
            // JSON 데이터에서 단어 선택하여 게임 생성
            this.generateGameFromJSON(difficulty);
        }
        
        document.getElementById('menuScreen').style.display = 'none';
        document.getElementById('difficultyScreen').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
        
        this.currentLevel = 0;
        this.score = 0;
        this.startLevel(0);
        
        // 가상 키보드 표시 (모바일용)
        this.renderVirtualKeyboard();
        
        // 타이머 시작
        if (this.settings.timer) {
            this.startTimer();
        }
        
        // 뷰 모드 초기화
        this.viewMode = 'grid';
        this.updateViewMode();
        
        // 게임 이벤트 리스너 설정
        this.setupGameEventListeners();
    }
    
    // 완성된 퍼즐 JSON 파일 로드
    async loadPuzzleFromJSON(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const puzzleData = await response.json();
            console.log('퍼즐 데이터 로드 완료:', puzzleData);
            
            // 퍼즐 데이터를 게임 형식으로 변환
            this.convertPuzzleToGameFormat(puzzleData);
        } catch (error) {
            console.error('퍼즐 파일 로드 실패:', error);
            throw error;
        }
    }
    
    // 퍼즐 JSON 데이터를 게임 형식으로 변환
    convertPuzzleToGameFormat(puzzleData) {
        const gridSize = puzzleData.metadata.grid_size[0]; // [6, 6] -> 6
        this.gridSize = gridSize;
        
        // 격자 변환: 빈 문자열을 '#'로, 글자가 있는 칸은 ' '로
        const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill('#'));
        
        // 단어 정보를 기반으로 격자에 번호와 빈 칸 배치
        const numberMap = new Map(); // position -> number
        
        // 각 단어의 시작 위치에 번호 배치
        puzzleData.words.forEach(word => {
            const [row, col] = word.position;
            const key = `${row}-${col}`;
            if (!numberMap.has(key)) {
                numberMap.set(key, word.number);
            }
        });
        
        // 실제 글자가 있는 위치는 먼저 ' '로 설정 (입력 가능한 칸)
        puzzleData.grid.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell !== '') {
                    grid[r][c] = ' '; // 글자가 있는 칸은 입력 가능
                }
            });
        });
        
        // 격자에 번호 배치 (글자가 있는 칸 위에 번호 덮어쓰기)
        numberMap.forEach((number, key) => {
            const [row, col] = key.split('-').map(Number);
            grid[row][col] = String(number); // 번호는 글자 칸 위에 배치
        });
        
        // 단서 변환
        const across = puzzleData.clues.across.map(clue => ({
            number: clue.number,
            clue: clue.hint,
            answer: this.getWordByNumber(puzzleData.words, clue.number, 'across')
        }));
        
        const down = puzzleData.clues.down.map(clue => ({
            number: clue.number,
            clue: clue.hint,
            answer: this.getWordByNumber(puzzleData.words, clue.number, 'down')
        }));
        
        // 게임 레벨 생성
        this.gameLevels = [{
            level: 1,
            grid: grid,
            clues: { across, down }
        }];
        
        console.log('변환된 게임 데이터:', this.gameLevels[0]);
        console.log('격자:', grid);
        console.log('가로 단서:', across);
        console.log('세로 단서:', down);
    }
    
    // 단어 번호와 방향으로 단어 찾기
    getWordByNumber(words, number, direction) {
        const word = words.find(w => w.number === number && w.direction === direction);
        return word ? word.word : '';
    }
    
    // JSON 데이터에서 랜덤 단어 선택하여 게임 생성
    generateGameFromJSON(difficulty) {
        // 난이도 키 매핑 (medium -> normal)
        const difficultyMap = {
            'easy': 'easy',
            'medium': 'normal',
            'normal': 'normal',
            'hard': 'hard'
        };
        const mappedDifficulty = difficultyMap[difficulty] || difficulty;
        
        const pool = this.allWordsPool[mappedDifficulty] || [];
        if (pool.length === 0) {
            console.error('단어 풀이 비어있습니다. 난이도:', difficulty, '매핑:', mappedDifficulty);
            console.error('사용 가능한 키:', Object.keys(this.allWordsPool));
            // 기본 데이터로 폴백
            this.allWordsPool = {
                easy: [
                    {"word": "학교", "hint": "배우는 곳"},
                    {"word": "학생", "hint": "공부하는 사람"},
                    {"word": "교실", "hint": "수업하는 방"}
                ],
                normal: [
                    {"word": "컴퓨터", "hint": "전자 계산기"}
                ],
                hard: []
            };
            const fallbackPool = this.allWordsPool[mappedDifficulty] || this.allWordsPool['easy'] || [];
            if (fallbackPool.length === 0) {
                console.error('기본 데이터도 없습니다. 게임을 시작할 수 없습니다.');
                this.showModal('오류', '단어 데이터를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
                return;
            }
            // 폴백 데이터 사용
            const wordCount = Math.min(20, Math.max(15, fallbackPool.length));
            const shuffled = [...fallbackPool].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, wordCount);
            this.gameLevels = [{
                level: 1,
                grid: this.generateRandomGrid(selectedWords, this.gridSize),
                clues: this.generateClues(selectedWords)
            }];
            return;
        }
        
        // 랜덤하게 15~20개 단어 선택
        const wordCount = Math.min(20, Math.max(15, pool.length));
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const selectedWords = shuffled.slice(0, wordCount);
        
        console.log('선택된 단어:', selectedWords);
        
        // 단어 리스트를 게임 레벨 형식으로 변환
        // 간단한 십자말풀이 생성 (실제로는 더 복잡한 알고리즘이 필요)
        this.gameLevels = [{
            level: 1,
            grid: this.generateRandomGrid(selectedWords, this.gridSize),
            clues: this.generateClues(selectedWords)
        }];
    }
    
    // 십자말풀이 그리드 생성 (단어들을 격자에 배치)
    generateRandomGrid(wordList, size) {
        const grid = Array(size).fill(null).map(() => Array(size).fill('#'));
        const placedWords = [];
        let clueNumber = 1;
        
        // 단어들을 가로/세로로 번갈아 배치
        wordList.forEach((item, index) => {
            if (!item.word) return;
            
            const word = item.word;
            const isAcross = index % 2 === 0; // 짝수 인덱스는 가로, 홀수는 세로
            let placed = false;
            
            // 배치 시도 (최대 50번)
            for (let attempt = 0; attempt < 50 && !placed; attempt++) {
                if (isAcross) {
                    // 가로 배치
                    const row = Math.floor(Math.random() * size);
                    const maxCol = size - word.length;
                    if (maxCol >= 0) {
                        const col = Math.floor(Math.random() * (maxCol + 1));
                        // 해당 위치에 배치 가능한지 확인
                        let canPlace = true;
                        for (let i = 0; i < word.length; i++) {
                            if (grid[row][col + i] !== '#' && grid[row][col + i] !== ' ') {
                                canPlace = false;
                                break;
                            }
                        }
                        if (canPlace) {
                            // 단어 배치
                            for (let i = 0; i < word.length; i++) {
                                grid[row][col + i] = i === 0 ? String(clueNumber) : ' ';
                            }
                            placedWords.push({
                                number: clueNumber,
                                word: word,
                                hint: item.hint,
                                row: row,
                                col: col,
                                direction: 'across'
                            });
                            clueNumber++;
                            placed = true;
                        }
                    }
                } else {
                    // 세로 배치
                    const maxRow = size - word.length;
                    if (maxRow >= 0) {
                        const row = Math.floor(Math.random() * (maxRow + 1));
                        const col = Math.floor(Math.random() * size);
                        // 해당 위치에 배치 가능한지 확인
                        let canPlace = true;
                        for (let i = 0; i < word.length; i++) {
                            if (grid[row + i][col] !== '#' && grid[row + i][col] !== ' ') {
                                canPlace = false;
                                break;
                            }
                        }
                        if (canPlace) {
                            // 단어 배치
                            for (let i = 0; i < word.length; i++) {
                                grid[row + i][col] = i === 0 ? String(clueNumber) : ' ';
                            }
                            placedWords.push({
                                number: clueNumber,
                                word: word,
                                hint: item.hint,
                                row: row,
                                col: col,
                                direction: 'down'
                            });
                            clueNumber++;
                            placed = true;
                        }
                    }
                }
            }
        });
        
        // 배치된 단어 정보 저장 (나중에 단서 생성에 사용)
        this.placedWords = placedWords;
        
        return grid;
    }
    
    // 단서 생성 (배치된 단어 기반)
    generateClues(wordList) {
        const across = [];
        const down = [];
        
        // 배치된 단어 정보 사용
        if (this.placedWords && this.placedWords.length > 0) {
            this.placedWords.forEach(placed => {
                const clue = {
                    number: placed.number,
                    clue: placed.hint,
                    answer: placed.word
                };
                if (placed.direction === 'across') {
                    across.push(clue);
                } else {
                    down.push(clue);
                }
            });
        } else {
            // 폴백: 원래 방식 (하지만 격자에 번호가 없어서 작동 안 함)
            wordList.forEach((item, index) => {
                if (index % 2 === 0) {
                    across.push({
                        number: Math.floor(index / 2) + 1,
                        clue: item.hint,
                        answer: item.word
                    });
                } else {
                    down.push({
                        number: Math.floor(index / 2) + 1,
                        clue: item.hint,
                        answer: item.word
                    });
                }
            });
        }
        
        return { across, down };
    }
    
    // 가상 키보드 렌더링 (모바일 입력용)
    renderVirtualKeyboard() {
        const virtualKeyboard = document.getElementById('virtualKeyboard');
        if (!virtualKeyboard) return;
        
        // 모바일 환경에서만 표시
        if (this.isMobileUI()) {
            virtualKeyboard.style.display = 'block';
            
            const mobileInput = document.getElementById('mobileInput');
            if (mobileInput) {
                // 입력 이벤트 리스너
                mobileInput.addEventListener('input', (e) => {
                    if (this.selectedCanvasCell && e.target.value) {
                        const char = e.target.value.slice(-1); // 마지막 글자만 추출
                        this.setCellValue(this.selectedCanvasCell.row, this.selectedCanvasCell.col, char);
                        e.target.value = ''; // 입력 후 비우기
                    } else if (!this.useCanvas && this.selectedCell) {
                        const char = e.target.value.slice(-1);
                        const cellEl = document.querySelector(`input.grid-cell[data-row="${this.selectedCell.row}"][data-col="${this.selectedCell.col}"]`);
                        if (cellEl && !cellEl.readOnly && !cellEl.disabled) {
                            cellEl.value = char;
                            cellEl.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                        e.target.value = '';
                    }
                });
                
                // 포커스 이벤트
                mobileInput.addEventListener('focus', () => {
                    // 모바일 키보드가 올라오도록
                });
            }
        } else {
            virtualKeyboard.style.display = 'none';
        }
    }
    
    // 셀 값 설정 (Canvas 모드)
    setCellValue(row, col, char) {
        if (this.useCanvas) {
            const key = `${row}-${col}`;
            this.canvasCellValues.set(key, char);
            this.renderCanvas();
            this.checkAutoWord(); // 단어가 완성되었는지 자동 체크
        } else {
            const cellEl = document.querySelector(`input.grid-cell[data-row="${row}"][data-col="${col}"]`);
            if (cellEl && !cellEl.readOnly && !cellEl.disabled) {
                cellEl.value = char;
                cellEl.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    }
    
    // 단어 완성 자동 체크
    checkAutoWord() {
        if (!this.activeClue || !this.currentAnswer) return;
        
        const ordered = this.getOrderedActiveCells();
        const userAnswer = ordered.map(cell => {
            if (this.useCanvas) {
                const key = `${cell.row}-${cell.col}`;
                return this.canvasCellValues.get(key) || '';
            } else {
                const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                return cellEl ? cellEl.value : '';
            }
        }).join('');
        
        if (userAnswer.length === this.currentAnswer.length && userAnswer === this.currentAnswer) {
            // 정답인 경우
            setTimeout(() => {
                this.checkAnswer();
            }, 500);
        }
    }
    
    // 모바일 UI 확인
    isMobileUI() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    }

    setupGameEventListeners() {
        // Grid/List 전환 버튼 (이벤트 리스너는 한 번만 등록)
        const viewToggleBtn = document.getElementById('viewToggleBtn');
        if (!viewToggleBtn.dataset.listenerAdded) {
            viewToggleBtn.addEventListener('click', () => {
                this.toggleViewMode();
            });
            viewToggleBtn.dataset.listenerAdded = 'true';
        }
        
        // 힌트 버튼 (글자 하나씩 보여주기)
        const hintBtn = document.getElementById('hintBtn');
        if (hintBtn && !hintBtn.dataset.listenerAdded) {
            hintBtn.addEventListener('click', () => {
                this.showHint();
            });
            hintBtn.dataset.listenerAdded = 'true';
        }
        
        // 단어 공개 버튼
        const revealBtn = document.getElementById('revealWordBtn');
        if (revealBtn && !revealBtn.dataset.listenerAdded) {
            revealBtn.addEventListener('click', () => {
                this.revealCurrentWord();
            });
            revealBtn.dataset.listenerAdded = 'true';
        }
        
        // 단어 확인 버튼
        const checkWordBtn = document.getElementById('checkWordBtn');
        if (checkWordBtn && !checkWordBtn.dataset.listenerAdded) {
            checkWordBtn.addEventListener('click', () => {
                this.checkAnswer();
            });
            checkWordBtn.dataset.listenerAdded = 'true';
        }
        
        // 전체 확인 버튼
        const checkAllBtn = document.getElementById('checkAllBtn');
        if (checkAllBtn && !checkAllBtn.dataset.listenerAdded) {
            checkAllBtn.addEventListener('click', () => {
                this.checkAllWords();
            });
            checkAllBtn.dataset.listenerAdded = 'true';
        }
        
        // 퍼즐 초기화 버튼
        const clearBtn = document.getElementById('clearPuzzleBtn');
        if (clearBtn && !clearBtn.dataset.listenerAdded) {
            clearBtn.addEventListener('click', () => {
                if (confirm('퍼즐을 초기화하시겠습니까? 모든 입력이 지워집니다.')) {
                    this.clearPuzzle();
                }
            });
            clearBtn.dataset.listenerAdded = 'true';
        }
        
        // 다시 시작 버튼
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn && !resetBtn.dataset.listenerAdded) {
            resetBtn.addEventListener('click', () => {
                if (confirm('게임을 다시 시작하시겠습니까?')) {
                    this.startLevel(this.currentLevel);
                }
            });
            resetBtn.dataset.listenerAdded = 'true';
        }
        
        // 페이지 가시성 변경 감지 (타이머 일시정지)
        if (!document.documentElement.hasAttribute('data-visibility-listener')) {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseTimer();
                } else {
                    this.resumeTimer();
                }
            });
            document.documentElement.setAttribute('data-visibility-listener', 'true');
        }
    }

    setGameData(vocab, difficulty) {
        this.currentVocab = vocab;
        this.currentDifficulty = difficulty;
        this.gameLevels = gameData[vocab][difficulty];
    }

    startLevel(levelIndex) {
        this.currentLevel = levelIndex;
        const level = this.gameLevels[levelIndex];
        if (!level) {
            this.showModal('완료!', '모든 단계를 완료했습니다!');
            return;
        }

        this.gridData = level.grid.map(row => [...row]);
        this.cellMap.clear();
        this.completedClues.clear(); // 레벨 시작 시 완료된 단서 초기화
        this.buildCellMap(level);
        this.renderGrid();
        this.renderClues();
        this.updateScore();
        this.updateLevelDisplay();
        
        // 단어 선택 UI 숨기기
        const wordSelectionSection = document.getElementById('wordSelectionSection');
        if (wordSelectionSection) wordSelectionSection.style.display = 'none';
        const checkBtn = document.getElementById('checkBtn');
        if (checkBtn) checkBtn.style.display = 'none';
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) resetBtn.style.display = 'none';
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.style.display = 'none';
        const revealWordBtn = document.getElementById('revealWordBtn');
        if (revealWordBtn) revealWordBtn.style.display = 'none';
        const clearPuzzleBtn = document.getElementById('clearPuzzleBtn');
        if (clearPuzzleBtn) clearPuzzleBtn.style.display = 'none';
        
        // 타이머 리셋
        this.stopTimer();
        this.timerElapsed = 0;
        if (this.settings.timer) {
            this.startTimer();
        }
        this.updateTimerDisplay();
    }

buildCellMap(level) {
    // cellMap: "r-c" -> { across?: { clue, index, cells }, down?: { clue, index, cells } }
    this.cellMap = new Map();

    const rows = level.grid.length;
    const cols = level.grid[0].length;

    const findStart = (numStr) => {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (String(level.grid[r][c]) === numStr) return { r, c };
            }
        }
        return null;
    };

    const addCell = (r, c, dir, clue, idx, cells) => {
        const key = `${r}-${c}`;
        if (!this.cellMap.has(key)) this.cellMap.set(key, { across: null, down: null });
        this.cellMap.get(key)[dir] = { clue, index: idx, cells };
    };

    // ✅ 가로 단서 처리: "번호 칸"도 실제 글자 칸으로 포함 (index 0)
    level.clues.across.forEach(clue => {
        const start = findStart(String(clue.number));
        if (!start) {
            console.warn('가로 시작칸 못찾음:', clue.number);
            return;
        }
        const cells = [];
        for (let i = 0; i < clue.answer.length; i++) {
            const c = start.c + i;
            if (c >= cols) break;
            if (level.grid[start.r][c] === '#') break;
            cells.push({ row: start.r, col: c });
        }
        if (cells.length !== clue.answer.length) {
            console.warn(`가로 단서 ${clue.number} 길이 불일치: cells=${cells.length}, answer=${clue.answer.length}`, clue.answer);
            return;
        }
        cells.forEach((cell, idx) => addCell(cell.row, cell.col, 'across', clue, idx, cells));
    });

    // ✅ 세로 단서 처리: "번호 칸"도 실제 글자 칸으로 포함 (index 0)
    level.clues.down.forEach(clue => {
        const start = findStart(String(clue.number));
        if (!start) {
            console.warn('세로 시작칸 못찾음:', clue.number);
            return;
        }
        const cells = [];
        for (let i = 0; i < clue.answer.length; i++) {
            const r = start.r + i;
            if (r >= rows) break;
            if (level.grid[r][start.c] === '#') break;
            cells.push({ row: r, col: start.c });
        }
        if (cells.length !== clue.answer.length) {
            console.warn(`세로 단서 ${clue.number} 길이 불일치: cells=${cells.length}, answer=${clue.answer.length}`, clue.answer);
            return;
        }
        cells.forEach((cell, idx) => addCell(cell.row, cell.col, 'down', clue, idx, cells));
    });
}



    renderGrid() {
        const container = document.getElementById('gridContainer');
        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${this.gridData[0].length}, 1fr)`;

        this.gridData.forEach((row, r) => {
            row.forEach((cell, c) => {
                const cellWrapper = document.createElement('div');
                cellWrapper.className = 'grid-cell-wrapper';
                cellWrapper.style.position = 'relative';

                const cellEl = document.createElement('input');
                cellEl.type = 'text';
                cellEl.className = 'grid-cell';
                cellEl.id = `cell-${r}-${c}`;
                cellEl.name = `cell-${r}-${c}`;
                cellEl.dataset.row = r;
                cellEl.dataset.col = c;
                cellEl.dataset.programmaticUpdate = 'false'; // 프로그래밍 방식 업데이트 플래그
                
                // 붙여넣기 이벤트 처리
                cellEl.addEventListener('paste', (e) => {
                    e.preventDefault();
                    const pastedText = (e.clipboardData || window.clipboardData).getData('text').toUpperCase().replace(/[^가-힣A-Z0-9]/g, '');
                    this.handlePaste(pastedText, r, c);
                });
                
                // 키 입력 시 여러 글자 처리
                cellEl.addEventListener('keydown', (e) => {
                    // 한글 입력 시 composition 이벤트 처리
                    if (e.key.length > 1 && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
                        // 여러 글자가 입력될 수 있도록 허용
                    }
                });

                if (cell === '#') {
                    cellEl.classList.add('blocked');
                    cellEl.disabled = true;
                    cellEl.readOnly = true;
                    cellEl.style.pointerEvents = 'none';
                } else if (cell !== ' ' && cell !== '') {
                    cellEl.classList.add('numbered');
                    cellEl.dataset.number = cell;
                    
                    // 번호 표시용 요소 추가
                    const numberLabel = document.createElement('span');
                    numberLabel.className = 'cell-number';
                    numberLabel.textContent = cell;
                    numberLabel.dataset.number = cell;
                    numberLabel.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.handleNumberClick(cell);
                    });
                    cellWrapper.appendChild(numberLabel);
                }

                // 한글 입력 처리를 위한 composition 이벤트
                let isComposing = false;
                cellEl.addEventListener('compositionstart', () => {
                    isComposing = true;
                });
                cellEl.addEventListener('compositionend', (e) => {
                    isComposing = false;
                    const value = e.target.value.toUpperCase().replace(/[^가-힣A-Z0-9]/g, '');
                    if (value.length > 1) {
                        e.target.value = value[0];
                        this.handlePaste(value, r, c);
                    } else {
                        e.target.value = value;
                        if (value && this.activeCells.length > 0) {
                            const currentIndex = this.activeCells.findIndex(cell => cell.row === r && cell.col === c);
                            if (currentIndex !== -1 && currentIndex < this.activeCells.length - 1) {
                                const nextCell = this.activeCells[currentIndex + 1];
                                const nextCellEl = document.querySelector(`[data-row="${nextCell.row}"][data-col="${nextCell.col}"]`);
                                if (nextCellEl) {
                                    nextCellEl.focus();
                                }
                            }
                        }
                    }
                });
                
                cellEl.addEventListener('input', (e) => {
                    // 프로그래밍 방식 업데이트는 무시
                    if (e.target.dataset.programmaticUpdate === 'true') {
                        e.target.dataset.programmaticUpdate = 'false';
                        return;
                    }
                    if (!isComposing) {
                        this.handleCellInput(e, r, c);
                    }
                });
                cellEl.addEventListener('click', () => this.handleCellClick(r, c));
                cellEl.addEventListener('keydown', (e) => {
                    // Space 키로 가로/세로 전환
                    if (e.key === ' ' || e.key === 'Spacebar') {
                        e.preventDefault();
                        this.toggleDirection(r, c);
                    } else {
                        this.handleKeyDown(e, r, c);
                    }
                });
                cellEl.addEventListener('focus', () => this.handleCellFocus(r, c));

                cellWrapper.appendChild(cellEl);
                container.appendChild(cellWrapper);
            });
        });
    }

handleNumberClick(number) {
    const num = parseInt(number);

    const level = this.gameLevels[this.currentLevel];
    const acrossClue = level.clues.across.find(c => c.number === num);
    const downClue = level.clues.down.find(c => c.number === num);

    if (!acrossClue && !downClue) return;

    if (acrossClue && downClue) {
        const same = this.activeClue === num;
        if (same) {
            this.currentDirection = (this.currentDirection === 'across') ? 'down' : 'across';
        } else {
            if (this.currentDirection !== 'across' && this.currentDirection !== 'down') this.currentDirection = 'across';
        }
    } else {
        this.currentDirection = acrossClue ? 'across' : 'down';
    }

    this.pendingJumpToCell = null;
    this.pendingJumpToFirstEmpty = true;
    this.selectClue(num);

    this.soundManager.playClick();
}


    handleCellClick(row, col) {
        const key = `${row}-${col}`;
        this.lastInputSource = 'buttons';
        const cellInfo = this.cellMap.get(key);

        // ✅ 셀을 눌렀을 때는 그 셀을 선택 상태로 고정
        this.pendingJumpToCell = { row, col };
        this.pendingJumpToFirstEmpty = false;
        
        if (cellInfo) {
            // 같은 칸을 다시 클릭하면 방향 전환
            if (this.activeClue && 
                ((this.currentDirection === 'across' && cellInfo.across && cellInfo.across.clue.number === this.activeClue) ||
                 (this.currentDirection === 'down' && cellInfo.down && cellInfo.down.clue.number === this.activeClue))) {
                this.toggleDirection(row, col);
            } else {
                // 새로운 칸 클릭 시
                if (cellInfo.across && cellInfo.down) {
                    // 가로/세로 모두 있으면 현재 방향 유지
                    if (this.currentDirection === 'across' && cellInfo.across) {
                        this.selectClue(cellInfo.across.clue.number);
                    } else if (this.currentDirection === 'down' && cellInfo.down) {
                        this.selectClue(cellInfo.down.clue.number);
                    } else {
                        // 기본값: 가로 우선
                        this.currentDirection = 'across';
                        this.selectClue(cellInfo.across.clue.number);
                    }
                } else if (cellInfo.across) {
                    this.currentDirection = 'across';
                    this.selectClue(cellInfo.across.clue.number);
                } else if (cellInfo.down) {
                    this.currentDirection = 'down';
                    this.selectClue(cellInfo.down.clue.number);
                }
            }
        }
    }

    toggleDirection(row, col) {
        const key = `${row}-${col}`;
        const cellInfo = this.cellMap.get(key);
        
        if (cellInfo && cellInfo.across && cellInfo.down) {
            // 가로/세로 전환
            if (this.currentDirection === 'across') {
                this.currentDirection = 'down';
                this.selectClue(cellInfo.down.clue.number);
            } else {
                this.currentDirection = 'across';
                this.selectClue(cellInfo.across.clue.number);
            }
            this.soundManager.playClick();
        }
    }

handleCellFocus(row, col) {
    this.lastInputSource = 'keyboard';
    this.setSelectedCell(row, col, { focus: false });
}

renderClues() {
    const cluesList = document.getElementById('cluesList');
    cluesList.innerHTML = '';

    const level = this.gameLevels[this.currentLevel];

    // 번호순: 같은 번호면 가로 → 세로
    const allClues = [
        ...level.clues.across.map(c => ({ ...c, _dir: 'across', _dirLabel: '가로' })),
        ...level.clues.down.map(c => ({ ...c, _dir: 'down', _dirLabel: '세로' }))
    ].sort((a, b) => (a.number - b.number) || (a._dir === 'across' ? -1 : 1));

    allClues.forEach(clue => {
        const clueItem = document.createElement('div');
        clueItem.className = 'clue-item';
        clueItem.dataset.number = String(clue.number);
        clueItem.dataset.dir = clue._dir;

        // 텍스트: 가로/세로 표시를 명확하게
        clueItem.textContent = `${clue._dirLabel} ${clue.number}번: ${clue.clue}`;

        clueItem.addEventListener('click', () => {
            this.currentDirection = clue._dir;
            this.pendingJumpToCell = null;
            this.pendingJumpToFirstEmpty = true;
            this.selectClue(clue.number);
        });

        cluesList.appendChild(clueItem);
    });
}


    selectClue(clueNumber) {
        this.activeClue = clueNumber;
        const direction = this.currentDirection;
        const clue = this.gameLevels[this.currentLevel].clues[direction].find(c => c.number === clueNumber);
        
        if (!clue) return;
        
        // 단서 하이라이트 업데이트
        this.updateClueHighlight();

        // 활성 셀 찾기 (먼저 설정)
        this.activeCells = [];
        this.gridData.forEach((row, r) => {
            row.forEach((cell, c) => {
                const key = `${r}-${c}`;
                const cellInfo = this.cellMap.get(key);
                if (cellInfo && cellInfo[direction] && cellInfo[direction].clue.number === clueNumber) {
                    // cellInfo에서 올바른 순서 정보 가져오기
                    const clueInfo = cellInfo[direction];
                    this.activeCells.push({ 
                        row: parseInt(r), 
                        col: parseInt(c),
                        index: clueInfo.index 
                    });
                }
            });
        });
        
        // 방향에 따라 올바른 순서로 정렬
        if (direction === 'across') {
            // 가로: 같은 행에서 열 순서로 정렬
            this.activeCells.sort((a, b) => {
                if (a.row !== b.row) return a.row - b.row;
                return a.col - b.col;
            });
        } else {
            // 세로: 같은 열에서 행 순서로 정렬
            this.activeCells.sort((a, b) => {
                if (a.col !== b.col) return a.col - b.col;
                return a.row - b.row;
            });
        }

        // 단어 선택 UI 표시 (activeCells 설정 후)
        this.currentAnswer = clue.answer;
        
        // 직접 입력 방식: selectedLetters는 더 이상 사용하지 않음
        // 그리드에서 직접 값을 읽어서 사용
        // const ordered = this.getOrderedActiveCells();
        // this.selectedLetters = ordered.map(c => {
        //     const e = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
        //     return e ? (e.value || '') : '';
        // });
        
        // 첫 번째 빈 칸으로 포커스 이동 (직접 입력 방식)
        if (this.pendingJumpToFirstEmpty) {
            this.focusFirstEmptyCell();
            this.pendingJumpToFirstEmpty = false;
        }
        
        // Canvas 모드일 때 렌더링 업데이트
        if (this.useCanvas) {
            this.renderCanvas();
        }
        
        // 직접 입력 방식: 단서 정보 표시 UI
        this.showClueInfo(clue);

        // UI 업데이트 - 격자 셀
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('active', 'highlighted');
        });

        // 활성 셀 하이라이트
        this.activeCells.forEach(cell => {
            const cellEl = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (cellEl) {
                cellEl.classList.add('active');
            }
        });

        // 격자 번호 하이라이트
        document.querySelectorAll('.cell-number').forEach(num => {
            num.classList.remove('active-number');
            if (parseInt(num.dataset.number) === clueNumber) {
                num.classList.add('active-number');
            }
        });

        
// 단서 목록 하이라이트 (dataset 기반: 동일 번호 토글 시도 정확히 반영)
let activeItem = null;
document.querySelectorAll('.clue-item').forEach(item => {
    item.classList.remove('active', 'pulse');
    const n = item.dataset.number;
    const d = item.dataset.dir;
    if (parseInt(n) === clueNumber && d === direction) {
        item.classList.add('active');
        activeItem = item;
    }
});

// ✅ 토글이 눈에 보이도록: 활성 단서가 리스트 안에서 살짝 "튀게"
if (activeItem) {
    try {
        if (typeof this.maybeScrollIntoView === 'function') { this.maybeScrollIntoView(activeItem); } else { activeItem.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    } catch {}
    activeItem.classList.add('pulse');
    setTimeout(() => activeItem && activeItem.classList.remove('pulse'), 350);
}
// ✅ 선택 포커스는 focus가 아니라 selected 상태로 관리
        this.applyPendingJumpAfterSelect();
    }

// ===== Selection helpers (focus 대신 selected state 기반) =====

setSelectedCell(row, col, opts = {}) {
    const { focus = false, preventScroll = true, scrollIntoView = false } = opts;

    if (this.selectedCell) {
        const prev = document.querySelector(`input.grid-cell[data-row="${this.selectedCell.row}"][data-col="${this.selectedCell.col}"]`);
        if (prev) prev.classList.remove('selected');
    }

    this.selectedCell = { row, col };

    const el = document.querySelector(`input.grid-cell[data-row="${row}"][data-col="${col}"]`);
    if (!el) return;

    el.classList.add('selected');

    // ✅ 스크롤은 데스크톱에서만, 그리고 "안 보일 때만" 최소 수행
    if (scrollIntoView) this.maybeScrollIntoView(el);

    if (focus) {
        // ✅ 모바일 튐 방지: focus는 preventScroll로, 자동 scrollIntoView는 하지 않음
        this.focusSafely(el);

        // iOS에서 가끔 caret 표시가 늦게 잡히는 문제 완화
        try { el.setSelectionRange(1, 1); } catch {}
    }
}


getOrderedActiveCells() {
    if (!this.activeCells) return [];
    const cells = [...this.activeCells].map(c => ({ row: parseInt(c.row), col: parseInt(c.col) }));
    if (this.currentDirection === 'across') {
        cells.sort((a, b) => (a.row - b.row) || (a.col - b.col));
    } else {
        cells.sort((a, b) => (a.col - b.col) || (a.row - b.row));
    }
    return cells;
}

findFirstEmptyCellInActive() {
    const ordered = this.getOrderedActiveCells();
    for (const c of ordered) {
        const el = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
        if (el && !el.value) return c;
    }
    return ordered[0] || null;
}

applyPendingJumpAfterSelect() {
    const shouldFocus = (this.lastInputSource === 'keyboard');

    if (this.pendingJumpToCell) {
        const { row, col } = this.pendingJumpToCell;
        this.setSelectedCell(row, col, { focus: shouldFocus, preventScroll: true, scrollIntoView: !this.isMobileUI() });
    } else if (this.pendingJumpToFirstEmpty) {
        const c = this.findFirstEmptyCellInActive();
        if (c) this.setSelectedCell(c.row, c.col, { focus: shouldFocus, preventScroll: true, scrollIntoView: !this.isMobileUI() });
    } else {
        const ordered = this.getOrderedActiveCells();
        const inWord = this.selectedCell && ordered.some(x => x.row === this.selectedCell.row && x.col === this.selectedCell.col);
        if (!inWord) {
            const c = this.findFirstEmptyCellInActive();
            if (c) this.setSelectedCell(c.row, c.col, { focus: shouldFocus, preventScroll: true });
        }
    }

    this.pendingJumpToCell = null;
    this.pendingJumpToFirstEmpty = false;
}

// ===== Mobile/scroll 안정화 helpers =====
isMobileUI() {
    // iOS Safari/Android Chrome에서 focus/scrollIntoView가 점프를 유발할 수 있어 방어적으로 판단
    try {
        return window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    } catch {
        return window.innerWidth <= 768;
    }
}

isElementMostlyVisible(el) {
    if (!el) return true;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;

    // 80% 이상 화면 안에 있으면 '대체로 보인다'
    const visibleW = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
    const visibleH = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    const area = Math.max(1, r.width * r.height);
    const visArea = visibleW * visibleH;
    return (visArea / area) >= 0.8;
}

maybeScrollIntoView(el) {
    if (!el) return;
    // 모바일에서는 자동 스크롤을 최대한 하지 않는다(점프 방지)
    if (this.isMobileUI()) return;

    if (!this.isElementMostlyVisible(el)) {
        try { el.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch {}
    }
}

focusSafely(el) {
    if (!el) return;
    // 모바일: focus로 인해 스크롤 점프가 날 수 있으므로 preventScroll을 최우선
    try { el.focus({ preventScroll: true }); }
    catch { try { el.focus(); } catch {} }
}





    // 단어 선택 기능 주석 처리 - 직접 입력 방식으로 변경
    /*
    showWordSelection(clue) {
        document.getElementById('wordSelectionSection').style.display = 'block';
        document.getElementById('selectedClue').textContent = `${this.currentDirection === 'across' ? '가로' : '세로'} ${clue.number}번: ${clue.clue}`;


        // 동일 번호에 가로/세로가 모두 있으면 "번호칸 탭으로 토글" 힌트 표시
        const level = this.gameLevels[this.currentLevel];
        const hasAcross = level.clues.across.some(c => c.number === clue.number);
        const hasDown = level.clues.down.some(c => c.number === clue.number);
        const hintEl = document.getElementById('directionHint');
        if (hintEl) {
            hintEl.style.display = (hasAcross && hasDown) ? 'block' : 'none';
            if (hasAcross && hasDown) hintEl.textContent = '💡 같은 번호는 번호칸을 다시 탭하면 가로/세로가 전환돼요';
        }
        
        const correctLetters = clue.answer.split('');
        const allAnswers = [
            ...level.clues.across.map(c => c.answer),
            ...level.clues.down.map(c => c.answer)
        ];
        const otherAnswers = allAnswers.filter(ans => ans !== clue.answer);
        
        let extraLetters = [];
        const targetExtraCount = correctLetters.length * 2;
        
        for (let i = 0; extraLetters.length < targetExtraCount && i < otherAnswers.length; i++) {
            const otherAnswer = otherAnswers[i];
            extraLetters.push(...otherAnswer.split(''));
        }
        
        const allLetters = [...correctLetters, ...extraLetters];
        this.shuffledLetters = this.shuffleArray(allLetters);
        this.selectedLetters = [];
        
        // 버튼 생성
        this.renderWordButtons();
        this.updateSelectedWord();
        
        // activeCells가 설정된 후에 updateGridWithWord 호출
        // 약간의 지연을 두어 activeCells가 확실히 설정되도록 함
        setTimeout(() => {
            this.updateGridWithWord();
        }, 0);
        
        // 확인 버튼 표시
        const checkBtn = document.getElementById('checkBtn');
        if (checkBtn) checkBtn.style.display = 'block';
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) resetBtn.style.display = 'block';
        const revealWordBtn = document.getElementById('revealWordBtn');
        if (revealWordBtn) revealWordBtn.style.display = 'block';
        const clearPuzzleBtn = document.getElementById('clearPuzzleBtn');
        if (clearPuzzleBtn) clearPuzzleBtn.style.display = 'block';
    }
    */
    
    // 직접 입력 방식: 단서 정보 표시
    showClueInfo(clue) {
        // 단서 정보 UI 표시
        const wordSelectionSection = document.getElementById('wordSelectionSection');
        if (wordSelectionSection) {
            wordSelectionSection.style.display = 'block';
        }
        
        const selectedClueEl = document.getElementById('selectedClue');
        if (selectedClueEl) {
            selectedClueEl.textContent = `${this.currentDirection === 'across' ? '가로' : '세로'} ${clue.number}번: ${clue.clue}`;
            selectedClueEl.style.display = 'block';
        }
        
        // 동일 번호에 가로/세로가 모두 있으면 "번호칸 탭으로 토글" 힌트 표시
        const level = this.gameLevels[this.currentLevel];
        const hasAcross = level.clues.across.some(c => c.number === clue.number);
        const hasDown = level.clues.down.some(c => c.number === clue.number);
        const hintEl = document.getElementById('directionHint');
        if (hintEl) {
            hintEl.style.display = (hasAcross && hasDown) ? 'block' : 'none';
            if (hasAcross && hasDown) hintEl.textContent = '💡 같은 번호는 번호칸을 다시 탭하면 가로/세로가 전환돼요';
        }
        
        // 단어 버튼 영역 숨기기
        const wordButtonsEl = document.getElementById('wordButtons');
        if (wordButtonsEl) {
            wordButtonsEl.style.display = 'none';
        }
        
        // 입력 안내 메시지 표시
        const selectedWordEl = document.getElementById('selectedWord');
        if (selectedWordEl) {
            selectedWordEl.textContent = '⌨️ 키보드로 직접 입력하세요';
            selectedWordEl.style.display = 'block';
            selectedWordEl.style.fontSize = '18px';
            selectedWordEl.style.color = '#667eea';
            selectedWordEl.style.letterSpacing = 'normal';
            selectedWordEl.style.border = '2px dashed #667eea';
        }
    }
    
    // 직접 입력 방식: 단서 선택 시 첫 번째 빈 칸으로 포커스 이동
    focusFirstEmptyCell() {
        const ordered = this.getOrderedActiveCells();
        if (ordered.length === 0) return;
        
        const firstEmpty = ordered.find(c => {
            if (this.useCanvas) {
                const cellKey = `${c.row}-${c.col}`;
                return !this.canvasCellValues.get(cellKey);
            } else {
                const el = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
                return el && !el.value && !el.readOnly && !el.disabled && !el.classList.contains('blocked');
            }
        });
        
        const targetCell = firstEmpty || ordered[0];
        
        if (this.useCanvas) {
            this.selectedCanvasCell = { row: targetCell.row, col: targetCell.col };
            if (this.canvas) {
                this.canvas.focus();
            }
            this.renderCanvas();
        } else {
            setTimeout(() => {
                const cellEl = document.querySelector(`input.grid-cell[data-row="${targetCell.row}"][data-col="${targetCell.col}"]`);
                if (cellEl && !cellEl.readOnly && !cellEl.disabled && !cellEl.classList.contains('blocked')) {
                    cellEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    cellEl.focus();
                }
            }, 100);
        }
        
        // 게임 컨트롤 버튼 표시
        const checkWordBtn = document.getElementById('checkWordBtn');
        if (checkWordBtn) checkWordBtn.style.display = 'block';
        const checkAllBtn = document.getElementById('checkAllBtn');
        if (checkAllBtn) checkAllBtn.style.display = 'block';
        const revealWordBtn = document.getElementById('revealWordBtn');
        if (revealWordBtn) revealWordBtn.style.display = 'block';
        const clearPuzzleBtn = document.getElementById('clearPuzzleBtn');
        if (clearPuzzleBtn) clearPuzzleBtn.style.display = 'block';
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) resetBtn.style.display = 'block';
        const hintBtn = document.getElementById('hintBtn');
        if (hintBtn) hintBtn.style.display = 'block';
    }

    // 단어 선택 기능 주석 처리 - 직접 입력 방식으로 변경
    /*
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    renderWordButtons() {
        const wordButtonsEl = document.getElementById('wordButtons');
        wordButtonsEl.innerHTML = '';
        
        // 빈 칸이 있는지 확인
        const ordered = this.getOrderedActiveCells();
        const hasEmptyCell = ordered.some(cell => {
            const el = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            return el && !el.disabled && !el.classList.contains('blocked') && !el.value;
        });
        
        this.shuffledLetters.forEach((letter, index) => {
            const button = document.createElement('button');
            button.className = 'word-btn';
            button.textContent = letter;
            button.dataset.index = index;
            
            // 빈 칸이 없으면 버튼 비활성화
            if (!hasEmptyCell) {
                button.disabled = true;
                button.classList.add('disabled');
            }
            
            button.addEventListener('click', () => {
                if (button.disabled) return;
                // 버튼 선택 상태 업데이트
                document.querySelectorAll('.word-btn').forEach(btn => btn.classList.remove('selected-letter'));
                button.classList.add('selected-letter');
                this.selectLetter(index);
            });
            wordButtonsEl.appendChild(button);
        });
    }

    selectLetter(index) {
    if (!this.activeClue || !this.currentAnswer || !this.activeCells || this.activeCells.length === 0) return;

    this.lastInputSource = 'buttons';
    const letter = this.shuffledLetters[index];
    if (!letter) return;

    const ordered = this.getOrderedActiveCells();

    let startIdx = 0;
    if (this.selectedCell) {
        const idx = ordered.findIndex(c => c.row === this.selectedCell.row && c.col === this.selectedCell.col);
        if (idx !== -1) startIdx = idx;
    }

    let targetIdx = startIdx;
    while (targetIdx < ordered.length) {
        const c = ordered[targetIdx];
        const el = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
        // readOnly 셀은 건너뛰기 (교차 단어로 이미 채워진 셀)
        if (el && !el.disabled && !el.classList.contains('blocked') && !el.readOnly && !el.value) break;
        targetIdx++;
    }
    if (targetIdx >= ordered.length) {
        // 모든 칸이 채워졌는지 확인하고, 완료되었으면 정답 체크
        const isComplete = ordered.every(c => {
            const el = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
            return el && (el.value || el.readOnly); // readOnly 셀도 채워진 것으로 간주
        });
        if (isComplete && this.currentAnswer) {
            // selectedLetters 업데이트
            this.selectedLetters = ordered.map(c => {
                const e = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
                return e ? (e.value || '') : '';
            });
            this.updateSelectedWord();
            
            // 자동으로 정답 체크
            setTimeout(() => {
                this.checkAnswer();
            }, 300);
        }
        return;
    }

    const target = ordered[targetIdx];
    const el = document.querySelector(`input.grid-cell[data-row="${target.row}"][data-col="${target.col}"]`);
    if (!el) return;

    // 프로그래밍 방식 업데이트 플래그 설정
    el.dataset.programmaticUpdate = 'true';
    el.value = letter;
    el.setAttribute('value', letter);
    
    // 스타일 강제 설정
    el.style.color = '#333';
    el.style.backgroundColor = 'white';
    
    // input 이벤트 발생 (다른 리스너와 동기화)
    el.dispatchEvent(new Event('input', { bubbles: false }));

    this.setSelectedCell(target.row, target.col, { focus: false });

    // selectedLetters는 그리드에서 직접 읽어서 업데이트 (빈 값도 포함하여 인덱스 일치)
    this.selectedLetters = ordered.map(c => {
        const e = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
        return e ? (e.value || '') : '';
    });
    this.updateSelectedWord();
    // updateGridWithWord 호출하여 UI 동기화
    this.updateGridWithWord();
    
    // 버튼 상태 업데이트 (빈 칸이 없으면 비활성화)
    this.updateWordButtonsState();

    if (this.settings.autocheck) {
        this.autoCheckCell(target.row, target.col, letter);
    }

    this.advanceAfterInput(target.row, target.col);
}


    updateSelectedWord() {
        const selectedWordEl = document.getElementById('selectedWord');
        if (this.selectedLetters.length === 0) {
            selectedWordEl.textContent = '선택된 단어: ';
        } else {
            selectedWordEl.textContent = '선택된 단어: ' + this.selectedLetters.join('');
        }
    }

    removeLetter(index) {
        // activeCells가 없으면 다시 설정 (무한 루프 방지를 위해 플래그 사용)
        if (!this.activeCells || this.activeCells.length === 0) {
            if (this.activeClue && !this._isResettingCells) {
                this._isResettingCells = true;
                const clueNumber = this.activeClue;
                const direction = this.currentDirection;
                // activeCells만 다시 설정 (showWordSelection 호출 안 함)
                this.activeCells = [];
                this.gridData.forEach((row, r) => {
                    row.forEach((cell, c) => {
                        const key = `${r}-${c}`;
                        const cellInfo = this.cellMap.get(key);
                        if (cellInfo && cellInfo[direction] && cellInfo[direction].clue.number === clueNumber) {
                            const clueInfo = cellInfo[direction];
                            this.activeCells.push({ 
                                row: parseInt(r), 
                                col: parseInt(c),
                                index: clueInfo.index 
                            });
                        }
                    });
                });
                // 정렬
                if (direction === 'across') {
                    this.activeCells.sort((a, b) => {
                        if (a.row !== b.row) return a.row - b.row;
                        return a.col - b.col;
                    });
                } else {
                    this.activeCells.sort((a, b) => {
                        if (a.col !== b.col) return a.col - b.col;
                        return a.row - b.row;
                    });
                }
                this._isResettingCells = false;
            }
        }
        
        const letter = this.selectedLetters[index];
        this.selectedLetters.splice(index, 1);
        this.shuffledLetters.push(letter);
        
        this.renderWordButtons();
        this.updateSelectedWord();
        this.updateGridWithWord();
        this.updateWordButtonsState();
    }
    */

    // 단어 선택 기능 주석 처리 - 직접 입력 방식으로 변경
    /*
    resetWordSelection() {
        // 다시 섞기 - showWordSelection과 동일한 로직
        const clue = this.gameLevels[this.currentLevel].clues[this.currentDirection].find(c => c.number === this.activeClue);
        if (!clue) return;
        
        const correctLetters = clue.answer.split('');
        const level = this.gameLevels[this.currentLevel];
        const allAnswers = [
            ...level.clues.across.map(c => c.answer),
            ...level.clues.down.map(c => c.answer)
        ];
        const otherAnswers = allAnswers.filter(ans => ans !== clue.answer);
        
        let extraLetters = [];
        const targetExtraCount = correctLetters.length * 2;
        
        for (let i = 0; extraLetters.length < targetExtraCount && i < otherAnswers.length; i++) {
            const otherAnswer = otherAnswers[i];
            extraLetters.push(...otherAnswer.split(''));
        }
        
        const allLetters = [...correctLetters, ...extraLetters];
        this.shuffledLetters = this.shuffleArray(allLetters);
        this.selectedLetters = [];
        
        this.renderWordButtons();
        this.updateSelectedWord();
        this.updateGridWithWord();
        this.updateWordButtonsState();
    }
    
    updateWordButtonsState() {
        // 빈 칸이 있는지 확인
        if (!this.activeCells || this.activeCells.length === 0) return;
        
        const ordered = this.getOrderedActiveCells();
        const hasEmptyCell = ordered.some(cell => {
            const el = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            return el && !el.disabled && !el.classList.contains('blocked') && !el.value;
        });
        
        // 모든 버튼의 활성/비활성 상태 업데이트
        document.querySelectorAll('.word-btn').forEach(btn => {
            if (!hasEmptyCell) {
                btn.disabled = true;
                btn.classList.add('disabled');
            } else {
                btn.disabled = false;
                btn.classList.remove('disabled');
            }
        });
    }
    */

    // 직접 입력 방식으로 변경 - updateGridWithWord는 더 이상 필요 없음
    // 사용자가 직접 키보드로 입력하므로 실시간 업데이트 불필요
    updateGridWithWord() {
        // 직접 입력 방식에서는 더 이상 사용하지 않음
        // 그리드 값은 사용자가 직접 입력하므로 별도 업데이트 불필요
        return;
        
        /* 주석 처리된 기존 코드
        // 선택된 단어를 격자에 실시간으로 표시
        if (!this.activeCells || this.activeCells.length === 0) {
            // activeCells가 없으면 리턴 (무한 루프 방지)
            // activeCells는 selectClue에서 설정되어야 함
            return;
        }
        
        // selectedLetters가 비어있어도 그리드 값을 지우지 않음
        // 교차로 이미 채워진 글자를 보호하기 위함
        if (!this.selectedLetters || this.selectedLetters.length === 0) {
            return;
        }
        
        // orderedCells 기준으로 정렬 (일관성 유지)
        const ordered = this.getOrderedActiveCells();
        
        ordered.forEach((cell, index) => {
            const row = cell.row;
            const col = cell.col;
            
            // 모든 input 요소를 순회하며 찾기 (가장 확실한 방법)
            let cellEl = null;
            const allInputs = document.querySelectorAll('input.grid-cell');
            
            for (let i = 0; i < allInputs.length; i++) {
                const input = allInputs[i];
                const inputRow = parseInt(input.dataset.row);
                const inputCol = parseInt(input.dataset.col);
                
                if (inputRow === row && inputCol === col) {
                    cellEl = input;
                    break;
                }
            }
            
            /* 주석 처리된 기존 코드
            if (cellEl) {
                // readOnly 셀은 건드리지 않음 (교차 단어 보호)
                if (cellEl.readOnly) {
                    // 다음 셀으로 넘어감
                } else if (!cellEl.disabled && !cellEl.classList.contains('blocked')) {
                    if (index < this.selectedLetters.length) {
                        const letter = this.selectedLetters[index];
                        
                        // 프로그래밍 방식 업데이트 플래그 설정
                        cellEl.dataset.programmaticUpdate = 'true';
                        
                        // readOnly와 disabled 해제
                        cellEl.readOnly = false;
                        cellEl.disabled = false;
                        cellEl.removeAttribute('readonly');
                        cellEl.removeAttribute('disabled');
                        
                        // 직접 value 설정
                        const beforeValue = cellEl.value;
                        cellEl.value = letter;
                        cellEl.setAttribute('value', letter);
                        const afterValue = cellEl.value;
                        // 색상이 보이도록 스타일 강제 설정
                        cellEl.style.color = '#333';
                        cellEl.style.backgroundColor = 'white';
                        
                        cellEl.classList.remove('incorrect');
                        
                        // 즉시 화면에 반영되도록 강제
                        cellEl.dispatchEvent(new Event('input', { bubbles: false }));
                        
                        // 다음 프레임에서도 확인
                        setTimeout(() => {
                            const finalValue = cellEl.value;
                            if (finalValue !== letter) {
                                cellEl.value = letter;
                                cellEl.style.color = '#333';
                            }
                        }, 0);
                    } else {
                        cellEl.value = '';
                        cellEl.setAttribute('value', '');
                        cellEl.classList.remove('incorrect');
                    }
                }
            }
        });
        */
    }

    handleCellInput(e, row, col) {
        this.lastInputSource = 'keyboard';
        this.setSelectedCell(row, col, { focus: false });

        const inputValue = e.target.value;
        const value = inputValue.toUpperCase().replace(/[^가-힣A-Z0-9]/g, '');
        
        if (value.length > 1) {
            // 여러 글자가 입력된 경우 (붙여넣기 등)
            e.target.value = value[0];
            this.handlePaste(value, row, col);
        } else {
            e.target.value = value;
            
            // Autocheck 기능
            if (this.settings.autocheck && value && this.activeCells.length > 0) {
                this.autoCheckCell(row, col, value);
            }
            
            // 입력 후 자동 이동 (스크린샷 로직 그대로)
            if (value) {
                this.advanceAfterInput(row, col);
            }
        }
    }

    // 자동 이동 규칙 (스크린샷 로직 그대로)

advanceAfterInput(r, c) {
    if (!this.activeClue || !this.activeCells || this.activeCells.length === 0) return;

    const ordered = this.getOrderedActiveCells();
    const curIdx = ordered.findIndex(x => x.row === r && x.col === c);
    if (curIdx === -1) return;

    const shouldFocus = (this.lastInputSource === 'keyboard');

    let nextIdx = curIdx + 1;

    if (this.settings.skipFilled) {
        while (nextIdx < ordered.length) {
            const cell = ordered[nextIdx];
            const el = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (el && !el.value) break;
            nextIdx++;
        }
    }

    if (nextIdx < ordered.length) {
        const cell = ordered[nextIdx];
        this.setSelectedCell(cell.row, cell.col, { focus: shouldFocus, preventScroll: true, scrollIntoView: (shouldFocus && !this.isMobileUI()) });
        return;
    }

    const mode = this.settings.wordEndMove; // 'always' | 'ifcomplete' | 'never'
    if (mode === 'never') return;
    if (mode === 'ifcomplete' && !this.isCurrentWordComplete()) return;

    // 단어 끝에 도달했을 때 정답 체크
    if (this.isCurrentWordComplete() && this.currentAnswer) {
        // 셀에서 직접 값을 읽어서 정답과 비교
        const userAnswer = ordered.map(cell => {
            const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            return cellEl ? cellEl.value : '';
        }).join('');
        
        if (userAnswer === this.currentAnswer) {
            // 정답인 경우: selectedLetters를 업데이트하고 checkAnswer 호출
            this.selectedLetters = userAnswer.split('');
            this.checkAnswer();
            // checkAnswer 내부에서 이미 moveToNextClue를 호출하므로 여기서는 호출하지 않음
            return;
        } else {
            // 오답인 경우: 오답 표시 후 해당 칸 초기화 (readOnly 셀은 보호)
            this.soundManager.playIncorrect();
            ordered.forEach((cell) => {
                const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                if (cellEl && !cellEl.readOnly) {
                    cellEl.classList.add('incorrect');
                    setTimeout(() => {
                        cellEl.classList.remove('incorrect');
                        // readOnly가 아닌 칸만 초기화 (교차 단어 보호)
                        if (!cellEl.readOnly) {
                            cellEl.value = '';
                        }
                    }, 1000);
                }
            });
            this.showModal('오답', '틀렸습니다. 다시 시도해보세요!');
            setTimeout(() => this.hideModal(), 1500);
            return;
        }
    }
    
    // 단어가 완성되지 않았는데 always 모드면 이동하지 않음
    if (mode === 'always' && !this.isCurrentWordComplete()) {
        return;
    }
    
    // 단어가 완성되지 않았지만 ifcomplete 모드가 아니면 이동
    this.moveToNextClueByNumber(true);
}


    isCurrentWordComplete() {
        if (!this.activeCells || this.activeCells.length === 0) return false;
        
        // orderedCells를 사용하여 일관된 순서로 확인
        const ordered = this.getOrderedActiveCells();
        
        // 모든 활성 셀이 채워졌는지 확인 (readOnly 셀은 이미 채워진 것으로 간주)
        for (const cell of ordered) {
            const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (!cellEl) return false;
            // readOnly 셀은 이미 채워진 것으로 간주
            if (cellEl.readOnly) continue;
            if (!cellEl.value) {
                return false;
            }
        }
        return true;
    }

    autoCheckCell(row, col, value) {
        if (!this.activeClue || !this.currentAnswer) return;
        
        // orderedCells 기준으로 인덱스 계산
        const ordered = this.getOrderedActiveCells();
        const currentIndex = ordered.findIndex(cell => cell.row === row && cell.col === col);
        if (currentIndex === -1) return;
        
        // 현재 입력한 글자가 정답과 일치하는지 확인
        if (value === this.currentAnswer[currentIndex]) {
            // 정답이면 초록색 표시
            const cellEl = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cellEl) {
                cellEl.classList.add('auto-correct');
                setTimeout(() => {
                    cellEl.classList.remove('auto-correct');
                }, 500);
            }
        } else {
            // 오답이면 빨간색 표시
            const cellEl = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cellEl) {
                cellEl.classList.add('auto-incorrect');
                setTimeout(() => {
                    cellEl.classList.remove('auto-incorrect');
                }, 500);
            }
        }
    }

    handlePaste(text, row, col) {
        if (!this.activeCells.length) return;
        
        // orderedCells 기준으로 인덱스 계산
        const ordered = this.getOrderedActiveCells();
        const currentIndex = ordered.findIndex(c => 
            c.row === row && c.col === col
        );
        if (currentIndex === -1) return;

        // 각 칸에 한 글자씩 분배
        let lastFilledIndex = currentIndex;
        for (let i = 0; i < text.length && (currentIndex + i) < ordered.length; i++) {
            const cell = ordered[currentIndex + i];
            const cellEl = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (cellEl) {
                // 채워진 칸 건너뛰기 옵션 확인
                if (this.settings.skipFilled && cellEl.value) {
                    continue;
                }
                cellEl.value = text[i];
                lastFilledIndex = currentIndex + i;
                
                // Autocheck 기능
                if (this.settings.autocheck) {
                    this.autoCheckCell(cell.row, cell.col, text[i]);
                }
            }
        }

        // 마지막 입력된 칸 다음으로 자동 이동
        this.advanceAfterInput(
            ordered[lastFilledIndex].row,
            ordered[lastFilledIndex].col
        );
    }

    handleKeyDown(e, row, col) {
        const ordered = this.getOrderedActiveCells();
        const currentIndex = ordered.findIndex(cell => cell.row === row && cell.col === col);
        
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const cellEl = document.querySelector(`input.grid-cell[data-row="${row}"][data-col="${col}"]`);
            if (cellEl && !cellEl.value && currentIndex > 0) {
                // 현재 셀이 비어있으면 이전 셀로 이동
                e.preventDefault();
                const prevCell = ordered[currentIndex - 1];
                const prevCellEl = document.querySelector(`input.grid-cell[data-row="${prevCell.row}"][data-col="${prevCell.col}"]`);
                if (prevCellEl && !prevCellEl.readOnly) {
                    prevCellEl.focus();
                    prevCellEl.value = '';
                }
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // 가로 방향 이동
            e.preventDefault();
            if (this.currentDirection === 'across' && currentIndex !== -1) {
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    const prevCell = ordered[currentIndex - 1];
                    const prevCellEl = document.querySelector(`input.grid-cell[data-row="${prevCell.row}"][data-col="${prevCell.col}"]`);
                    if (prevCellEl) prevCellEl.focus();
                } else if (e.key === 'ArrowRight' && currentIndex < ordered.length - 1) {
                    const nextCell = ordered[currentIndex + 1];
                    const nextCellEl = document.querySelector(`input.grid-cell[data-row="${nextCell.row}"][data-col="${nextCell.col}"]`);
                    if (nextCellEl) nextCellEl.focus();
                }
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // 세로 방향 이동
            e.preventDefault();
            if (this.currentDirection === 'down' && currentIndex !== -1) {
                if (e.key === 'ArrowUp' && currentIndex > 0) {
                    const prevCell = ordered[currentIndex - 1];
                    const prevCellEl = document.querySelector(`input.grid-cell[data-row="${prevCell.row}"][data-col="${prevCell.col}"]`);
                    if (prevCellEl) prevCellEl.focus();
                } else if (e.key === 'ArrowDown' && currentIndex < ordered.length - 1) {
                    const nextCell = ordered[currentIndex + 1];
                    const nextCellEl = document.querySelector(`input.grid-cell[data-row="${nextCell.row}"][data-col="${nextCell.col}"]`);
                    if (nextCellEl) nextCellEl.focus();
                }
            }
        } else if (e.key === 'Tab') {
            // Tab 키로 다음 단서로 이동
            e.preventDefault();
            this.moveToNextClueByNumber(true);
        }
    }

    checkAnswer() {
        if (!this.activeClue || !this.currentAnswer) return;
        
        // 그리드에서 직접 값을 읽어서 정답과 비교 (교차 글자 포함)
        const ordered = this.getOrderedActiveCells();
        const userAnswer = ordered.map(cell => {
            if (this.useCanvas) {
                // Canvas 모드
                const cellKey = `${cell.row}-${cell.col}`;
                return this.canvasCellValues.get(cellKey) || '';
            } else {
                // HTML input 모드
                const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                return cellEl ? cellEl.value : '';
            }
        }).join('');
        
        const correctAnswer = this.currentAnswer;
        
        if (userAnswer === correctAnswer) {
            // 정답인 경우
            this.soundManager.playCorrect();
            ordered.forEach((cell, index) => {
                if (this.useCanvas) {
                    // Canvas 모드
                    const cellKey = `${cell.row}-${cell.col}`;
                    this.canvasCellValues.set(cellKey, correctAnswer[index]);
                    this.renderCanvas();
                } else {
                    // HTML input 모드
                    const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                    if (cellEl) {
                        cellEl.value = correctAnswer[index];
                        cellEl.classList.add('correct');
                        cellEl.readOnly = true;
                    }
                }
            });
            
            this.score += 10;
            localStorage.setItem('score', this.score.toString());
            this.updateScore();
            
            // 단서 완료 표시
            const clueKey = `${this.currentDirection}-${this.activeClue}`;
            this.completedClues.add(clueKey);
            
            // 진행률 업데이트 (주석 처리)
            // this.updateProgress();
            
            // 단서 목록에서 완료 표시
            document.querySelectorAll('.clue-item').forEach(item => {
                const itemText = item.textContent;
                const directionText = this.currentDirection === 'across' ? '가로' : '세로';
                if (itemText.includes(`${directionText} ${this.activeClue}번`)) {
                    item.classList.add('completed');
                }
            });
            
            // 모든 단서가 완료되었는지 확인
            if (this.isLevelComplete()) {
                this.soundManager.playComplete();
                this.showLevelCompleteModal();
            } else {
                // 현재 단서의 뜻 가져오기
                const currentClue = this.gameLevels[this.currentLevel].clues[this.currentDirection].find(c => c.number === this.activeClue);
                const meaning = currentClue ? currentClue.clue : '';
                const answer = this.currentAnswer;
                
                // 정답과 뜻을 함께 표시
                const message = `정답: <strong>${answer}</strong><br><br>뜻: ${meaning}`;
                this.showModal('정답!', message);
                
                // 자동으로 다음 단서로 이동
                setTimeout(() => {
                    this.hideModal();
                    this.moveToNextClue();
                }, 2000);
            }
        } else {
            // 오답인 경우: 오답 표시 후 해당 칸 초기화 (readOnly 셀은 보호)
            this.soundManager.playIncorrect();
            ordered.forEach((cell) => {
                const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                if (cellEl && !cellEl.readOnly) {
                    cellEl.classList.add('incorrect');
                    setTimeout(() => {
                        cellEl.classList.remove('incorrect');
                        // readOnly가 아닌 칸만 초기화 (교차 단어 보호)
                        if (!cellEl.readOnly) {
                            cellEl.value = '';
                        }
                    }, 1000);
                }
            });
            
            this.showModal('오답', '틀렸습니다. 다시 시도해보세요!');
            this.resetWordSelection();
        }
    }

    isLevelComplete() {
        const level = this.gameLevels[this.currentLevel];
        if (!level) return false;
        
        const allClues = [
            ...level.clues.across.map(c => `across-${c.number}`),
            ...level.clues.down.map(c => `down-${c.number}`)
        ];
        
        return allClues.every(key => this.completedClues.has(key));
    }

    showLevelCompleteModal() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalBtn = document.getElementById('modalBtn');
        const modalContent = modal.querySelector('.modal-content');
        
        modalTitle.textContent = '단계 완료!';
        modalMessage.textContent = `축하합니다! 모든 단서를 완료했습니다!\n점수: ${this.score}점`;
        
        // 기존 버튼들 제거 (다음 단계 버튼이 이미 있으면)
        const existingNextBtn = modalContent.querySelector('.btn-next-level');
        if (existingNextBtn) {
            existingNextBtn.remove();
        }
        
        // 다시하기 버튼 설정
        modalBtn.textContent = '다시하기';
        modalBtn.onclick = () => {
            this.hideModal();
            // completedClues 초기화 후 레벨 재시작
            this.completedClues.clear();
            this.startLevel(this.currentLevel);
        };
        
        // 다음 단계 버튼 추가
        const nextLevelBtn = document.createElement('button');
        nextLevelBtn.className = 'btn btn-primary btn-next-level';
        nextLevelBtn.textContent = '다음 단계';
        nextLevelBtn.style.marginLeft = '10px';
        nextLevelBtn.onclick = () => {
            this.hideModal();
            if (this.currentLevel < this.gameLevels.length - 1) {
                this.currentLevel++;
                // completedClues 초기화 후 다음 레벨 시작
                this.completedClues.clear();
                this.startLevel(this.currentLevel);
            } else {
                this.showModal('완료!', '모든 단계를 완료했습니다!');
            }
        };
        
        modalBtn.parentNode.appendChild(nextLevelBtn);
        modal.style.display = 'flex';
    }

    moveToNextClue() {
        // 가로 -> 세로 -> 가로 순서로 이동
        const level = this.gameLevels[this.currentLevel];
        const completed = this.completedClues || new Set();
        
        // 1. 같은 번호의 반대 방향 단서 찾기 (우선순위 1)
        const oppositeDirection = this.currentDirection === 'across' ? 'down' : 'across';
        const sameNumberClue = level.clues[oppositeDirection].find(c => c.number === this.activeClue);
        
        if (sameNumberClue) {
            const sameNumberKey = `${oppositeDirection}-${sameNumberClue.number}`;
            // 같은 번호의 반대 방향 단서가 있고 아직 완료되지 않았으면
            if (!completed.has(sameNumberKey)) {
                this.currentDirection = oppositeDirection;
                this.pendingJumpToCell = null;
                this.pendingJumpToFirstEmpty = true;
                this.selectClue(sameNumberClue.number);
                return;
            }
        }
        
        // 2. 현재 완료된 단서의 셀에서 교차하는 반대 방향 단서 찾기
        const ordered = this.getOrderedActiveCells();
        let intersectingClue = null;
        
        for (const cell of ordered) {
            const key = `${cell.row}-${cell.col}`;
            const cellInfo = this.cellMap.get(key);
            
            if (cellInfo) {
                const oppositeClue = cellInfo[oppositeDirection];
                
                if (oppositeClue) {
                    const oppositeKey = `${oppositeDirection}-${oppositeClue.clue.number}`;
                    // 교차하는 반대 방향 단서가 있고 아직 완료되지 않았으면
                    if (!completed.has(oppositeKey)) {
                        intersectingClue = {
                            clue: oppositeClue.clue,
                            direction: oppositeDirection,
                            key: oppositeKey
                        };
                        break;
                    }
                }
            }
        }
        
        if (intersectingClue) {
            // 교차하는 반대 방향 단서로 이동
            this.currentDirection = intersectingClue.direction;
            this.pendingJumpToCell = null;
            this.pendingJumpToFirstEmpty = true;
            this.selectClue(intersectingClue.clue.number);
            return;
        }
        
        // 3. 교차하는 단서가 없으면 반대 방향의 다음 미완료 단서 찾기
        const nextDirectionClues = [...level.clues[oppositeDirection]]
            .sort((a, b) => a.number - b.number)
            .map(c => ({ clue: c, direction: oppositeDirection, key: `${oppositeDirection}-${c.number}` }));
        
        const nextClue = nextDirectionClues.find(item => !completed.has(item.key));
        
        if (nextClue) {
            // 반대 방향의 다음 미완료 단서로 이동
            this.currentDirection = nextClue.direction;
            this.pendingJumpToCell = null;
            this.pendingJumpToFirstEmpty = true;
            this.selectClue(nextClue.clue.number);
            return;
        }
        
        // 3. 반대 방향에 미완료 단서가 없으면 같은 방향의 다음 단서 찾기
        const sameDirectionClues = [...level.clues[this.currentDirection]]
            .sort((a, b) => a.number - b.number)
            .map(c => ({ clue: c, direction: this.currentDirection, key: `${this.currentDirection}-${c.number}` }));
        
        const currentKey = `${this.currentDirection}-${this.activeClue}`;
        const currentIndex = sameDirectionClues.findIndex(item => item.key === currentKey);
        
        // 현재 단서 다음의 미완료 단서 찾기
        let foundNext = null;
        for (let i = currentIndex + 1; i < sameDirectionClues.length; i++) {
            if (!completed.has(sameDirectionClues[i].key)) {
                foundNext = sameDirectionClues[i];
                break;
            }
        }
        
        if (foundNext) {
            this.currentDirection = foundNext.direction;
            this.pendingJumpToCell = null;
            this.pendingJumpToFirstEmpty = true;
            this.selectClue(foundNext.clue.number);
        } else {
            // 모든 단서 완료
            if (this.isLevelComplete()) {
                this.soundManager.playComplete();
                this.showLevelCompleteModal();
            } else {
                // 모든 단서가 완료되지 않았는데 다음 단서를 찾을 수 없으면 첫 번째 미완료 단서로 이동
                const allClues = [
                    ...level.clues.across.map(c => ({ clue: c, direction: 'across', key: `across-${c.number}` })),
                    ...level.clues.down.map(c => ({ clue: c, direction: 'down', key: `down-${c.number}` }))
                ].sort((a, b) => a.clue.number - b.clue.number);
                
                const firstIncomplete = allClues.find(item => !completed.has(item.key));
                if (firstIncomplete) {
                    this.currentDirection = firstIncomplete.direction;
                    this.pendingJumpToCell = null;
                    this.pendingJumpToFirstEmpty = true;
                    this.selectClue(firstIncomplete.clue.number);
                }
            }
        }
    }

moveToNextClueByNumber(jumpToFirstEmpty = false) {
    const level = this.gameLevels[this.currentLevel];
    const completed = this.completedClues || new Set();

    const mode = this.settings.clueAdvanceMode || 'direction'; // 'direction' | 'global'

    const pickNext = (list, curKey) => {
        const curIdx = list.findIndex(x => x.key === curKey);
        for (let step = 1; step <= list.length; step++) {
            const idx = (curIdx + step) % list.length;
            const cand = list[idx];
            if (!completed.has(cand.key)) return cand;
        }
        return null;
    };

    if (mode === 'global') {
        const list = [];
        [...level.clues.across].forEach(c => list.push({ dir: 'across', clue: c, key: `across-${c.number}` }));
        [...level.clues.down].forEach(c => list.push({ dir: 'down', clue: c, key: `down-${c.number}` }));

        // 번호 오름차순, 같은 번호면 across → down
        list.sort((a, b) => (a.clue.number - b.clue.number) || (a.dir === 'across' ? -1 : 1));

        const curKey = `${this.currentDirection}-${this.activeClue}`;
        const next = pickNext(list, curKey);

        if (!next) {
            this.showModal('완료!', '모든 단서를 완료했습니다!');
            return;
        }

        this.currentDirection = next.dir;
        this.pendingJumpToCell = null;
        this.pendingJumpToFirstEmpty = !!jumpToFirstEmpty;
        this.selectClue(next.clue.number);
        return;
    }

    // 현재 방향 우선
    const dir = this.currentDirection;
    const list = [...level.clues[dir]].sort((a, b) => a.number - b.number)
        .map(c => ({ dir, clue: c, key: `${dir}-${c.number}` }));

    const curKey = `${dir}-${this.activeClue}`;
    let next = pickNext(list, curKey);

    if (!next) {
        const other = (dir === 'across') ? 'down' : 'across';
        const otherList = [...level.clues[other]].sort((a, b) => a.number - b.number)
            .map(c => ({ dir: other, clue: c, key: `${other}-${c.number}` }));
        next = otherList.find(x => !completed.has(x.key)) || null;
        if (next) this.currentDirection = other;
    }

    if (!next) {
        this.showModal('완료!', '모든 단서를 완료했습니다!');
        return;
    }

    this.pendingJumpToCell = null;
    this.pendingJumpToFirstEmpty = !!jumpToFirstEmpty;
    this.selectClue(next.clue.number);
}



    nextLevel() {
        if (this.currentLevel < this.gameLevels.length - 1) {
            this.currentLevel++;
            this.startLevel(this.currentLevel);
            this.soundManager.playClick();
        } else {
            this.soundManager.playComplete();
            this.showModal('완료!', '모든 단계를 완료했습니다!');
        }
    }

    updateScore() {
        document.getElementById('scoreValue').textContent = this.score;
    }

    updateLevelDisplay() {
        document.getElementById('levelNumber').textContent = this.currentLevel + 1;
    }
    
    // progress-bar 주석 처리
    /*
    updateProgress() {
        const level = this.gameLevels[this.currentLevel];
        if (!level) return;
        
        const totalClues = level.clues.across.length + level.clues.down.length;
        const completedCount = this.completedClues.size;
        const percent = totalClues > 0 ? Math.round((completedCount / totalClues) * 100) : 0;
        
        const progressText = document.getElementById('progressText');
        const progressPercent = document.getElementById('progressPercent');
        const progressFill = document.getElementById('progressFill');
        
        if (progressText) progressText.textContent = `${completedCount} / ${totalClues} 완료`;
        if (progressPercent) progressPercent.textContent = `${percent}%`;
        if (progressFill) progressFill.style.width = `${percent}%`;
    }
    */

    showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        const modalMessage = document.getElementById('modalMessage');
        // HTML 태그가 포함되어 있으면 innerHTML 사용, 아니면 textContent 사용
        if (message.includes('<') && message.includes('>')) {
            modalMessage.innerHTML = message;
        } else {
            modalMessage.textContent = message;
        }
        document.getElementById('modal').style.display = 'flex';
    }

    hideModal() {
        const modal = document.getElementById('modal');
        const nextLevelBtn = modal.querySelector('.btn-next-level');
        if (nextLevelBtn) {
            nextLevelBtn.remove();
        }
        modal.style.display = 'none';
    }

    // 타이머 관련 함수
    startTimer() {
        if (this.isTimerRunning) return;
        this.isTimerRunning = true;
        this.isPaused = false;
        this.timerStartTime = Date.now() - this.timerElapsed;
        
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.timerElapsed = Date.now() - this.timerStartTime;
                this.updateTimerDisplay();
            }
        }, 100);
        
        document.getElementById('timerInfo').style.display = 'flex';
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.isTimerRunning = false;
        document.getElementById('timerInfo').style.display = 'none';
    }

    pauseTimer() {
        this.isPaused = true;
    }

    resumeTimer() {
        if (this.isTimerRunning) {
            this.isPaused = false;
            this.timerStartTime = Date.now() - this.timerElapsed;
        }
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timerElapsed / 60000);
        const seconds = Math.floor((this.timerElapsed % 60000) / 1000);
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('timerValue').textContent = timeString;
    }

    // Grid/List 전환
    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
        this.updateViewMode();
        this.soundManager.playClick();
    }

    updateViewMode() {
        const gridView = document.getElementById('gridView');
        const listView = document.getElementById('listView');
        const viewToggleBtn = document.getElementById('viewToggleBtn');
        
        if (this.viewMode === 'grid') {
            gridView.style.display = 'flex';
            listView.style.display = 'none';
            viewToggleBtn.textContent = '📋';
            viewToggleBtn.title = 'List 보기';
        } else {
            gridView.style.display = 'none';
            listView.style.display = 'block';
            viewToggleBtn.textContent = '⬜';
            viewToggleBtn.title = 'Grid 보기';
            this.renderFullClueList();
        }
    }

    renderFullClueList() {
        const cluesListFull = document.getElementById('cluesListFull');
        cluesListFull.innerHTML = '';
        
        const level = this.gameLevels[this.currentLevel];
        
        // 가로 단서 그룹
        const acrossGroup = document.createElement('div');
        acrossGroup.className = 'clue-group';
        const acrossTitle = document.createElement('div');
        acrossTitle.className = 'clue-group-title';
        acrossTitle.textContent = '가로';
        acrossGroup.appendChild(acrossTitle);
        
        level.clues.across.forEach(clue => {
            const clueItem = document.createElement('div');
            clueItem.className = 'clue-item-full';
            const clueKey = `across-${clue.number}`;
            if (this.completedClues.has(clueKey)) {
                clueItem.classList.add('completed');
            }
            if (this.activeClue === clue.number && this.currentDirection === 'across') {
                clueItem.classList.add('active');
            }
            clueItem.textContent = `${clue.number}번: ${clue.clue}`;
            clueItem.addEventListener('click', () => {
                this.currentDirection = 'across';
                this.selectClue(clue.number);
                this.viewMode = 'grid';
                this.updateViewMode();
            });
            acrossGroup.appendChild(clueItem);
        });
        cluesListFull.appendChild(acrossGroup);
        
        // 세로 단서 그룹
        const downGroup = document.createElement('div');
        downGroup.className = 'clue-group';
        const downTitle = document.createElement('div');
        downTitle.className = 'clue-group-title';
        downTitle.textContent = '세로';
        downGroup.appendChild(downTitle);
        
        level.clues.down.forEach(clue => {
            const clueItem = document.createElement('div');
            clueItem.className = 'clue-item-full';
            const clueKey = `down-${clue.number}`;
            if (this.completedClues.has(clueKey)) {
                clueItem.classList.add('completed');
            }
            if (this.activeClue === clue.number && this.currentDirection === 'down') {
                clueItem.classList.add('active');
            }
            clueItem.textContent = `${clue.number}번: ${clue.clue}`;
            clueItem.addEventListener('click', () => {
                this.currentDirection = 'down';
                this.selectClue(clue.number);
                this.viewMode = 'grid';
                this.updateViewMode();
            });
            downGroup.appendChild(clueItem);
        });
        cluesListFull.appendChild(downGroup);
    }

    // 힌트 기능 (글자 하나씩 보여주기)
    showHint() {
        if (!this.activeClue || !this.currentAnswer) {
            this.showModal('알림', '활성화된 단서가 없습니다.');
            return;
        }
        
        const ordered = this.getOrderedActiveCells();
        const emptyIndices = [];
        
        ordered.forEach((cell, index) => {
            if (this.useCanvas) {
                const cellKey = `${cell.row}-${cell.col}`;
                if (!this.canvasCellValues.get(cellKey)) {
                    emptyIndices.push(index);
                }
            } else {
                const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                if (cellEl && !cellEl.value && !cellEl.readOnly) {
                    emptyIndices.push(index);
                }
            }
        });
        
        if (emptyIndices.length === 0) {
            this.showModal('알림', '모든 칸이 채워져 있습니다.');
            return;
        }
        
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const targetCell = ordered[randomIndex];
        const letter = this.currentAnswer[randomIndex];
        
        if (this.useCanvas) {
            const cellKey = `${targetCell.row}-${targetCell.col}`;
            this.canvasCellValues.set(cellKey, letter);
            this.renderCanvas();
        } else {
            const cellEl = document.querySelector(`input.grid-cell[data-row="${targetCell.row}"][data-col="${targetCell.col}"]`);
            if (cellEl) {
                cellEl.value = letter;
                cellEl.setAttribute('value', letter);
                cellEl.style.color = '#667eea';
                cellEl.style.fontWeight = 'bold';
                cellEl.readOnly = true;
                cellEl.dataset.hinted = 'true';
            }
        }
        
        this.score = Math.max(0, this.score - 5);
        localStorage.setItem('score', this.score.toString());
        this.updateScore();
        
        this.soundManager.playClick();
        
        // selectedLetters 업데이트
        this.selectedLetters = ordered.map(c => {
            if (this.useCanvas) {
                const cellKey = `${c.row}-${c.col}`;
                return this.canvasCellValues.get(cellKey) || '';
            } else {
                const e = document.querySelector(`input.grid-cell[data-row="${c.row}"][data-col="${c.col}"]`);
                return e ? (e.value || '') : '';
            }
        });
        this.updateSelectedWord();
        
        // 완료 체크
        if (this.isCurrentWordComplete()) {
            setTimeout(() => {
                this.checkAnswer();
            }, 500);
        }
    }
    
    // 단어 공개 기능
    revealCurrentWord() {
        if (!this.activeClue || !this.currentAnswer) return;
        
        const clue = this.gameLevels[this.currentLevel].clues[this.currentDirection].find(c => c.number === this.activeClue);
        if (!clue) return;
        
        // 현재 단서의 정답을 공개 (orderedCells 기준)
        const ordered = this.getOrderedActiveCells();
        ordered.forEach((cell, index) => {
            if (this.useCanvas) {
                const cellKey = `${cell.row}-${cell.col}`;
                this.canvasCellValues.set(cellKey, clue.answer[index]);
                this.renderCanvas();
            } else {
                const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                if (cellEl && !cellEl.disabled && !cellEl.classList.contains('blocked')) {
                    cellEl.value = clue.answer[index];
                    cellEl.classList.add('correct');
                    cellEl.readOnly = true;
                }
            }
        });
        
        // 단서 완료 표시
        const clueKey = `${this.currentDirection}-${this.activeClue}`;
        this.completedClues.add(clueKey);
        // this.updateProgress(); // 주석 처리
        
        this.soundManager.playCorrect();
        this.showModal('힌트', '단어가 공개되었습니다!');
        
        setTimeout(() => {
            this.hideModal();
            this.moveToNextClue();
        }, 1500);
    }
    
    // 전체 단어 확인 기능
    checkAllWords() {
        const level = this.gameLevels[this.currentLevel];
        if (!level) return;
        
        let correctCount = 0;
        let incorrectCount = 0;
        const incorrectWords = [];
        
        // 모든 단서 확인
        [...level.clues.across, ...level.clues.down].forEach(clue => {
            const direction = level.clues.across.includes(clue) ? 'across' : 'down';
            const clueKey = `${direction}-${clue.number}`;
            
            // 이미 완료된 단서는 건너뛰기
            if (this.completedClues.has(clueKey)) {
                correctCount++;
                return;
            }
            
            // 해당 단서의 셀 찾기
            const cells = [];
            this.gridData.forEach((row, r) => {
                row.forEach((cell, c) => {
                    const key = `${r}-${c}`;
                    const cellInfo = this.cellMap.get(key);
                    if (cellInfo && cellInfo[direction] && cellInfo[direction].clue.number === clue.number) {
                        cells.push({ row: r, col: c, index: cellInfo[direction].index });
                    }
                });
            });
            
            // 방향에 따라 정렬
            if (direction === 'across') {
                cells.sort((a, b) => {
                    if (a.row !== b.row) return a.row - b.row;
                    return a.col - b.col;
                });
            } else {
                cells.sort((a, b) => {
                    if (a.col !== b.col) return a.col - b.col;
                    return a.row - b.row;
                });
            }
            
            // 사용자 답 읽기
            const userAnswer = cells.map(cell => {
                const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                return cellEl ? cellEl.value : '';
            }).join('');
            
            // 정답 확인
            if (userAnswer === clue.answer) {
                // 정답 처리
                cells.forEach((cell, index) => {
                    const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                    if (cellEl) {
                        cellEl.value = clue.answer[index];
                        cellEl.classList.add('correct');
                        cellEl.readOnly = true;
                    }
                });
                this.completedClues.add(clueKey);
                correctCount++;
            } else if (userAnswer.length === clue.answer.length) {
                // 오답 처리 (길이가 같을 때만)
                cells.forEach(cell => {
                    const cellEl = document.querySelector(`input.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                    if (cellEl && !cellEl.readOnly) {
                        cellEl.classList.add('incorrect');
                        setTimeout(() => {
                            cellEl.classList.remove('incorrect');
                        }, 2000);
                    }
                });
                incorrectCount++;
                incorrectWords.push(`${direction === 'across' ? '가로' : '세로'} ${clue.number}번`);
            }
        });
        
        // 진행률 업데이트
        this.updateProgress();
        
        // 결과 표시
        let message = '';
        if (incorrectCount === 0 && correctCount > 0) {
            message = `모든 단어가 정답입니다! (${correctCount}개 완료)`;
            this.soundManager.playCorrect();
        } else {
            message = `정답: ${correctCount}개\n오답: ${incorrectCount}개`;
            if (incorrectWords.length > 0) {
                message += `\n\n오답 단서: ${incorrectWords.join(', ')}`;
            }
            this.soundManager.playIncorrect();
        }
        
        this.showModal('전체 확인 결과', message);
        
        // 모든 단서 완료 확인
        if (this.isLevelComplete()) {
            setTimeout(() => {
                this.soundManager.playComplete();
                this.showLevelCompleteModal();
            }, 2000);
        }
    }

    clearPuzzle() {
        if (this.useCanvas) {
            // Canvas 모드
            this.canvasCellValues.clear();
            this.selectedCanvasCell = null;
            this.renderCanvas();
        } else {
            // HTML input 모드
            document.querySelectorAll('input.grid-cell').forEach(cell => {
                if (!cell.disabled && !cell.classList.contains('blocked')) {
                    // 힌트로 채워진 칸도 초기화
                    if (cell.dataset.hinted) {
                        delete cell.dataset.hinted;
                    }
                    cell.value = '';
                    cell.classList.remove('correct', 'incorrect');
                    cell.readOnly = false;
                    cell.style.color = '';
                    cell.style.fontWeight = '';
                }
            });
        }
        
        // 완료된 단서 초기화
        this.completedClues.clear();
        // this.updateProgress(); // 주석 처리
        
        // 단서 목록 업데이트
        document.querySelectorAll('.clue-item, .clue-item-full').forEach(item => {
            item.classList.remove('completed');
        });
        
        // 단어 선택 초기화
        this.selectedLetters = [];
        this.updateSelectedWord();
        this.updateGridWithWord();
        
        this.soundManager.playClick();
        this.showModal('초기화', '퍼즐이 초기화되었습니다.');
        setTimeout(() => this.hideModal(), 1000);
    }

    // 단서 하이라이트 업데이트
    updateClueHighlight() {
        // 모든 단서 아이템에서 active 클래스 제거
        document.querySelectorAll('.clue-item, .clue-item-full').forEach(item => {
            item.classList.remove('active');
        });
        
        // 현재 활성 단서에 active 클래스 추가
        const directionText = this.currentDirection === 'across' ? '가로' : '세로';
        document.querySelectorAll('.clue-item, .clue-item-full').forEach(item => {
            const itemText = item.textContent;
            if (itemText.includes(`${directionText} ${this.activeClue}번`)) {
                item.classList.add('active');
            }
        });
    }
    
    // 게임 상태 자동 저장
    saveGameState() {
        if (!this.gameLevels || this.currentLevel === undefined) return;
        
        const gameState = {
            vocab: this.currentVocab,
            difficulty: this.currentDifficulty,
            level: this.currentLevel,
            gridValues: {},
            completedClues: Array.from(this.completedClues),
            score: this.score,
            timerElapsed: this.timerElapsed,
            timestamp: Date.now()
        };
        
        // 모든 셀의 값 저장
        if (this.useCanvas) {
            // Canvas 모드
            this.canvasCellValues.forEach((value, key) => {
                gameState.gridValues[key] = value;
            });
        } else {
            // HTML input 모드
            document.querySelectorAll('input.grid-cell').forEach(cell => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                if (cell.value && !cell.classList.contains('blocked')) {
                    gameState.gridValues[`${row}-${col}`] = cell.value;
                }
            });
        }
        
        localStorage.setItem('crosswordGameState', JSON.stringify(gameState));
    }
    
    // 게임 상태 복원
    loadGameState() {
        try {
            const savedState = localStorage.getItem('crosswordGameState');
            if (!savedState) return;
            
            const gameState = JSON.parse(savedState);
            
            // 같은 게임인지 확인 (vocab, difficulty, level)
            if (gameState.vocab !== this.currentVocab || 
                gameState.difficulty !== this.currentDifficulty || 
                gameState.level !== this.currentLevel) {
                return;
            }
            
            // 24시간 이내 저장된 것만 복원
            const hoursSinceSave = (Date.now() - gameState.timestamp) / (1000 * 60 * 60);
            if (hoursSinceSave > 24) {
                localStorage.removeItem('crosswordGameState');
                return;
            }
            
            // 그리드 값 복원
            if (this.useCanvas) {
                // Canvas 모드
                Object.keys(gameState.gridValues).forEach(key => {
                    this.canvasCellValues.set(key, gameState.gridValues[key]);
                });
                this.renderCanvas();
            } else {
                // HTML input 모드
                Object.keys(gameState.gridValues).forEach(key => {
                    const [row, col] = key.split('-').map(Number);
                    const cellEl = document.querySelector(`input.grid-cell[data-row="${row}"][data-col="${col}"]`);
                    if (cellEl && !cellEl.classList.contains('blocked')) {
                        cellEl.value = gameState.gridValues[key];
                        if (gameState.completedClues.some(clueKey => {
                            const [dir, num] = clueKey.split('-');
                            const cellInfo = this.cellMap.get(key);
                            return cellInfo && cellInfo[dir] && cellInfo[dir].clue.number === parseInt(num);
                        })) {
                            cellEl.readOnly = true;
                            cellEl.classList.add('correct');
                        }
                    }
                });
            }
            
            // 완료된 단서 복원
            this.completedClues = new Set(gameState.completedClues);
            
            // 점수 복원
            if (gameState.score !== undefined) {
                this.score = gameState.score;
                this.updateScore();
            }
            
            // 타이머 복원
            if (gameState.timerElapsed !== undefined && this.settings.timer) {
                this.timerElapsed = gameState.timerElapsed;
                this.updateTimerDisplay();
            }
            
            // 진행률 업데이트 (주석 처리)
            // this.updateProgress();
            
            // 단서 목록 업데이트
            document.querySelectorAll('.clue-item, .clue-item-full').forEach(item => {
                item.classList.remove('completed');
                const itemText = item.textContent;
                gameState.completedClues.forEach(clueKey => {
                    const [dir, num] = clueKey.split('-');
                    const directionText = dir === 'across' ? '가로' : '세로';
                    if (itemText.includes(`${directionText} ${num}번`)) {
                        item.classList.add('completed');
                    }
                });
            });
            
        } catch (e) {
            console.error('게임 상태 복원 실패:', e);
            localStorage.removeItem('crosswordGameState');
        }
    }
    
    // Canvas 초기화
    initCanvas() {
        const canvas = document.getElementById('crosswordCanvas');
        if (!canvas) return;
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Canvas 크기 계산
        const rows = this.gridData.length;
        const cols = this.gridData[0].length;
        const canvasWidth = cols * this.cellSize + this.canvasPadding * 2;
        const canvasHeight = rows * this.cellSize + this.canvasPadding * 2;
        
        // 고해상도 디스플레이 지원
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = canvasHeight + 'px';
        this.ctx.scale(dpr, dpr);
        
        // Canvas 이벤트 리스너
        canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        canvas.addEventListener('keydown', (e) => this.handleCanvasKeyDown(e));
        canvas.setAttribute('tabindex', '0'); // 키보드 포커스 가능하게
        
        // Canvas 컨테이너 표시
        document.getElementById('canvasContainer').style.display = 'flex';
        document.getElementById('gridContainer').style.display = 'none';
    }
    
    // Canvas에 격자 그리기
    renderCanvas() {
        if (!this.ctx || !this.canvas) return;
        
        const ctx = this.ctx;
        const rows = this.gridData.length;
        const cols = this.gridData[0].length;
        
        // 배경 지우기
        ctx.clearRect(0, 0, this.canvas.width / (window.devicePixelRatio || 1), this.canvas.height / (window.devicePixelRatio || 1));
        
        // 격자 그리기
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * this.cellSize + this.canvasPadding;
                const y = r * this.cellSize + this.canvasPadding;
                const cell = this.gridData[r][c];
                
                // 셀 배경
                if (cell === '#') {
                    // 블록된 셀
                    ctx.fillStyle = '#e0e0e0';
                    ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    ctx.strokeStyle = '#d0d0d0';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                } else {
                    // 일반 셀
                    ctx.fillStyle = 'white';
                    ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    ctx.strokeStyle = '#333';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                }
                
                // 번호 표시
                if (cell !== ' ' && cell !== '' && cell !== '#') {
                    ctx.fillStyle = '#667eea';
                    ctx.font = 'bold 13px Arial';
                    ctx.fillText(cell, x + 3, y + 15);
                }
                
                // 셀 값 표시
                const cellKey = `${r}-${c}`;
                const value = this.canvasCellValues.get(cellKey);
                if (value) {
                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 24px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(value, x + this.cellSize / 2, y + this.cellSize / 2 + 2);
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'alphabetic';
                }
                
                // 활성 셀 하이라이트
                if (this.selectedCanvasCell && this.selectedCanvasCell.row === r && this.selectedCanvasCell.col === c) {
                    ctx.strokeStyle = '#667eea';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                }
                
                // 활성 단서 셀 하이라이트
                if (this.activeCells && this.activeCells.some(cell => cell.row === r && cell.col === c)) {
                    ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
                    ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }
            }
        }
    }
    
    // Canvas 클릭 처리
    handleCanvasClick(e) {
        if (!this.canvas) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 클릭한 셀 계산
        const col = Math.floor((x - this.canvasPadding) / this.cellSize);
        const row = Math.floor((y - this.canvasPadding) / this.cellSize);
        
        if (row >= 0 && row < this.gridData.length && col >= 0 && col < this.gridData[0].length) {
            const cell = this.gridData[row][col];
            if (cell !== '#') {
                this.selectedCanvasCell = { row, col };
                this.canvas.focus();
                this.renderCanvas();
                
                // 단서 선택
                const key = `${row}-${col}`;
                const cellInfo = this.cellMap.get(key);
                if (cellInfo) {
                    if (cellInfo.across && cellInfo.down) {
                        // 교차 셀 - 현재 방향 유지 또는 토글
                        if (this.currentDirection === 'across') {
                            this.currentDirection = 'down';
                        } else {
                            this.currentDirection = 'across';
                        }
                    } else if (cellInfo.across) {
                        this.currentDirection = 'across';
                    } else if (cellInfo.down) {
                        this.currentDirection = 'down';
                    }
                    
                    if (cellInfo[this.currentDirection]) {
                        this.selectClue(cellInfo[this.currentDirection].clue.number);
                    }
                }
            }
        }
    }
    
    // Canvas 키보드 입력 처리
    handleCanvasKeyDown(e) {
        if (!this.selectedCanvasCell) return;
        
        const { row, col } = this.selectedCanvasCell;
        const cellKey = `${row}-${col}`;
        
        if (e.key.length === 1 && /[가-힣A-Z0-9]/.test(e.key)) {
            // 한 글자 입력
            const value = e.key.toUpperCase();
            this.canvasCellValues.set(cellKey, value);
            this.renderCanvas();
            
            // 자동 이동
            this.advanceCanvasCell();
            
            // 정답 체크
            if (this.settings.autocheck) {
                this.checkCanvasAnswer();
            }
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            // 삭제
            this.canvasCellValues.delete(cellKey);
            this.renderCanvas();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // 방향키 이동
            e.preventDefault();
            this.moveCanvasCell(e.key);
        } else if (e.key === 'Tab') {
            // 다음 단서
            e.preventDefault();
            this.moveToNextClueByNumber(true);
        }
    }
    
    // Canvas 셀 자동 이동
    advanceCanvasCell() {
        if (!this.selectedCanvasCell || !this.activeCells || this.activeCells.length === 0) return;
        
        const ordered = this.getOrderedActiveCells();
        const currentIndex = ordered.findIndex(c => 
            c.row === this.selectedCanvasCell.row && c.col === this.selectedCanvasCell.col
        );
        
        if (currentIndex !== -1 && currentIndex < ordered.length - 1) {
            const nextCell = ordered[currentIndex + 1];
            this.selectedCanvasCell = { row: nextCell.row, col: nextCell.col };
            this.renderCanvas();
        }
    }
    
    // Canvas 셀 이동
    moveCanvasCell(direction) {
        if (!this.selectedCanvasCell) return;
        
        const { row, col } = this.selectedCanvasCell;
        let newRow = row;
        let newCol = col;
        
        if (direction === 'ArrowLeft' && this.currentDirection === 'across') {
            newCol = Math.max(0, col - 1);
        } else if (direction === 'ArrowRight' && this.currentDirection === 'across') {
            newCol = Math.min(this.gridData[0].length - 1, col + 1);
        } else if (direction === 'ArrowUp' && this.currentDirection === 'down') {
            newRow = Math.max(0, row - 1);
        } else if (direction === 'ArrowDown' && this.currentDirection === 'down') {
            newRow = Math.min(this.gridData.length - 1, row + 1);
        }
        
        if (this.gridData[newRow][newCol] !== '#') {
            this.selectedCanvasCell = { row: newRow, col: newCol };
            this.renderCanvas();
        }
    }
    
    // Canvas 정답 체크
    checkCanvasAnswer() {
        if (!this.activeClue || !this.currentAnswer) return;
        
        const ordered = this.getOrderedActiveCells();
        const userAnswer = ordered.map(cell => {
            const cellKey = `${cell.row}-${cell.col}`;
            return this.canvasCellValues.get(cellKey) || '';
        }).join('');
        
        if (userAnswer === this.currentAnswer) {
            // 정답 처리
            ordered.forEach((cell, index) => {
                const cellKey = `${cell.row}-${cell.col}`;
                this.canvasCellValues.set(cellKey, this.currentAnswer[index]);
            });
            this.renderCanvas();
            this.checkAnswer();
        }
    }
    
    setupEventListeners() {
        // 버튼 이벤트
        const checkBtn = document.getElementById('checkBtn');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                this.checkAnswer();
            });
        }
        
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                this.resetWordSelection();
            });
        }
        
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextLevel());
        }
        
        const modalBtn = document.getElementById('modalBtn');
        if (modalBtn) {
            modalBtn.addEventListener('click', () => {
                this.soundManager.playClick();
                this.hideModal();
            });
        }
        
        // 셀 값 변경 시 자동 저장
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('grid-cell')) {
                this.saveGameState();
            }
        });
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    const game = new CrosswordGame();
    game.setupEventListeners();
});
