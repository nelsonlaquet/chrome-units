(function() {
	var lbDisplay = document.createElement("div");
	lbDisplay.className = "njl-unit-lb-display";
	lbDisplay.style.display = "none";
	document.body.appendChild(lbDisplay);

	var unitConversions = 
	[
		{
			// KG
			"match": /([\d\.\,]+)\s*kg/i,
			"conversion": function(kg) { return kg * 2.2046; }
		},
		{
			// ST
			"match": /([\d\.\,]+)\s*st/i,
			"conversion": function(st) { return st * 14; }
		}
	];

	document.addEventListener("mouseup", function(e) {
		var selection = window.getSelection().getRangeAt(0).cloneContents();
		var text = selection.textContent;

		var unitMatch = null;
		var unitConversion = null;
		for (var i = 0; i < unitConversions.length; i++) {
			unitConversion = unitConversions[i];
			unitMatch = unitConversions[i].match.exec(text);

			if (unitMatch != null)
				break;
		}

		if (unitMatch == null) {
			lbDisplay.style.display = "none";
			return;
		}

		var lbValue = unitConversion.conversion(unitMatch[1]);
		lbDisplay.innerHTML = lbValue.toLocaleString() + " lb";
		lbDisplay.style.left = (e.pageX + 10) + "px";
		lbDisplay.style.top = (e.pageY + 10) + "px";
		lbDisplay.style.display = "block";
	});
})();