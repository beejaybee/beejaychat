import { useState } from 'react';
import axios from 'axios';

const PROJECTID = process.env.REACT_APP_PROJECT_ID;


const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 


    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {
            'Project-ID': {PROJECTID},
            'User-Name': username,
            'User-Secret': password
        }

        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            localStorage.setItem( 'username', username );
            localStorage.setItem( 'password', password );

            window.location.reload();
        } catch (error) {
            console.log(error);
            setError('incorrect credentials');
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className='input' placeholder='username' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input' placeholder='password' required />

                    <div align='center'>
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error} </h2>
                </form>
            </div>
        </div>
    )
}

export default Login