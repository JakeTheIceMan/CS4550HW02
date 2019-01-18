(function () {
    "use strict";
    var calcTotal = 0;
    var calcDisplayed = 0;
    var finished = 0;
    var pendingMath = "";
    var dotted = 0;
    function onNumberEntered(button, type) {
        if (type === "num") {
            if (finished) {
                calcDisplayed = button;
                finished = 0;
            }
            else {
                if (!dotted) {
                    calcDisplayed = calcDisplayed*10 + button*1;
                }
                else {
                    calcDisplayed = calcDisplayed + button;
                }
            }
        }
        else {
            if (button === "." && !dotted) {
                dotted = 1;
                finished = 0;
                calcDisplayed = calcDisplayed + ".";
            }
            else if (button === "C") {
                calcDisplayed = 0;
                calcTotal = 0;
                finished = 0;
                dotted = 0;
                pendingMath = "";
            }
            else {
                if (pendingMath === "+/=") {
                    calcTotal = calcTotal*1 + calcDisplayed*1;
                }
                else if (pendingMath === "-") {
                    calcTotal = calcTotal*1 - calcDisplayed*1;
                }
                else if (pendingMath === "*") {
                    calcTotal = calcTotal*1 * calcDisplayed*1;
                }
                else if (pendingMath === "/") {
                    calcTotal = calcTotal*1 / calcDisplayed*1;
                }
                else if (pendingMath === "") {
                    calcTotal = calcDisplayed;
                }
                pendingMath = button;
                finished = 1;
            }
        }
        if (!finished) {
            document.getElementById("totalVal").innerHTML = calcDisplayed;
        }
        else {
            document.getElementById("totalVal").innerHTML = calcTotal;
        }
    }

    function init() {
        var btns = document.getElementsByTagName("button");
        btns = Array.from(btns);
        btns.forEach(btn => {
          console.log(btn);
          btn.addEventListener("click", (function() {onNumberEntered(btn.innerHTML, btn.className);}));
        });
    }

    window.addEventListener("load", init, false);
})();
