import React, { useState } from 'react';
import "../styles/FormularioAgregarNota.css";

const FormularioAgregarNota = ({ onAgregarNota }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        onAgregarNota({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="formulario">
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="formulario-input"
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="formulario-textarea"
            ></textarea>
            <button type="submit" className="formulario-boton">
                Agregar Nota
            </button>
        </form>
    );
};

export default FormularioAgregarNota;
