import { useCallback, useState, JSX } from 'react';
import { useAppDispatch } from '../../hooks/redux.ts';
import {
    addAnimal, addComment, Animal, changeLikeStatus,
} from "../../features/AnimalDataSlice.ts";
import './AnimalCard.scss';

interface AnimalCardProps {
  currentAnimal: Animal;
  moodHandler: () => void;
  isBlackList: boolean;
}

const AnimalCard = ({ currentAnimal, moodHandler, isBlackList }: AnimalCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { imageURL, isCat } = currentAnimal;

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');


  const likeHandler = useCallback(
    (isLike: boolean, comment?: string) => {
        dispatch(
          addAnimal({
            imageURL,
            comment: comment ?? '',
            isCat,
            isLike,
          })
        );
      setShowInput(false);
      setInputValue('');
    },
    [currentAnimal]
  );

  return (
    <div className="AnimalCard">
      (
        <>
          {!isBlackList && (
            <img
              className="AnimalCard__picture"
              src={currentAnimal.imageURL}
              alt="Тут животное"
            />
          )}
          <div className="AnimalCard__estimateBox">
            <button
              onClick={() => setShowInput(true)}
              className={
                showInput
                  ? 'AnimalCard__estimateBoxNone'
                  : 'AnimalCard__estimateBox__like'
              }
            ></button>
            <button
              onClick={moodHandler}
              className={
                showInput
                  ? 'AnimalCard__estimateBoxNone'
                  : 'AnimalCard__estimateBox__mood'
              }
            ></button>
            <button
              onClick={() => likeHandler(false)}
              className={
                showInput
                  ? 'AnimalCard__estimateBoxNone'
                  : 'AnimalCard__estimateBox__dislike'
              }
            ></button>
            {showInput && (
              <div className="popUpBox">
                <input
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Комментарий..."
                  type="text"
                />
                <button onClick={() => likeHandler(true, inputValue)}>
                  Добавить в избранное
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimalCard;
