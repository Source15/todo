//получаемэлементы со страницы
const highInput = document.getElementById("highInput");
const lowInput = document.getElementById("lowInput");
const BtnOne = document.getElementById("BtnOne");
const BtnTwo = document.getElementById("BtnTwo");
const todosListHigh = document.querySelector(".todosListHigh");
const todoslistLow = document.querySelector(".todoslistLow");


//массив обьектов
const list = [];

//обьект со статусами
const STATUS = {
  DONE: "Done",
  TO_DO: "To Do",
};
//обьект с приоритетами
const PRIORITY = {
  HIGH: "high",
  LOW: "low",
};


//функция добавления
function addTask(task , status = STATUS.TO_DO, priority) {
  if(task){
       const todo = {
         name: task,
         status: status,
         priority: priority,
         id: `${Math.random()}`,
       };
       list.push(todo);
   
  }else{
     alert("Введите задачу!");
    
  }
}

//создание создания таска
function createTask(priority, taskList, id) {
  const task = document.createElement("li");
  const label = document.createElement("label");
  const divCheck = document.createElement("div");
  const span = document.createElement("span");
  const closeBtn = document.createElement("img");

  task.classList.add("item");
  label.classList.add("item-label");
  divCheck.classList.add("check");
  span.classList.add("item-text");
  span.id = id;
  closeBtn.classList.add("close");
  closeBtn.src = "img/close.png";

  priority.prepend(task);
  task.append(label);
  label.append(divCheck);
  label.append(span);
  label.append(closeBtn);

  divCheck.addEventListener("click", (event) => {
    task.classList.toggle("checked");
    if (event.target.classList.contains("checked")) {
      event.target.classList.remove("checked");
      changeStatus(taskList, STATUS.TO_DO);
    } else {
      event.target.classList.add("checked");
      changeStatus(taskList, STATUS.DONE);
    }
  });

  closeBtn.addEventListener("click", () => {
    task.remove();
    deleteTask(taskList);
  });

  span.textContent = taskList.name;
  return task;
}

//Функция рендера
function render() {
  document.querySelectorAll(".item").forEach((task) => task.remove());

  

  list.map((task) => {
    if (task.priority === PRIORITY.HIGH) {
      createTask(todosListHigh, task, task.id);
    } else {
      createTask(todoslistLow, task, task.id);
    }
  });
}


//смена статуса
function changeStatus(task, status) {
	const result = list.find(item => item.name === task.name);

	return result.status = status;
};


// удаление таска
function deleteTask(task) {
  const findItem = list.findIndex((item) => item.name === task.name);

  
    if (findItem !== -1) {
      list.splice([findItem], 1);
    } else {
      throw new Error("Задача не может быть удалена(индекс = -1)");
    }

}

//обработчики событий
BtnOne.addEventListener("click", () => {
  const task = highInput.value;

  addTask(task, STATUS.TO_DO, PRIORITY.HIGH);

  render();
});

BtnTwo.addEventListener("click", () => {
  const task = lowInput.value;

  addTask(task, STATUS.TO_DO, PRIORITY.LOW);

  render();
});

highInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    BtnOne.click();
  }
});

lowInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    BtnOne.click();
  }
});


console.log(list);
