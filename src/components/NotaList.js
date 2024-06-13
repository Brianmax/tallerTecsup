// src/components/NotaList.js
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import '../styles/NotaList.css';

const NotaList = ({ notas, onNotaSeleccionada }) => {
    const truncateContent = (content) => {
        if (content.length > 255) {
            return content.substring(0, 255) + '...';
        }
        return content;
    };

    return (
        <div className="nota-list">
            {notas.map(nota => (
                <div
                    key={nota.id}
                    className="nota-card"
                    onClick={() => onNotaSeleccionada(nota.id)}
                >
                    <h3 className="nota-title">{nota.title}</h3>
                    <p className="nota-content">{truncateContent(nota.content)}</p>
                </div>
            ))}
        </div>
    );
};

NotaList.propTypes = {
    notas: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        })
    ).isRequired,
    onNotaSeleccionada: PropTypes.func.isRequired
};

export default memo(NotaList);
