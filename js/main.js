// setting up variables
let theInput = document.querySelector(".add-task input"),
  addButton = document.querySelector(".add-task .plus"),
  deleteALL = document.querySelector(".add-task .delete-all"),
  tasksContainer = document.querySelector(".tasks-content"),
  noTasksMsg = document.querySelector(".tasks-content .no-tasks-message"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span"),
  tasksArray = [];

// focus on input field
window.onload = function () {
  theInput.focus();
  let tasksFromLocal = localStorage.getItem("tasks");
  if (tasksFromLocal) {
    tasksArray = JSON.parse(tasksFromLocal);
    tasksArray.forEach(task => {
      addTaskToHtml(task);
    });
  }
};

const addTasksToLocalstorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// get input
addButton.onclick = function () {
  if (theInput.value == "") {
    swal({
      title: "Tasks Field",
      text: "You didn't add new task",
      icon: "error",
    });
  } else {
    let checker = tasksArray.includes(theInput.value);
    if (!checker) {
      tasksArray.push(theInput.value);
      addTaskToHtml(theInput.value);
      addTasksToLocalstorage(tasksArray);
    } else {
      swal({
        title: "Task is exist",
        text: "you added this task already",
        icon: "error",
      });
    }
  }
};

const addTaskToHtml = (task) => {
  noTasksMsg.innerHTML = "Your Tasks";

  let mainSpan = document.createElement("span");

  let deleteSpane = document.createElement("span");

  let textInput = document.createTextNode(task);

  let deleteText = document.createTextNode("Delete");

  mainSpan.appendChild(textInput);

  mainSpan.className = "task-box";

  deleteSpane.appendChild(deleteText);

  deleteSpane.className = "delete";

  mainSpan.appendChild(deleteSpane);

  tasksContainer.appendChild(mainSpan);

  theInput.value = "";

  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  deleteALL.classList.remove("disabled");
};

document.addEventListener("click", function (e) {
  // delete task
  if (e.target.className == "delete") {
    // remove current task
    e.target.parentNode.remove();
    let taskName = e.target.parentNode.innerText;
    let index = taskName.search("Delete");
    taskName = taskName.substring(0, index);
    tasksArray = tasksArray.filter((task) => task != taskName);
    addTasksToLocalstorage(tasksArray);

    tasksCount.innerHTML = document.querySelectorAll(
      ".tasks-content .task-box"
    ).length;
    tasksCompleted.innerHTML = document.querySelectorAll(
      ".tasks-content .finished"
    ).length;

    // if all tasks deleted return no tasks message and hide delete all button
    if (tasksCount.innerHTML == 0) {
      noTasksMsg.innerHTML = "No Tasks To Show";
      deleteALL.classList.add("disabled");
      localStorage.removeItem('tasks');
    }

  }

  // toggle class 'finished'
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    if (e.target.classList.contains("finished")) {
      tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) + 1;
    } else {
      tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) - 1;
    }
  }
});

deleteALL.onclick = function () {
  while (document.body.contains(document.querySelector(".task-box"))) {
    document.querySelector(".task-box").remove();
  }
  localStorage.removeItem('tasks');
  noTasksMsg.innerHTML = "No Tasks To Show";
  tasksCount.innerHTML = 0;
  tasksCompleted.innerHTML = 0;
  deleteALL.classList.add("disabled");
};
