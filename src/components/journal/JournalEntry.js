import React from 'react';
import moment from 'moment';

export const JournalEntry = ({id, date, title, body, url}) => {

    const notaDate = moment(date);

    return (
        <div className="journal__entry pointer">
            {url && (
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`,
                    }}
                ></div>
            )}

            <div className="journal__entry-body">
                <p className="journal__entry-title">{title}</p>
                <p className="journal__entry-content">{body}</p>
            </div>

            <div className="journal__entry-date-box">
                <span className="journal__entry-span">
                    {notaDate.format('dddd')}
                </span>
                <h4>{notaDate.format('Do')}</h4>
            </div>
        </div>
    );
};
