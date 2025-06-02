import AnimalCard from "../../components/AnimalCard/AnimalCard.tsx";
import React, {useState} from "react";
import {fetchRandomCat, fetchRandomDog, selectAnimalsState} from "../../features/AnimalDataSlice.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.ts";
import './MainPage.scss'

const MainPage = () => {
    const navigate = useNavigate();
    const animalState = useAppSelector(selectAnimalsState)
    const [isCat, setIsCat] = useState(true);

    const goLikedPage = () => {
        navigate('/liked')
    }

    return (
        <div className={"mainContainer"}>
            {animalState.error ? (
                <div className="error-message">{"Упс... Похоже что то сломалось"}</div>
            ) : (
                <>
                    <div className={"mainContainer__topLine"}>
                        <button
                            onClick={() => setIsCat(true)}
                            className={isCat ? "mainContainer__topLine__switchButtonsActive" : "mainContainer__topLine__switchButtons"}>CATS
                        </button>
                        <button
                            onClick={() => setIsCat(false)}
                            className={isCat ? "mainContainer__topLine__switchButtons" : "mainContainer__topLine__switchButtonsActive"}>DOGS
                        </button>
                        <button
                            onClick={goLikedPage}
                            className={"mainContainer__topLine__liked"}>❤️
                        </button>
                    </div>
                    <div className={"mainContainer__animalCard"}>
                        <AnimalCard fetchAnimal={isCat ? fetchRandomCat : fetchRandomDog}/>
                    </div>
                </>
            )}

        </div>
    );
};

export default MainPage;