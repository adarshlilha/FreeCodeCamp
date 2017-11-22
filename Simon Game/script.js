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
	for (var i=1;i<=boxArr.length;i++){
	    setTimeout(function(i){
	    	return function(){
	    		var colorBox = document.getElementById(boxArr[i-1]);
	    		colorBox.style.opacity = 0.5;
	    	};
	    }(i),400*i);
	    setTimeout(function(i){
	    	return function(){
	    		var colorBox = document.getElementById(boxArr[i-1]);
	    		colorBox.style.opacity = 1;
	    	};
	    }(i),600*i);
	}
} 

let count = 0;
let patternArr = [];
let clickNumber = 0;
let strict = false;
function makeRandomPush(){
	patternArr.push(getRandomColorBox());
}

function showCount(){
	let countTag = document.getElementById('input');
	count++;
	countTag.innerText = count;
	gameWon();
}

function checkClick(){
	let colors = document.getElementById('colors');
	colors.addEventListener('click',once);
}

function once(e){
	if (e.target.id === patternArr[clickNumber]){
		clickNumber++;
	}else if (e.target.id !== patternArr[clickNumber]){
		clickNumber = 0;
		if (strict === false){
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
		console.log('je');
		//call again
		startGame();
	}
}

function gameWon(){
	if (count === 20){
		alert("You have won the game!");
	}
}

function restartGame(){
	count = 0;
	patternArr = [];
	startGame();
}

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener("click",function(){
	startGame();
});

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