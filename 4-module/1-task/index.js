function makeFriendsList(friends) {
  // ваш код...
  let friendsList = document.createElement('UL');

  for (let friend of friends) {
    friendsList.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`)
  }
  
  return friendsList;
}
