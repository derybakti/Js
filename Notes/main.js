const notesBox = document.querySelector(".notesBox");
const createBtn = document.querySelector(".btn");
let note = document.querySelector(".note");


function getData() {
    notesBox.innerHTML = localStorage.getItem("notes");

}
getData();

function saveData() {
    localStorage.setItem("notes", notesBox.innerHTML);
}

createBtn.addEventListener("click", () => {
    let parent = document.createElement("div");
    let inputBox = document.createElement("p")
    let icon = document.createElement("i");

    parent.classList.add("note");
    inputBox.classList.add("inputBox");
    inputBox.setAttribute("contenteditable", "true");
    icon.classList.add("fa-regular", "fa-trash-can");

    notesBox.appendChild(parent);
    parent.appendChild(inputBox);
    parent.appendChild(icon);
})

notesBox.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        e.target.parentElement.remove();
        saveData();
    }

    else if (e.target.tagName === "P") {
        note = document.querySelectorAll(".note");
        note.forEach(nt => {
            nt.onkeyup = () => {
                saveData();
            }
        });
    }
})