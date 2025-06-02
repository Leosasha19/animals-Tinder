import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    addAnimal, addComment, changeLikeStatus,
    fetchAllAnimals,
    selectAnimalsState,
    selectCurrentAnimal
} from "../../features/AnimalDataSlice.ts";
import './AnimalCard.scss';

interface AnimalCardProps {
    fetchAnimal: () => any
}

const AnimalCard: React.FC<AnimalCardProps> = ({fetchAnimal}) => {
    const dispatch = useAppDispatch();
    const animalsState = useAppSelector(selectAnimalsState);
    const currentAnimal =  useAppSelector(selectCurrentAnimal);
    const blackList = animalsState.animals.some((animal) => animal.imageURL === currentAnimal?.imageURL && !animal.isLike);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        dispatch(fetchAnimal());
        dispatch(fetchAllAnimals());
        setShowInput(false);
    }, [dispatch, fetchAnimal]);

    useEffect(() => {
        if(blackList) {
            dispatch(fetchAnimal());
        }
    }, [blackList, dispatch]);

    const likeHandler = useCallback ((isLike: boolean, comment: string) => {
         dispatch(changeLikeStatus(true))
        dispatch(addComment(comment))
        if(currentAnimal) {
            dispatch(addAnimal({
                imageURL: currentAnimal.imageURL,
                comment: comment,
                isCat: currentAnimal.isCat,
                isLike: isLike
            }))
        }
        dispatch(fetchAnimal())
        setShowInput(false);
        setInputValue("");
    },[currentAnimal])



    return (
        <div className="AnimalCard">
            {animalsState.error ? (
                <div className="error-message">{"Упс... Похоже что то сломалось"}</div>
            ) : (
                <>
                    {!blackList && currentAnimal && (
                        <img
                            className="AnimalCard__picture"
                            src={currentAnimal.imageURL}
                            alt="Тут животное"
                        />
                    )}
                    <div className="AnimalCard__estimateBox">
                        <button
                            onClick={() => setShowInput(true)}
                            className={showInput ? "AnimalCard__estimateBoxNone" : "AnimalCard__estimateBox__like"}>
                        </button>
                        <button
                            onClick={() => dispatch(fetchAnimal())}
                            className={showInput ? "AnimalCard__estimateBoxNone" : "AnimalCard__estimateBox__mood"}>
                        </button>
                        <button
                            onClick={() => likeHandler(false, inputValue)}
                            className={showInput ? "AnimalCard__estimateBoxNone" : "AnimalCard__estimateBox__dislike"}>
                        </button>
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