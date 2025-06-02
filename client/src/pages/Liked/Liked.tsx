import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import { addRandomAnimal, fetchAllAnimals, selectAnimalsState} from "../../features/AnimalDataSlice.ts";
import './Liked.scss';
import {useNavigate} from "react-router-dom";

const Liked = () => {

    const animalsState = useAppSelector(selectAnimalsState);
    const dispatch = useAppDispatch();
    const [oneRandomAnimal, setOneRandomAnimal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllAnimals())
    }, []);


    useEffect(() => {
        if (animalsState?.animals) {
            const likedAnimalsData = animalsState.animals.filter((animal) => animal.isLike === true);
            if (likedAnimalsData.length > 0) {
                const randomAn = likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
                setOneRandomAnimal(randomAn);
            }
        }
    }, [animalsState.animals]);

    useEffect(() => {
        if (oneRandomAnimal) {
            const { id, imageURL, comment, isCat, isLike } = oneRandomAnimal;
            dispatch(addRandomAnimal({
                id,
                imageURL,
                comment,
                isCat,
                isLike,
            }));

        }
    }, [oneRandomAnimal, dispatch]);


    const addCurrentAnimal = useCallback(() => {
        if (animalsState?.animals) {
            const likedAnimalsData = animalsState.animals.filter((animal) => animal.isLike === true);
            if (likedAnimalsData.length > 0) {
                const randomAn = likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
                setOneRandomAnimal(randomAn);
            }
        }
    },[animalsState])

        return (
            <div className={"mainContainer"}>
                <button
                    onClick={() => {navigate('/')}}
                    className={"mainContainer__backButton"}>НАЗАД
                </button>
                {animalsState.currentAnimal && (
                    <div className={"mainContainer__animalsBox"}>
                        <img src={animalsState.currentAnimal.imageURL || null} alt=""/>
                        <div>{animalsState.currentAnimal.comment}</div>
                        <button onClick={addCurrentAnimal}>Next</button>
                    </div>
                )}
            </div>
        );

};

export default Liked;