const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const canvas = document.getElementById("canvas");
const resultText= document.getElementById(result-text);

//mozna izbira

let options = {
    sadje:["Jabolko","Mandarina","Banana","Pomaranca","Lubenica"],
    zivali:["Pes","Macek","Koza","Kameleon","Panda"],
    drzave:["Indija","Slovenija","Hrvaska","Avstrija"]
}

let winCount = 0;
let count=0;

let chosenWord ="";

// prikaže število gumnov glede na število options

const displayOptions = () => {
    optionsContainer.innerHTML += '<h3>Please select an option</h3'>;
    let buttonCon= document.createElement("div");
    for(let value in options){
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
}
//onemogoci gumbe
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
      button.disabled = true;
    });
//onemogoci crke
letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};    

// generator crk
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //preverja katere crke so pravilne
    optionsButtons.forEach((button) => {
      if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
      }
      button.disabled = true;
    });
//skrije crke
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  let optionArray = options[optionValue];
  //izbere random besedo
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  //spremeni vsako crko v span
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  //prikaze
  userInputSection.innerHTML = displayItem;
};
//zacne igro 
const initializer = () => {
    winCount = 0;
    count = 0;
    //vse skrije
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";
// ustvari button za vsako crko (stevilke v foru so ascii tabela)
for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //spremeni stevilko iz ascii v crko
    button.innerText = String.fromCharCode(i);
    //ob kliku se beseda splita
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //preverja ce je bila izbrana prava crka
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //preveri crko
          if (char === button.innerText) {
            //zamenja dash z crko
            dashes[index].innerText = char;
            //pristeje count
            winCount += 1;
            //ce winCount enak dolzini besede 
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //blokira gumbe
              blocker();
            }
          }
        });
      } else {
        //pristeva nepravilne izbrane crke
        count += 1;
        //za izris
        drawMan(count);
        //če si napacno izbral 6x je konec
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //dissabla ze izbrane gumbe
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  //odpre canvas
  let { initialDrawing } = canvasCreator();
  //naredi frame 
  initialDrawing();
};
//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
 
//riše crte
const drawLine = (fromX, fromY, toX, toY) => {
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
};
const head = () => {
  context.beginPath();
  context.arc(70, 30, 10, 0, Math.PI * 2, true);
  context.stroke();
};
const body = () => {
  drawLine(70, 40, 70, 80);
};
const leftArm = () => {
  drawLine(70, 50, 50, 70);
};
const rightArm = () => {
  drawLine(70, 50, 90, 70);
};
const leftLeg = () => {
  drawLine(70, 80, 50, 110);
};
const rightLeg = () => {
  drawLine(70, 80, 90, 110);
};
//initial frame
const initialDrawing = () => {
  //zbrise canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  //spodnji line
  drawLine(10, 130, 130, 130);
  //levi line
  drawLine(10, 10, 10, 131);
  //zgornji line
  drawLine(10, 10, 70, 10);
  //mali zgornji line
  drawLine(70, 10, 70, 20);
};
return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};
//narise 
const drawMan = (count) => {
let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
switch (count) {
  case 1:
    head();
    break;
  case 2:
    body();
    break;
  case 3:
    leftArm();
    break;
  case 4:
    rightArm();
    break;
  case 5:
    leftLeg();
    break;
  case 6:
    rightLeg();
    break;
  default:
    break;
}
};
//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;