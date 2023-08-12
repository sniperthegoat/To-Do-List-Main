const inputBox = document.getElementById("input-box")
const listContainter = document.getElementById("list-containter")

function addTake(){
    if(inputBox.value === ' '){
        alert("You must write something!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainter.appendChild(li);
    }
    inputBox.value = ""; 
    
}