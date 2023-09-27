import React, { useState, useEffect } from 'react';
import Colors from '../components/Colors';
import './styles.scss';
import Star from '../img/star.png';
import YStar from '../img/ystar.png';
import Edit from '../img/edit.png';
import Paint from '../img/paint.png';
import Delete from '../img/delete.png';
import Save from '../img/save.png';

interface CardTodoProps {
    title: string;
    content: string;
    itsfav: boolean;
    color: string;
    onToggleStar: () => void;
    updateTitleAndContent: (editedTitle: string, editedContent: string) => void;
    onUpdateColor: (newColor: string) => void;
    onDelete: () => void;
}

const CardTodo: React.FC<CardTodoProps> = ({ title, content, itsfav, color,  onToggleStar, updateTitleAndContent, onDelete, onUpdateColor}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    const [isPainting, setIsPainting] = useState(false);

    const handleColorSelect = (newColor: string) => {
        onUpdateColor(newColor);
    };
    const togglePainting = () => {
        setIsPainting(!isPainting);
        
    };
    useEffect(() => {
        setEditedTitle(title);
    }, [title]);

    useEffect(() => {
        setEditedContent(content);
    }, [content]);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        updateTitleAndContent(editedTitle, editedContent);
        setIsEditing(false);
    };

    return (
        <div className={`card-todo ${color}`}>
            <div className="cardtodo-header">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="Title-todo TitleTextStyle"
                        />
                        <span className={`star-icon ${itsfav ? 'active' : ''}`} onClick={onToggleStar}>
                            <img src={itsfav ? YStar : Star} alt="Fav" className="fav-icon" draggable="false" />
                        </span>
                    </>
                ) : (
                    <>
                        <h1 className="Title-todo TitleTextStyle">{title}</h1>
                        <span className={`star-icon ${itsfav ? 'active' : ''}`} onClick={onToggleStar}>
                            <img src={itsfav ? YStar : Star} alt="Fav" className="fav-icon" draggable="false" />
                        </span>
                    </>
                )}

            </div>
            <div className="cardtodo-content">
                {isEditing ? (
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="Content-todo ContentTextStyle"
                    />
                ) : (
                    <p className="Content-todo ContentTextStyle">{content}</p>
                )}
            </div>
            <div className="options">
                {isEditing ? (
                    <img src={Save} alt="save" className="save-icon" draggable="false" onClick={handleSaveClick} />
                ) : (
                    <img src={Edit} alt="edit" className="edit-icon" draggable="false" onClick={handleEditClick} />
                )}
                <img src={Paint} alt="paint" className="paint-icon" draggable="false" onClick={togglePainting}/>
                <img src={Delete} alt="delete" className="delete-icon" draggable="false" onClick={onDelete} />

            </div>
            {isPainting && (
                <div>
                    <Colors onColorSelect={handleColorSelect} />
                </div>
            )}
        </div>
    );
};

export default CardTodo;
