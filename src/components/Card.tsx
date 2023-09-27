import React, { useState } from 'react';
import './styles.scss';
import Star from '../img/star.png';
import YStar from '../img/ystar.png';
import ConfirmBTN from '../img/confirm.png';

interface CardProps {
  title: string;
  content: string;
  starActive: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onToggleStar: () => void;
  onAddTodo: () => void;
}

const Card: React.FC<CardProps> = ({
  title: initialTitle,
  content: initialContent,
  starActive: initialStarActive,
  onTitleChange,
  onContentChange,
  onToggleStar,
  onAddTodo,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [starActive, setStarActive] = useState(initialStarActive);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onContentChange(e);
  };

  const toggleStar = () => {
    setStarActive(!starActive);
    onToggleStar();
  };

  const addTodo = () => {
    onAddTodo();
    setTitle('');
    setContent('');
    setStarActive(true);
  };

  return (
    <div className="card">
      <div className="card-header">
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={handleTitleChange}
          placeholder="Título"
        />
        <span className={`star-icon ${starActive ? 'active' : ''}`} onClick={toggleStar}>
          <img src={starActive ? YStar : Star} alt="Fav" className="fav-icon" draggable="false" />
        </span>
      </div>
      <div className="card-content">
        <textarea
          className="content-textarea"
          value={content}
          onChange={handleContentChange}
          placeholder="Criar nota..."
        />
      </div>
      <span className={`confirm-icon`} onClick={addTodo}>
        <img src={ConfirmBTN} alt="Confirm" className="confirm-icon" draggable="false" />
      </span>
    </div>
  );
};

export default Card;
