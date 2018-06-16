const searchIcon = document.querySelector('#searchIcon');
const searchModal = document.querySelector('#searchModal');
const searchBar = document.querySelector('#searchBar');
const orderDescModal = document.querySelector('.orderDescription-modal');
const orderDescModalContent = document.querySelector('.orderDescription-modal .content');


searchIcon.addEventListener('click', () => {
  searchIcon.classList.add('active');
  searchBar.classList.add('active');
  searchModal.classList.add('active');
  document.querySelector('#searchInput').focus();
});


searchModal.addEventListener('click', () => {
  searchIcon.classList.remove('active');
  searchBar.classList.remove('active');
  document.querySelector('#searchContainer').classList.remove('hidden');
  document.querySelector('.filtersPopup').classList.remove('active');
  searchModal.classList.remove('active');
  if (orderDescModal) orderDescModal.classList.remove('active');
  if (orderDescModalContent) orderDescModalContent.classList.remove('show');
});
