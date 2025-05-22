let tasks = [];

// ===== DARK MODE =====
$(document).ready(function () {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) $('body').addClass('dark');

  $('#toggle-dark-mode').click(function () {
    $('body').toggleClass('dark');
    localStorage.setItem("darkMode", $('body').hasClass('dark'));
    $(this).text($('body').hasClass('dark') ? '☀️' : '🌙');
  });

  $('#toggle-dark-mode').text(isDark ? '☀️' : '🌙');

  // Load & render task
  loadTasksFromLocalStorage();
  renderTasks();

  $('#add-task').click(function () {
    addTask();
  });

  $('#new-task').keypress(function (e) {
    if (e.which === 13) addTask();
  });

  $('#task-list').on('click', '.delete-btn', function () {
    let index = $(this).parent().data('index');
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
  });

  $('#task-list').on('click', '.task-text', function () {
    let index = $(this).parent().data('index');
    tasks[index].done = !tasks[index].done;
    saveTasksToLocalStorage();
    renderTasks();
  });
});

function addTask() {
  let text = $('#new-task').val().trim();
  if (text === '') {
    alert('Vui lòng nhập công việc.');
    return;
  }

  tasks.push({ text: text, done: false });
  saveTasksToLocalStorage();
  renderTasks();
  $('#new-task').val('');
}

function renderTasks() {
  $('#task-list').empty();
  tasks.forEach((task, index) => {
    let li = $(`
      <li class="list-group-item d-flex justify-content-between align-items-center" data-index="${index}">
        <span class="task-text ${task.done ? 'completed' : ''}">${task.text}</span>
        <button class="btn btn-danger btn-sm delete-btn">Xóa</button>
      </li>
    `);
    $('#task-list').append(li);
  });
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  let saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
  }
}
