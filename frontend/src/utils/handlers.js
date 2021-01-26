// const closeAllPopups = (setOpen) => {
//   setOpen(false);
// };

// const handleClick = (setClick) => {
//   setClick(true);
// };

// const handleEditProfileClick = () => {
//   setEditProfileClick(true);
// };

// const handleAddPlaceClick = () => {
//   setAddPlacePopupOpen(true);
// };

// const handleAvatarClick = () => {
//   setEditAvatarPopupOpen(true);
// };

// const handleSelectCard = (data) => {
//   setCard(data);
//   setIsOpen(true);
// };

// const handleUpdateUser = (data) => {
//   api.setUserInfo(data)
//     .then((res) => {
//       setCurrentUser(res);
//     })
//     .catch((error) => console.log(error))
//     .finally(() => {
//       closeAllPopups(setEditProfileClick);
//     });
// };

// const handleUpdateAvatar = (data) => {
//   api.setUserAvatar(data)
//     .then((res) => {
//       setCurrentUser(res);
//     })
//     .catch((error) => console.log(error))
//     .finally(() => {
//       closeAllPopups(setEditAvatarPopupOpen);
//     });
// };

// const handleAddPlaceSubmit = (data) => {
//   api.addCard(data)
//     .then((newCard) => {
//       setCards((newCards) => [newCard, ...newCards]);
//     })
//     .catch((error) => console.log(error))
//     .finally(() => {
//       closeAllPopups(setAddPlacePopupOpen);
//     });
// };

// const handleCardLike = (card) => {
//   const { likes, _id: cardId } = card;
//   const isLiked = likes.some((i) => i._id === currentUser._id);
//   api.changeLikeCardStatus(cardId, !isLiked)
//     .then((newCard) => {
//       const newCards = cards.map((c) => (c._id === cardId ? newCard : c));
//       setCards(newCards);
//     })
//     .catch((error) => console.log(error));
// };

// const handleCardDelete = (id) => {
//   api.deleteCard(id)
//     .then(() => {
//       const newCards = cards.filter((card) => id !== card._id);
//       setCards(newCards);
//     })
//     .catch((error) => console.log(error));
// };

// export {
// closeAllPopups,
// handleClick,
// handleEditProfileClick,
// handleAddPlaceClick,
// handleAvatarClick,
// handleSelectCard,
// handleUpdateUser,
// handleUpdateAvatar,
// // handleAddPlaceSubmit,
// handleCardLike,
// handleCardDelete,
// };
