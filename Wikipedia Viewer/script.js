function clearSection(){
	var searchRows = document.getElementById('searchRows');
	searchRows.innerHTML = "";
	
	setTimeout(getApiResponse,2000);
}

function getApiResponse(){
	var userInput = document.querySelector('input').value;
	var url = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=' +userInput + '&prop=info&imlimit=10&format=json&$wgCapitalLinks=false';
	console.log(url);

	fetch(url).then(function(data){
		return data.json();
	}).then(function(myBlob){
		showApiData(myBlob);
	});
}


//Show Response Data
var results = [];
function showApiData(apiData){
	var j=0;
	//Clear the result rows
	while (j<10){
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
		// loader.appendTo('#searchRows');
	}
	var totalRows = document.querySelectorAll('.searchRow');
	for (var i=0;i<totalRows.length;i++){
		$(totalRows[i].childNodes[0]).html(results[i][0]);
		$(totalRows[i].childNodes[1]).html(results[i][1]);
		$(totalRows[i].childNodes[2]).attr("href",results[i][2]);
		$(totalRows[i].childNodes[2]).text("Go to Article");
	}
	$('footer').css({'display':'block'});
}

var searchBtn = document.querySelector('button');
searchBtn.addEventListener('click',clearSection);

var input = document.querySelector('input');
input.addEventListener('keyup',function(e){
	if (e.keyCode === 13){
		clearSection();
	}
});