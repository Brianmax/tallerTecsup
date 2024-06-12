// src/components/NotaDetail.js
import React from 'react';

const NotaDetail = ({ nota, onVolver }) => {
    return (
        <div>
            <button onClick={onVolver}>Volver</button>
            <h2>{nota.title}</h2>
            <p>{nota.content}</p>
        </div>
    );
};

export default NotaDetail;