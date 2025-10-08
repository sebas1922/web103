import { Router } from 'express';
import { getAllEventsController, getEventByIdController } from './events.controller';

const eventsRouter = Router();

eventsRouter.get('/', getAllEventsController);
eventsRouter.get('/:id', getEventByIdController);

export default eventsRouter;    