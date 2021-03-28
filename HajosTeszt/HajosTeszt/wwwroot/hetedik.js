window.onload = () => {
    letöltés()
    kérdésMegj(k)
    k = 0;

}
var kérdések;
var korlát;
var k;
document.getElementById("e").click = function () {
    if (korlát>k && k<=0) {
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
    if ("válasz"+kérdések[k].correctAnswer== "válasz1") {
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

function letöltés() {

    fetch("/questions.json")
        .then(r => r.json())
        .then(d => letöltésBefejeződött(d));


}
function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés!")
    console.log(d)
    kérdések = d;
    korlát=kérdések.lenght
}



function kérdésMegj(k) {

    document.getElementById("kérdés_szöveg").innerHTML = kérdések[k].questionText
    document.getElementById("kép").innerHTML = ` https://szoft1.comeback.hu/hajo/ ${kérdések[k].image} `
    document.getElementById("válasz1").innerHTML = kérdések[k].answer1
    document.getElementById("válasz2").innerHTML = kérdések[k].answer2
    document.getElementById("válasz3").innerHTML = kérdések[k].answer3
}
