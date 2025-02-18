import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = () => {
  // State for form fields with additional fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    occupation: '',
    bio: '',
    interests: []
  });
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  
  // State for form interaction
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  // Available interests
  const availableInterests = [
    'Technology', 'Design', 'Photography', 'Music', 
    'Sports', 'Travel', 'Reading', 'Gaming', 'Cooking', 'Art'
  ];
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle interest selection
  const handleInterestToggle = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(item => item !== interest)
      : [...formData.interests, interest];
      
    setFormData({
      ...formData,
      interests: updatedInterests
    });
    
    // Clear interest error if any interest is selected
    if (updatedInterests.length > 0 && errors.interests) {
      setErrors({
        ...errors,
        interests: ''
      });
    }
  };
  
  // Handle field focus
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  
  // Handle field blur
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) < 13) {
      newErrors.age = 'Age must be a number 13 or greater';
    } else if (parseInt(formData.age) > 120) {
      newErrors.age = 'Age must be a realistic value';
    }
    
    // Occupation validation (optional but with length limit)
    if (formData.occupation.length > 100) {
      newErrors.occupation = 'Occupation cannot exceed 100 characters';
    }
    
    // Bio validation (optional but with character limit)
    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio cannot exceed 500 characters';
    }
    
    // Interests validation (at least one required)
    if (formData.interests.length === 0) {
      newErrors.interests = 'Select at least one interest';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call with loading state
      setIsSubmitting(true);
      
      setTimeout(() => {
        // Form is valid, proceed with submission
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500); // Simulated delay for submission
    }
  };
  
  // Reset form to initial state
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      occupation: '',
      bio: '',
      interests: []
    });
    setErrors({});
    setIsSubmitted(false);
  };
  
  // Get progress percentage
  const getProgressPercentage = () => {
    const totalFields = 6; // name, email, age, occupation, bio, interests
    let filledFields = 0;
    
    if (formData.name.trim()) filledFields++;
    if (formData.email.trim()) filledFields++;
    if (formData.age) filledFields++;
    if (formData.occupation.trim()) filledFields++;
    if (formData.bio.trim()) filledFields++;
    if (formData.interests.length > 0) filledFields++;
    
    return Math.round((filledFields / totalFields) * 100);
  };
  
  return (
    <div className="form-container">
      <h1 className="form-title">
        <span className="title-icon">👤</span> 
        User Profile
      </h1>
      
      {isSubmitted ? (
        <div className="success-container">
          <div className="success-message">
            <span className="success-icon">✓</span>
            Profile submitted successfully!
          </div>
          
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="profile-name">{formData.name}</h2>
              <p className="profile-occupation">{formData.occupation || 'No occupation specified'}</p>
            </div>
            
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{formData.email}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{formData.age}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Bio:</span>
                <p className="detail-value bio-text">{formData.bio || 'No bio provided'}</p>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Interests:</span>
                <div className="interests-list">
                  {formData.interests.map(interest => (
                    <span key={interest} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleReset}
            className="reset-button"
          >
            Create New Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
            <span className="progress-text">{getProgressPercentage()}% Complete</span>
          </div>
          
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            
            <div className="form-group">
              <label className={`form-label ${focusedField === 'name' ? 'focused-label' : ''}`} htmlFor="name">
                Name*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className={`form-input ${errors.name ? 'error-input' : ''} ${focusedField === 'name' ? 'focused-input' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="error-message"><span className="error-icon">!</span> {errors.name}</p>}
            </div>
            
            <div className="form-group">
              <label className={`form-label ${focusedField === 'email' ? 'focused-label' : ''}`} htmlFor="email">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className={`form-input ${errors.email ? 'error-input' : ''} ${focusedField === 'email' ? 'focused-input' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="error-message"><span className="error-icon">!</span> {errors.email}</p>}
            </div>
            
            <div className="form-group">
              <label className={`form-label ${focusedField === 'age' ? 'focused-label' : ''}`} htmlFor="age">
                Age*
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                onFocus={() => handleFocus('age')}
                onBlur={handleBlur}
                className={`form-input ${errors.age ? 'error-input' : ''} ${focusedField === 'age' ? 'focused-input' : ''}`}
                placeholder="Enter your age"
                min="13"
                max="120"
              />
              {errors.age && <p className="error-message"><span className="error-icon">!</span> {errors.age}</p>}
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="section-title">Additional Information</h2>
            
            <div className="form-group">
              <label className={`form-label ${focusedField === 'occupation' ? 'focused-label' : ''}`} htmlFor="occupation">
                Occupation
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                value={formData.occupation}
                onChange={handleChange}
                onFocus={() => handleFocus('occupation')}
                onBlur={handleBlur}
                className={`form-input ${errors.occupation ? 'error-input' : ''} ${focusedField === 'occupation' ? 'focused-input' : ''}`}
                placeholder="What do you do? (optional)"
              />
              {errors.occupation && <p className="error-message"><span className="error-icon">!</span> {errors.occupation}</p>}
            </div>
            
            <div className="form-group">
              <label className={`form-label ${focusedField === 'bio' ? 'focused-label' : ''}`} htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                onFocus={() => handleFocus('bio')}
                onBlur={handleBlur}
                rows="4"
                className={`form-input form-textarea ${errors.bio ? 'error-input' : ''} ${focusedField === 'bio' ? 'focused-input' : ''}`}
                placeholder="Tell us about yourself (optional)"
              />
              <p className={`character-count ${formData.bio.length > 450 ? 'warning-text' : ''}`}>
                {formData.bio.length}/500 characters
              </p>
              {errors.bio && <p className="error-message"><span className="error-icon">!</span> {errors.bio}</p>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Interests*</label>
              <div className="interests-container">
                {availableInterests.map(interest => (
                  <div
                    key={interest}
                    className={`interest-option ${formData.interests.includes(interest) ? 'selected' : ''}`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </div>
                ))}
              </div>
              {errors.interests && <p className="error-message"><span className="error-icon">!</span> {errors.interests}</p>}
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Profile'
              )}
            </button>
            
            <button
              type="button"
              className="reset-form-button"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;