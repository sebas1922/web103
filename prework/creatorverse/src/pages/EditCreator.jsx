import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import styles from './EditCreator.module.css'

const EditCreator = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    imageurl: '',
    bio: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // Fetch creator data for editing
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

      setFormData({
        name: data.name || '',
        url: data.url || '',
        imageurl: data.imageurl || '',
        bio: data.bio || ''
      })
    } catch (error) {
      console.error('Error fetching creator:', error)
      setError('Creator not found')
    } finally {
      setLoading(false)
    }
  }

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
      setSaving(true)
      setError(null)

      const { error } = await supabase
        .from('creators')
        .update(formData)
        .eq('id', id)

      if (error) {
        throw error
      }

      // Redirect to the creator's detail page
      navigate(`/creators/${id}`)
    } catch (error) {
      console.error('Error updating creator:', error)
      setError('Failed to update creator. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Load creator data on component mount
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

  if (error) {
    return (
      <div className={styles.container}>
        <div className="card">
          <h2>Error: {error}</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Creators
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className="card">
        <h2>Edit Creator</h2>
        <p>Update the information for this content creator</p>
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
              disabled={saving}
            >
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate(`/creators/${id}`)}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCreator
