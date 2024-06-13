// src/components/NotaDetail.js
import React, { useState, useEffect } from 'react';
import '../styles/NotaDetail.css';

const NotaDetail = ({ nota, onActualizarNota, onVolver }) => {
    const [titulo, setTitulo] = useState(nota.title);
    const [contenido, setContenido] = useState(nota.content);

    useEffect(() => {
        setTitulo(nota.title);
        setContenido(nota.content);
    }, [nota]);

    const handleGuardar = () => {
        const notaActualizada = { ...nota, title: titulo, content: contenido };
        onActualizarNota(notaActualizada);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onVolver}>&times;</span>
                <input
                    className="modal-input"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título"
                />
                <textarea
                    className="modal-textarea"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    placeholder="Contenido"
                />
                <div className="modal-footer">
                    <span>Modificada: {new Date().toLocaleDateString()}</span>
                    <div className="modal-actions">
                        <button className="btn" onClick={handleGuardar}>Guardar</button>
                        <button className="btn" onClick={onVolver}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotaDetail;