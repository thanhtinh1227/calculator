const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//theme swich
const themeSwicher = $("#theme-swich");
themeSwicher.onchange = () => {
    document.documentElement.className = `theme-${themeSwicher.value}`
}

// calculator

const numberBtns = $$(".btn-number");
const operatorBtns = $$ (".btn-operator");
const equalBtn = $(".btn-equal");
const dotBtn = $(".btn-dot");
const delBtn = $(".btn-del");
const resetBtn = $(".btn-reset");
let num1, num2, operator, input = [], result;

resetBtn.onclick = reset;

delBtn.onclick = () => {
    input.pop();
    setScreen(input.join(""));
}

numberBtns.forEach(btn => {
    btn.onclick = ( e => {
        input.push(e.target.name);
       input.includes(".") ? setScreen(Number(input.join("")).toLocaleString('en-us', {minimumFractionDigits: input.length - input.indexOf(".") - 1})) : setScreen(Number(input.join("")).toLocaleString('en-us'));
    });
});

operatorBtns.forEach(btn => {
    btn.onclick = e => {
        if(!operator) {
            operator = e.target.name;
            if(num1 === undefined) {
                num1 = Number(input.join(""))
            }
            input = [];
        }
        else {
            num2 = Number(input.join(""));
            result = calculate(num1, num2, operator);
            setScreen(result);
            num1 = result;
            operator =e.target.name;
            input = [];
        } 
    }
})

equalBtn.onclick = () => {
        num2 = Number(input.join(""));
        result = calculate(num1, num2, operator);
        setScreen(result);
        num1 = result;
        input = [];
}

dotBtn.onclick = () => {
    if (!input.includes(".")) {
        input.push(".");
    };
    setScreen(input.join(""));
}

function setScreen (content) {
    if(content) {
        $('#screen h1').innerText = content.toLocaleString();
    } else {
        $('#screen h1').innerText = 0;
    }
}

function calculate (num1, num2, operator) {
    switch (operator) {
        case "add": 
            return Number(num1)+Number(num2);
            break;
        case "subtract":
            return Number(num1)-Number(num2);
            break;
        case "multiply":
            return Number(num1)*Number(num2);
            break;
        case "divide":
            return Number(num1)/Number(num2);
            break;
        default:
            console.log("no operator selected");
    };
    input = [];
}

function reset () {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    setScreen(0);
    input = [];
}