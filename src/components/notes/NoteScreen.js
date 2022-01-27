import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some  awesome title"
                    className="notes__title-input"
                    autoComplete='off'
                />
                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>
                <div className="notes__images">
                    <img src="https://i.picsum.photos/id/1072/200/300.jpg?hmac=uzq3N0ox40X06q0Ql4mCdgMwHc13gIa0QAuu_6Zp6lQ" alt='imagen' />
                </div>
            </div>
        </div>
    );
};
