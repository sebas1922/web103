export interface Stage {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface FestivalEvent {
  id: number;
  artist_name: string;
  start_time: string;
  genre: string;
  image_url: string;
  stage_id: number;
}

export type EventStatus = 'upcoming' | 'now' | 'past';

