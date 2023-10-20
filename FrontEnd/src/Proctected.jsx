import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Proctected({ children }) {
    const [usertype, setusertype] = useState('');
    const history = useNavigate();
    useEffect(() => {
        async function FetchData() {
            try {
                const result = await fetch('/GetUser');
                const response = await result.json();
                if (response !== null) {
                    setusertype(response.usertype);
                    if(response.usertype!=='admin'){
                        console.log("Done");
                        history("/");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchData();
    }, []);

    return usertype === "admin" ?<div>{children}</div> : null;


}
export default Proctected;