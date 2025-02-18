import './App.scss'
import MainPage from "../pages/MainPage/MainPage.tsx";
import {Route, Routes} from "react-router-dom";
import Liked from "../pages/Liked/Liked.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route index element={<MainPage />}/>
            <Route path={'/liked'} element={<Liked/>}/>
        </Routes>
    </>
  )
}

export default App
