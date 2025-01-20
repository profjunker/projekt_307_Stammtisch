document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM ist geladen');

    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    if (!searchInput) {
        console.error('Suchfeld nicht gefunden!');
        return;
    }

    async function fetchCocktails() {
        console.log('fetchCocktails() aufgerufen');

        try {
            const response = await fetch('/search/api');
            console.log('Antwort von API erhalten:', response);

            if (!response.ok) {
                throw new Error(`Fehler beim Abrufen der Cocktails: ${response.status}`);
            }

            const data = await response.json();
            console.log('Daten empfangen:', data);
            return data.cocktails;
        } catch (error) {
            console.error('Fehler beim Laden der Cocktails:', error);
            return [];
        }
    }

    function renderResults(cocktails) {
        console.log('renderResults() aufgerufen mit:', cocktails);
        resultsContainer.innerHTML = '';

        if (cocktails.length === 0) {
            resultsContainer.innerHTML = '<p>Keine Cocktails gefunden.</p>';
            console.log('Keine Cocktails gefunden.');
            return;
        }

        cocktails.forEach(cocktail => {
            console.log('Cocktail wird angezeigt:', cocktail.titel);

            const div = document.createElement('div');
            div.classList.add('cocktail-item');
            div.innerHTML = `
                <h2>${cocktail.titel}</h2>
                <img src="${cocktail.image}" alt="Cocktail Bild" style="width: 200px; height: auto;" />
            `;
            resultsContainer.appendChild(div);
        });
    }

    searchInput.addEventListener('input', async function () {
        console.log('Eingabe geändert:', searchInput.value);

        const searchTerm = searchInput.value.toLowerCase();
        const cocktails = await fetchCocktails();

        if (!Array.isArray(cocktails)) {
            console.error('Fehler: Cocktails ist kein Array', cocktails);
            return;
        }

        const filteredCocktails = cocktails.filter(cocktail =>
            cocktail.titel && typeof cocktail.titel === 'string' &&
            cocktail.titel.toLowerCase().includes(searchTerm)
        );

        console.log('Gefilterte Cocktails:', filteredCocktails);
        renderResults(filteredCocktails);
    });
});