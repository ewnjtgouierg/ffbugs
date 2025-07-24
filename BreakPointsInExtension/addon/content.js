document.addEventListener('msg2ext', function(e) {
		chrome.runtime.sendMessage(e.detail.extensionID, e.detail.ini, null, function(response) {
				console.log(response);
			});
	});
