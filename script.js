let players = [
    { id: 1, name: "Player 1", points: 0 },
    { id: 2, name: "Player 2", points: 0 },
    { id: 3, name: "Player 3", points: 0 },
    { id: 4, name: "Player 4", points: 0 }
];

let currentEditPlayerId = null;
let currentPopupPlayerId = null;

function addPoints(playerId, pointValue) {
    let player = players.find(p => p.id === playerId);
    player.points += pointValue;
    updatePlayers();
}

function decrementPoints(playerId) {
    let player = players.find(p => p.id === playerId);
    if (player.points > 0) {
        player.points--;
        updatePlayers();
    }
}

function addCustomPoints(playerId) {
    const input = document.getElementById(`input${playerId}`);
    const pointValue = parseInt(input.value);
    if (!isNaN(pointValue)) {
        addPoints(playerId, pointValue);
        input.value = ''; // Clear the input field after adding points
    }
}

function updatePlayers() {
    // Sort players by points descending
    players.sort((a, b) => b.points - a.points);
    
    // Update the HTML display
    players.forEach((player, index) => {
        const playerNameElement = document.getElementById(`playerName${player.id}`);
        const pointsDisplay = document.getElementById(`points${player.id}`);
        
        playerNameElement.innerText = `${getEmoji(index, player.points)} ${player.name}`;
        pointsDisplay.innerText = player.points;
        
        // Flash points display color
        pointsDisplay.style.color = "#2ecc71"; // Green color for points added
        setTimeout(() => pointsDisplay.style.color = "#e74c3c", 500); // Return to original color
        
        // Reorder player divs based on sorted order
        const playerDiv = document.getElementById(`player${player.id}`);
        playerDiv.style.order = index + 1;
    });
}


function getEmoji(position, points) {
    if (points <= 1) {
        return "😢"; // Sad emoji for low points
    } else {
        switch (position) {
            case 0: return "😄"; // First place
            case 1: return "😊"; // Second place
            case 2: return "😔"; // Third place
            default: return ""; // No emoji for other positions
        }
    }
}

function openEditPopup(playerId) {
    currentEditPlayerId = playerId;
    document.getElementById('editPlayerPopup').style.display = 'block';
}

function closeEditPopup() {
    document.getElementById('editPlayerPopup').style.display = 'none';
}

function savePlayerName() {
    const newName = document.getElementById('playerInput').value;
    if (newName) {
        const player = players.find(p => p.id === currentEditPlayerId);
        player.name = newName;
        updatePlayers(); // Update player name in UI
    }
    document.getElementById('editPlayerPopup').style.display = 'none';
}

function showPopup(playerId) {
    currentPopupPlayerId = playerId;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function addPointsFromPopup(points) {
    addPoints(currentPopupPlayerId, points);
    closePopup();
}
