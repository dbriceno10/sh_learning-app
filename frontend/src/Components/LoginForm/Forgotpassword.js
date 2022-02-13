import React {useState} from "react";

import { changePassword } from './../../Actions/puts';


export default function Forgotpassword(){

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    


    return(
        <div>
            <form>
                <input
                placeholder='Your email..'
                />
                <input
                placeholder='Your password'
                />
            </form>
        </div>
    )
}