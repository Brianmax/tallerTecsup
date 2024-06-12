// src/App.js
import React, { useState, useEffect } from 'react';
import NotaList from './components/NotaList';
import NotaDetail from './components/NotaDetail';
import FormularioAgregarNota from './components/FormularioAgregarNota';
import './App.css';

const App = () => {
    const [notas, setNotas] = useState([]); 
    const [notaSeleccionada, setNotaSeleccionada] = useState(null);

    useEffect(() => {
        // Función para cargar las notas desde el backend
        const cargarNotas = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/notes/findAll'); // Reemplaza 'URL_DE_TU_BACKEND' por la URL de tu backend
                if (!response.ok) {
                    throw new Error('Error al cargar las notas');
                }
                const data = await response.json();
                setNotas(data); // Actualizar el estado con las notas del backend
            } catch (error) {
                console.error('Error:', error);
            }
        };

        cargarNotas(); // Llamar a la función al montar el componente
    }, []); // La dependencia vacía asegura que este efecto solo se ejecute una vez al montar el componente

    const handleNotaSeleccionada = (id) => {
        const notaSeleccionada = notas.find(nota => nota.id === id);
        setNotaSeleccionada(notaSeleccionada);
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
            setNotas([...notas, data]); // Actualizar el estado con la nueva nota devuelta por el backend
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleVolver = () => {
        setNotaSeleccionada(null);
    };
    console.log(notas);
    return (
        <div>
            {notaSeleccionada ? (
                <NotaDetail nota={notaSeleccionada} onVolver={handleVolver} />
            ) : (
                <>
                    <FormularioAgregarNota onAgregarNota={handleAgregarNota} />
                    <NotaList notas={notas} onNotaSeleccionada={handleNotaSeleccionada} />
                </>
            )}
        </div>
    );
};

export default App;
