import React, { useState } from 'react';
import api from '../../services/api'; // Ajuste o caminho conforme necessário

function Body() {
    const [roomCode, setRoomCode] = useState('');

    const handleRoomCodeChange = (event) => {
        setRoomCode(event.target.value);
    };

    const handleJoinClick = async () => {
        if (!roomCode) {
            alert('Please enter a room code.');
            return;
        }

        try {
            // Verificar se a sala existe
            const room = await api.get(`rooms/${roomCode}`);
            
            if (!room) {
                alert('Room not found.');
                return;
            }

            // Verificar se o usuário está autenticado
            const user = localStorage.getItem('currentUser'); // Ajuste conforme seu método de autenticação
            if (!user) {
                alert('Please log in to join a room.');
                return;
            }

            const userId = JSON.parse(user).id;
            
            // Recuperar dados do usuário
            const userData = await api.get(`users/${userId}`);
            
            if (!userData) {
                alert('User data not found.');
                return;
            }
            
            // Adicionar o código da sala ao objeto do usuário
            const updatedRooms = userData.rooms ? [...userData.rooms, roomCode] : [roomCode];
            
            // Atualizar o objeto do usuário com a nova lista de salas
            const updatedUserData = {
                ...userData,
                rooms: updatedRooms
            };
            
            await api.put(`users/${userId}`, updatedUserData);

            alert('Joined the room successfully!');
        } catch (error) {
            console.error('Error details:', error);
            alert('An error occurred while trying to join the room. Please check the console for more details.');
        }
    };

    return (
        <div className="content">
            <div className="main-content container row justify-content-center col-12 align-items-center">
                <div>
                    <h3 className="col-12"> Closed Bets Solutions </h3>
                    <h1 className="my-5 col-12 text-md-lg"> Create Bets, Invite Friends, Join Rooms To Enjoy </h1>
                </div>

                <div className="options d-flex justify-content-center col-12 mb-5">
                    <ul>
                        <li>
                            <img className="icon" src="https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2023/02/18/919177108-brasileirao-a.jpg" alt="Brasileirao Icon" />
                        </li>
                        <li>
                            <img className="icon" src="https://cdn-icons-png.flaticon.com/512/5525/5525062.png" alt="Bingo Icon" />
                        </li>
                        <li>
                            <img className="icon" src="https://s3.static.brasilescola.uol.com.br/be/2022/03/taca-da-libertadores.jpg" alt="Libertadores Icon" />
                        </li>
                        <li>
                            <img className="icon" src="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fnba.png" alt="NBA Icon" />
                        </li>
                        <li>
                            <img className="icon" src="https://yt3.googleusercontent.com/BHfbCbg4x6VgO5sEDv0E5odG2ML9NOYxuDN8r91FhI1j0HFu2ulIus3j2D4M-7fdQvwBrgXX=s900-c-k-c0x00ffffff-no-rj" alt="Another Icon" />
                        </li>
                    </ul>
                    <div className="options-description d-flex flex-column text-justify justify-content-evenly ml-5">
                        <h4> Personalized Bets </h4>
                        <h5> Create Your Own Bets To Play With Particular Friends </h5>
                    </div>
                </div>

                <div className="find-room-card ml-4 p-3 col-lg-8 col-md-8 col-sm-10 col-12">
                    <div className="row col-12 d-flex justify-content-center">
                        <div className="search-box col-lg-8 col-md-12 col-sm-12 col-12">
                            <p className="col-12"> When creating a room, the creator receives a room code </p>
                            <input
                                className="p-3 mb-1 col-12"
                                type="text"
                                placeholder="Put room code here..."
                                value={roomCode}
                                onChange={handleRoomCodeChange}
                            />
                            <p className="col-12" style={{ textAlign: "left", color: "grey", fontSize: "16px" }}>
                                Don't have an account?
                                <a href="../html/signin.html" style={{ color: "greenyellow", textDecoration: "none", marginLeft: "10px" }}>
                                    Register now
                                </a>
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                            <button
                                className="emp-btn mt-3 py-3 col-lg-8 text-center"
                                onClick={handleJoinClick}
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;
