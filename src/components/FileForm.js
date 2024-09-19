import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const FileForm = () => {
    const { token } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('publicationDate', publicationDate);
        formData.append('file', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.post('http://localhost:3003/api/files', formData, config);

            setSuccessMessage('Arquivo enviado com sucesso!');
            setErrorMessage('');
            setTitle('');
            setDescription('');
            setPublicationDate('');
            setFile(null);
        } catch (err) {
            console.error(err);
            setErrorMessage('Erro ao enviar o arquivo. Tente novamente.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Cadastrar Arquivo</h2>
            {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Descrição:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Data de Publicação:</label>
                    <input
                        type="date"
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Arquivo:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        style={styles.fileInput}
                    />
                </div>
                <button type="submit" style={styles.submitButton}>Cadastrar</button>
            </form>
        </div>
    );
};

// Estilos CSS inline
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '24px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        fontSize: '16px',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    fileInput: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    submitButtonHover: {
        backgroundColor: '#45a049',
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
    },
};

export default FileForm;
