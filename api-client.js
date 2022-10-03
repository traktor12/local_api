
let target = 0;
//DISPLAY TASKS ---------------------------------------
  let newTasksUl = document.createElement("ul"); 
  newTasksUl.id = "taskUl";
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:3000/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        for(i=0; i<result.length; i++){
        let newTasksLi = document.createElement("li"); newTasksLi.className="tasksLi"; newTasksLi.id="task"+[i];
        let deleteButton = document.createElement("button"); deleteButton.className='deleteLi'; deleteButton.name=result[i]._id;
        let updateButton = document.createElement("button"); updateButton.className='updateLi'; updateButton.name=result[i]._id;
        deleteButton.innerHTML="Delete🗑️";
        updateButton.innerHTML="Update &#10227";
        let taskNumber = i+1;
        newTasksLi.innerHTML="Task " + taskNumber +": " + result[i].description;

        document.getElementById("tasksDiv").appendChild(newTasksUl);
        newTasksUl.appendChild(newTasksLi);
        newTasksUl.appendChild(deleteButton);
        newTasksUl.appendChild(updateButton);
        deleteButton.addEventListener('click', () => target=deleteButton.name);
        updateButton.addEventListener('click', () => target=updateButton.name);
        }
        document.querySelectorAll('.deleteLi').forEach(e => e.addEventListener( 'click', () => deleteTasks() ));
        document.querySelectorAll('.updateLi').forEach(e => e.addEventListener( 'click', () => updateTasks() ));
    })
    .catch((error) => console.log("error", error));


//UPDATE / PUT TASKS ------------------------------------------------
function updateTasks(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let value = document.getElementById("enterTask").value;
  let data = { description: value, done: false };

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  fetch("http://localhost:3000/"+target , requestOptions)
  .then( () => window.location.reload() )
  .catch(error => console.log('error', error));
}

//DELETE TASKS FUNCTION ------------------------------------------------
function deleteTasks(){

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:3000/"+target , requestOptions)
  .then( () => window.location.reload())
  .catch(error => console.log('error', error))
}


//MAKE NEW TASKS FUNCTION -------------------------------------------------
function addTask() {
  let value = document.getElementById("enterTask").value;
  let data = { description: value, done: false };
  fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then( () => window.location.reload() );
}

document.getElementById("submitTask").addEventListener("click", addTask);
