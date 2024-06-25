const participantsContainer = document.querySelector('.participants__items');
const prevBtn = document.querySelector('.participants__arrows-btn[data-type="prev"]');
const nextBtn = document.querySelector('.participants__arrows-btn[data-type="next"]');
const numbersSpan = document.querySelector('.participants__numbers');

let currentIndex = 0;
const itemsPerPage = 6;

function displayParticipants() {
  participantsContainer.innerHTML = '';

  for (let i = currentIndex; i < currentIndex + itemsPerPage; i++) {
    if (i >= participants.length) break;

    const participant = participants[i];
    const participantElement = document.createElement('div');
    participantElement.classList.add('participants__item');
    participantElement.innerHTML = `
      <img src="./images/${participant.image}" alt="${participant.name}">
      <h3>${participant.name}</h3>
    `;
    participantsContainer.appendChild(participantElement);
  }

  updateNumbers();
}

function updateNumbers() {
  const totalPages = Math.ceil(participants.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;
  numbersSpan.textContent = `${currentPage} / ${totalPages}`;
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= itemsPerPage;
    displayParticipants();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex + itemsPerPage < participants.length) {
    currentIndex += itemsPerPage;
    displayParticipants();
  }
});

displayParticipants();

