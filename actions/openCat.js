chrome.storage.local.get(["status"], function(res) {
	if(res["status"] == "active"){

		chrome.storage.local.get(["items"], function(result) {
			
			var items = result["items"];

			for (let category in items.categories){
				window.open("https://www.supremenewyork.com/shop/all/" + category.toLowerCase().replace("tops/sweaters", "tops_sweaters"), "_blank");
			}
		});
	}
});