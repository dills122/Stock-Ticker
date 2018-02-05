const API_val = "E67ZBHJYSU0K28PD";

const topTen = [
"ABT", "PBF", "BAC", "AAPL", "MSFT", "BABA","JPM","BRK.B","NVDA","SBUX",
];

function getLatestClose(sym) {
	return new Promise(function(resolve, reject) {
		return $.getJSON(GetAPIStr(sym)).then(function(data) {
			var days = data["Time Series (Daily)"];
			for (var prop in days) {
				resolve(days[prop]["4. close"]);
				break;
			}
		});
	});
}

function GetAPIStr(SYM) {
	var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + SYM + "&apikey=" + API_val;
	return url;	
}

function GetTickerVals(Symbols) {
	var yestrClose = [];
	for (var i = 0; i < Symbols.length; i++) {
		yestrClose.push(getLatestClose(Symbols[i]));
	}

	return Promise.all(yestrClose).then(function(output) {
		//return the final product
		FillTicker(topTen, output);

		$("#scrollingText").smoothDivScroll({
			autoScrollingMode: "always",
			autoScrollingDirection: "endlessLoopRight",
			autoScrollingStep: 1,
			autoScrollingInterval: 15 
		});
	});
}

function FillTicker(symbols, vals) {

	console.log(vals);
	for (var i = 0; i < vals.length; i++) {

		$('#scrollingText').append('<p>' + symbols[i] + "-- $" + parseFloat(vals[i]).toFixed(2) + '</p>');
	}	
}