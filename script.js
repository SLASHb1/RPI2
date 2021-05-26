const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const playBtn = document.getElementById('playBtn');
const slideImage = document.getElementById('slideImage');
const interval = 3000;

let slideId;
let currentIndex;
let playing;

const arrOfImages = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
const base = 'img/';


if (localStorage.getItem("backNum") == null) {
    localStorage.setItem("backNum", '0');
}
currentIndex = localStorage.getItem("backNum");
if (localStorage.getItem("isPlaying") == null) {
    localStorage.setItem("isPlaying", 'false');
}
playing = localStorage.getItem("isPlaying");


const startSlide = () => {
    slideId = setInterval(() => {
        moveToNextSlide();
    }, interval);
};

checkAutoPlay();
makeDots();
updateBack();

const dots = document.querySelectorAll('.dot');
let activeDotNum = currentIndex;

dots.forEach((dot, idx) => {
    dot.setAttribute('data-num', idx.toString());

    dot.addEventListener('click', (e) => {
        currentIndex = e.target.dataset.num;
        updateDots();
    });
});
document.addEventListener('click', ev => {

    if (ev.target === playBtn) {
        if (playing === 'false') {
            playing = 'true';
            localStorage.setItem("isPlaying", "true");
            playBtn.innerText = 'Stop';
            startSlide();
        } else {
            localStorage.setItem("isPlaying", "false");
            playBtn.innerText = 'Start';
            clearInterval(slideId);
            playing = 'false';
        }
    }


    if (ev.target === nextBtn) {
        checkForPlaying()
        if (currentIndex === 4) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateBack();
        updateDots();
        nextBtn.disabled = true;
        setTimeout(function () {
            nextBtn.disabled = false;
        }, 1000);
    }

    if (ev.target === prevBtn) {
        checkForPlaying()
        if (currentIndex === 0) {
            currentIndex = 4;
        } else {
            currentIndex--;
        }
        updateBack();
        updateDots();
        prevBtn.disabled = true;
        setTimeout(function () {
            prevBtn.disabled = false;
        }, 1000);
    }

});


document.addEventListener('keydown', ev => {
    if (ev.code === 'ArrowRight') {
        nextBtn.click();
    }

    if (ev.code === 'ArrowLeft') {
        prevBtn.click();
    }

    if (ev.code === 'Escape') {
        window.close();
    }

    if (ev.code === 'Space') {
        playBtn.click();
    }
});

function checkAutoPlay() {
    if (playing === 'true') {
        localStorage.setItem("isPlaying", "true");
        playBtn.innerText = 'Stop';
        startSlide();
    } else {
        localStorage.setItem("isPlaying", "false");
        playBtn.innerText = 'Start';
        clearInterval(slideId);
    }
}

function updateDots() {
    if (currentIndex === activeDotNum) {

    } else {
        dots[activeDotNum].classList.remove('active');
        dots[currentIndex].classList.add('active');
        activeDotNum = currentIndex;
        updateBack();
    }
}

function makeDots() {
    let dotWrapper = document.getElementById('place_for_dots');
    for (let i = 0; i < arrOfImages.length; i++) {
        let dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === currentIndex) {
            dot.classList.add('active');
        }
        dotWrapper.appendChild(dot);
    }
}

function checkForPlaying() {
    if (playing === 'true') {
        localStorage.setItem("isPlaying", "false");
        playBtn.innerText = 'Start';
        clearInterval(slideId);
        playing = 'false';
    }
}

function moveToNextSlide() {
    if (currentIndex === 4) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    updateBack();
    updateDots();
}

function updateBack() {
    const src = base + arrOfImages[currentIndex];
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        slideImage.style.backgroundImage = `url(${src})`;
    };
    localStorage.setItem("backNum", currentIndex);
}