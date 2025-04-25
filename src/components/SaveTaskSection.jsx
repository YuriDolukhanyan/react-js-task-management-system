import React from "react";

const SaveTaskSection = ({ onSaveTaskButtonClick }) => {
    return (
        <div>
            <button onClick={onSaveTaskButtonClick}><strong>Save Everything to localStorage...</strong></button>
            <br />
        </div>
    );
};

export default SaveTaskSection;
