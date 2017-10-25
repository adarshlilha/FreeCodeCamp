function getApiResponse(){
	var userInput = document.querySelector('input').value;
	//API Call
	var getJSON = function(url,callback){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET",url,true);
		xmlhttp.onload = function() {
		    	var status = xmlhttp.status;
		    if (status === 200) {
		    	callback(null, xmlhttp.response);
		    }else{
		        callback(status, xmlhttp.response);
		    }
		};
		xmlhttp.send();
	};
	var url = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=' +userInput + '&prop=info&imlimit=10&format=json&$wgCapitalLinks=false';

	getJSON(url,function(err,data){
		if (err !== null){
			alert(err);
		}else{
			var wikiResponse = JSON.parse(data);
			showApiData(wikiResponse);
		}
	});
}

//Show Response Data
var results = [];
function showApiData(apiData){
	var j=0;
	while (j<10){
		var row = [];
		for (var i=1;i<=3;i++){
			row.push(apiData[i][j]);
		}
		j++;
		results.push(row);
		//Make section for each result
		//Crafting section inside a var
		var loader = $('<section class="searchRow"><h4></h4><p></p><a href="" target="_blank"></a></section>');
		//Appending the section to parent class
		loader.appendTo('#searchRows');
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