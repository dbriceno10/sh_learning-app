import React from "react";


export default function Profile (){
    
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <h2>
              {user.email}
              {user.firstName}
              {user.image}
            </h2>
        </div>
    )
}