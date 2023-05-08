import logo from './logo.svg';
import './App.css';
import NavBar from "./Components/NavBar";
import AppRouter from "./Components/Routes/Router";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div>
            <NavBar/>
            <AppRouter/>
        </div>
    );
}

export default App;
