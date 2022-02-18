// BEGIN PART 2
countDisplay = document.getElementById("count-display");
subtractButton = document.getElementById("subtract");
addButton = document.getElementById("add");

// END PART 2

// BEGIN PART 3

let count = 0;
addButton.addEventListener("click", () => {
  count += 1;
  countDisplay.innerHTML = count;
});
subtractButton.addEventListener("click", () => {
  count -= 1;
  countDisplay.innerHTML = count;
});
// END PART 3

// BEGIN PART 5
const taskName = document.getElementById("task-name");
const submitButton = document.getElementById("submit");
const clearButton = document.getElementById("clear");
const undoButton = document.getElementById("undo");
const taskList = document.getElementById("tasks");
// END PART 5

// BEGIN PART 6

submitButton.addEventListener("click", () => {
  if (taskName.value != "") {
    const task = document.createElement("li");
    task.innerHTML = taskName.value;
    taskList.appendChild(task);
    document.getElementById("task-name").value = "";
  }
});

undoButton.addEventListener("click", () => {
  if (taskList.length != 0) {
    taskList.removeChild(taskList.lastElementChild);
    document.getElementById("task-name").value = "";
  }
});

clearButton.addEventListener("click", () => {
  taskList.replaceChildren();
  taskName.value = "";
  document.getElementById("task-name").value = "";
});

// END PART 6

taskName.addEventListener("input", () => {
  if (taskName.value == "Cal Hacks") {
    countDisplay.style.color = "steelblue";
  }
});
