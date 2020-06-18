chrome.storage.local.get(["status"], function(res) {
	
	
	if(res["status"] == "active"){
		
	
		
		chrome.storage.local.get(["checkout"], function(result) {
			
			
			chrome.storage.local.get(["autoprocess"], function(processData) {
				
				
				var userInfo = result["checkout"];
				
				
				var autoprocess = processData["autoprocess"];
				
				var fillElems = {
					"nameElem": document.querySelector("#order_billing_name"),
					"emailElem": document.querySelector("#order_email"),
					"phoneElem": document.querySelector("#order_tel"),
					"addressElem": document.querySelector("#bo"),
					"aptElem": document.querySelector("#oba3"),
					"zipElem": document.querySelector("#order_billing_zip"),
					"cityElem": document.querySelector("#order_billing_city"),
					"stateElem": document.querySelector("#order_billing_state"),
					"countryElem": document.querySelector("#order_billing_country"),
					"cardElem": document.querySelector("#rnsnckrn"),
					"expMoElem": document.querySelector("#credit_card_month"),
					"expYrElem": document.querySelector("#credit_card_year"),
					"cvvElem": document.querySelector("#orcer")
					
				};
				
				var requiredCheckBox = document.querySelectorAll(".iCheck-helper")[1];

				var processPaymentBtn = document.querySelector("#pay input");
				
				for(var info in userInfo) {
					let curElem = fillElems[info+"Elem"];
					curElem.value = userInfo[info];
				}

				requiredCheckBox.click();
				
				
				if (autoprocess != null && autoprocess != "clear"){
					setTimeout(function(){	
						processPaymentBtn.click();
					}, parseInt(autoprocess));
				}
				
				
				
				var mode = {
					type : "status",
					data : "inactive"
				}
				
				chrome.runtime.sendMessage(JSON.stringify(mode));
				
				
			});
		});
	}
});