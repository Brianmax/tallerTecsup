// src/components/NotaDetail.js
import React, { useState } from 'react';
import '../styles/NotaDetail.css';

const NotaDetail = ({ nota, onActualizarNota, onVolver }) => {
    const [titulo, setTitulo] = useState(nota.title);
    const [contenido, setContenido] = useState(nota.content);

    const handleGuardar = () => {
        const notaActualizada = { ...nota, title: titulo, content: contenido };
        onActualizarNota(notaActualizada);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onVolver}>&times;</span>
                <h2>Editar Nota</h2>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                />
                <button onClick={handleGuardar}>Guardar</button>
            </div>
        </div>
    );
};

export default NotaDetail;
