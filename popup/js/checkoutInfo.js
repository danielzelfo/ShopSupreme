var submitBtn = document.querySelector("#submit");
var cancelBtn = document.querySelector("#cancel");

var mode = {
	type : "status",
	data : "inactive"
}
chrome.runtime.sendMessage(JSON.stringify(mode));

chrome.storage.local.get(["checkout"], function(result) {
	var checkout = result["checkout"];
	if(checkout != null){
		document.querySelector("#cancel").style.display = "inline";
		document.querySelector("#submit").style.width = "50%";
		
		for (var field in checkout) {
			if (checkout.hasOwnProperty(field)) {
				document.querySelector( "#"+field ).value = checkout[field];
			}
		}
	}
});

submitBtn.onclick = function() {
	var fields = document.querySelectorAll("input, select");
	for(var i = 0; i < fields.length; ++i){
		if(!fields[i].checkValidity()){
			alert("The " + fields[i].id + " field is invalid.");
			return;
		}
	}
	
	var data = {
		type : "checkout",
		data: {
			name: document.querySelector("#name").value,
			email: document.querySelector("#email").value,
			phone: document.querySelector("#phone").value,
			address: document.querySelector("#address").value,
			apt: document.querySelector("#apt").value,
			zip: document.querySelector("#zip").value,
			city: document.querySelector("#city").value,
			state: document.querySelector("#state").value,
			country: document.querySelector("#country").value,
			card: document.querySelector("#card").value,
			expMo: document.querySelector("#expMo").value,
			expYr: document.querySelector("#expYr").value,
			cvv: document.querySelector("#cvv").value
		}
	};
	
	chrome.runtime.sendMessage(JSON.stringify(data));
	location.href = "run.html";
}

cancelBtn.onclick = function(){
	location.href = "run.html";
};