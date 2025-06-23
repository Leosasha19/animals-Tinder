import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import {
  addAnimal,
  addComment,
  Animal,
  changeLikeStatus,
  fetchAllAnimals,
  selectAnimalsState,
  selectCurrentAnimal,
} from '../../features/AnimalDataSlice.ts';
import AnimalImage from './AnimalImage.tsx';
import Button from '../Button/Button.tsx';
import './AnimalCard.scss';
import CommentPopup from './CommentPopup.tsx';

interface AnimalCardProps {
  fetchAnimal: () => Promise<Animal>;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ fetchAnimal }) => {
  const dispatch = useAppDispatch();
  const animalsState = useAppSelector(selectAnimalsState);
  const currentAnimal = useAppSelector(selectCurrentAnimal);
  const blackList = animalsState.animals.some(
    (animal) => animal.imageURL === currentAnimal?.imageURL && !animal.isLike
  );
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(fetchAnimal());
    dispatch(fetchAllAnimals());
    setShowInput(false);
  }, [dispatch, fetchAnimal]);

  useEffect(() => {
    if (blackList) {
      dispatch(fetchAnimal());
    }
  }, [blackList, dispatch]);

  const likeHandler = useCallback(
    (isLike: boolean, comment: string) => {
      dispatch(changeLikeStatus(true));
      dispatch(addComment(comment));
      if (currentAnimal) {
        dispatch(
          addAnimal({
            imageURL: currentAnimal.imageURL,
            comment: comment,
            isCat: currentAnimal.isCat,
            isLike: isLike,
          })
        );
      }
      dispatch(fetchAnimal());
      setShowInput(false);
      setInputValue('');
    },
    [currentAnimal]
  );

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
