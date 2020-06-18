chrome.storage.local.get(["status"], function(res) {
	if(res["status"] == "active"){
		
		chrome.storage.local.get(["items"], function(result) {
			var items = result["items"];
			
			
			var category = document.querySelector(".current").innerHTML.toLowerCase();
			
			
			if(category in items.categories){
			
				var numItems = items.quantity;

				var gettingNames = items.categories[category].names, gettingColors = items.categories[category].colors;

				var itemElems = document.querySelectorAll(".turbolink_scroller .inner-article");
				
				
				
				var foundOne = false;

				itemElems.forEach(function (item) {
					let name = item.querySelector(".product-name .name-link").innerHTML;
					let color = item.querySelector(".product-style .name-link").innerHTML;
					let url = item.querySelector('a').href;
					
					
					for(let i = 0; i < gettingNames.length; i++){
						
						
						var keywords = gettingNames[i].toLowerCase().split(" ");
						var keywordMatch = 0;
						keywords.forEach(function (keyword) {
							if(name.toLowerCase().includes(keyword))
								keywordMatch++;
						});
						
						if(keywordMatch == keywords.length){
							if( gettingColors[i].toLowerCase() == "any" || color.toLowerCase() == gettingColors[i].toLowerCase()){
								--numItems;
								foundOne = true;
								window.open(url, "_blank");
							}
						}
						
						
						if(numItems == 0)
							break;
					}
				});
				
				if(!foundOne) {
					setTimeout(function(){
						location.reload();
					}, 100);
				}
				
			}
			
		});
	}
});