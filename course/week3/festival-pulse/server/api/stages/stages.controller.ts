import { Request, Response } from 'express';
import { getAllStages, getStageById } from './stages.service';


const getStages = async (req: Request, res: Response) => {
  try {
  const stages = await getAllStages();
  res.json(stages);
  } catch (error) {
    console.error('Error getting all stages', error);
    res.status(500).json({ error: 'Error getting all stages' });
  }
};

const getStage = async (req: Request, res: Response) => {
  try {
    const stage = await getStageById(req.params.id);
    res.status(200).json(stage);
  } catch (error) {
    console.error('Error getting stage by id', error);
    res.status(500).json({ error: 'Error getting stage by id' });
  }
};

export { getStages, getStage };