import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import styles from './AddCreator.module.css'

const AddCreator = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    imageurl: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Supabase configuration is missing. Please check your .env file.')
      }

      console.log('Submitting creator data:', formData)

      const { data, error } = await supabase
        .from('creators')
        .insert([formData])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Creator added successfully:', data)

      // Redirect to the new creator's detail page
      if (data && data[0]) {
        navigate(`/creators/${data[0].id}`)
      } else {
        // If no data returned, redirect to home
        navigate('/')
      }
    } catch (error) {
      console.error('Error adding creator:', error)
      
      // Provide more specific error messages
      if (error.message.includes('configuration is missing')) {
        setError('Database configuration error. Please check your environment variables.')
      } else if (error.message.includes('relation "creators" does not exist')) {
        setError('Database table "creators" does not exist. Please create it in your Supabase project.')
      } else if (error.message.includes('duplicate key')) {
        setError('A creator with this name already exists.')
      } else {
        setError(`Failed to add creator: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className="card">
        <h2>Add New Creator</h2>
        <p>Enter the details for your new content creator</p>
      </div>

      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter creator's full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageurl">Profile Image URL</label>
            <input
              type="url"
              id="imageurl"
              name="imageurl"
              value={formData.imageurl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter a brief bio about the creator"
              rows="4"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding Creator...' : 'Add Creator'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCreator
