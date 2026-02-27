import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key-change-in-production'; // In a real app, use environment variable

app.use(cors());
app.use(bodyParser.json());

// Simple JSON DB
const DB_FILE = path.join(__dirname, 'db.json');

interface User {
  id: string;
  username: string;
  passwordHash: string; // In a real app, hash passwords!
}

interface Story {
  id: string;
  userId: string;
  cardId: string;
  content: string;
  score?: number;
  bestScore?: number;
  updatedAt: string;
}

interface DB {
  users: User[];
  stories: Story[];
}

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], stories: [] }));
}

const getDB = (): DB => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
const saveDB = (db: DB) => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  const db = getDB();

  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser: User = {
    id: Date.now().toString(),
    username,
    passwordHash: password // WARNING: Plaintext for demo only!
  };

  db.users.push(newUser);
  saveDB(db);

  const token = jwt.sign({ id: newUser.id, username: newUser.username }, SECRET_KEY);
  res.json({ token, user: { id: newUser.id, username: newUser.username } });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = getDB();
  const user = db.users.find(u => u.username === username && u.passwordHash === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
  res.json({ token, user: { id: user.id, username: user.username } });
});

app.get('/api/history', authenticateToken, (req: any, res) => {
  const db = getDB();
  const userStories = db.stories.filter(s => s.userId === req.user.id);
  // Sort by updatedAt desc
  userStories.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  res.json(userStories);
});

app.post('/api/history', authenticateToken, (req: any, res) => {
  const { cardId, content, score } = req.body;
  const db = getDB();
  
  const existingStoryIndex = db.stories.findIndex(s => s.userId === req.user.id && s.cardId === cardId);
  const existingStory = existingStoryIndex >= 0 ? db.stories[existingStoryIndex] : null;

  let bestScore = existingStory?.bestScore;
  
  // Update bestScore if a new score is provided and it's higher than the previous best
  if (score !== undefined) {
    if (bestScore === undefined || score > bestScore) {
      bestScore = score;
    }
  }

  const story: Story = {
    id: existingStory ? existingStory.id : Date.now().toString(),
    userId: req.user.id,
    cardId,
    content,
    score: score !== undefined ? score : existingStory?.score,
    bestScore,
    updatedAt: new Date().toISOString()
  };

  if (existingStoryIndex >= 0) {
    db.stories[existingStoryIndex] = story;
  } else {
    db.stories.push(story);
  }
  
  saveDB(db);
  res.json(story);
});

// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production (if built)
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
