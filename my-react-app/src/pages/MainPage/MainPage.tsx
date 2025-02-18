import './MainPage.scss'
import AnimalCard from "../../components/AnimalCard/AnimalCard.tsx";
import {useState} from "react";
import {getCatApi, getDogApi} from "../../features/AnimalDataSlice.ts";
import {useNavigate} from "react-router-dom";

const MainPage = () => {

    const navigate = useNavigate();
    const [isCat, setIsCat] = useState(true);

    const goLikedPage = () => {
        navigate('/liked')
    }

    return (
        <div className={"mainContainer"}>
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
                    className={"mainContainer__topLine__liked"}>❤️</button>
            </div>
            <div className={"mainContainer__animalCard"}>
                 <AnimalCard fetchAnimal={isCat ? getCatApi : getDogApi}/>
            </div>
        </div>
    );
};

export default MainPage;