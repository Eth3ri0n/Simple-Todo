const form = document.querySelector('form');
const input = document.querySelector('form>input');
const ul = document.querySelector('ul');

// Add event listener to form
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const Text = input.value;
  input.value = '';
  AddTodo(Text);
});

// Array of objects
const Todos = [
  { Task: 'Buy Groceries', isDone: false, EditMode: false },
  { Task: 'Do Laundry', isDone: false, EditMode: false },
  { Task: 'Clean Room', isDone: true, EditMode: true },
];

// Function to display todos
const DisplayTodo = () => {
  const TodosNode = Todos.map((todo, index) => {
    if (todo.EditMode) {
      return CreateTodoEditElement(todo, index);
    } else {
      return CreateTodoElement(todo, index);
    }
  });
  ul.innerHTML = '';
  ul.append(...TodosNode);
};

// Function to create todo element
const CreateTodoElement = (todo, index) => {
  const li = document.createElement('li');
  li.addEventListener('dblclick', (event) => {
    toggleEditMode(index);
  });

  // Create Edit button
  const EditButton = document.createElement('button');
  EditButton.innerHTML = 'Edit';
  EditButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  // Create Delete button
  const DeleteButton = document.createElement('button');
  DeleteButton.innerHTML = 'Delete';
  DeleteButton.addEventListener('click', (event) => {
    DeleteTodo(index);
    event.stopPropagation();
  });

  // Create todo element
  li.innerHTML = `
        <span class="todo ${todo.isDone ? 'done' : ''}"></span>
        <p class="${todo.isDone ? 'done' : ""}">${todo.Task}</p>
    `;
  li.addEventListener('click', (event) => {
    ToggleTodo(index);
  });
  li.append(EditButton, DeleteButton);
  return li;
};

// Function to create todo edit element
const CreateTodoEditElement = (todo, index) => {
  const li = document.createElement('li');

  // Create input element
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.Task;

  // Add event listener to input
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      Todos[index].Task = input.value;
      toggleEditMode(index);
    } else if (event.key === 'Escape') {
      toggleEditMode(index);
    }
  });

  // Create Save button
  const SaveButton = document.createElement('button');
  SaveButton.innerHTML = 'Save';
  SaveButton.addEventListener('click', (event) => {
    event.stopPropagation();
    Todos[index].Task = input.value;
    toggleEditMode(index);
  });

  // Create Cancel button
  const CancelButton = document.createElement('button');
  CancelButton.innerHTML = 'Cancel';
  CancelButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.append(input, CancelButton, SaveButton);

  return li;
};

// Function to add todo
const AddTodo = (Task) => {
  Task = Task.trim();
  if (Task) {
    Todos.push({
      Task: `${Task[0].toUpperCase()}${Task.slice(1)}`,
      isDone: false,
    });
    DisplayTodo();
  }
};

// Function to toggle todo
const ToggleTodo = (index) => {
  Todos[index].isDone = !Todos[index].isDone;
  DisplayTodo();
};

// Function to toggle edit mode
const toggleEditMode = (index) => {
  Todos[index].EditMode = !Todos[index].EditMode;
  DisplayTodo();
};

// Function to delete todo
const DeleteTodo = (index) => {
  Todos.splice(index, 1);
  DisplayTodo();
};

// Display todos
DisplayTodo();