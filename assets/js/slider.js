//즉시 실행 함수. 다른 JS 코드와 충돌하지 않도록 지역 스코프를 만듦.
(function() {
    //슬라이더 요소 찾기 ( 클래스 선택자는 앞에 . 마침표 필요요)
    const root = document.querySelector('.hb-slider');
    if (!root) return;

    //내부 요소들 변수로 잡기
    const track = root.querySelector('.hb-slides');
    const slides = Array.from(root.querySelectorAll('.hb-slide'));
    const prevBtn = root.querySelector('.hb-prev');
    const nextBtn= root.querySelector('.hb-next');
    const dotsWrap=root.querySelector('.hb-dots');
    
    //슬라이드 개수 체크
    const total = slides.length;
    if (total === 0) return;

    //하단 점 생성
    slides.forEach((_, i)=> {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to slide ${i+1}`);
        b.addEventListener('click', () => {go(i); reset(); });
        dotsWrap.appendChild(b);
    });

    //상태 관리
    let index = 0; //현재 슬라이드 번호
    let interval = 3000; //3초마다 자동 전환
    let timer = setInterval(auto, interval);

    //핵심 함수
    function go(i) {
        index = (i+total) % total;  // 순환 (음수 -> 마지막, 마지막 다음-> 처음)
        track.style.transform = `translateX(-${index * 100}%)`; //슬라이드 이동
        syncDots(); //점 갱신
    }

    function auto() {go(index+1)} //자동으로 다음 슬라이드 이동
    function reset() {
        clearInterval(timer);
        timer=setInterval(auto, interval);
    }

    function syncDots() {
        const buttons= dotsWrap.querySelectorAll('button');
        buttons.forEach((b, i)=> {
            if (i===index) b.setAttribute('aria-current', 'true');
            else b.removeAttribute('aria-current'); //현재 슬라이드에 표시시
        });

    }

    //이벤트 등록(버튼이 없을 수도 있으니 존재할 때만)
    prevBtn.addEventListener('click', () => {go(index-1); reset(); }); //이전 버튼: index-1로 이동
    nextBtn.addEventListener('click', () => {go(index+1); reset(); }); //다음 버튼: index+1로 이동

    //click하면 자동 넘김 리셋

    root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {prevBtn.click(); }
        if (e.key === 'ArrowRight') { nextBtn.click();}
    });
    //키보드 방향키로도 슬라이드 이동 가능


    // 초기화(첫번째 슬라이드로 세팅)
    go(0); 
})();

// <해당 파일의 3가지 역할>
// 1. 자동 넘김(3초마다 슬라이드 이동)
// 2. 수동 제어(이전/다음 버튼, 점 네비, 키보드로 이동)
// 3. 상태 동기화(현재 위치를 dots에 표시, index 관리)
