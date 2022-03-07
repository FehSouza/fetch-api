import { createElement } from './src/utils/index.js';

const $getButton = createElement('button', { textContent: 'Get users' });
const $addButton = createElement('button', { textContent: 'Add user' });
const $updateButton = createElement('button', { textContent: 'Update user' });
const $update2Button = createElement('button', { textContent: 'Update user 2' });
const $deleteButton = createElement('button', { textContent: 'Delete last user' });
const $buttonWrapper = createElement('div', {
  children: [$getButton, $addButton, $updateButton, $update2Button, $deleteButton],
});

const $list = createElement('ul');

const renderUsers = (arr) => {
  $list.innerHTML = '';
  for (const user of arr) {
    const $card = createElement('li', { textContent: `${user.id}: ${user.name} ${user.lastname}` });
    $list.appendChild($card);
  }
};

const $container = document.querySelector('.container');
$container.appendChild($buttonWrapper);
$container.appendChild($list);

let users = [];

const getUsers = async () => {
  const response = await fetch('http://localhost:3000/users');
  const result = await response.json();
  return result;
};

const handleGetUsers = async () => {
  const result = await getUsers();
  users = result;
  renderUsers(result);
};

const addUser = async (user) => {
  await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
};

const handleAddUser = () => {
  addUser({ id: Math.random() * 99, name: 'teste', lastname: 'teste2' });
};

const updateUser = async (user) => {
  await fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
};

const handleUpdateUser = () => {
  updateUser({ id: 1, name: 'batata', lastname: 'batatinha' });
};

const handleUpdateUser2 = () => {
  updateUser({ id: 1, name: 'teste', lastname: 'concordo' });
};

const deleteUser = async (id) => {
  await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
};

const handleDeleteUser = () => {
  deleteUser(users[users.length - 1].id);
};

$getButton.addEventListener('click', handleGetUsers);
$addButton.addEventListener('click', handleAddUser);
$updateButton.addEventListener('click', handleUpdateUser);
$update2Button.addEventListener('click', handleUpdateUser2);
$deleteButton.addEventListener('click', handleDeleteUser);
