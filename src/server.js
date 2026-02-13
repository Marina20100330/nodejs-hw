import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

const notes = [
  { id: '1', title: 'Первая заметка', content: 'Содержимое 1' },
  { id: '2', title: 'Вторая заметка', content: 'Содержимое 2' },
];

app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  const note = notes.find(n => n.id === noteId);
  
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  res.status(200).json(note);
});

app.get("/test-error", (req, res) => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  req.log.error(err.message);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});