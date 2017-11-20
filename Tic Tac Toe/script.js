var StartGame = (function(){
	var playArr = [[,,],[,,],[,,]];
	var flagArr = [[0,0,0],[0,0,0],[0,0,0]];
	var userChar,computerChar,count=0,won=false;
	var getChars = () => {
		var usersChar = document.querySelectorAll('input[type="radio"]');
		usersChar[0].checked ? userChar = usersChar[0].value : userChar = usersChar[1].value;
		//hide sign selection
		document.getElementById('selectCharacter').style.display = "none";
		//assign computer a sign to play - opposite of user
		computerChar = assignSign(userChar);
		playGame();
	};

	var assignSign = (sign) => {
		sign === "X" ? computerSign = "O" : computerSign = "X";
		return computerSign;
	};

	var playGame = () => {
		var playArea = document.getElementById('playArea');
		playArea.style.display = "block";
		playArea.addEventListener("click",function(e){
			var row = Number(e.target.getAttribute('name').split('')[0]);
			var column = Number(e.target.getAttribute('name').split('')[1]);
			playArr[row][column] = userChar;
			flagArr[row][column] = 1;
			e.target.innerText = userChar;
			count++;
			if (!won){
				checkWinner(userChar);
			}
			if (count < 9){
				computerTurn();
			}
		});
	};

	var computerTurn = () => {
		var flagChck = 0;
		while (flagChck === 0){
			var row = Math.floor(Math.random() * flagArr.length);
			var column = Math.floor(Math.random() * flagArr.length);
			if (flagArr[row][column] === 0){
				playArr[row][column] = computerChar;
				flagArr[row][column] = 1;
				var name = String(row) + String(column);
				document.getElementsByName(name)[0].innerHTML = computerChar;
				count++;
				flagChck = 1;
				if (!won){
					checkWinner(computerChar);
				}
			}
		}
	};

	var checkWinner = (char) => {
		char === userChar ? char = 'User' : char = 'Computer';
		var winningCount = 0;
		for (var i=0;i<3;i++){
			for (var j=0;j<3;j++){
				if (playArr[i][j] === 'X'){
					console.log('aaya');
					winningCount += 1;
				}
			}
		}
			if (winningCount === 3){
				alert(`${char} wins`);
				won = true;
			}
		
	};

	return{
		getChars : getChars
	}
})();

var playBtn = document.querySelector('button');
playBtn.addEventListener('click',function(){
	//get both radio button
	StartGame.getChars();
});
