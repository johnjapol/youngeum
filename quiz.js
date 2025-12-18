// 음악 정보 데이터베이스
const musicData = {
    '01': {
        movie: '2001 스페이스 오디세이',
        composer: 'R. 슈트라우스',
        title: '짜라투스트라는 이렇게 말했다'
    },
    '02': {
        movie: '인생은 아름다워',
        composer: '오펜바흐',
        title: '호프만의 이야기 중 뱃노래'
    },
    '03': {
        movie: '불멸의 연인',
        composer: '베토벤',
        title: '교향곡 9번 합창'
    },
    '04': {
        movie: '마이너리티 리포트',
        composer: '슈베르트',
        title: '교향곡 8번 "미완성"'
    },
    '05': {
        movie: '시네마 천국',
        composer: '엔니오 모리꼬네',
        title: '시네마 천국 중 러브테마'
    },
    '06': {
        movie: '킹스 스피치',
        composer: '모차르트',
        title: '피가로의 결혼 서곡'
    },
    '07': {
        movie: '쇼생크 탈출',
        composer: '모차르트',
        title: '피가로의 결혼 중 포근한 산들바람이'
    },
    '08': {
        movie: '오션스 일레븐',
        composer: '드뷔시',
        title: '달빛'
    },
    '09': {
        movie: '피아니스트',
        composer: '쇼팽',
        title: '발라드 1번'
    },
    '10': {
        movie: '황야의 무법자',
        composer: '엔니오 모리꼬네',
        title: '황야의 무법자 테마'
    },
    '11': {
        movie: '킹스 스피치, 불멸의 연인',
        composer: '베토벤',
        title: '교향곡 7번'
    },
    '12': {
        movie: '미션',
        composer: '엔니오 모리꼬네',
        title: '가브리엘의 오보에'
    },
    '13': {
        movie: '킹스 스피치, 불멸의 연인',
        composer: '베토벤',
        title: '피아노 협주곡 5번 "황제"'
    },
    '14': {
        movie: '불멸의 연인',
        composer: '베토벤',
        title: '교향곡 5번 "운명"'
    },
    '15': {
        movie: '불멸의 연인',
        composer: '베토벤',
        title: '교향곡 3번 "영웅"'
    },
    '16': {
        movie: '샤인',
        composer: '리스트',
        title: '라캄파넬라'
    },
    '17': {
        movie: '샤인',
        composer: '림스키 코르샤코프',
        title: '왕벌의 비행'
    },
    '18': {
        movie: '킹스 스피치',
        composer: '모차르트',
        title: '클라리넷 협주곡 A장조'
    },
    '19': {
        movie: '판타지아',
        composer: '바흐',
        title: '토카타와 푸가'
    },
    '20': {
        movie: '파리넬리',
        composer: '헨델',
        title: '울게 하소서'
    },
    '21': {
        movie: '피아니스트',
        composer: '쇼팽',
        title: '녹턴 C# 마이너'
    },
    '22': {
        movie: 'ET',
        composer: '존 윌리암스',
        title: '메인 테마'
    },
    '23': {
        movie: '내 여자친구를 소개합니다',
        composer: '사티',
        title: '짐노페디 1번'
    },
    '24': {
        movie: '대부 3',
        composer: '마스카니',
        title: '카발레리아 루스티카나 간주곡'
    },
    '25': {
        movie: '로미오와 줄리엣',
        composer: '모차르트',
        title: '교향곡 25번'
    },
    '26': {
        movie: '메리에겐 뭔가 특별한 것이 있다',
        composer: '모차르트',
        title: '아이네 클라이네 나흐트뮤직'
    },
    '27': {
        movie: '뮤직 러버',
        composer: '차이코프스키',
        title: '피아노 협주곡 1번'
    },
    '28': {
        movie: '불멸의 연인',
        composer: '베토벤',
        title: '피아노 소나타 "월광"'
    },
    '29': {
        movie: '빌리 엘리어트',
        composer: '차이코프스키',
        title: '백조의 호수'
    },
    '30': {
        movie: '샤인',
        composer: '라흐마니노프',
        title: '피아노 협주곡 3번'
    },
    '31': {
        movie: '스타워즈',
        composer: '존 윌리암스',
        title: '메인 테마'
    },
    '32': {
        movie: '트루먼 쇼',
        composer: '모차르트',
        title: '터키 행진곡'
    }
};

// 전역 변수
let currentQuestionIndex = 0;
let shuffledQuestions = [];
let audioPlayer = document.getElementById('audioPlayer');
let isPlaying = false;

// 초기화
function init() {
    // 1-32 배열을 섞기
    shuffledQuestions = shuffleArray([...Array(32).keys()].map(i => String(i + 1).padStart(2, '0')));
    
    // 오디오 플레이어 설정
    audioPlayer.volume = 0.7;
    
    // 이벤트 리스너 등록
    document.getElementById('playButton').addEventListener('click', togglePlay);
    document.getElementById('showAnswerBtn').addEventListener('click', showAnswer);
    document.getElementById('nextButton').addEventListener('click', nextQuestion);
    document.getElementById('restartButton').addEventListener('click', restart);
    document.getElementById('volumeSlider').addEventListener('input', changeVolume);
    
    audioPlayer.addEventListener('timeupdate', updateTime);
    audioPlayer.addEventListener('ended', onAudioEnded);
    
    // 첫 문제 로드
    loadQuestion();
}

// 배열 섞기 (Fisher-Yates 알고리즘)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 문제 로드
function loadQuestion() {
    const currentMusicId = shuffledQuestions[currentQuestionIndex];
    
    // 진행률 업데이트
    const progress = ((currentQuestionIndex + 1) / 32) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // 문제 번호 업데이트
    document.getElementById('questionNumber').textContent = `문제 ${currentQuestionIndex + 1} / 32`;
    
    // 음악 로드
    audioPlayer.src = `music/${currentMusicId}.mp3`;
    
    // UI 초기화
    resetUI();
    
    // 답 데이터 준비
    const data = musicData[currentMusicId];
    document.getElementById('movieName').textContent = data.movie;
    document.getElementById('composer').textContent = data.composer;
    document.getElementById('musicTitle').textContent = data.title;
}

// UI 초기화
function resetUI() {
    isPlaying = false;
    document.getElementById('playIcon').style.display = 'block';
    document.getElementById('pauseIcon').style.display = 'none';
    document.getElementById('answerBox').classList.remove('show');
    document.getElementById('timeDisplay').textContent = '0:00 / 1:00';
}

// 재생/일시정지 토글
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        document.getElementById('playIcon').style.display = 'block';
        document.getElementById('pauseIcon').style.display = 'none';
    } else {
        audioPlayer.play();
        isPlaying = true;
        document.getElementById('playIcon').style.display = 'none';
        document.getElementById('pauseIcon').style.display = 'block';
    }
}

// 시간 업데이트
function updateTime() {
    const currentTime = formatTime(audioPlayer.currentTime);
    const duration = formatTime(audioPlayer.duration || 60);
    document.getElementById('timeDisplay').textContent = `${currentTime} / ${duration}`;
}

// 시간 포맷팅
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 오디오 종료
function onAudioEnded() {
    isPlaying = false;
    document.getElementById('playIcon').style.display = 'block';
    document.getElementById('pauseIcon').style.display = 'none';
}

// 볼륨 변경
function changeVolume(e) {
    audioPlayer.volume = e.target.value / 100;
}

// 답 보기
function showAnswer() {
    const answerBox = document.getElementById('answerBox');
    answerBox.classList.toggle('show');
}

// 다음 문제
function nextQuestion() {
    audioPlayer.pause();
    
    if (currentQuestionIndex < 31) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // 퀴즈 완료
        showCompletion();
    }
}

// 완료 화면 표시
function showCompletion() {
    document.querySelector('.quiz-section').style.display = 'none';
    document.getElementById('completionScreen').classList.add('show');
}

// 재시작
function restart() {
    currentQuestionIndex = 0;
    shuffledQuestions = shuffleArray([...Array(32).keys()].map(i => String(i + 1).padStart(2, '0')));
    
    document.querySelector('.quiz-section').style.display = 'block';
    document.getElementById('completionScreen').classList.remove('show');
    
    loadQuestion();
}

// 페이지 로드 시 초기화
window.addEventListener('load', init);
