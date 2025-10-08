import { api } from './api';
import type { FestivalEvent } from '../types';

export const eventsService = {
  getAllEvents: () => api.get<FestivalEvent[]>('/api/events'),
  
  getEventById: (id: number) => api.get<FestivalEvent>(`/api/events/${id}`),
};

