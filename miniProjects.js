// let btn=document.querySelector("button");
// let ul=document.querySelector("ul");
// let inp=document.querySelector("input");

// btn.addEventListener("click",function(){
//   let item=document.createElement("li");
//   item.innerText=inp.value;

//   let btnDel=document.createElement("button");
//   btnDel.innerText="delete";
//   btnDel.classList.add("delete");

//   item.appendChild(btnDel);
//   ul.appendChild(item);
//   inp.value="";
// });

// ul.addEventListener("click",function(){
//   if(event.target.nodeName=="BUTTON"){
//     let listItem=event.target.parentElement;
//     listItem.remove();
//     console.log("deleted");
//   }
// });

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "pink"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 400);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level} | High Score: ${highScore}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);

  // Delay flash so user sees clearly
  setTimeout(function () {
    gameFlash(randBtn);
  }, 500);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> | High Score: ${highScore} <br>Press any key to start.`;
    document.body.style.backgroundColor = "red";
    setTimeout(function () {
      document.body.style.backgroundColor = "";
    }, 200);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
