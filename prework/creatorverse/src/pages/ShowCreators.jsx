import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import styles from './ShowCreators.module.css'

const ShowCreators = () => {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all creators from Supabase
  const fetchCreators = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setCreators(data || [])
    } catch (error) {
      console.error('Error fetching creators:', error)
      setError('Failed to load creators')
    } finally {
      setLoading(false)
    }
  }

  // Delete a creator
  const deleteCreator = async (id) => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id)

        if (error) {
          throw error
        }

        // Refresh the list
        fetchCreators()
      } catch (error) {
        console.error('Error deleting creator:', error)
        alert('Failed to delete creator')
      }
    }
  }

  // Load creators on component mount
  useEffect(() => {
    fetchCreators()
  }, [])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className="card">
          <h2>Loading creators...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className="card">
          <h2>Error: {error}</h2>
          <button className="btn btn-primary" onClick={fetchCreators}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className="card">
        <div className={styles.header}>
          <h2>Content Creators</h2>
          <p>Manage your content creator network</p>
        </div>
      </div>

      {creators.length === 0 ? (
        <div className="card">
          <div className={styles.emptyState}>
            <h3>No creators found</h3>
            <p>Get started by adding your first content creator!</p>
            <Link to="/creators/new" className="btn btn-primary">
              Add Creator
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.creatorsGrid}>
          {creators.map((creator) => (
            <div key={creator.id} className="card">
              {creator.imageurl && (
                <div className={styles.imageContainer}>
                  <img 
                    src={creator.imageurl} 
                    alt={creator.name}
                    className={styles.creatorImage}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <h3>{creator.name}</h3>
              {creator.url && (
                <p>
                  <strong>URL:</strong> 
                  <a href={creator.url} target="_blank" rel="noopener noreferrer" className={styles.urlLink}>
                    {creator.url}
                  </a>
                </p>
              )}
              {creator.bio && <p><strong>Bio:</strong> {creator.bio}</p>}
              
              <div style={{ marginTop: '1rem' }}>
                <Link to={`/creators/${creator.id}`} className="btn btn-secondary">
                  View Details
                </Link>
                <Link to={`/creators/${creator.id}/edit`} className="btn btn-primary">
                  Edit
                </Link>
                <button 
                  onClick={() => deleteCreator(creator.id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShowCreators
