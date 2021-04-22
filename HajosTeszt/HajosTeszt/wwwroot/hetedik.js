window.onload = () => {
    letöltés()
    kérdésMegj(k)

}

function letöltés() {

    fetch("/questions.json")
        .then(r => r.json())
        .then(d => letöltésBefejeződött(d));
}
var kérdések;

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés!")
    console.log(d)
    kérdések = d;
    korlát=kérdések.lenght
}

var korlát;
var k;
k = 0;
document.getElementById("e").click = function () {
    if (korlát > k && k <= 0) {
        k = k + 1
    }
    kérdékérdésMegj(k)
}
document.getElementById("v").click = function () {
    if (korlát > k && k <= 0) {
        k = k - 1
    }
    kérdékérdésMegj(k)
}

document.getElementById("válasz1").click = function () {
    if ("válasz" + kérdések[k].correctAnswer == "válasz1") {
        document.getElementById("válasz1").class('jó');
    }
    else {
        document.getElementById("válasz1").class('rossz');
    }
}
document.getElementById("válasz2").click = function () {
    if ("válasz" + kérdések[k].correctAnswer == "válasz2") {
        document.getElementById("válasz2").class('jó');
    }
    else {
        document.getElementById("válasz2").class('rossz');
    }
}
document.getElementById("válasz3").click = function () {
    if ("válasz" + kérdések[k].correctAnswer == "válasz3") {
        document.getElementById("válasz3").class('jó');
    }
    else {
        document.getElementById("válasz3").class('rossz');
    }
}



function kérdésMegj(k) {

    document.getElementById("kérdés_szöveg").innerText = kérdések[k].questionText
    document.getElementById("kép").innerHTML = ` https://szoft1.comeback.hu/hajo/ ${kérdések[k].image} `
    document.getElementById("válasz1").innerText = kérdések[k].answer1
    document.getElementById("válasz2").innerText = kérdések[k].answer2
    document.getElementById("válasz3").innerText = kérdések[k].answer3
}

// Új rész Controllerekkel...
function próba_API () {

}

fetch('/questions/4')
    .then(response => response.json())
    .then(data => console.log(data)
    );

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    //fetch("https://szoft1.comeback.hu/hajo/" + kérdés.image)
    //          .then(response => {
    //              if (!response.ok) {
    //                  console.error()
    //              }
    //              else {
    //                  document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    //              }
    //          })
    
    
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
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