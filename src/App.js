// src/App.js
import React, { useState, useEffect } from 'react';
import NotaList from './components/NotaList';
import NotaDetail from './components/NotaDetail';
import FormularioAgregarNota from './components/FormularioAgregarNota';
import './App.css';

const App = () => {
    const [notas, setNotas] = useState([]);
    const [notaSeleccionada, setNotaSeleccionada] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const cargarNotas = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/notes/findAll');
                if (!response.ok) {
                    throw new Error('Error al cargar las notas');
                }
                const data = await response.json();
                setNotas(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        cargarNotas();
    }, []);

    const handleNotaSeleccionada = (id) => {
        const notaSeleccionada = notas.find(nota => nota.id === id);
        setNotaSeleccionada(notaSeleccionada);
        setShowModal(true);
    };

    const handleAgregarNota = async (nuevaNota) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/notes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaNota),
            });
            if (!response.ok) {
                throw new Error('Error al agregar la nota');
            }
            const data = await response.json();
            setNotas([...notas, data]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleActualizarNota = async (notaActualizada) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/notes/update/${notaActualizada.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notaActualizada),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la nota');
            }
            const data = await response.json();
            setNotas(notas.map(nota => nota.id === data.id ? data : nota));
            setShowModal(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleVolver = () => {
        setNotaSeleccionada(null);
        setShowModal(false);
    };

    return (
        <div className="app-container">
            <FormularioAgregarNota onAgregarNota={handleAgregarNota} />
            <NotaList notas={notas} onNotaSeleccionada={handleNotaSeleccionada} />
            {showModal && (
                <NotaDetail
                    nota={notaSeleccionada}
                    onActualizarNota={handleActualizarNota}
                    onVolver={handleVolver}
                />
            )}
        </div>
    );
};

export default App;
