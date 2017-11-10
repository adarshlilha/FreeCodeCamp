let changeBreakorSession = document.querySelectorAll('.changeCounter');
let breakLength = Number(document.querySelector('#breakLength span').innerText);
let sessionLength = Number(document.querySelector('#sessionLength span').innerText);

function changeLength(){
	console.log(this.className);
	if (this.className.split(' ')[1] === "break"){
		this.value === "-" ? (breakLength !== 1 ? breakLength -= 1 : null) : breakLength += 1;
		document.querySelector('#breakLength span').innerText = breakLength;
	}
	else if (this.className.split(' ')[1] === "session"){
		this.value === "-" ? (sessionLength !== 1 ? sessionLength -= 1 : null) : sessionLength += 1;
		document.querySelector('#sessionLength span').innerText = sessionLength;
		document.querySelector('#timer p').innerText = `${sessionLength}:00`;
	}
}
changeBreakorSession.forEach(function(e1){
	e1.addEventListener("click",changeLength);
});

var x = setInterval(function(length){
	var milliseconds = length * 60000;
	var newTime = new Date().getTime() + milliseconds;
	var distance = newTime - new Date().getTime();
	var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);	
	document.querySelector("#timer p").innerHTML = mins + "m " + seconds + "s";

	if (distance < 0){
		clearInterval(x);
		document.querySelector("#timer p").innerHTML = "BREAK TIME";		
	}
},1000);

var startBtn = document.querySelector('#buttonControls button');
startBtn.addEventListener("click",function(){
	
});