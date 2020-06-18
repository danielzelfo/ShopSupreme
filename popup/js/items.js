var numItemsElem = document.querySelector("#numItems");
var addItemBtn = document.querySelector("#addItem");
var remItemBtn = document.querySelector("#removeItem");
var submitBtn = document.querySelector("#submit");
var cancelBtn = document.querySelector("#cancel");

var showItems;
var items = ["category", "name", "color", "size"];

var mode = {
	type : "status",
	data : "inactive"
}
chrome.runtime.sendMessage(JSON.stringify(mode));


chrome.storage.local.get(["items"], function(result) {
	var items = result["items"];
	if(items != null){
		cancelBtn.style.display = "inline";
		
		submitBtn.innerHTML = "done";
		submitBtn.onclick = function() { if( submitItems() ) location.href = "run.html"; }
		
		var numItems = items.quantity;
		
		numItemsElem.value = numItems;
		for(var m = 0; m < numItems-1; ++m)
			addItem();
		
		var itemsArr = [];
		for (var category in items.categories) {
			if (Object.prototype.hasOwnProperty.call(items.categories, category)) {
				for(var k = 0; k < items.categories[category].names.length; ++k){
					itemsArr.push([category, items.categories[category].names[k], items.categories[category].colors[k], items.sizes[items.categories[category].names[k]]]);
				}
			}
		}
		for(var i = 0; i < numItems; ++i){
			document.querySelector("#category"+(i+1)).value = itemsArr[i][0];
			document.querySelector("#name"+(i+1)).value = itemsArr[i][1];
			document.querySelector("#color"+(i+1)).value = itemsArr[i][2];
			document.querySelector("#size"+(i+1)).value = itemsArr[i][3];
		}
	}
});


numItemsElem.oninput =  function() {
	clearTimeout(showItems);
	showItems = setTimeout(function(){
		addItem();
	}, 500);
};

addItemBtn.onclick = function() {
	if (numItemsElem.value == '') numItemsElem.value = 0;
	numItemsElem.value = parseInt(numItemsElem.value)+1; 
	addItem();
};

remItemBtn.onclick = function() {
	let curElems = allItems.childNodes.length;
	if (numItemsElem.value == '') numItemsElem.value = 0;
	else if (numItemsElem.value > 1){ 
		for(let i = 1; i <= 7; i++)
			allItems.childNodes[curElems-i].remove();
		numItemsElem.value -= 1;
	}
};


submitBtn.onclick = function() {
	if (submitItems())
		location.href = "checkoutInfo.html";
};

cancelBtn.onclick = function(){
	location.href = "run.html";
};

function addItem(){
	let numItems = numItemsElem.value,
		allItems = document.querySelector("#allItems"),
		curLength = allItems.querySelectorAll(".itemDesc").length/4;
	let startNum;
	
	if(numItems < curLength) {
		startNum = 1;
		allItems.innerHTML = "";
	}else
		startNum = curLength + 1;
	
	for(var i = startNum; i <= numItems; i++){
		
		let itemCategory = document.createElement("input");
		let itemName = document.createElement("input");
		let itemColor = document.createElement("input");
		let itemSize = document.createElement("input");
		
		
		itemCategory.type = "text";
		itemCategory.className = "itemDesc";
		itemCategory.id = "category" + i;
		itemCategory.placeholder = "item " + i + " category";
		
		
		itemName.type = "text";
		itemName.className = "itemDesc";
		itemName.id = "name" + i;
		itemName.placeholder = "item " + i + " keywords";
		
		itemColor.type = "text";
		itemColor.className = "itemDesc";
		itemColor.id = "color" + i;
		itemColor.placeholder = "item " + i + " color";
		
		
		itemSize.type = "text";
		itemSize.className = "itemDesc";
		itemSize.id = "size" + i;
		itemSize.placeholder = "item " + i + " size";
		
		allItems.appendChild(itemCategory);
		allItems.appendChild(itemName);
		allItems.appendChild(itemColor);
		allItems.appendChild(itemSize);
		allItems.appendChild(document.createElement("br"));
		allItems.appendChild(document.createElement("br"));
	}
	reHeight();
}


function submitItems(){
	
	if(document.querySelector("#category1").value == "" || document.querySelector("#name1").value == "" || document.querySelector("#color1").value == "" || document.querySelector("#size1").value == ""){
		alert("You must fill in at least one item");
		return false;
	}
	
	var numItems = parseInt(document.querySelector("#numItems").value);
	
	var data = {
			type : "items",
			data : {
				quantity : numItems,
				categories : {},
				sizes: {}
			}
		
	}
	
	for(var i = 1; i <= numItems; ++i){
		let category =  document.querySelector("#category"+i).value.toLowerCase();
		let name =  document.querySelector("#name"+i).value.toLowerCase();
		let color =  document.querySelector("#color"+i).value.toLowerCase();
		let size =  document.querySelector("#size"+i).value.toLowerCase();
		
		
		if(data.data.categories[category] == null)
			data.data.categories[category] = {
				names : [],
				colors: []
			}
			
		data.data.categories[category].names.push(name);
		data.data.categories[category].colors.push(color);
		
		data.data.sizes[name] = size;
	}
	chrome.runtime.sendMessage(JSON.stringify(data));
	
	return true;
};