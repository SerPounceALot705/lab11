(function () {
  window.getCard = getsCardsOptions('cards', 'GET');
  window.me = getsCardsOptions('users/me', 'GET'); 
  window.mePatch = getsCardsOptions('users/me', 'PATCH'); 
  window.createNewCart = getsCardsOptions('cards', 'POST');
}) ();


function getsCardsOptions(action, method) {
  return {
    ip: '95.216.175.5',
    token: '16684547-ae20-4b26-8a6e-8ab3e5ee968a',
    groupId: 'cohort5',
    contentType: 'application/json',
    action: action,
    method: method
  }
}

