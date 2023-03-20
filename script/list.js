function addTable(hotWord){
$(document).ready(function() {
	$.getJSON("./res/spots-info.json", function(data) {
	  $.each(data, function(index, site) {
		const spotID = `${site.name} ${site.address} ${site.latitude} ${site.longitude}`.toLowerCase();
		if (spotID.includes(hotWord) || hotWord === "all"){
			var row = "<tr><td>" + site.name + "</td><td>" + site.address + "</td><td>" + site.latitude + "</td><td>" + site.longitude + "</td><td>" + site.description + "</td></tr>";
			$("#sites tbody").append(row);
		}
	  });
	});
  });
}
function clearTable() {
	$('#sites tbody').empty();
}  
addTable('all');

//Search Implementation
const inputField = document.querySelector('input');
inputField.addEventListener('input', () => {
  //clear table
  	const searchStr = inputField.value.toLowerCase();
	clearTable();
	addTable(searchStr);
});
