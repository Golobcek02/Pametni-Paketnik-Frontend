import {useState} from "react";
import axios from "axios";

export function PackageRoutes() {
    const [nonParsedRoutes, setNonParsedRoutes] = useState("");

    function addRoutes() {
        const parsedRoutes = nonParsedRoutes.split(",").map(route => route.trim());
        axios.post("http://localhost:5551/addPackageRoute", {Stops: parsedRoutes}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => {
                        setNonParsedRoutes(e.target.value);
                    }}
                    placeholder="Enter Routes Divided by ,"
                />
                <button type="submit" onClick={() => addRoutes()}>
                    Post
                </button>
            </div>
        </>
    );
}
