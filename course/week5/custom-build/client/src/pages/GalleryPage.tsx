import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllBuilds, deleteBuild } from '../services/api';
import type { CustomBuild } from '../types';
import '../styles/Gallery.css';

const GalleryPage = () => {
    const navigate = useNavigate();
    const [builds, setBuilds] = useState<CustomBuild[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBuilds();
    }, []);

    const loadBuilds = async () => {
        try {
            setLoading(true);
            const data = await fetchAllBuilds();
            setBuilds(data);
        } catch (err) {
            setError('Failed to load builds');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this build?')) {
            return;
        }

        try {
            await deleteBuild(id);
            setBuilds(builds.filter((build) => build.id !== id));
        } catch (err) {
            alert('Failed to delete build');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="gallery-page">
                <div className="loading">Loading builds...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="gallery-page">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="gallery-page">
            <header className="gallery-header">
                <h1>Your Custom Builds</h1>
                <button className="nav-button" onClick={() => navigate('/')}>
                    Create New Build
                </button>
            </header>

            {builds.length === 0 ? (
                <div className="empty-state">
                    <p>No builds yet. Create your first one!</p>
                    <button className="cta-button" onClick={() => navigate('/')}>
                        Start Building
                    </button>
                </div>
            ) : (
                <div className="builds-grid">
                    {builds.map((build) => (
                        <div key={build.id} className="build-card">
                            <div className="build-preview">
                                <svg viewBox="0 0 400 200" className="car-svg">
                                    <rect x="50" y="80" width="300" height="80" rx="10" fill="currentColor" opacity="0.2" />
                                    <rect x="80" y="50" width="160" height="60" rx="5" fill="currentColor" opacity="0.3" />
                                    <circle cx="120" cy="160" r="25" fill="currentColor" opacity="0.4" />
                                    <circle cx="280" cy="160" r="25" fill="currentColor" opacity="0.4" />
                                </svg>
                            </div>

                            <div className="build-info">
                                <div className="build-price">${build.total_price.toLocaleString()}</div>
                                
                                <div className="build-specs">
                                    <div className="spec-item">
                                        <span className="spec-label">Exterior:</span>
                                        <span className="spec-value">{build.exterior_color_name}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Interior:</span>
                                        <span className="spec-value">{build.interior_color_name}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Body:</span>
                                        <span className="spec-value">{build.body_style_name}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Wheels:</span>
                                        <span className="spec-value">{build.wheels_name}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Package:</span>
                                        <span className="spec-value">{build.performance_package_name}</span>
                                    </div>
                                </div>

                                <div className="build-meta">
                                    <span className="build-date">
                                        {new Date(build.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="build-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => navigate(`/edit/${build.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(build.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;

