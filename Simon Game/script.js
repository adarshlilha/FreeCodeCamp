function getRandomColorBox(){
	let colorArr = ['color1','color2','color3','color4'];
	let randomColorBox = colorArr[Math.floor(Math.random() * colorArr.length)];
	return randomColorBox;
}

function startGame(){
	startBtn.style.pointerEvents = 'none';
	strictBtn.style.pointerEvents = 'none';
	makeRandomPush();
	blinkRandomBox(patternArr);
	showCount();
	checkClick();
}

function blinkRandomBox(boxArr){
	console.log(boxArr);
	for (var i=1;i<=boxArr.length;i++){
	    setTimeout(function(i){
	    	return function(){
	    		playAudio(boxArr[i-1]);
	    		var colorBox = document.getElementById(boxArr[i-1]);
	    		colorBox.style.opacity = 0.5;
	    	};
	    }(i),600*i);
	    setTimeout(function(i){
	    	return function(){
	    		var colorBox = document.getElementById(boxArr[i-1]);
	    		colorBox.style.opacity = 1;
	    	};
	    }(i),900*i);
	}
} 

let count = 0;
let patternArr = [];
let clickNumber = 0;
let strict = false;
let countTag = document.getElementById('input');
function makeRandomPush(){
	patternArr.push(getRandomColorBox());
}

function showCount(){
	count++;
	countTag.innerText = count;
	gameWon();
}

function checkClick(){
	let colors = document.getElementById('colors');
	colors.addEventListener('click',checkClickEvent);
}

function checkClickEvent(e){
	playAudio(e.target.id);
	if (e.target.id === patternArr[clickNumber]){
		clickNumber++;
	}else if (e.target.id !== patternArr[clickNumber]){
		clickNumber = 0;
		if (strict === false){
			countTag.innerText = '!!';
			blinkRandomBox(patternArr);	
		}
		else{
			restartGame();
		}
	}
	checkIfRight();
}

function checkIfRight(){
	if (clickNumber === patternArr.length){
		clickNumber = 0;
		//call again
		startGame();
	}
}

function gameWon(){
	if (count === 20){
		alert("You have won the game!");
		restartGame();
	}
}

function restartGame(){
	count = 0;
	patternArr = [];
	startGame();
}

function playAudio(source){
	var audio = document.querySelector(`audio[data-key=${source}]`);
	audio.currentTime = 0;
	audio.play();
}

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener("click",startGame);

let strictBtn = document.getElementById('strictBtn');
strictBtn.addEventListener("click",function(){
	if (!strict){
		strict = true;
		strictBtn.style.backgroundColor = "red";	
	}
	else{
		strict = false;
		strictBtn.style.backgroundColor = "yellow";		
	}
});

let restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener("click",restartGame);