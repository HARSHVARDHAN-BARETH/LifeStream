import React, { useState } from 'react';
import axios from 'axios';
import homeButton from './images/home-button.png'; 
import { Link } from 'react-router-dom';

const AddBloodBankDetails = () => {
    const [bloodAvailability, setBloodAvailability] = useState('');
    const [bloodTransaction, setBloodTransaction] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous messages
        setMessage('');
        setError('');

        // Send POST request to add blood bank details
        axios.post('http://localhost:3000/add-blood-bank', {
            blood_availability: bloodAvailability,
            blood_transaction: bloodTransaction
        }, { withCredentials: true })  // withCredentials ensures cookies (session data) are sent with the request
        .then((response) => {
            setMessage(response.data.message);
            setBloodAvailability('');
            setBloodTransaction('');
        })
        .catch((err) => {
            if (err.response) {
                // Error response from the server
                setError(err.response.data.message);
            } else {
                // General error
                setError('Something went wrong! Please try again.');
            }
        });
    };

    return (
        <div style={styles.container}>
                            <Link to="/"><img src={homeButton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>

            <h2 style={styles.heading}>Add Blood Bank Details</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Blood Availability:</label>
                    <input
                        type="text"
                        value={bloodAvailability}
                        onChange={(e) => setBloodAvailability(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Blood Transaction:</label>
                    <input
                        type="text"
                        value={bloodTransaction}
                        onChange={(e) => setBloodTransaction(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Submit</button>
            </form>

            {/* Display success or error message */}
            {message && <p style={styles.success}>{message}</p>}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

// Updated inline CSS for a modern and clean design
const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    form: {
        marginTop: '20px',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '8px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginTop: '5px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#007bff',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        boxShadow: '0 4px 6px rgba(0, 123, 255, 0.3)',
        transition: 'background-color 0.3s, box-shadow 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
        boxShadow: '0 6px 12px rgba(0, 123, 255, 0.5)',
    },
    success: {
        marginTop: '20px',
        color: '#28a745',
        fontSize: '16px',
        fontWeight: '500',
    },
    error: {
        marginTop: '20px',
        color: '#dc3545',
        fontSize: '16px',
        fontWeight: '500',
    }
};

export default AddBloodBankDetails;
