var dragItem = null;

function drag(event) {
  dragItem = event.target;
  event.dataTransfer.setData("text", "");
}

function drop(event) {
  event.preventDefault();
  var targetItem = event.target;
  while (targetItem.tagName !== "LI") {
    targetItem = targetItem.parentNode;
  }
  var parent = targetItem.parentNode;
  var temp = document.createElement("li");
  parent.insertBefore(temp, targetItem);
  parent.insertBefore(dragItem, targetItem);
  parent.insertBefore(targetItem, temp);
  parent.removeChild(temp);
}