const inputBox = document.getElementById("input-box");
const addButton = document.getElementById("add-button");
const listContainer = document.getElementById("list-container");
const undoStack = []; // For storing actions for undo

addButton.addEventListener("click", addTask);
inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


document.addEventListener("keydown", function (event) {
    if ((event.key === "Backspace" || event.key === "Delete") && !inputBox.matches(":focus")) {
        removeFirstTask();
    } else if (event.ctrlKey && event.key === "z") {
        undo();
    }
});


function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
        undoStack.push("add"); // Store action for undo
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        undoStack.push("toggle"); // Store action for undo
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        undoStack.push("remove"); // Store action for undo
    }
}, false);

function removeFirstTask() {
    const firstTask = listContainer.querySelector("li");
    if (firstTask) {
        undoStack.push("remove"); // Store action for undo
        firstTask.remove();
        saveData();
    }
}

function undo() {
    const action = undoStack.pop();
    if (action === "add" || action === "toggle") {
        const lastTask = listContainer.querySelector("li:last-child");
        if (lastTask) {
            lastTask.remove();
            saveData();
        }
    } else if (action === "remove") {
        showTask(); // Restore the previous state from localStorage
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
