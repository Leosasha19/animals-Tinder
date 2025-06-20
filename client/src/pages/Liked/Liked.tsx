import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import {
  addRandomAnimal,
  fetchAllAnimals,
  selectAnimalsState,
} from '../../features/AnimalDataSlice.ts';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.tsx';
import './Liked.scss';

const Liked = () => {
  const animalsState = useAppSelector(selectAnimalsState);
  const dispatch = useAppDispatch();
  const [oneRandomAnimal, setOneRandomAnimal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllAnimals());
  }, []);

  useEffect(() => {
    if (oneRandomAnimal) {
      const { id, urlimg, commentary, iscat, like } = oneRandomAnimal;
      dispatch(
        addRandomAnimal({
          id: id,
          imageURL: urlimg,
          comment: commentary,
          isACat: iscat,
          like: like,
        })
      );
    }
  }, [oneRandomAnimal, dispatch]);

  useEffect(() => {
    if (animalsState?.animals) {
      const likedAnimalsData = animalsState.animals.filter(
        (animal) => animal.isLike === true
      );
      if (likedAnimalsData.length > 0) {
        const randomAn =
          likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
        setOneRandomAnimal(randomAn);
      }
    }
  }, [animalsState.animals]);

  useEffect(() => {
    if (oneRandomAnimal) {
      const { id, imageURL, comment, isCat, isLike } = oneRandomAnimal;
      dispatch(
        addRandomAnimal({
          id,
          imageURL,
          comment,
          isCat,
          isLike,
        })
      );
    }
  }, [oneRandomAnimal, dispatch]);

  const addCurrentAnimal = useCallback(() => {
    if (animalsState?.animals) {
      const likedAnimalsData = animalsState.animals.filter(
        (animal) => animal.isLike === true
      );
      if (likedAnimalsData.length > 0) {
        const randomAn =
          likedAnimalsData[Math.floor(Math.random() * likedAnimalsData.length)];
        setOneRandomAnimal(randomAn);
      }
    }
  }, [animalsState]);

  return (
    <div className={'mainContainer'}>
      <Button
        onClick={() => {
          navigate('/');
        }}
        className={'mainContainer__backButton'}
      >
        НАЗАД
      </Button>
      {animalsState.currentAnimal && (
        <div className={'mainContainer__animalsBox'}>
          <img src={animalsState.currentAnimal.imageURL || null} alt="" />
          <div>{animalsState.currentAnimal.comment}</div>
          <Button onClick={addCurrentAnimal}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default Liked;
