import { Router } from 'express';
import { getStage, getStages } from './stages.controller';
import { getEventsByStageIdController } from '../events/events.controller';

const stagesRouter = Router();

stagesRouter.get('/', getStages);
stagesRouter.get('/:id', getStage);
stagesRouter.get('/:id/events', getEventsByStageIdController);

export default stagesRouter;