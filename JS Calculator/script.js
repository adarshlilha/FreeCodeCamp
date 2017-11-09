var buttons = document.querySelectorAll('button');
var input = document.querySelector('input');
var calcArr = [];
var showEquations = document.querySelector('div p');
function clearCalc(){
	calcArr = [];
}
function clearInput(){
	input.value = "";
}

buttons.forEach(function(button){
	button.addEventListener('click',function(){

		if (button.value !== "=" && button.value !== "AC" && button.value !== "CE"){
			if (isNaN(button.value) && calcArr.length > 0){
				if (calcArr[calcArr.length-1] === "+" || calcArr[calcArr.length-1] === "-" || calcArr[calcArr.length-1] === "*" || calcArr[calcArr.length-1] === "/" || calcArr[calcArr.length-1] === ".")
				{
					calcArr.pop();
				}
				calcArr.push(button.value);
				input.value = calcArr.join('');	
			}
			else if (!isNaN(button.value)){
				calcArr.push(button.value);	
				input.value = calcArr.join('');
			}
			console.log(calcArr);
		}
		if (button.value === "="){
			if (calcArr[calcArr.length-1] === "+" || calcArr[calcArr.length-1] === "-" || calcArr[calcArr.length-1] === "*" || calcArr[calcArr.length-1] === "/"){
				calcArr.pop();
			}
			var result = eval(calcArr.join(''));
			try{
				if (result % 1 != 0){
					result = result.toFixed(2);
				}
				input.value = result;
				console.log(result);
				clearCalc();
			}
			catch(e){
				input.value = "ERROR";
			}
		}
		if (button.value === "AC"){
			clearCalc();
			clearInput();
			console.log(calcArr);
		}
		if (button.value === "CE"){
			console.log('CE pressed');
			clearExp(calcArr);
		}
	});
});

function clearExp(calcArr){
	if (!isNaN(calcArr.join(''))){
		clearInput();
	}
	while(!isNaN(calcArr[calcArr.length-1])){
		console.log('hello');
		calcArr.pop();
		input.value = calcArr.join('');
	}
	return calcArr;
	input.value = "";
}