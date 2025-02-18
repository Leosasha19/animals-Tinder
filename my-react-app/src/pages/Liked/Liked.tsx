import React, {useCallback, useEffect, useState} from 'react';
import './Liked.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {addAnimal, addRandomAnimal, getAnimals, selectAnimalsState} from "../../features/AnimalDataSlice.ts";

const Liked = () => {

    const animalsState = useAppSelector(selectAnimalsState);
    const dispatch = useAppDispatch();
    const [oneRandomAnimal, setOneRandomAnimal] = useState(null);


    const addCurrentAnimal = useCallback(() => {
        if (animalsState?.animals) {
            const likedAnimalsData = animalsState.animals.filter((animal) => animal.like === true);
            if (likedAnimalsData.length > 0) {
                const randomAn = likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
                setOneRandomAnimal(randomAn);
            }
        }
    },[animalsState])

    useEffect(() => {
        dispatch(getAnimals())
    }, []);


    useEffect(() => {
        if (animalsState?.animals) {
            const likedAnimalsData = animalsState.animals.filter((animal) => animal.like === true);
            if (likedAnimalsData.length > 0) {
                const randomAn = likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
                setOneRandomAnimal(randomAn);
            }
        }
    }, [animalsState.animals]);

    useEffect(() => {
        if (oneRandomAnimal) {
            const { id, urlimg, commentary, iscat, like } = oneRandomAnimal;
            dispatch(addRandomAnimal({
                id: id,
                imageURL: urlimg,
                comment: commentary,
                isACat: iscat,
                like: like,
            }));
        }
    }, [oneRandomAnimal, dispatch]);


    return (
        <div className={"mainContainer"}>
            <div className={"mainContainer__animalsBox"}>
                <img src={animalsState.currentAnimal.imageURL || null} alt=""/>
                <div>{animalsState.currentAnimal.comment}</div>
                <button onClick={addCurrentAnimal}>Next</button>
            </div>
        </div>
    );
};

export default Liked;