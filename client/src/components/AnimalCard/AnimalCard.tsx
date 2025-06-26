import React from 'react';
import { useAppDispatch } from '../../hooks/redux.ts';
import { Animal, AnimalsState } from '../../features/AnimalDataSlice.ts';
import AnimalImage from './AnimalImage.tsx';
import Button from '../Button/Button.tsx';
import CommentPopup from './CommentPopup.tsx';
import { AsyncThunk } from '@reduxjs/toolkit';
import './AnimalCard.scss';

interface AnimalCardProps {
  fetchAnimal: AsyncThunk<Animal, void, {}>;
  currentAnimal: Animal | null;
  setShowInput: (value: boolean) => void;
  showInput: boolean;
  setInputValue: (value: string) => void;
  inputValue: string;
  likeHandler: (isLike: boolean, comment: string) => void;
  blackList: boolean;
  animalsState: AnimalsState;
}

const AnimalCard: React.FC<AnimalCardProps> = ({
  fetchAnimal,
  currentAnimal,
  setShowInput,
  showInput,
  setInputValue,
  inputValue,
  likeHandler,
  blackList,
  animalsState,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="AnimalCard">
      {animalsState.error ? (
        <div className="error-message">{'Упс... Похоже что то сломалось'}</div>
      ) : (
        <>
          {!blackList && currentAnimal && (
            <AnimalImage imageURL={currentAnimal.imageURL} />
          )}
          <div className="AnimalCard__estimateBox">
            <Button
              onClick={() => setShowInput(true)}
              className={
                showInput
                  ? 'AnimalCard__estimateBoxNone'
                  : 'AnimalCard__estimateBox__like'
              }
            />
            <Button
              onClick={() => dispatch(fetchAnimal())}
              className={
                showInput
                  ? 'AnimalCard__estimateBoxNone'
                  : 'AnimalCard__estimateBox__mood'
              }
            />
            <Button
              onClick={() => likeHandler(false, inputValue)}
              className={
                showInput
                  ? 'AnimalCard__estimateBoxNone'
                  : 'AnimalCard__estimateBox__dislike'
              }
            />
            {showInput && (
              <CommentPopup
                className="popUpBox"
                onChange={(event) => setInputValue(event.target.value)}
                onClick={() => likeHandler(true, inputValue)}
                placeholder="Комментарий..."
                type="text"
              >
                Добавить в избранное
              </CommentPopup>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimalCard;
