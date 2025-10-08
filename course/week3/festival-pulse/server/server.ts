import express from 'express';
import cors from 'cors';
import { AppConfig } from './config/env';
import eventsRouter from './api/events/events.route';
import stagesRouter from './api/stages/stages.route';

const app = express();
const port = AppConfig.PORT;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/stages', stagesRouter);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});