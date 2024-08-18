import React, { useState } from 'react';
import Background from '../components/Background';
import "../components/Forms/Forms.css";
import FormHeader from '../components/Forms/FormHeader';
import InputContainer from '../components/Forms/InputContainer';
import { Link } from 'react-router-dom';
import IntroContainer from '../components/Forms/IntroContainer';
import { saveUser, fastUpdateUser, getUserByEmail } from '../services/user';
import { sha256 } from '../utils/hash';
import { showAlert } from '../utils/alerts';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        fname: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        imgUrl: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.error('As senhas não coincidem.');
            showAlert('danger', 'As senhas fornecidas não coincidem.');
            return;
        }
        
        const emailInUse = await getUserByEmail(formData.email);
        if (emailInUse) {
            showAlert('danger', 'Email fornecido já está em uso.');
            return;
        }

        const userData = {
            username: formData.username,
            fname: formData.fname,
            surname: formData.surname,
            email: formData.email,
            pw: await sha256(formData.password),
            imgUrl: formData.imgUrl
        };

        try {
            const key = await saveUser(userData);
            userData.id = key;
            await fastUpdateUser(key, userData);

            setFormData({
                username: '',
                fname: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: '',
                imgUrl: ''
            });

            showAlert('success', 'Perfil criado com sucesso!');
        } catch (error) {
            showAlert('danger', 'Houve um problema ao criar o seu perfil.');
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
                        h1="JOIN FOR FREE"
                        h2={<> Embark on your journey of <span className="text-danger">cordial rivalry</span> and brotherhood </>}
                        h5={<> Developed by Ângelo Miranda and sponsored by <span className="text-danger">Instituto Metrópole Digital/UFRN</span> </>}
                    />

                    <div id="signin-card" className="col-lg-6 col-12">
                        <form id="signin-form" className="p-5" onSubmit={handleSubmit}>
                            <div className='d-flex justify-content-between mb-2'>
                                <FormHeader
                                    title="Create new Account"
                                    subtitle={<>
                                        Provide your account information and we will create your user account.<br />
                                        Be sure to double-check the information for accuracy and its validity.
                                    </>}
                                />
                                {formData.imgUrl && (
                                    <img className="ml-4" id="profile-picture-preview" src={formData.imgUrl} alt="Profile picture" style={{ height: '150px', width: 'auto' }} />
                                )}
                            </div>

                            <InputContainer
                                iconClass="fa-solid fa-user"
                                type="text"
                                placeholder="Username"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />

                            <InputContainer
                                iconClass="fa-solid fa-id-badge"
                                type="text"
                                placeholder="Name"
                                id="fname"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                            />
                            <InputContainer
                                iconClass="fa-solid fa-id-badge"
                                type="text"
                                placeholder="Surname"
                                id="surname"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                            />

                            <InputContainer
                                iconClass="fa-solid fa-envelope"
                                type="text"
                                placeholder="E-mail"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <InputContainer
                                iconClass="fa-solid fa-lock"
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <InputContainer
                                iconClass="fa-solid fa-lock"
                                type="password"
                                placeholder="Confirm Password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            <InputContainer
                                iconClass="fa-solid fa-image"
                                type="text"
                                placeholder="Profile picture URL"
                                id="imgUrl"
                                name="imgUrl"
                                value={formData.imgUrl}
                                onChange={handleChange}
                            />

                            <div className="text-center">
                                <button type="submit" className="btn btn-danger py-3 col-lg-5 col-12">Create Account</button>
                            </div>
                            <div className="text-center mt-4">
                                <p> Already have an account? <Link className="link" to="/signin">Sign In</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
