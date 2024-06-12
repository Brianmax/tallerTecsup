// src/components/NotaList.js
import React from 'react';
import '../styles/NotaList.css';

const NotaList = ({ notas, onNotaSeleccionada }) => {
    return (
        <div className="nota-list">
            {notas.map(nota => (
                <div
                    key={nota.id}
                    className="nota-card"
                    onClick={() => onNotaSeleccionada(nota.id)}
                >
                    <h3 className="nota-title">{nota.title}</h3>
                    <p className="nota-content">{nota.content}</p>
                    <button className="edit-button">Editar</button>
                </div>
            ))}
        </div>
    );
};

export default NotaList;

