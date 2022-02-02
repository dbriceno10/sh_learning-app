
import  React  from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './Login';
import LoginForm from './LoginForm';
import  LogoutButton  from './Logout';
import  Profile  from './Profile';



export default function Landing(){

    const { isAuthenticated} = useAuth0();
    return (
        <div>
            <LoginForm />
            <button type='submit'>Log</button>
        
            {isAuthenticated ? (
                <>
                <Profile/>
                <LogoutButton/>
                </> 
            ) : (
                <LoginButton/>
            )
        }
        </div>
    )
} 