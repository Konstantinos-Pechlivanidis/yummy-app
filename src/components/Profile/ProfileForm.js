// src/components/Profile/ProfileForm.js
import React, { useState } from "react";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "John",
    surname: "Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);
  const handleCancelClick = () => setIsEditing(false);

  return (
    <div className="profile-form-container">
      <h2>Profile Details</h2>
      <form className="profile-form">
        {Object.keys(formData).map((field) => (
          <div className="profile-form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {isEditing ? (
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
              />
            ) : (
              <p>{formData[field]}</p>
            )}
          </div>
        ))}
        <div className="profile-form-buttons">
          {isEditing ? (
            <>
              <button type="button" className="profile-save-button" onClick={handleSaveClick}>
                Save
              </button>
              <button type="button" className="profile-cancel-button" onClick={handleCancelClick}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" className="profile-edit-button" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
