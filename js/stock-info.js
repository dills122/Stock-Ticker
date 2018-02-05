$(document).ready(function () {
	//Starts the Ticker
	Ticker.initialize();
			
	$("#scrollingText").bind("mouseover", function () {
		$("#scrollingText").smoothDivScroll("stopAutoScrolling");
	});

	$("#scrollingText").bind("mouseout", function () {
		$("#scrollingText").smoothDivScroll("startAutoScrolling");
	});			
});


var Ticker = {
	API_val : "E67ZBHJYSU0K28PD",
	topTen : [
	"ABT", "PBF", "BAC", "AAPL", "MSFT", "BABA","JPM","BRK.B","NVDA","SBUX",
	],
	initialize: function() {
		GetTickerVals(this.topTen, this.API_val);
	}

}


function getLatestClose(sym, API_val) {
	return new Promise(function(resolve, reject) {
		return $.getJSON(GetAPIStr(sym, API_val)).then(function(data) {
			var days = data["Time Series (Daily)"];
			for (var prop in days) {
				resolve(days[prop]["4. close"]);
				break;
			}
		});
	});
}

function GetAPIStr(SYM, API_val) {
	var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + SYM + "&apikey=" + API_val;
	return url;	
}

function GetTickerVals(Symbols, API_val) {
	var yestrClose = [];
	for (var i = 0; i < Symbols.length; i++) {
		yestrClose.push(getLatestClose(Symbols[i],API_val));
	}

	return Promise.all(yestrClose).then(function(output) {
		//return the final product
		FillTicker(Symbols, output);

		$("#scrollingText").smoothDivScroll({
			autoScrollingMode: "always",
			autoScrollingDirection: "endlessLoopRight",
			autoScrollingStep: 1,
			autoScrollingInterval: 15 
		});
	});
}

function FillTicker(symbols, vals) {
	for (var i = 0; i < vals.length; i++) {

		$('#scrollingText').append('<p>' + symbols[i] + "-- $" + parseFloat(vals[i]).toFixed(2) + '</p>');
	}	
}