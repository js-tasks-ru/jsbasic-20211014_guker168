function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  friends.map(el => {
    return ul.innerHTML += `<li>${el.firstName} ${el.lastName}</li>`;
  });
  return ul;
}
