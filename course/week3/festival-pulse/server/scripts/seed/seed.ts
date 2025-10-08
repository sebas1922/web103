import client from '../../config/database';
import { data } from './data';

const seed = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    
    await createStages();
    await createEvents();
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
};

const createStages = async () => {
  console.log('Creating Stages');
  
  for (const stage of data.stages) {
    try {
      await client.query(
        'INSERT INTO stages (name, description, image_url) VALUES ($1, $2, $3)', 
        [stage.name, stage.description, stage.image_url]
      );
      console.log(`Created Stage ${stage.name}`);
    } catch (error) {
      console.error(`Error creating stage ${stage.name}:`, error);
    }
  }
};

const createEvents = async () => {
  console.log('Creating Events');
  
  for (const event of data.events) {
    try {
      await client.query(
        'INSERT INTO events (artist_name, start_time, genre, image_url, stage_id) VALUES ($1, $2, $3, $4, $5)', 
        [event.artist_name, event.start_time, event.genre, event.image_url, event.stage_id]
      );
      console.log(`Created Event ${event.artist_name}`);
    } catch (error) {
      console.error(`Error creating event ${event.artist_name}:`, error);
    }
  }
};

// Run the seed function
seed();

