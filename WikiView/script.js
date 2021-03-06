$(document).ready(function(){

	$("#reset").click(function(){			//reset the Results bar
		$("#results").empty();
	});

	$("#search").click(function(){			//how to append new elements
		//First retrieve the data

		var link = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
		var searchText = $("#query").val();
		searchText = searchText.replace(" ","%20");
		link = link + searchText;
		$.ajax({
		    url: link, 
		    jsonp: "callback",
		    dataType: "jsonp",
		    data: {
		        format: "json"
		    }, 
		    success: function(response) {
		        if(response.hasOwnProperty('query')) {

		        	$("#results").empty().append('<br /><br /><h2 class="text-center">Results:</h2>');
		        	for(var mypage in response.query.pages) {
		        		var newLink = $("<a href=\"\"></a>"), divEl = $("<div class=\"well\"></div>");
		        		newLink.append(divEl);
		        		newLink.attr({"id":mypage,"href":"https://en.wikipedia.org/?curid="+mypage,"target":"_blank"});
		        		var textHead = $("<h2></h2>");
		        		var textIn = $("<p class=\"smaller-font\"></p>");
		        		textHead.text(response.query.pages[mypage].title);
		        		textIn.text(response.query.pages[mypage].extract);
		        		divEl.append(textHead).append(textIn);
		        		$("#results").append(newLink);
		        	}
		        }
		        else {
		        	$("#results").empty().append("<br /><br /><h2 class=\"text-center\">No results found.</h2>")
		        }

		    },
		    error: function(response) {
		    	alert("Some error has occured! Please enter valid entries or refresh the page!");
		    }
		});

	});
});
