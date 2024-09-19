import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const FileList = () => {
    const { token } = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [last7Days, setLast7Days] = useState(null);
    const [last30Days, setLast30Days] = useState(null);
    const [lastYear, setLastYear] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const params = {
                    page,
                    search,
                    last7Days,
                    last30Days,
                    lastYear,
                    startDate,
                    endDate,
                };

                const res = await axios.get('http://localhost:3003/api/files', { params, ...config });

                setFiles(res.data.files);
                setTotalPages(res.data.totalPages);
                setError(null);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Você não está autorizado. Faça login para acessar os arquivos.');
                } else {
                    setError('Ocorreu um erro ao buscar os arquivos.');
                }
            }
        };

        fetchFiles();
    }, [token, page, search, last7Days, last30Days, lastYear, startDate, endDate]);

    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleLast7DaysChange = () => setLast7Days(!last7Days);
    const handleLast30DaysChange = () => setLast30Days(!last30Days);
    const handleLastYearChange = () => setLastYear(!lastYear);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Arquivos</h2>

            {/* Filtros */}
            <div style={styles.filtersContainer}>
                <input
                    type="text"
                    placeholder="Buscar por título ou descrição"
                    value={search}
                    onChange={handleSearchChange}
                    style={styles.inputSearch}
                />
                <div style={styles.checkboxes}>
                    <label>
                        <input
                            type="checkbox"
                            checked={last7Days}
                            onChange={handleLast7DaysChange}
                            style={styles.checkbox}
                        />
                        Últimos 7 dias
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={last30Days}
                            onChange={handleLast30DaysChange}
                            style={styles.checkbox}
                        />
                        Últimos 30 dias
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={lastYear}
                            onChange={handleLastYearChange}
                            style={styles.checkbox}
                        />
                        Último ano
                    </label>
                </div>
                <div style={styles.dateFilters}>
                    <label>
                        Data Inicial:
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            style={styles.input}
                        />
                    </label>
                    <label>
                        Data Final:
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            style={styles.input}
                        />
                    </label>
                </div>
            </div>

            {error ? (
                <div style={styles.error}>{error}</div>
            ) : (
                <>
                    <ul style={styles.fileList}>
                        {files.map((file) => (
                            <li key={file._id} style={styles.fileCard}>
                                <h3 style={styles.fileTitle}>{file.title}</h3>
                                <p style={styles.fileDescription}>{file.description}</p>
                                <p style={styles.fileDate}>
                                    Publicado em: {new Date(file.publicationDate).toLocaleDateString()}
                                </p>
                                <a href={`http://localhost:3003/${file.filePath}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                    Ver arquivo
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div style={styles.pagination}>
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            style={{ ...styles.button, ...(page === 1 ? styles.disabledButton : {}) }}
                        >
                            Anterior
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            style={{ ...styles.button, ...(page === totalPages ? styles.disabledButton : {}) }}
                        >
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#4CAF50',
    },
    filtersContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    inputSearch: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        maxWidth: '180px'
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        maxWidth: '400px'
    },
    checkboxes: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px'
    },
    checkbox: {
        marginRight: '5px',
    },
    dateFilters: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '400px',
    },
    fileList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        listStyle: 'none',
        padding: '0',
    },
    fileCard: {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    },
    fileCardHover: {
        transform: 'scale(1.02)',
    },
    fileTitle: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#333',
    },
    fileDescription: {
        fontSize: '14px',
        marginBottom: '10px',
        color: '#666',
    },
    fileDate: {
        fontSize: '12px',
        marginBottom: '10px',
        color: '#999',
    },
    link: {
        display: 'inline-block',
        padding: '8px 15px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    disabledButton: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
};
export default FileList;
