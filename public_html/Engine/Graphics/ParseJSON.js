function parseJSON(jsonFile) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", jsonFile, false);
	xhttp.overrideMimeType("application/json");
	xhttp.send(null);
	var Doc = xhttp.responseText;
	return JSON.parse(Doc);
}