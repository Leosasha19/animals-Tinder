import AnimalCard from '../../components/AnimalCard/AnimalCard.tsx';
import { useCallback, useEffect, useState } from 'react';
import {
  addAnimal,
  addComment,
  changeLikeStatus,
  fetchAllAnimals,
  fetchRandomCat,
  fetchRandomDog,
  selectAnimalsState,
  selectCurrentAnimal,
} from '../../features/AnimalDataSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import TopNavigation from '../../components/TopNavigation/TopNavigation.tsx';
import './MainPage.scss';

const MainPage = () => {
  const navigate = useNavigate();
  const animalState = useAppSelector(selectAnimalsState);
  const dispatch = useAppDispatch();
  const currentAnimal = useAppSelector(selectCurrentAnimal);

  const [isCat, setIsCat] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const fetchAnimal = isCat ? fetchRandomCat : fetchRandomDog;
  const animalsState = useAppSelector(selectAnimalsState);
  const blackList = animalsState.animals.some(
    (animal) => animal.imageURL === currentAnimal?.imageURL && !animal.isLike
  );

  const goLikedPage = () => {
    navigate('/liked');
  };

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
            <AnimalCard
              fetchAnimal={fetchAnimal}
              currentAnimal={currentAnimal}
              setShowInput={setShowInput}
              showInput={showInput}
              setInputValue={setInputValue}
              inputValue={inputValue}
              likeHandler={likeHandler}
              blackList={blackList}
              animalsState={animalsState}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
