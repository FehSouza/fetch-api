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

const getUsers = async () => {
  const response = await fetch('http://localhost:3000/users');
  const result = await response.json();
  console.log(response, result);
  return result;
};

const handleGetUsers = async () => {
  try {
    const users = await getUsers();
    renderUsers(users);
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (user) => {
  await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
};

const handleAddUser = () => {
  addUser({ id: Math.random() * 999, name: 'fe', lastname: 'souza' });
};

const updateUser = () => {};

$getButton.addEventListener('click', handleGetUsers);
$addButton.addEventListener('click', handleAddUser);
