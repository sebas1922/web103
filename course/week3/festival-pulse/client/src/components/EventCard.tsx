import { useState } from 'react';
import type { FestivalEvent } from '../types';
import { getEventStatus, formatEventTime, getTimeUntilEvent } from '../utils/eventStatus';
import './EventCard.css';

interface EventCardProps {
  event: FestivalEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const status = getEventStatus(event);

  return (
    <div 
      className={`event-card glass ${status}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="event-image"
        style={{ backgroundImage: `url(${event.image_url})` }}
      >
        <div className="event-image-overlay"></div>
        <div className={`status-badge ${status}`}>
          {status === 'now' ? '🔴 LIVE NOW' : 
           status === 'upcoming' ? '⏰ Upcoming' : 
           '✓ Completed'}
        </div>
      </div>

      <div className="event-content">
        <h3 className="event-artist">{event.artist_name}</h3>
        
        <div className={`event-details ${isHovered ? 'visible' : ''}`}>
          <div className="event-info-row">
            <span className="info-label">🎵 Genre:</span>
            <span className="info-value">{event.genre}</span>
          </div>
          
          <div className="event-info-row">
            <span className="info-label">📅 Time:</span>
            <span className="info-value">{formatEventTime(event.start_time)}</span>
          </div>
          
          {status !== 'past' && (
            <div className="event-countdown">
              {status === 'now' ? 'Happening Now!' : getTimeUntilEvent(event)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

