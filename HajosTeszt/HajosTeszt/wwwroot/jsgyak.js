window.onload = () => {
    console.log("Codepen-es vicc: How to comfort a JavaScript bug? You console it! :)")
    kirako = function () {
        let hova = document.getElementById("here");

        for (var s = 0; s < 10; s++) {
            let sor = document.createElement("div");
            sor.classList.add("sor");
            hova.appendChild(sor);

            for (var o = 0; o <= s; o++) {
                let oszlop = document.createElement("div");
                sor.appendChild(oszlop);
                oszlop.classList.add("kocka");
                oszlop.innerText = (pascal(s, o));
                oszlop.style.color = `rgb(${255 - 255 / 10 * s},0,${255 - 255 / 10 * o})`;

            }
        }
    }

    var faktoriális = function (n) {
        let er = 1;
        for (var i = 2; i <= n; i++) {
            er = er * i;
        }
        return er;
    }

    function pascal(s, o) {
        var szám = faktoriális(s) / (faktoriális(o) * faktoriális(s - o))
        return szám;
    }
    kirako()
}