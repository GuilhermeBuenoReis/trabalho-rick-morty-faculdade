async function fetchCharacters() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character/?page=19');
    const data = await response.json();

    const container = document.getElementById('characters-container');


    data.results.forEach(character => {
      const card = document.createElement('div');
      card.className = 'character-card';


      const statusColor = character.status === 'Alive' ? 'green' :
        character.status === 'Dead' ? 'red' : 'gray';

      card.innerHTML = `
        <div class="character-image">
            <img src="${character.image}" alt="${character.name}">
        </div>
        <div class="character-info">
            <h2>${character.name}</h2>
            <p class="status">
                <span class="status-icon" style="background-color: ${statusColor}"></span>
                ${character.status} - ${character.species}
                ${character.type ? `(${character.type})` : ''}
            </p>
            <div class="location-info">
                <p>
                    <span class="label">Origem:</span>
                    ${character.origin.name}
                </p>
                <p>
                    <span class="label">Localização:</span>
                    ${character.location.name}
                </p>
            </div>
        </div>
    `;

      container.appendChild(card);


    })
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    const container = document.getElementById('characters-container');
    container.innerHTML = '<p class="error">Erro ao carregar os personagens. Por favor, tente novamente mais tarde.</p>';
  }
}

document.addEventListener('DOMContentLoaded', fetchCharacters);