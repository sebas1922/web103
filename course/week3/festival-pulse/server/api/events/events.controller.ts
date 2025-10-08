import { Request, Response } from 'express';
import { getAllEvents, getEventById, getEventsByStageId } from './events.service';

export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  }
  catch (error) {
    console.error('Error getting all events', error);
    res.status(500).json({ error: 'Error getting all events' });
  }
};

export const getEventByIdController = async (req: Request, res: Response) => {
  try {
    const event = await getEventById(req.params.id);
    res.status(200).json(event);
  }
  catch (error) {
    console.error('Error getting event by id', error);
    res.status(500).json({ error: 'Error getting event by id' });
  }
};

export const getEventsByStageIdController = async (req: Request, res: Response) => {
  try {
    const events = await getEventsByStageId(req.params.id);
    res.status(200).json(events);
  }
  catch (error) {
    console.error('Error getting events by stage id', error);
    res.status(500).json({ error: 'Error getting events by stage id' });
  }
};

