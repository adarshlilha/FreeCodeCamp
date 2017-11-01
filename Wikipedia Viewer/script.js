function getApiResponse(){
	//Clear existing results(if any)
	var searchRows = document.getElementById('searchRows');
	searchRows.innerHTML = "";

	//Craft URL
	var userInput = document.querySelector('input').value;
	var url = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=' +userInput + '&prop=info&imlimit=10&format=json&$wgCapitalLinks=false';
	
	//Make API call and pass data to showApiData function
	fetch(url).then(function(data){
		return data.json();
	}).then(function(myBlob){
		showApiData(myBlob);
	});
}

//Show Response Data
function showApiData(apiData){
	var results = [];
	var j=0;
	console.log(apiData);	
	var length = apiData[1].length;
	//Clear the result rows
	while (j<length){
		var row = [];
		for (var i=1;i<=3;i++){
			row.push(apiData[i][j]);
		}
		j++;
		results.push(row);
		//Make section for each result
		//Crafting section inside a var
		var loader = '<section class="searchRow"><h4></h4><p></p><a href="" target="_blank"></a></section>';
		//Appending the section to parent class
		var searchRows = document.getElementById('searchRows');
		searchRows.innerHTML += loader;
	}
	var totalRows = document.querySelectorAll('.searchRow');
	for (var i=0;i<totalRows.length;i++){
		(totalRows[i].childNodes[0]).innerHTML = results[i][0];
		(totalRows[i].childNodes[1]).innerHTML = results[i][1];
		(totalRows[i].childNodes[2]).href = results[i][2];
		(totalRows[i].childNodes[2]).innerText = "Go to Article";
	}
	document.querySelector('footer').style.display = "block";
}

//Call getApiResponse on button click
var searchBtn = document.querySelector('button');
searchBtn.addEventListener('click',getApiResponse);

//Call getApiResponse on return key press
var input = document.querySelector('input');
input.addEventListener('keyup',function(e){
	if (e.keyCode === 13){
		getApiResponse();
	}
});