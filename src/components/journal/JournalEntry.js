import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage:
                        'url(https://desafiolatam.com/assets/cursos/react/icono-react-8e9b14b4495e5a21ccd56ea61f95a7fc30fc5eb8ee92e44fefd1277d62a93296.png)',
                }}
            ></div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">Un nuevo día...</p>
                <p className="journal__entry-content">Cupidatat aliquip consectetur eu excepteur est elit aliquip fugiat cupidatat et aliqua nostrud.</p>
            </div>

            <div className='journal__entry-date-box'>
              <span className='journal__entry-span'>Monday</span>
              <h4>28</h4>
            </div>
        </div>
    );
};
