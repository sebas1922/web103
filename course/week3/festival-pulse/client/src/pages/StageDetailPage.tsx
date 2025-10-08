import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Stage, FestivalEvent } from '../types';
import { stagesService } from '../services/stagesService';
import { sortEventsByStatus } from '../utils/eventStatus';
import EventCard from '../components/EventCard';
import './StageDetailPage.css';

const StageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage | null>(null);
  const [events, setEvents] = useState<FestivalEvent[]>([]);
  const [allStages, setAllStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [stageData, eventsData, stagesData] = await Promise.all([
          stagesService.getStageById(Number(id)),
          stagesService.getStageEvents(Number(id)),
          stagesService.getAllStages(),
        ]);
        
        setStage(stageData);
        setEvents(sortEventsByStatus(eventsData));
        setAllStages(stagesData);
      } catch (error) {
        console.error('Error fetching stage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStageChange = (newStageId: string) => {
    navigate(`/stages/${newStageId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading stage...</p>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="error-container">
        <h2>Stage not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="stage-detail-page">
      <div 
        className="stage-background"
        style={{ backgroundImage: `url(${stage.image_url})` }}
      ></div>

      <div className="stage-content">
        <header className="stage-header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back
          </button>
          
          <div className="stage-select-container glass">
            <label htmlFor="stage-select">Stage:</label>
            <select 
              id="stage-select"
              value={id}
              onChange={(e) => handleStageChange(e.target.value)}
              className="stage-select"
            >
              {allStages.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="stage-info-banner glass">
          <h1 className="stage-title">{stage.name}</h1>
          <p className="stage-desc">{stage.description}</p>
        </div>

        <div className="events-section">
          <h2 className="events-title">Event Lineup</h2>
          
          {events.length === 0 ? (
            <div className="no-events glass">
              <p>No events scheduled for this stage yet.</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StageDetailPage;

