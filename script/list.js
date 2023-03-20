function addTable(hotWord){
	$(document).ready(function() {
	  $.getJSON("./res/spots-info.json", function(data) {
		$.each(data, function(index, site) {
		  const spotID = `${site.name} ${site.address} ${site.latitude} ${site.longitude}`.toLowerCase();
		  if (spotID.includes(hotWord) || hotWord === "all"){
			var row = "<tr draggable=\"true\" ondragstart=\"drag(event)\"><td>" + site.name + "</td><td>" + site.address + "</td><td>" + site.latitude + "</td><td>" + site.longitude + "</td><td class=\"truncate\">" + site.description + "</td></tr>";
			$("#sites tbody").append(row); // add the row to the table
			$("#sites tbody tr:last-child").addClass("fade-in"); // add CSS class to trigger animation
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


// Drag

function drag(event) {
	event.dataTransfer.setData("text", event.target.id);
  }
  
  function drop(event) {
	event.preventDefault();
	var data = event.dataTransfer.getData("text");
	event.target.appendChild(document.getElementById(data));
  }
  
  function allowDrop(event) {
	event.preventDefault();
  }