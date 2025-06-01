import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import { addRandomAnimal, getAnimals, selectAnimalsState} from "../../features/AnimalDataSlice.ts";
import './Liked.scss';

const Liked = () => {

    const animalsState = useAppSelector(selectAnimalsState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAnimals())
    }, []);

    useEffect(() => {
        if (animalsState?.animals) {
            const likedAnimalsData = animalsState.animals.filter((animal) => animal.isLike);
            if (likedAnimalsData.length > 0) {
                const randomAn = likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
              if(randomAn) {
                  dispatch(addRandomAnimal(randomAn));
              }
            }
        }
    }, [animalsState.animals, dispatch]);

    const addCurrentAnimal = useCallback(() => {
        if (animalsState?.animals) {
            const likedAnimalsData = animalsState.animals.filter((animal) => animal.isLike === true);
            if (likedAnimalsData.length > 0) {
                const randomAn = likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
                if(randomAn) {
                    dispatch(addRandomAnimal(randomAn));
                }
            }
        }
    },[animalsState])

    if(animalsState.loading) {
       return <h1>Загрузка...</h1>
    }
    if(animalsState.currentAnimal) {
        return (
            <div className={"mainContainer"}>
                <div className={"mainContainer__animalsBox"}>
                    <img src={animalsState.currentAnimal.imageURL} alt=""/>
                    <div>{animalsState.currentAnimal.comment}</div>
                    <button onClick={addCurrentAnimal}>Next</button>
                </div>
            </div>
        );
    }
};

export default Liked;