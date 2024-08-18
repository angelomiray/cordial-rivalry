import React, { useState, useEffect } from 'react';
import EditModal from '../components/Modals/EditModal';
import { fastUpdateUser } from '../services/user';
import { showAlert } from '../utils/alerts';
import Background from '../components/Background';
import Sidebar from '../components/Sidebar/Sidebar';
import Intro from '../components/Dashboard/Intro';
import './Profile.css';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [modalField, setModalField] = useState('');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (user) {
                setCurrentUser(user);
                setUserData(user);
            }
        };
        fetchUser();
    }, []);

    const handleEdit = (field) => {
        setModalField(field);
        // Open modal (if using React Bootstrap, this would be handled by state)
    };

    const handleSave = (field, value) => {
        setUserData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await fastUpdateUser(currentUser.id, userData);
            localStorage.setItem('currentUser', JSON.stringify(userData));
            showAlert('success', 'Changes saved successfully!');
        } catch (error) {
            showAlert('danger', 'Failed to save changes.');
        }
    };

    // const handleDeleteAccount = async () => {
    //     const confirmation = window.confirm("Are you sure you want to delete your account?");
    //     if (confirmation) {
    //         try {
    //             await deleteUserAccount(currentUser.id);
    //             localStorage.removeItem('currentUser');
    //             showAlert('success', 'Your account has been deleted successfully.');
    //             window.location.href = '/'; // Update this to the appropriate URL
    //         } catch (error) {
    //             console.error('Error deleting account:', error);
    //             showAlert('danger', 'An error occurred while deleting your account. Please try again.');
    //         }
    //     }
    // };

    return (
        <>
            <Background />
            <div id="container" className="row">
                <Sidebar />
                <div id="dashboard" className="col-xl-9 col-lg-12 col-12">
                    <Intro
                        title="Your Settings"
                        introText={''}
                        imgUrl={currentUser?.imgUrl}
                    />

                    {currentUser && (
                        <div id="signin-form" className="d-flex p-3 col-11 mx-auto flex-wrap">
                            <div className="col-lg-4 col-sm-12 p-5">
                                <div className="image-container">
                                    <img src={currentUser.imgUrl} alt="Profile" />
                                    <div className="overlay">
                                        <button onClick={() => handleEdit('imgUrl')}>
                                            <i className="fas fa-edit text-info"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column col-lg-7 col-sm-12 p-lg-5 p-0">
                                {['username', 'fname', 'surname', 'email'].map(field => (
                                    <div key={field} className="info" data-field={field}>
                                        <div>
                                            <h3>{field.charAt(0).toUpperCase() + field.slice(1)}</h3>
                                            <h4>{userData[field]}</h4>
                                        </div>
                                        <button onClick={() => handleEdit(field)}>
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                ))}
                                <div className="info" data-field="delete">
                                    <div>
                                        <h3>Delete</h3>
                                        <h4>All information about your account will be permanently deleted.</h4>
                                    </div>
                                    <button onClick={() => ''}>
                                        <i className="fas fa-trash text-danger"></i>
                                    </button>
                                </div>
                                <button id="saveChanges" className="btn btn-info ml-auto mt-4 py-4 text-center" style={{ fontSize: '18px' }} onClick={handleSaveChanges}>
                                    Save changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Include the modal component */}
                    <EditModal field={modalField} currentValue={userData[modalField]} onSave={handleSave} onClose={() => setModalField('')} />
                </div>
            </div>
        </>
    );
};

export default Profile;
