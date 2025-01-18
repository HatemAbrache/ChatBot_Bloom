async function sendMessage() {
    const input = document.getElementById('message-input');
    const chatBox = document.getElementById('chat-box');
    const header = document.querySelector('.header'); // Section contenant le message de bienvenue et la question
    const message = input.value;

    if (!message.trim()) return;

    // Supprimer la section d'introduction après le premier message avec animation
    if (header && chatBox.children.length === 0) {
        header.classList.add('slide-up'); // Ajout de l'animation
        setTimeout(() => {
            header.style.display = 'none'; // Masquer l'élément après l'animation
        }, 500); // Correspond à la durée de l'animation en ms
    }

    // Ajouter le message utilisateur
    const userBubble = document.createElement('div');
    userBubble.className = 'bubble user';
    userBubble.textContent = message;
    chatBox.appendChild(userBubble);

    input.value = ''; // Réinitialiser le champ d'entrée

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        // Ajouter la réponse de Bloom avec un rond
        const aiContainer = document.createElement('div');
        aiContainer.className = 'bubble-container'; // Conteneur pour la bulle et le rond

        const avatar = document.createElement('div');
        avatar.className = 'avatar'; // Rond pour Bloom

        const aiBubble = document.createElement('div');
        aiBubble.className = 'bubble ai';
        aiBubble.textContent = data.response;

        aiContainer.appendChild(avatar); // Ajouter le rond
        aiContainer.appendChild(aiBubble); // Ajouter la bulle
        chatBox.appendChild(aiContainer);

        chatBox.scrollTop = chatBox.scrollHeight; // Scroller vers le bas
    } catch (error) {
        const errorBubble = document.createElement('div');
        errorBubble.className = 'bubble ai';
        errorBubble.textContent = 'Erreur : Impossible de se connecter.';
        chatBox.appendChild(errorBubble);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('message-input');
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault(); 
        }
    });
});