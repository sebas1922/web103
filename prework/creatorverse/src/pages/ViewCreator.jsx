import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import styles from './ViewCreator.module.css'

const ViewCreator = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch creator details from Supabase
  const fetchCreator = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      setCreator(data)
    } catch (error) {
      console.error('Error fetching creator:', error)
      setError('Creator not found')
    } finally {
      setLoading(false)
    }
  }

  // Delete creator
  const deleteCreator = async () => {
    if (window.confirm('Are you sure you want to delete this creator? This action cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id)

        if (error) {
          throw error
        }

        // Redirect to home page
        navigate('/')
      } catch (error) {
        console.error('Error deleting creator:', error)
        alert('Failed to delete creator')
      }
    }
  }

  // Load creator on component mount
  useEffect(() => {
    fetchCreator()
  }, [id])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className="card">
          <h2>Loading creator details...</h2>
        </div>
      </div>
    )
  }

  if (error || !creator) {
    return (
      <div className={styles.container}>
        <div className="card">
          <h2>Error: {error || 'Creator not found'}</h2>
          <Link to="/" className="btn btn-primary">
            Back to Creators
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className="card">
        <h2>{creator.name}</h2>
        <p>Creator Details</p>
      </div>

      <div className={styles.details}>
        {creator.imageurl && (
          <div className={styles.imageSection}>
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
        
        <div className={styles.info}>
          {creator.url && (
            <div className={styles.section}>
              <h3>URL</h3>
              <p>
                <a href={creator.url} target="_blank" rel="noopener noreferrer" className={styles.urlLink}>
                  {creator.url}
                </a>
              </p>
            </div>
          )}

          {creator.bio && (
            <div className={styles.section}>
              <h3>Bio</h3>
              <p>{creator.bio}</p>
            </div>
          )}

          <div className={styles.section}>
            <h3>Account Information</h3>
            <p><strong>Created:</strong> {new Date(creator.created_at).toLocaleDateString()}</p>
            {creator.updated_at && (
              <p><strong>Last Updated:</strong> {new Date(creator.updated_at).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <Link to={`/creators/${creator.id}/edit`} className="btn btn-primary">
            Edit Creator
          </Link>
          <button onClick={deleteCreator} className="btn btn-danger">
            Delete Creator
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to All Creators
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewCreator
