$(document).ready(function() {
	$.getJSON("./res/spots-info.json", function(data) {
	  $.each(data, function(index, site) {
		var row = "<tr><td>" + site.name + "</td><td>" + site.address + "</td><td>" + site.latitude + "</td><td>" + site.longitude + "</td><td>" + site.description + "</td></tr>";
		$("#sites tbody").append(row);
	  });
	});
  });
  