import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();

    const { active } = useSelector((state) => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active));
    };

    const handlePicture = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    };

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                id="fileSelector"
            />

            <div>
                <button className="btn" onClick={handlePicture}>
                    Picture
                </button>
            </div>
            <div>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};
