window.onload = () => {
    letöltés()
    kérdésMegjelenítés(kérdés)

    document.getElementById("e").click = előre;
    document.getElementById("v").click = vissza;
    kérdésBetöltés(questionId)
    init();
}

// 1. lépés
var kérdések;
var jóVálasz;
var questionId = 4;
// 10.hét
var hotList = [];           
var questionsInHotList = 3; 

var displayedQuestion;      
var numberOfQuestions;      
var nextQuestion = 1; 
 //a 2. majd 7 lesz 
var timeoutHandler;
      

function letöltés() {

    fetch("/questions.json")
        .then(r => r.json())
        .then(d => letöltésBefejeződött(d));
}


function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés!")
    console.log(d)
    kérdések = d;
    // ? korlát=kérdések.lenght

}

//var korlát;
//var k;
//k = 0;

//új
//document.getElementById("e").click = function () {
//    if (korlát > k && k <= 0) {
//        k = k + 1
//    }
//    kérdékérdésMegj(k)
//}
//document.getElementById("v").click = function () {
//    if (korlát > k && k <= 0) {
//        k = k - 1
//    }
//    kérdékérdésMegj(k)
//}

// válastás1?????
function választás(n) {
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers0;
        
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers===questionsInHotList) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            // kérdéslista_VÉGE?
        }
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timeoutHandler = setTimeout(előre, 3000);
    // Vasárnap
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

document.getElementById("válasz1").onclick = function () {

    

  
}
document.getElementById("válasz2").onclick = function () {
    
  
}
document.getElementById("válasz3").onclick = function () {
                                                                    // if ("válasz" + kérdések[k].correctAnswer == "válasz3") {
                                                                    //     document.getElementById("válasz3").class('jó');
                                                                    // }
                                                                    // else {
                                                                    //     document.getElementById("válasz3").class('rossz');
                                                                    // }
   
                                                                     // document.getElementById(`válasz1`).style.pointerEvents = "none";
                                                                     // document.getElementById(`válasz2`).style.pointerEvents = "none";
                                                                     // document.getElementById(`válasz3`).style.pointerEvents = "none";
}


// Új rész Controllerekkel...
function próba_API() {

}

fetch('/questions/4')
    .then(response => response.json())
    .then(data => console.log(data)
    );
// 2.lépés


function kérdésMegjelenítés(kérdés) {
    //let kérdés =localStorage.getItem(hotList)
    let kérdés = hotList[displayedQuestion].question; 
    if (!kérdés) return;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        //document.getElementById("kép").classList.remove("rejtett")
        document.getElementById("kép").style.display = "block";
    }
    else {
        //document.getElementById("kép").classList.add("rejtett")
        document.getElementById("kép").style.display = "none";
    }
    for (var i = 1; i <= 3; i++) {
        document.getElementById("válasz"+i).classList.remove("jó","rossz");
    }
    document.getElementById("válaszok").style.pointerEvents = "auto";
}

function kérdésBetöltés(questionId, destination) {
    fetch(`/questions/${questionId}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        //.then(data => kérdésMegjelenítés(data))
            .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion === undefined && destination === 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
                    //window.localStorage.setItem(hotList)
            })

    // ide?
   // document.getElementById(`válasz1`).style.pointerEvents = "auto";
   // document.getElementById(`válasz2`).style.pointerEvents = "auto";
   // document.getElementById(`válasz3`).style.pointerEvents = "auto";

}

// gombok előre/vissza kezeletlen??? 
//function előre() {
//    if (questionId <= d.lenght) {
//        questionId++;
//        kérdésBetöltés(questionId)
//    }
//    else {
//        questionId = 0;
//    }
//
//}
function előre() {
    displayedQuestion++;
    clearTimeout(timeoutHandler)
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}
// ez hogy tartja benne a tartományban?

function vissza() {
    clearTimeout(timeoutHandler)
    questionId--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
    //kérdésBetöltés(questionId)
}

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    
    fetch("/questions/count")
        .then(result => result.text())
    then(ret => { numberOfQuestions = parseInt(ret) })

    document.getElementById("e").addEventListener("click", előre);
    document.getElementById("v").addEventListener("click", vissza);


    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }
    if (hotList.lenght===0) {
        //Első kérdések letöltése
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        console.log("lokális adatokal dolgozunk tovább...");
        kérdésMegjelenítés();
    }
}
