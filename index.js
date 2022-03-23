var buttons=document.getElementsByTagName("button");
var inputString = "";
var outputString = "";
var  operatorArray = [];
var  operandArray = [];
var isLastOperator = true;
var isLastAnswer=false;

for(var i=0;i<buttons.length;i++)
{
    buttons[i].addEventListener("click",CallAction);
}
document.getElementsByClassName("clear-button")[0] .addEventListener("click",clearAll);

function clearAll()
{
    inputString = "";
    outputString = "";
    operatorArray = [];
    operandArray = [];
    isLastOperator = true;
    isLastAnswer=false;
    printInput();
    printOutput();
}
function CallAction(event)
{
    var button=event.target;
    button.style.backgroundColor="black";
    button.style.color="white";
    setTimeout(function(){
        button.style.backgroundColor=null;
        button.style.color=null;
    },200)

    var value=button.innerHTML;
    var actionType = button.classList[0] === "red-text"? "operator" : "operand" ;
    if(value === "=")
    {
        calculateAnswer();
        printOutput();
    }
    else
    {
        if(addInput(actionType,value))
        {
            inputString = inputString + value;
            printInput();    
        }
    }
    console.log(operandArray,operatorArray);
    
}
function printInput()
{
    document.getElementsByClassName("input")[0].innerHTML = inputString || 0;
    /*if(inputString === "")
    {
        document.getElementsByClassName("input")[0].innerHTML=0;
    }
    else{
        document.getElementsByClassName("input")[0].innerHTML=inputString;
    }*/
}
function printOutput()
{
    document.getElementsByClassName("output")[0].innerHTML=outputString || 0;
}
function addInput(actionType,value)
{
    if(actionType === "operator")
    {
        if(isLastOperator)
            return false;
        operatorArray.push(value);
        isLastOperator=true;
        return true;
    }
    //
    if(isLastAnswer)
    {
        clearAll();   
    }
    if (isLastOperator)
    {
        
        operandArray.push(value);
        isLastOperator=false;
        return true;
    }
    operandArray[operandArray.length-1]+=value;
    return true;
}
function calculateAnswer()
{
    for(var j = 0; j < 2 ; j++)
    {
        for(var i = 0 ; i < operatorArray.length ; i++)
        {
            if(j === 0 && (operatorArray[i] === "*" || operatorArray[i] === "/"))
            {
                performAction(i);
            }
            if(j !== 0)
            {
                performAction(i);
            }
        }
    }
    isLastAnswer=true;
    outputString = operandArray[0];
    inputString =operandArray[0];
    
}
function performAction(index)
{
    var result=0;
    switch(operatorArray[index])
    {
        case "+":
            result = Number(operandArray[index]) + Number(operandArray[index+1]);
            break;
        case "-":
            result = operandArray[index] - operandArray[index+1];
            break;
        case "*":
            result = operandArray[index] * operandArray[index+1];
            break;
        case "/":
            result = operandArray[index] / operandArray[index+1];
            break;
    }
    operandArray[index]=result;
    operandArray.splice(index+1,1);
    operatorArray.splice(index,1);
}