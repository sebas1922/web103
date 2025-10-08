import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Stage, FestivalEvent } from '../types';
import { stagesService } from '../services/stagesService';
import { eventsService } from '../services/eventsService';
import { getEventStatus, getTimeUntilEvent } from '../utils/eventStatus';
import './HomePage.css';

const HomePage = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<FestivalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stagesData, eventsData] = await Promise.all([
          stagesService.getAllStages(),
          eventsService.getAllEvents(),
        ]);
        setStages(stagesData);
        
        // Filter for upcoming and current events only
        const currentAndUpcoming = eventsData.filter(event => {
          const status = getEventStatus(event);
          return status === 'upcoming' || status === 'now';
        }).slice(0, 8); // Take top 8 events
        
        setUpcomingEvents(currentAndUpcoming);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStageClick = (stageId: number) => {
    navigate(`/stages/${stageId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Festival Pulse...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-background"></div>
      
      <header className="header">
        <h1 className="title">🎵 Festival Pulse</h1>
        <p className="subtitle">Experience the rhythm of live music</p>
      </header>

      {/* Upcoming Events Ticker */}
      <div className="events-ticker glass">
        <h3 className="ticker-title">⚡ Happening Soon</h3>
        <div className="ticker-events">
          {upcomingEvents.map(event => {
            const status = getEventStatus(event);
            return (
              <div key={event.id} className={`ticker-event ${status}`}>
                <span className="ticker-artist">{event.artist_name}</span>
                <span className="ticker-time">{getTimeUntilEvent(event)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Stage Map */}
      <div className="stage-map-container">
        <h2 className="map-title">Select a Stage</h2>
        <div className="stage-grid">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`stage-card glass ${hoveredStage === stage.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => handleStageClick(stage.id)}
            >
              <div 
                className="stage-image"
                style={{ backgroundImage: `url(${stage.image_url})` }}
              >
                <div className="stage-overlay"></div>
              </div>
              <div className="stage-info">
                <h3 className="stage-name">{stage.name}</h3>
                <p className="stage-description">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

