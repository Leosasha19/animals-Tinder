import AnimalCard from '../../components/AnimalCard/AnimalCard.tsx';
import React, { useState } from 'react';
import {
  fetchRandomCat,
  fetchRandomDog,
  selectAnimalsState,
} from '../../features/AnimalDataSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.ts';
import TopNavigation from '../../components/TopNavigation/TopNavigation.tsx';
import './MainPage.scss';

const MainPage = () => {
  const navigate = useNavigate();
  const animalState = useAppSelector(selectAnimalsState);
  const [isCat, setIsCat] = useState(true);

  const goLikedPage = () => {
    navigate('/liked');
  };

  return (
    <div className={'mainContainer'}>
      {animalState.error ? (
        <div className="error-message">{'Упс... Похоже что то сломалось'}</div>
      ) : (
        <>
          <TopNavigation
            isCat={isCat}
            setIsCat={setIsCat}
            goLikedPage={goLikedPage}
          />
          <div className={'mainContainer__animalCard'}>
            <AnimalCard fetchAnimal={isCat ? fetchRandomCat : fetchRandomDog} />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
