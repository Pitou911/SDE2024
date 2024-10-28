import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css";
import { Link } from 'react-router-dom';

const Profile = ({ onLogout }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentCard: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    password: false,
  });
  const [hasChanges, setHasChanges] = useState(false); 
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    const studentId = localStorage.getItem("student_id") || sessionStorage.getItem("student_id");
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/${studentId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true, 
    }));
    setError("");
  };

  const handleChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
    setHasChanges(true); 
    setError("");
  };

  const handleSave = async () => {
    const updatedData = {};
    let updatedFields = []; 
    
    if (editMode.firstName) {
      updatedData.firstName = userData.firstName;
      updatedFields.push("First name");
    }
    
    if (editMode.lastName) {
      updatedData.lastName = userData.lastName;
      updatedFields.push("Last name");
    }
    
    if (editMode.password) {
      if (userData.newPassword !== userData.confirmNewPassword) {
        setError("New passwords do not match!");
        return;
      }
      updatedData.currentPassword = userData.currentPassword;
      updatedData.newPassword = userData.newPassword;
      updatedFields.push("Password"); 
    }

    try {
      const studentId = localStorage.getItem("student_id") || sessionStorage.getItem("student_id");
      const response = await axios.put(`http://localhost:8080/api/auth/${studentId}`, updatedData);
      
      if (response.status === 200) {
        setEditMode({ firstName: false, lastName: false, password: false });
        setHasChanges(false); 
        
        if (updatedFields.length > 0) {
          setMsg(`${updatedFields.join(', ')} updated successfully!`);
        }
        console.log("Updated Data:", updatedData);
        fetchUserData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Current password is incorrect!");
      } else {
        console.error("Error updating profile:", error);
        setError("An error occurred while updating your profile."); 
      }
    }
  };

  return (
    <div className="profile--comp">
        <h1 className='profil--comp__title title'>Profile</h1>

        <div>
            <label className='field--label'>First Name:</label>
            {editMode.firstName ? (
            <input
                className='field--data'
                type="text"
                value={userData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
            />
            ) : (
            <span className='field--data'>{userData.firstName}</span>
            )}
            {!editMode.firstName && (
            <button className='field--btn' onClick={() => handleEditClick("firstName")}>
                ✏️
            </button>
            )}
        </div>
        <div>
            <label className='field--label'>Last Name:</label>
            {editMode.lastName ? (
            <input
                className='field--data'
                type="text"
                value={userData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
            />
            ) : (
            <span className='field--data'>{userData.lastName}</span>
            )}
            {!editMode.lastName && (
            <button className='field--btn' onClick={() => handleEditClick("lastName")}>
                ✏️ 
            </button>
            )}
        </div>
        <div>
            <label className='field--label'>Email: </label>
            <span className='field--data'>{userData.email}</span>
        </div>
        <div>
            <label className='field--label'>Student Card: </label>
            <span className='field--data'>{userData.studentCard}</span>
        </div>
        {/* Password Change Section */}
        <div>
            {editMode.password ? (
            <>
                <div className='change-pass-field'>
                <label className='field--label'>Current Password:</label>
                <input
                    className='field--data'
                    type="password"
                    value={userData.currentPassword}
                    onChange={(e) => handleChange("currentPassword", e.target.value)}
                />
                </div>
                <div className='change-pass-field'>
                <label className='field--label'>New Password:</label>
                <input
                    className='field--data'
                    type="password"
                    value={userData.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
                />
                </div>
                <div className='change-pass-field'>
                <label className='field--label'>Confirm New Password:</label>
                <input
                    className='field--data'
                    type="password"
                    value={userData.confirmNewPassword}
                    onChange={(e) => handleChange("confirmNewPassword", e.target.value)}
                />
                </div>
            </>
            ) : (
            <button className='change-pass-btn' onClick={() => handleEditClick("password")}>
                Change Password
            </button>
            )}
        </div>

        {msg && <p style={{ color: "green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>} 
        
        <button onClick={handleSave} className='save-change-btn' disabled={!hasChanges}>
            Save Changes
        </button>
        <br />
        <button className='title logout--btn' onClick={onLogout}>
            <Link to='/'>Sign out</Link>
        </button>
        </div>
  );
};

export default Profile;
