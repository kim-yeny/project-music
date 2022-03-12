const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const deg = 45; // 360 / 8 = 45
const len = lists.length - 1;
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const audio = frame.querySelectorAll("audio");

let i = 0;
let num = 0;
let active = 0;

// Repeat all audio and reset
function initMusic() {
  for(let el of audio) {
    el.pause();
    el.load();
    el.parentElement.previousElementSibling.classList.remove("on");
  }
}

function activation(idx, lists) {
  // Search all .on and remove class
  for(let el of lists) {
    el.classList.remove("on");
  };

  // Current active == idx
  // Activate Curren article
  lists[idx].classList.add("on");
}

for (let el of lists) {
  // Styling each article
  el.style.transform = `rotate(${deg*i}deg) translateY(-100vh)`;

  // Background-image each frame
  let pic = el.querySelector(".pic");
  pic.style.backgroundImage = `url(resources/img/background (15).jpg)`;

  // Control BTN audio
  let play = el.querySelector(".play");
  let pause = el.querySelector(".pause");
  let load = el.querySelector(".load");

  // Click BTN play
  play.addEventListener("click", e=> {
    let isActive = e.currentTarget.closest("article").classList.contains("on");
    if (isActive) {
      e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
      e.currentTarget.closest("article").querySelector("audio").play();
    }
  });

  // Click BTN pause
  pause.addEventListener("click", e=> {
    let isActive = e.currentTarget.closest("article").classList.contains("on");
    if (isActive) {
      e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
      e.currentTarget.closest("article").querySelector("audio").pause();
    }
  });

  // Click BTN load
  load.addEventListener("click", e=> {
    let isActive = e.currentTarget.closest("article").classList.contains("on");
    if (isActive) {
      e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
      e.currentTarget.closest("article").querySelector("audio").load();
      e.currentTarget.closest("article").querySelector("audio").play();
    }
  });

  i++;
};

// Click BTN prev --- Rotate frame
prev.addEventListener("click", ()=> {
  initMusic();

  num++;
  frame.style.transform = `rotate(${deg*num}deg)`;

  // If current panel sequence is 0 --- Change the order of the last panel
  // If not 0 --- Decrease by 1 from the current panel and Run activation()
  (active == 0) ? active = len : active--;
  activation(active, lists);
});

// Click BTN prev --- Rotate frame
next.addEventListener("click", ()=> {
  initMusic();

  num--;
  frame.style.transform = `rotate(${deg*num}deg)`;

  // If current panel sequence is last --- Change the order of the 1st panel
  // If not last --- Increase by 1 from the current panel and Run activation()
  (active == len) ? active = 0 : active++;
  activation(active, lists);
});
