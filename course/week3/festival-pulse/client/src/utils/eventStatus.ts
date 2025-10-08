import type { FestivalEvent, EventStatus } from '../types';

export const getEventStatus = (event: FestivalEvent): EventStatus => {
  const now = new Date();
  const eventTime = new Date(event.start_time);
  const oneHourInMs = 60 * 60 * 1000;
  const timeDiff = eventTime.getTime() - now.getTime();

  if (timeDiff < -oneHourInMs) {
    return 'past';
  } else if (timeDiff >= -oneHourInMs && timeDiff <= oneHourInMs) {
    return 'now';
  } else {
    return 'upcoming';
  }
};

export const sortEventsByStatus = (events: FestivalEvent[]): FestivalEvent[] => {
  
  const upcoming = events.filter(e => {
    const status = getEventStatus(e);
    return status === 'upcoming';
  }).sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  
  const happening = events.filter(e => getEventStatus(e) === 'now');
  
  const past = events.filter(e => getEventStatus(e) === 'past')
    .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
  
  return [...happening, ...upcoming, ...past];
};

export const formatEventTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getTimeUntilEvent = (event: FestivalEvent): string => {
  const now = new Date();
  const eventTime = new Date(event.start_time);
  const diffMs = eventTime.getTime() - now.getTime();
  
  if (diffMs < 0) {
    return 'Event has passed';
  }
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

