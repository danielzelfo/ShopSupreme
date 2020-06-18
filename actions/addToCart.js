//checking if the bot is active
chrome.storage.local.get(["status"], function(res) {
	if(res["status"] == "active"){
		
		chrome.storage.local.get(["items"], function(result) {
			
			var items = result["items"];
			var numItems = items.quantity;
			var nameElem = document.querySelector("#details h2");
			var itemCountElem = document.querySelector("#items-count");
			
			addToCart(items);
			
			
			//selecting the first item
			if( matchKeywords( nameElem.innerHTML.toLowerCase(), items.categories[Object.keys(items.categories)[0]].names[0].toLowerCase() ) ){
				setTimeout(function(){
					//opening the cart if all the items are added
					if (parseInt(itemCountElem.innerHTML.replace(" items", "").replace(" item", "")) == numItems){
						
						window.open("https://www.supremenewyork.com/checkout", "_blank");
						
					//refreshing otherwise
					}else{
						
						window.open(window.location.href, "_self");
					}
				}, 500);
			}
			
		});
	}
});


function addToCart(items){
	var nameElem = document.querySelector("#details h2");
	var mySizes = items.sizes;
	var mySize = "n/a";
	var itemName = nameElem.innerHTML.toLowerCase();
	
	var mySizesKeywords = Object.keys(mySizes);
	for(var i = 0; i < mySizesKeywords.length; i++){
		keywords = mySizesKeywords[i];
		if( matchKeywords(itemName, keywords) ) {
			mySize = mySizes[keywords];
			break;
		}
	}
	
	var sizeElem = document.querySelector("#s");
	
	var addCartParentElem = document.querySelector("#add-remove-buttons");
	

	//selecting the size
	if (mySize.toLowerCase() != "n/a" && sizeElem != null) {
		sizeElem.querySelectorAll("option").forEach(function(size) {
			if (size.innerHTML.toLowerCase() == mySize.toLowerCase()) 
				sizeElem.value = size.value;
		});
	}
	
	//checking if not sold out
	if(addCartParentElem.contains(addCartParentElem.querySelector("input[name='commit']"))){
		
			var addCartElem = document.querySelector("#"+ addCartParentElem.id + " input[name='commit']");
			
			addCartElem.click();
	}
}


function matchKeywords(itemName, keywords){
	var keywordMatch = 0;
	keywords.split(" ").forEach(function (keyword) {
		if(itemName.toLowerCase().includes(keyword))
			keywordMatch++;
	});
	if(keywordMatch == keywords.split(" ").length){
		return true;
	}
	
	return false;
	
}

