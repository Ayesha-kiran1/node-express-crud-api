const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Ali", email: "ali@example.com", age: 22 }
];

app.get('/', (req, res) => {
  res.json({ message: "API is working" });
});

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  
  if (!name || !email || !age) {
    return res.status(400).json({ error: "Please provide name, email, and age" });
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    age
  };

  users.push(newUser);
  res.status(201).json({ message: "User created successfully", user: newUser });
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, age } = req.body;
  users[userIndex] = {
    id: userId,
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    age: age || users[userIndex].age
  };

  res.status(200).json({ message: "User updated successfully", user: users[userIndex] });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted successfully", user: deletedUser[0] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});