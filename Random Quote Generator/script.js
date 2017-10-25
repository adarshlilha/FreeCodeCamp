var url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&key=457653&lang=en&jsonp=?";

var getQuote = function(data){	
	$("#quote").html('<i class="fa fa-quote-left"></i> ' + data.quoteText + ' <i class="fa fa-quote-right"></i>');
  if (data.quoteAuthor === ''){
    data.quoteAuthor = 'Unknown';
  }
	$("#author").text("- " + data.quoteAuthor);
  var quot = "https://twitter.com/intent/tweet?text=" + data.quoteText + "- " + data.quoteAuthor + " @adarshlilha";
	$("#share_twitter").attr("href", quot);
}
	
	$(document).ready(function() {
  	$.getJSON(url, getQuote, 'jsonp');
	});
$("#generate").click(function(){
		$.getJSON(url, getQuote, 'jsonp');
	});

function getRandomColor() {
		var color;
  		var colors = ['#77B1A9','#E7D5D5','#BBC6CE','#87CEF5','#F4F9B4'];
  		color = colors[Math.floor(Math.random() * 5)];
  		return color;
	}
	function setRandomColor() {
	  $("body").css("background-color", getRandomColor());
	}

