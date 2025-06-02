import AnimalCard from "../../components/AnimalCard/AnimalCard.tsx";
import  {useState, useEffect} from "react";
import {fetchRandomCat, fetchRandomDog, selectAnimalsState, fetchAllAnimals, selectCurrentAnimal} from "../../features/AnimalDataSlice.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "../../hooks/redux.ts";
import './MainPage.scss'

const MainPage = () => {
  const navigate = useNavigate();
  const animalsState = useAppSelector(selectAnimalsState);
  const currentAnimal = useAppSelector(selectCurrentAnimal);
   const dispatch = useAppDispatch();
  const [isCat, setIsCat] = useState(true);

    const isBlackList = animalsState.animals.some(
    (animal) => animal.imageURL === currentAnimal?.imageURL && !animal.isLike
  );

    useEffect(() => {
        dispatch(fetchRandomCat());
        dispatch(fetchAllAnimals());
        //   setShowInput(false);
      }, [dispatch]);
  
    // useEffect(() => {
    //   if (isBlackList) {
    //     dispatch(fetchAnimal());
    //   }
    // }, [isBlackList, dispatch]);

  const goLikedPage = () => {
    navigate('/liked');
  };

    const catHandler =() => {
        dispatch(fetchRandomCat());
        setIsCat(true);
    }

    const dogsHandler = () => {
        dispatch(fetchRandomDog());
        setIsCat(false);
    }

    const moodHandler = () => {
        if (isCat) {
            dispatch(fetchRandomCat())
        } else {
            dispatch(fetchRandomDog())
        }
    }

  
    return (
        <div className={"mainContainer"}>
            {animalsState.error ? (
                <div className="error-message">{"Упс... Похоже что то сломалось"}</div>
            ) : (
                <>
                    <div className={"mainContainer__topLine"}>
                        <button
                            onClick={catHandler}
                            className={isCat ? "mainContainer__topLine__switchButtonsActive" : "mainContainer__topLine__switchButtons"}>CATS
                        </button>
                        <button
                            onClick={dogsHandler}
                            className={isCat ? "mainContainer__topLine__switchButtons" : "mainContainer__topLine__switchButtonsActive"}>DOGS
                        </button>
                        <button
                            onClick={goLikedPage}
                            className={"mainContainer__topLine__liked"}>❤️
                        </button>
                    </div>
                    
                    <div className={"mainContainer__animalCard"}>
                        {currentAnimal && <AnimalCard currentAnimal={currentAnimal} moodHandler={moodHandler} isBlackList={isBlackList}/>}
                    </div>
                </>
            )}

        </div>
    );
};

export default MainPage;
