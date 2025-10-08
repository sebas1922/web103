import { api } from './api';
import type { Stage, FestivalEvent } from '../types';

export const stagesService = {
  getAllStages: () => api.get<Stage[]>('/api/stages'),
  
  getStageById: (id: number) => api.get<Stage>(`/api/stages/${id}`),
  
  getStageEvents: (id: number) => api.get<FestivalEvent[]>(`/api/stages/${id}/events`),
};

