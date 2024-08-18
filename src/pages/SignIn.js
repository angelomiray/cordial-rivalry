import React, { useState } from 'react';
import Background from '../components/Background';
import IntroContainer from '../components/Forms/IntroContainer';
import "../components/Forms/Forms.css";
import FormHeader from '../components/Forms/FormHeader';
import InputContainer from '../components/Forms/InputContainer';
import HRContainer from '../components/Forms/HRContainer';
import SignInOption from '../components/Forms/SignInOption';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../services/user';
import { sha256 } from '../utils/hash';
import { showAlert } from '../utils/alerts';


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para navegação programática

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const login = async (event) => {
        event.preventDefault();

        const result = await verifyCredentials();

        if (result === false) {            
            showAlert('danger', 'Email ou senha inválidos.');
            return;
        }

        const currentUser = {
            id: result.id,
            username: result.username,
            fname: result.fname,
            surname: result.surname,
            email: result.email,
            pw: result.pw,
            imgUrl: result.imgUrl
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        navigate('/'); // Redireciona para a página inicial
    };

    const verifyCredentials = async () => {
        try {
            // Aqui você pode substituir `loginForm` por `email` e `password` diretamente
            const hashedPassword = await sha256(password);
            const user = await getUserByEmail(email);

            if (!user) {
                return false;
            }

            if (user.email !== email || user.pw !== hashedPassword) {
                return false;
            }

            return user;
        } catch (error) {
            console.error('Erro ao fazer login:', error);            
            return false;
        }
    };    

    return (
        <>
            <Background />
            <div className="content p-lg-4 p-sm-0">
                <div id="alert-container"></div>
                <nav className="text-center text-lg-left">
                    <div className="logo mb-3">
                        <img src="../img/logo.png" alt="Logotipo" />
                    </div>
                </nav>
                <div id="signin-content" className="container-fluid">
                    <IntroContainer
                        h1="Welcome!"
                        h2="Join the thrill of friendly wagers with your buddies and elevate your gaming experience."
                        h5="Developed by Ângelo Miranda and sponsored by Instituto Metrópole Digital/UFRN"
                    />
                    <div id="signin-card" className="col-lg-6 col-md-12 col-12">
                        <form id="signin-form" className="p-5" onSubmit={login}>
                            <FormHeader
                                title="Sign in"
                                subtitle={
                                    <>
                                        Enter your email address below and we will create your user account.<br />
                                        You can sign in using your unique Web Address, which looks like this:
                                    </>
                                }
                            />

                            <InputContainer
                                iconClass="fa-solid fa-envelope"
                                type="text"
                                placeholder="Jack@gmail.com"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                            />

                            <InputContainer
                                iconClass="fa-solid fa-lock"
                                type="password"
                                placeholder="Password"
                                id="pw"
                                name="pw"
                                value={password}
                                onChange={handlePasswordChange}
                            />

                            <div className="row d-flex justify-content-between px-3">
                                <div className="input-checkbox col-lg-4 mb-4">
                                    <input type="checkbox" id="keep-signed-in" />
                                    <label htmlFor="keep-signed-in">Keep me signed in</label>
                                </div>
                                <button type="submit" className="btn btn-danger py-3 col-lg-4 col-12">Sign in</button>
                            </div>
                            <HRContainer />
                            <div className="row d-flex justify-content-between mb-4">
                                <SignInOption icon="fa-brands fa-google" title="Sign in with Google" />
                                <SignInOption icon="fa-brands fa-facebook" title="Sign in with Facebook" />
                            </div>
                            <a className="link d-flex justify-content-center" href="#">Forgot password?</a>
                        </form>
                        <p className="m-3 text-center">Don't have an account? It's simple to <Link to="/signup" className="link">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
