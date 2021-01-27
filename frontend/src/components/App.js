import React, { useCallback, useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from 'react-router-dom';
import api from '../utils/api';
import Auth from '../utils/apiAuth';
import CurrentUserContext from '../context/CurrentUserContext';
import Header from './Header';
import SignLink from './SignLink';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {
  // states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedCard, setCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const localToken = localStorage.getItem('jwt');
    if (localToken) {
      Auth.tokenCheck(localToken)
        .then((res) => {
          const { email } = res;
          setUserEmail(email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCard()])
        .then((data) => {
          const [userInfo, cardsData] = data;
          setCurrentUser(userInfo);
          setCards(cardsData.reverse());
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  // handles functions
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsImageOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleSelectCard = (data) => {
    setCard(data);
    setIsImageOpen(true);
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
      .then((newCard) => {
        setCards((newCards) => [newCard.data, ...newCards]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleCardLike = (card) => {
    const { likes, _id: cardId } = card;
    const isLiked = likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(cardId, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === cardId ? newCard : c));
        setCards(newCards);
      })
      .catch((error) => console.log(error));
  };

  const handleCardDelete = (id) => {
    api.deleteCard(id)
      .then(() => {
        const newCards = cards.filter((card) => id !== card._id);
        setCards(newCards);
      })
      .catch((error) => console.log(error));
  };
  // handlers authentication
  const logOut = useCallback((path) => {
    if (path === '/') {
      setUserEmail('');
      setLoggedIn(false);
      localStorage.removeItem('jwt');
    }
  }, []);

  const handleSubmitRegister = useCallback((data) => {
    Auth.registration(data)
      .then(() => {
        history.push('/sign-in');
        setIsRegister(true);
      })
      .catch(() => {
        setIsRegister(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }, []);
  const handleSubmitAuthentication = useCallback((outputData) => {
    Auth.authentication(outputData)
      .then((inputData) => {
        localStorage.setItem('jwt', inputData.token);
        setUserEmail(outputData.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header>
            <SignLink onSign={logOut} userEmail={userEmail} />
          </Header>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={() => handleEditProfileClick()}
              onAddPlace={() => handleAddPlaceClick()}
              onEditAvatar={() => handleAvatarClick(true)}
              onCardClick={(data) => handleSelectCard(data)}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
            <Route path="/sign-up" render={() => <Register onSubmit={handleSubmitRegister} />} />
            <Route path="/sign-in" render={() => <Login onSubmit={handleSubmitAuthentication} />} />
            <Route path="/*">
              { loggedIn ? <Redirect to="/" /> : <Redirect to="sign-in" /> }
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={() => closeAllPopups()}
            isRegister={isRegister}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={() => closeAllPopups()}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={() => closeAllPopups()}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={() => closeAllPopups()}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            isOpen={isImageOpen}
            selectedCard={selectedCard}
            onClose={() => closeAllPopups()}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
