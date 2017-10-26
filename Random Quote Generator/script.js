var url = "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&key=457653&lang=en";
//Get API Response using XMLHttp
var getJSON = function(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200){
			setQuote(xmlhttp.response);
		}
	}
}
// Show Response to HTML
var setQuote = function(data){
	console.log(data);
	data = JSON.parse(data);
	var quoteArea = document.getElementById('quote');
	quoteArea.innerHTML = '<i class="fa fa-quote-left"></i> ' + data.quoteText + ' <i class="fa fa-quote-right"></i>';
  	if (data.quoteAuthor === ''){
    	data.quoteAuthor = 'Unknown';
  	}
  	var author = document.getElementById('author');
  	author.innerText = "- " + data.quoteAuthor;

  	var quot = "https://twitter.com/intent/tweet?text=" + data.quoteText + "- " + data.quoteAuthor + " @adarshlilha";
  	var twitterHref = document.getElementById('share_twitter');
  	twitterHref.href = quot;
}

var newQuoteBtn = document.getElementById('generate');
newQuoteBtn.addEventListener('click',function(){
	getJSON(url);
	setRandomColor();
});

//Gets a random color
function setRandomColor() {
	var color;
	var colors = ['#77B1A9','#E7D5D5','#BBC6CE','#87CEF5','#F4F9B4'];
	color = colors[Math.floor(Math.random() * 5)];
	document.body.style.backgroundColor = color;
}

//Run API once page is loaded
getJSON(url);