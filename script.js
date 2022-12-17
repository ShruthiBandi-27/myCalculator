let h1 = document.createElement("h1");
h1.setAttribute("id","title");
h1.innerHTML = "DOM Calculator";
document.body.appendChild(h1);

let des = document.createElement("p");
des.setAttribute("id","description");
des.innerHTML = "Designed a Calculator using DOM";
document.body.appendChild(des);

let calDiv = document.createElement("div");
calDiv.setAttribute("id","calculator");
calDiv.setAttribute("class","container-fluid");
calDiv.style.height = "460px";
calDiv.style.width = "297px";
calDiv.style.border = "2px solid black";
calDiv.style.backgroundColor = "#DADADA";
calDiv.style.textAlign = "center";
//calDiv.style.paddingRight = "5px";
document.body.appendChild(calDiv);

//result
let resultDiv = document.createElement("div");
resultDiv.setAttribute("id","resultDivId");
resultDiv.style.margin = "10px";
calDiv.appendChild(resultDiv);

let resultEle = document.createElement("input");
resultEle.setAttribute("id", "result");
resultEle.setAttribute("class","form-control");
//resultEle.setAttribute("disabled","true");
resultEle.setAttribute("placeholder","0");
resultEle.addEventListener("keydown",(event) => {
    if(isNaN(event.key)) {
        event.preventDefault();
        alert("Only numbers are allowed");   
    }
})
resultDiv.appendChild(resultEle);

//buttons
let buttonsDiv = document.createElement("div");
buttonsDiv.setAttribute("id","butDivId");
calDiv.appendChild(buttonsDiv);

let clearBtn = document.createElement("button");
clearBtn.setAttribute("type","button");
clearBtn.setAttribute("id","clear");
clearBtn.classList.add("btn","btn-dark","btn-lg");
clearBtn.style.margin= "9px";
clearBtn.style.fontSize = "20px";
clearBtn.innerHTML = "C"
clearBtn.addEventListener("click",() => {
    resultEle.value= "";
});
buttonsDiv.appendChild(clearBtn);

let removeBtn = document.createElement("button");
removeBtn.setAttribute("type","button");
removeBtn.setAttribute("id","revomeId");
removeBtn.classList.add("btn","btn-dark","btn-lg");
removeBtn.style.margin = "3px";
//removeBtn.style.padding = "8px";
removeBtn.style.paddingRight = "12px";
removeBtn.innerHTML = "<-"
removeBtn.addEventListener("click",() => {
    //alert(eval(resultEle.value));
    //resultEle.value = eval(resultEle.value);
    resultEle.value = resultEle.value.slice(0,-1);
});
buttonsDiv.appendChild(removeBtn);

let equalBtn = document.createElement("button");
equalBtn.setAttribute("type","button");
equalBtn.setAttribute("id","equal");
equalBtn.classList.add("btn","btn-primary","btn-lg");
equalBtn.style.margin= "11px";
//equalBtn.style.marginRight= "20px";
//equalBtn.style.width ="100px";
equalBtn.style.paddingRight = "43px";
equalBtn.style.paddingLeft= "40px";
equalBtn.innerHTML = "=";
equalBtn.addEventListener("click",() => {
    //alert(eval(resultEle.value));
    //resultEle.value = eval(resultEle.value);
    // let infixExp = resultEle.value.split('+');
    // alert(infixExp);

    // infixExp = infixExp.split('-');
    // infixExp = infixExp.split('*');
    // infixExp = infixExp.split('/');
    // infixExp = infixExp.split('%');
    
    // alert(p);
    //let expression = /\+|\-|\*|\/|\%|\(|\)/;
    let expression = /\+|\-|\*|\/|\%\/\)|\(/;
    let infixExp = [];
    let numb_index = 0;
    let noOf_digits;
   
    let expWithoutBraces = resultEle.value.replace('(','');
    expWithoutBraces = expWithoutBraces.replace(')','');
    console.log(`expWithoutBraces: ${expWithoutBraces}`);
    let numbers = expWithoutBraces.split(expression);
    //let numbers = resultEle.value.split(expression);
  
     console.log("numbers" +numbers);
    for(let i=0; i < resultEle.value.length; i++){
        if(numb_index < numbers.length){
            noOf_digits = numbers[numb_index].length;
        }
        if(!isNaN(resultEle.value[i])){
            console.log("if block "+resultEle.value[i]);
            infixExp.push(numbers[numb_index]);
            i = i + (noOf_digits - 1);
            numb_index += 1;
        }
        else{
            console.log("else block " + resultEle.value[i]);
            // if(resultEle.value[i] == '(' || resultEle.value[i] == ')' || resultEle.value[i] == ' ' ){
            //     i = i + 1;
            // }
                infixExp.push(resultEle.value[i]);
        }
        //alert(noOf_digits);
     }
     console.log(resultEle.value);
     console.log(`infix expression is ${infixExp}`);
    //alert(numbers);
    resultEle.value = convertToPostfix(infixExp);
});
buttonsDiv.appendChild(equalBtn);

let operators_arr = ["+", "-", "*", "/", "%", ".","(",")"];
let operators_ids = ["add", "subtract", "multiply", "divide", "modulo","decimal","openBrace","closeBrace"];

for(let i=0; i<operators_arr.length; i++){
    let btn = document.createElement("button");
    btn.setAttribute("type","button");
    btn.setAttribute("id",operators_ids[i]);
    btn.classList.add("btn","btn-dark","btn-lg");
    btn.style.margin= "9px";
    if(operators_arr[i] == "(" || operators_arr[i] == ")" || operators_arr[i] == "."){
        btn.style.paddingRight = "18px";
        btn.style.paddingLeft  = "17px";
    }
    btn.innerHTML = operators_arr[i];
    btn.addEventListener("click",() => {
        resultEle.value += operators_arr[i];
    });
    buttonsDiv.appendChild(btn);
}


let nums = ["7","8","9","4","5","6","1","2","3","0","00","000"];

for(let i=0; i < nums.length; i++){
    let btn = document.createElement("button");
    btn.setAttribute("type","button");
    btn.setAttribute("id",nums[i]);
    btn.classList.add("btn","btn-dark","btn-lg");
    btn.style.margin= "9px";
    if(nums[i] == "00"){
        btn.style.paddingRight = "10px";
        btn.style.paddingLeft  = "13px";
    }
    if(nums[i] == "000"){
        btn.style.paddingRight = "5px";
        btn.style.paddingLeft  = "6px";
    }
    btn.innerHTML = nums[i];
    btn.addEventListener("click",() => {
        resultEle.value += parseInt(nums[i]);
    });
    buttonsDiv.appendChild(btn);
}
/*
function myEval(exp) {
    //alert(exp);
    for(let i = 0; i < exp.length; i++){
        if(exp[i] === '+') {
            let res = parseInt(exp[i-1]) + parseInt(exp[i+1]);
            //resultEle.value = 
            alert(res);
        }
    }
}
*/

function convertToPostfix(exp) {
   // alert(exp);
    console.log(`typeof exp is ${typeof(exp)}`);
    let stack = []
    let postfix = [];
    let symbols = ['+','-','-','/','*','%','(',')'];
    let stLen = stack.length - 1;
    for(let i = 0; i < exp.length; i++){
        if(!isNaN(exp[i])){
            postfix.push(exp[i]);
            //console.log(`exp[i] is number pushing it to postfix[]: ${postfix}`);
            //alert(exp[i]);
        }
        else if(symbols.includes(exp[i])){
            //alert(exp[i]);
            if(stack.length === 0){
                stack.push(exp[i]);
                //console.log(`exp[i] is symbol and stack length is empty, push it to stack ${stack}`);
            }
            else{
                if(exp[i] == '*' || exp[i] == '/'){
                    //console.log(`exp[i] is symbol ${exp[i]} and stack length is not empty`);
                    if(stack[stack.length - 1] =='*' || stack[stack.length - 1] == '/'){
                        //console.log(`step-1: stack[stack.length - 1] is ${stack[stack.length - 1]}`);
                        while(1){
                            postfix.push(stack.pop());
                            if(['+','-','('].includes(stack[stack.length - 1]) || stack.length == 0 ){
                                stack.push(exp[i]);
                                //console.log(`exp[i] is ${exp[i]}, poping symbols from stack to postfix: ${postfix} and push it to stack ${stack}`);
                                break;
                            }
                        }
                    }
                    else if(['+','-','%','('].includes(stack[stack.length - 1])){
                        //console.log(` step-2 : stack[stack.length - 1] is ${stack[stack.length - 1]}`);
                        stack.push(exp[i]);
                        //console.log(`exp[i] is ${exp[i]}, push it to stack ${stack}`);
                    }  
                }
                else if(exp[i] === '%'){
                    if(stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-'){
                        stack.push(exp[i]);
                        //console.log(`exp[i] is ${exp[i]}, push it to stack ${stack}`);
                    }
                    else if(stack[stack.length - 1] === '%' || stack[stack.length - 1] === '*' || stack[stack.length - 1] ==='/'){
                        let flag = true;
                        while(flag){
                            postfix.push(stack.pop());
                            if(stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-' ){
                                flag = false;
                                stack.push(exp[i]);
                                //console.log(`exp[i] is ${exp[i]}, poping symbols from stack to postfix: ${postfix} and push it to stack ${stack}`);
                                break;
                            }
                        }

                    }
                }
                else if(exp[i] === '+' || exp[i] === '-'){
                    if(['*','/','%','+','-'].includes(stack[stack.length -1])){
                        let flag = true;
                        while(flag){
                            postfix.push(stack.pop());
                            if(stack.length === 0){
                                flag = false;
                                stack.push(exp[i]);
                                //console.log(`exp[i] is ${exp[i]}, poping symbols from stack to postfix: ${postfix} and push it to stack ${stack}`);
                                break;
                            }
                        }
                    }
                    else if(stack[stack.length - 1] == '('){
                        stack.push(exp[i]);
                    }
                }
                else if(exp[i] == '('){
                    stack.push(exp[i]);
                }
                else if(exp[i] === ')'){   
                   while(1){
                        if(stack.slice(-1) == '('){
                            stack.pop();
                            break;
                        }
                        else{
                            postfix.push(stack.pop());
                        }
                   }
                }
            }
        }
    }
    if(stack.length != 0){
        while(1){
            postfix.push(stack.pop());
            if(stack.length == 0){
                break;
            }
        }
    }
    //alert(`stack is ${stack}\n postfix is ${postfix}`);
    
    return postfixEvaluation(postfix);
}

function postfixEvaluation(postfix){
    console.log(`entered postfixEvaluation fn, postfixExp is ${postfix}`);
    let x,y, temp,result;
    let digits = [];

    for(let i=0; i < postfix.length; i++){
        temp = postfix[i];
        if(!isNaN(temp)){
            digits.push(parseInt(postfix[i]));
        }
        else{
            y = digits.pop();
            x = digits.pop();

            switch(temp){
                case '*':
                    result = x * y;
                    break;
                case '/':
                    result = x / y;
                    break;
                case '+':
                    result = x + y;
                    break;
                case '-':
                    result = x - y;
                    break;
                case '%':
                    result = x % y;
                    break;
            }
            digits.push(result);   
        }
    }
    console.log(`result of expression is : ${result}`);
    return result;
   
}





