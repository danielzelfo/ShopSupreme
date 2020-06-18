var currentTimeElem = document.querySelector("#time");
var changeStatusBtn = document.querySelector("#statusChange");
var runBtn = document.querySelector("#run");
var autoRunCheckBox = document.querySelector("#toggleAutoRun");
var userTime = document.querySelector("#timeInput");
var currentStatus = document.querySelector("#status");
var autoProcessPayment = document.querySelector("#toggleAutoProcessPayment");
var userCheckoutDelay = document.querySelector("#checkoutDelayInput");


currentTimeElem.innerHTML = (new Date());

setInterval(function() {
    currentTimeElem.innerHTML = (new Date());
}, 1000);

chrome.browserAction.setPopup({
    popup: "popup/pages/run.html"
});



updateStatus();

changeStatusBtn.onclick = function() {
    chrome.storage.local.get(["status"], function(res) {
        var mode = {
            type: "status"
        }
        if (res["status"] == "inactive")
            mode.data = "active";
        else
            mode.data = "inactive";
        chrome.runtime.sendMessage(JSON.stringify(mode), response => {
            if (response.complete)
                updateStatus();
        });
    });

};


runBtn.onclick = function() {
    run();
};


autoRunCheckBox.oninput = function() {
    autoRun();
};
userTime.oninput = function() {
    autoRunCheckBox.checked = false;
	autoRun()
};


autoProcessPayment.oninput = function() {
    autoProcess();
};
userCheckoutDelay.oninput = function() {
	autoProcessPayment.checked = false;
	autoProcess();
};

chrome.storage.local.get(["autorun"], function(result) {
    var autorun = result["autorun"];
	
    if (autorun != null && autorun != "clear" && new Date(autorun) > new Date()) {
        autoRunCheckBox.checked = true;
        userTime.value = autorun.substring(16, 24);
    }
	
});

chrome.storage.local.get(["autoprocess"], function(result) {
    var autoprocess = result["autoprocess"];
	
    if (autoprocess != null && autoprocess != "clear") {
        autoProcessPayment.checked = true;
		userCheckoutDelay.value = autoprocess;
    }
	
});


function updateStatus() {
	chrome.storage.local.get(["status"], function(res) {
		let stat = res["status"];
		currentStatus.innerHTML = stat;
		changeStatusBtn.innerHTML = (stat == "active" ? "Deactive" : "Activate");
	});
}

function run() {
	var mode = {
		type: "status",
		data: "active"
	}
	chrome.runtime.sendMessage(JSON.stringify(mode), response => {
		if (response.complete)
			window.open("https://www.supremenewyork.com/shop/all");
	});
}

function autoRun() {
	var runMsg = {
		type: "autorun"
	}
	if (autoRunCheckBox.checked) {
		autoProcessPayment.checked = true;
		autoProcess();
		let timeToRun = new Date((new Date()).toString().substring(0, 16) + userTime.value);
		if(timeToRun < new Date()) 
			timeToRun.setDate(timeToRun.getDate() + 1);
		runMsg.data = timeToRun.toString();
	} else {
		runMsg.data = "clear";
	}
	chrome.runtime.sendMessage(JSON.stringify(runMsg));
}


function autoProcess() {
	var runMsg = {
		type: "autoprocess"
	}
	if (autoProcessPayment.checked) {
		runMsg.data = parseInt(userCheckoutDelay.value);
	} else {
		runMsg.data = "clear";
	}
	chrome.runtime.sendMessage(JSON.stringify(runMsg));
}



