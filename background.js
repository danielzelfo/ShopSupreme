var autoRunQueue;

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse){
	var parsedData = JSON.parse(data);
	var dataType = parsedData["type"];
	var d = parsedData["data"];
	
	if( dataType == "autorun" ) {
		if(d == "clear"){
			if(autoRunQueue != null) clearTimeout(autoRunQueue);
		}else {
			
			autoRunQueue = setTimeout(function(){
				chrome.storage.local.set({"status": "active"}, function(){ });
				window.open("https://www.supremenewyork.com/shop/all");
			}, new Date(d) - new Date() );
		}
		
	} 
		
	var obj = {};
	obj[dataType] = d;
	chrome.storage.local.set(obj, function(){ });
	sendResponse({complete: true});
	
});