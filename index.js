const infoPopup = new Popup(document.querySelector('.user-info__button'), document.querySelector('.popup-info'));
const editPopup = new PopupEdit(document.querySelector('.user-info__edit-button'), document.querySelector('.popup-edit'));

const container = document.querySelector('.places-list');
const cardList = new CardList(container, window.data);

cardList.render();
const api = new Api(me);

api.getRequest().then(result=>{
    window.myId = result._id;
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
    document.querySelector('.user-info__name').textContent = result.name;
    document.querySelector('.user-info__job').textContent = result.about;
});


  
  