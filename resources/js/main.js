let figure = document.querySelector("figure.active");
let frame = figure.querySelector("section");
let lists = frame.querySelectorAll("article");
const audio = document.querySelectorAll("audio");
const nav = document.querySelector("nav");
const menus = document.querySelectorAll("nav a");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

const deg = 45; // 360 / 8 = 45
const len = lists.length - 1;
let num = 0;
let active = 0;

// Start
setMusic(lists);

// Repeat all audio and reset
function initMusic() {
  for (let el of audio) {
    el.pause();
    el.load();
    el.parentElement.previousElementSibling.classList.remove("on");
  }
}

function activation(idx, lists) {
  // Search all .on and remove class
  for (let el of lists) {
    el.classList.remove("on");
  };

  // Current active == idx
  // Activate Curren article
  lists[idx].classList.add("on");
}

// Setting music article
function setMusic(lists) {
  // Reset
  num = 0;
  active = 0;
  frame.style.transform = `rotate(${deg*num}deg)`;
  activation(active, lists);

  // Change color
  setTimeout(() => {
    switch (figure.className) {
      case "pop active":
        document.documentElement.style.setProperty("--main-color", "#a29bfe");
        break;
      case "chill active":
        document.documentElement.style.setProperty("--main-color", "#00cec9");
        break;
      case "indie active":
        document.documentElement.style.setProperty("--main-color", "#fdcb6e");
        break;
    };
  }, 300);

  // Setting panels
  let i = 0;
  for (let el of lists) {
    // Styling each article
    el.style.transform = `rotate(${deg*i}deg) translateY(-90vh)`;

    // Background-image each frame
    let pic = el.querySelector(".pic");
    let cover = el.querySelector("h2").innerText;
    pic.style.backgroundImage = `url("./resources/img/${cover}.jpg")`;

    // Control BTN audio
    let play = el.querySelector(".play");
    let pause = el.querySelector(".pause");
    let load = el.querySelector(".load");

    // Click BTN play
    play.addEventListener("click", e => {
      initMusic();
      let isActive = e.currentTarget.closest("article").classList.contains("on");
      if (isActive) {
        e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
        e.currentTarget.closest("article").querySelector("audio").play();
      }
    });

    // Click BTN pause
    pause.addEventListener("click", e => {
      let isActive = e.currentTarget.closest("article").classList.contains("on");
      if (isActive) {
        e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
        e.currentTarget.closest("article").querySelector("audio").pause();
      }
    });

    // Click BTN load
    load.addEventListener("click", e => {
      initMusic();
      let isActive = e.currentTarget.closest("article").classList.contains("on");
      if (isActive) {
        e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
        e.currentTarget.closest("article").querySelector("audio").load();
        e.currentTarget.closest("article").querySelector("audio").play();
      }
    });

    i++;
  };
}

// Click menu --- Reset figure
for (let el of menus) {
  el.addEventListener("click", () => {
    let isOn = el.classList.contains("on");
    let nowOn = document.querySelector("nav a.on");
    if (isOn === false) {
      nowOn.classList.remove("on");
      el.classList.add("on");
    }

    figure.classList.remove("active");
    figure = document.querySelector(`figure.${el.classList[0]}`);
    figure.classList.add("active");
    frame = figure.querySelector("section");
    lists = frame.querySelectorAll("article");

    // Restart
    initMusic();
    setMusic(lists);
  });
}

// Click BTN prev --- Rotate frame
prev.addEventListener("click", () => {
  // initMusic();
  num++;
  frame.style.transform = `rotate(${deg*num}deg)`;
  // If current panel sequence is 0 --- Change the order of the last panel
  // If not 0 --- Decrease by 1 from the current panel and Run activation()
  (active == 0) ? active = len: active--;
  activation(active, lists);
});

// Click BTN prev --- Rotate frame
next.addEventListener("click", () => {
  // initMusic();
  num--;
  frame.style.transform = `rotate(${deg*num}deg)`;
  // If current panel sequence is last --- Change the order of the 1st panel
  // If not last --- Increase by 1 from the current panel and Run activation()
  (active == len) ? active = 0: active++;
  activation(active, lists);
});
