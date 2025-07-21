import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AnimalCardPreview from '../../components/AnimalCard/AnimalCardPreview.tsx';
import Button from '../../components/Button/Button.tsx';
import {
  addRandomAnimal,
  fetchAllAnimals,
  selectAnimalsState,
} from '../../features/AnimalDataSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';

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
        <AnimalCardPreview
          className={'mainContainer__animalsBox'}
          imgURL={animalsState.currentAnimal.imageURL}
          comment={animalsState.currentAnimal.comment}
          onNext={addCurrentAnimal}
        />
      )}
    </div>
  );
};

export default Liked;
