const API_val = "E67ZBHJYSU0K28PD";

const topTen = [
"ABT", "PBF", "BAC", "AAPL", "MSFT", "BABA","JPM","BRK.B","NVDA","SBUX",
];

function GetDateStr() {
	var d = GetRecentWeekday();

	return formatDate(d);
}

function formatDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [date.getFullYear(), month, day].join('-');
}

function GetRecentWeekday() {
	var d = new Date();
	if(d.getDay() == 0) {
		d.setDate(d.getDate() - 2);
	}
	else if (d.getDay() == 6) {
		d.setDate(d.getDate() - 1);
	}
	return d;
}

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
	for (var i = 0; i < vals.length; i++) {
		$('#scrollingText').append('<p>' + symbols[i] + "--" + vals[i] + '</p>');
	}	
}