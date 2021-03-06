﻿window.onload = () => {
    letöltés()
    kérdésMegjelenítés(kérdés)

    document.getElementById("e").click = előre;
    document.getElementById("v").click = vissza;
    kérdésBetöltés(questionId)

}
// 1. lépés
var kérdések;
var jóVálasz;
var questionId = 4;

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
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
}

document.getElementById("válasz1").onclick = function () {
    if ("válasz" + kérdések[k].correctAnswer == "válasz1") {
        document.getElementById("válasz1").class('jó');
    }
    else {
        document.getElementById("válasz1").class('rossz');
    }
}
document.getElementById("válasz2").onclick = function () {
    if ("válasz" + kérdések[k].correctAnswer == "válasz2") {
        document.getElementById("válasz2").class('jó');
    }
    else {
        document.getElementById("válasz2").class('rossz');
    }
}
document.getElementById("válasz3").onclick = function () {
    if ("válasz" + kérdések[k].correctAnswer == "válasz3") {
        document.getElementById("válasz3").class('jó');
    }
    else {
        document.getElementById("válasz3").class('rossz');
    }
}


// Az én függvényem átalakítva...rossz?
//function kérdésMegj(k) {
//
//    document.getElementById("kérdés_szöveg").innerText = kérdések[k].questionText
//    document.getElementById("kép").innerHTML = ` https://szoft1.comeback.hu/hajo/ ${kérdések[k].image} `
//    document.getElementById("válasz1").innerText = kérdések[k].answer1
//    document.getElementById("válasz2").innerText = kérdések[k].answer2
//    document.getElementById("válasz3").innerText = kérdések[k].answer3
//}

// Új rész Controllerekkel...
function próba_API () {

}

fetch('/questions/4')
    .then(response => response.json())
    .then(data => console.log(data)
    );
// 2.lépés

//function kérdésMegjelenítés(kérdés) {
//    console.log(kérdés);
//    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
//    document.getElementById("válasz1").innerText = kérdés.answer1
//    document.getElementById("válasz2").innerText = kérdés.answer2
//    document.getElementById("válasz3").innerText = kérdés.answer3
//    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
//    // ??? fetch("https://szoft1.comeback.hu/hajo/" + kérdés.image)
//    //          .then(response => {
//    //              if (!response.ok) {
//    //                  console.error()
//    //              }
//    //              else {
//    //                  document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
//    //              }
//    //          })
//    
//    
//}

function kérdésMegjelenítés(kérdés) {
    if (!kérdés) return;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép").classList.add("rejtett")
    }
    //Nem elfelejeni levenni a színt!!!
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");
}

function kérdésBetöltés(questionId) {
    fetch(`/questions/${questionId}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}

// gombok előre/vissza kezeletlen??? 
function előre() {
    if (questionId<= d.lenght) {
        questionId++;
        kérdésBetöltés(questionId)
    }
    else {
        questionId = 0;
    }
    
}

function vissza() {
    questionId--;
    kérdésBetöltés(questionId)
}
