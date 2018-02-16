$(document).ready(function() {
  
	$("#weatherSubmit").click(function(e) {
	e.preventDefault();
	var value = $("#weatherInput").val();
    var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0c1b7b5d775fff32037d3f378b51edef";
	$.ajax({
	    url : myurl,
	    dataType : "json",
	    success : function(json) {	
	    console.log(json);	
	    var results = "";
		results += '<h2>Weather in ' + json.name + "</h2>";
		for (var i=0; i<json.weather.length; i++) {
		    results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
		}
		results += '<h2>' + json.main.temp + " &deg;F</h2>"
		results += '<h2>' + json.main.humidity + " % humidity</h2>"
		results += "<p>"
		for (var i=0; i<json.weather.length; i++) {
		    results += json.weather[i].description
		    if (i !== json.weather.length - 1)
			results += ", "
		}
		results += "</p>";
		$("#weatherResults").html(results);
	    }
	});;
    });
    $("#stackSubmit").click(function(e){
    	e.preventDefault();
    	var value = $("#stackInput").val();
    	var myurl= "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + value;
	$.ajax({
	    url : myurl,
	    dataType : "json",
	    success : function(json) {	
	    var results = "";	
	    results += '<h2>Search results for ' + value + "</h2>";
	    var answered = [];
	    //Filter out not sorted
		for (var i=0; i<json.items.length; i++) {
		    if(json.items[i].is_answered == true)
		    {
		    	answered.push(json.items[i]);
		    }
		}
		console.log(answered.length);
		//Sort by view count
		var largestList = [];
		for(var i = 0; i < answered.length; i++){
			var largest = -1;
			for(var j = 0; j < answered.length;j++){
				if(largestList.length == answered.length){
					break;
				}
				else if(largestList.indexOf(j) == -1){
					if(largest != -1)
					{
						if(answered[j].view_count > answered[largest].view_count)
							largest = j;
					}
					else{
						largest = j;
					}

				}
			}
			largestList.push(largest);
		}

					console.log(largestList);
		//Display Link and text
		results += "<p>"
		for (var i=0; i<largestList.length; i++) {
			results+='<h2><a href=' + answered[largestList[i]].link + '>' + answered[largestList[i]].title + '</a><br>';
		}
		results += "</p>";
		$("#stackResults").html(results);
	    }
	});
	});
});
function loadPictures(){
		var title = "The Book of Mormon: Another Testament of Jesus Christ"
		var goodreadsURL = "http://www.goodreads.com/search.xml?key=cQ0MGySaelASdGmNLhWPhQ&q=Book+Of+Mormon"
		$.ajax({
		    url : goodreadsURL,
		    dataType : "xml",
		    success : function(json) {	
		    console.log(json);
		    var image = ""
		    for (var i=0; i<json.search.results.length;i++){
		    	if(json.search.results[i].original_publication_year == 1830){
		    		isbn = json.search.results[i].best_book.image_url;
		    	}
		    }
		    if(image !== ""){
		    	var result = "<img src=" + image + ">";
		    }
		    $("#BoMImage").html(result);
		}
	})
}
