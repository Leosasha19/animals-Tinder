import './AnimalCard.scss';

import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    addAnimal, addComment, changeLikeStatus,
    getAnimals,
    getCatApi,
    selectAnimalsState,
    selectCurrentAnimal
} from "../../features/AnimalDataSlice.ts";

interface AnimalCardProps {
    fetchAnimal: () => any
}

const AnimalCard: React.FC<AnimalCardProps> = ({fetchAnimal}) => {

    const dispatch = useAppDispatch();
    const animalsState = useAppSelector(selectAnimalsState);
    const currentAnimal =  useAppSelector(selectCurrentAnimal);
    const blackList = animalsState.animals.some((animal) => animal.imageURL === currentAnimal.imageURL && animal.like === false);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("")


    const likeHandler = useCallback ((isLike, commentary) => {
         dispatch(changeLikeStatus(true))
        dispatch(addComment(commentary))
        dispatch(addAnimal({
            imageURL: currentAnimal.imageURL,
            comment: commentary,
            isACat: currentAnimal.isACat,
            like: isLike
        }))
        dispatch(fetchAnimal())
        setShowInput(false);
        setInputValue("");
    },[currentAnimal])

    useEffect(() => {
        dispatch(fetchAnimal());
        dispatch(getAnimals());
        setShowInput(false);
    }, [dispatch, fetchAnimal]);

    useEffect(() => {
        if(blackList) {
            dispatch(fetchAnimal());
        }
    }, [blackList, dispatch]);

    return (
        <div className="AnimalCard">
            {!blackList && (
                <img className={"AnimalCard__picture"} src={currentAnimal.imageURL || null} alt="Тут животное"/>
            )}
            <div className={"AnimalCard__estimateBox"}>
                <button
                    onClick={() => {setShowInput(true)}}
                    className={showInput ? "AnimalCard__estimateBoxNone":"AnimalCard__estimateBox__like"}>

                </button>
                <button
                    onClick={() => dispatch(fetchAnimal())}
                    className={showInput ? "AnimalCard__estimateBoxNone":"AnimalCard__estimateBox__mood"}>

                </button>
                <button
                    onClick={() => {likeHandler(false, inputValue)}}
                    className={showInput ? "AnimalCard__estimateBoxNone":"AnimalCard__estimateBox__dislike"}>

                </button>
                {showInput && (
                    <div className={"popUpBox"}>
                        <input
                            onChange={(event) => setInputValue(event.target.value)}
                            placeholder={"Комментарий..."} type="text"/>
                        <button
                            onClick={() => {likeHandler(true, inputValue)}}>
                            Добавить в избранное
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalCard;