(function playerChar(){
	var playBtn = document.querySelector('button');
	playBtn.addEventListener('click',function(){
		//get both radio button
		var userChar = document.querySelectorAll('input[type="radio"]');
		//get user selected sign to play - X or O
		var userSelectedChar;
		userChar[0].checked ? userSelectedChar = userChar[0].value : userSelectedChar = userChar[1].value;
		//hide sign selection
		document.getElementById('selectCharacter').style.display = "none";
		//assign computer a sign to play - opposite of user
		var computerChar = assignSign(userSelectedChar);
		var arr = [[ , , ],[ , , ],[ , , ]];
		var flagArr = [[0,0,0],[0,0,0],[0,0,0]];
		//start the game
		playerModule.startGame(userSelectedChar,arr,flagArr,computerChar);
	});
})();

//assign computer a sign to play - opposite of user
function assignSign(sign){
	sign === "X" ? computerSign = "O" : computerSign = "X";
	return computerSign;
};

var playerModule = (function(){
	function startGame(userSelectedChar,arr,flagArr,computerChar){
		var playArea = document.getElementById('playArea');
		playArea.style.display = "block";
		playArea.addEventListener("click",function(e){
			var row = Number(e.target.getAttribute('name').split('')[0]);
			var column = Number(e.target.getAttribute('name').split('')[1]);
			arr[row][column] = userSelectedChar;
			flagArr[row][column] = 1;
			e.target.innerHTML = userSelectedChar;
			computerModule.computerTurn(computerChar,arr,flagArr);
		});
	}
	return{
		startGame : startGame
	}
})();

var computerModule = (function(){
	function computerTurn(computerChar,arr,flagArr){
		var count = 0;
		var checkIterations = 0;
		while (count === 0){
			var row = Math.floor(Math.random() * flagArr.length);
			var column = Math.floor(Math.random() * flagArr.length);
			if (flagArr[row][column] === 0){
				console.log(row,column);
				arr[row][column] = computerChar;
				flagArr[row][column] = 1;
				checkIterations += 1;
				var name = String(row) + String(column);
				console.log(name);
				document.getElementsByName(name)[0].innerHTML = computerChar;
				count = 1;
				console.log(`checkIterations is ${checkIterations}`);
			}
		}
		console.log(flagArr);
	}
	return{
		computerTurn : computerTurn
	}
})();