import './home.css';
import './background.css'
import {Form} from "../User/Form";

export function Home() {

    return (
        <>
            <div className="container-home">
                <div className="form-container">
                    <Form/>
                    <div className="gradient" style={{position: "absolute", left: "15%", bottom: "20%"}}/>
                </div>
                <div className="image-container">
                    <img alt="banana" src="/homeimage3.jpeg"/>
                </div>
            </div>
        </>

    )
}
