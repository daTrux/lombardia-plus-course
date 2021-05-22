const idCreator = () => {
  return Math.floor(Math.random() * 0x10000).toString(16);
};
let toDos = [];
createTodos = todosObj => {
  if (todosObj && todosObj.length > 0) {
    todosObj.forEach(todo => {
      console.log(todo);
      $(".todos").append(
        `<div id="${todo.id}" class="m-2 p-2 card todo-object cursor-pointer not-completed d-flex flex-row "> <h5 class="my-auto">${todo.title}</h5> </div>`
      );
    });
  }
};
getTodos = numbers => {
  $.ajax({
    accepts: "application/json",
    url: "https://jsonplaceholder.typicode.com/posts"
  }).done(val => {
    val.length = 10;
    val.map(x => {
      x.id = idCreator();
      return x;
    });
    createTodos(val);
    toDos = [...toDos, ...val];
  });
};

$(document).ready(getTodos.bind(10));
$(".todos").on("click", ".not-completed", function(ev) {
  const clickedElementId = ev.currentTarget.id;
  $(`#${clickedElementId}`).prepend(
    "<i class='mr-2 fas fa-check color-green my-auto width-fit my-auto'></i>"
  );

  $(`#${clickedElementId}`).addClass("completed");
  $(`#${clickedElementId}`).removeClass("not-completed");
  $(`#${clickedElementId}`).removeClass("cursor-pointer");
  toDos.find(x => x.id === clickedElementId).completed = true;
  if (toDos.every(x => x.completed)) {
    alert("complimenti hai completato tutti i tuoi task");
  }
});
