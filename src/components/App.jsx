import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import * as auth from '../utils/auth.js';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([usersData, cardSection]) => {
                setCurrentUser(usersData);
                setCards(cardSection);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        isLiked
            ? api
                .deleteLikeCard(card._id, !isLiked).then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err)
                })
            : api
                .likeCard(card._id, !isLiked).then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err)
                });
    };

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() =>
                setCards((state) => state.filter((item) => item._id !== card._id)))
            .catch((err) => {
                console.log(err);
            });
    };

    function handleUpdateUser(userData) {
        setIsLoading(true);
        api
            .changeUserInfo(userData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api
            .changeAvatar(data)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleAddPlace(card) {
        setIsLoading(true);
        api
            .addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleRegistration(evt) {
        evt.preventDefault();
        setIsLoading(true);
        const { email, password } = formValue;

        auth.register(email, password)
            .then((res) => {
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                
            });
    };

    

    return (
        
        <CurrentUserContext.Provider value={currentUser}>
        <div className='page__content'>
                <Header />
                
            <Routes>
                    <Route path='/sign-up' element={<Register
                        handleRegistration={handleRegistration} />} />
                    <Route path='/sign-in' element={<Login
                         />} />
                    <Route
                        path='/'
                        element={
                            <ProtectedRouteElement
                                element={Main}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                                loggedIn={ loggedIn } />
                        }
                    />
                 <Route path="*" element={<Navigate to="/sign-up"/>}/>   
            </Routes>

            { loggedIn && <Footer /> }

           <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}/>       

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
                isLoading={isLoading}
                >
            </AddPlacePopup>
              
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
                >
            </EditAvatarPopup>
          
            <PopupWithForm
                name='delete'
                title='Вы уверены?'
                buttonText='Вы уверены?'
                onClose={closeAllPopups}
            >
            </PopupWithForm>
          
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}>
              
            </ImagePopup>
    
            </div>
            </CurrentUserContext.Provider>
    );
};

export default App;
