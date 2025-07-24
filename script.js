const videoGrid = document.getElementById("videoGrid");
const playlistGrid = document.getElementById("playlistGrid");
const youtubePlayer = document.getElementById("youtubePlayer");
const spotifyPlayer = document.getElementById("spotifyPlayer");

const addVideoBtn = document.getElementById("addVideoBtn");
const addPlaylistBtn = document.getElementById("addPlaylistBtn");

// Default lists
let videos = [
    { name: "Lo-Fi City Night", url: "https://www.youtube.com/embed/5qap5aO4i9A" },
    { name: "Tokyo Night Walk", url: "https://www.youtube.com/embed/hHW1oY26kxQ" },
    { name: "Driving Rain", url: "https://www.youtube.com/embed/5yx6BWlEVcY" }
];

let playlists = [
    { name: "Lo-Fi Beats", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdwmD5Q7Gxah" },
    { name: "Chill Vibes", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWUS3jbm4YExP" },
    { name: "Night Drive", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0SM0LYsmbMT" }
];

// Load saved lists from localStorage
function loadSavedData() {
    const savedVideos = JSON.parse(localStorage.getItem("videos"));
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists"));

    if (savedVideos) videos = savedVideos;
    if (savedPlaylists) playlists = savedPlaylists;
}

// Save lists to localStorage
function saveData() {
    localStorage.setItem("videos", JSON.stringify(videos));
    localStorage.setItem("playlists", JSON.stringify(playlists));
}

// Render cards
function renderCards() {
    videoGrid.innerHTML = "";
    playlistGrid.innerHTML = "";

    videos.forEach((video, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteVideo(${index})">x</button>
            <h3>${video.name}</h3>
        `;
        card.onclick = () => {
            youtubePlayer.src = video.url;
        };
        videoGrid.appendChild(card);
    });

    playlists.forEach((playlist, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <button class="delete-btn" onclick="deletePlaylist(${index})">x</button>
            <h3>${playlist.name}</h3>
        `;
        card.onclick = () => {
            spotifyPlayer.src = playlist.url;
        };
        playlistGrid.appendChild(card);
    });
}

// Delete functions
function deleteVideo(index) {
    videos.splice(index, 1);
    saveData();
    renderCards();
    youtubePlayer.src = videos[0] ? videos[0].url : "";
}

function deletePlaylist(index) {
    playlists.splice(index, 1);
    saveData();
    renderCards();
    spotifyPlayer.src = playlists[0] ? playlists[0].url : "";
}

// Helper functions
function convertYouTubeURL(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
}

function convertSpotifyURL(url) {
    const regex = /open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
        return `https://open.spotify.com/embed/playlist/${match[1]}`;
    }
    return null;
}

// Add new video
addVideoBtn.addEventListener("click", () => {
    const videoName = prompt("Enter a name for this video:");
    const videoURL = prompt("Paste the YouTube video link:");

    const embedURL = convertYouTubeURL(videoURL);

    if (videoName && embedURL) {
        videos.push({ name: videoName, url: embedURL });
        saveData();
        renderCards();
        youtubePlayer.src = embedURL;
    } else {
        alert("Invalid YouTube link. Please try again.");
    }
});

// Add new playlist
addPlaylistBtn.addEventListener("click", () => {
    const playlistName = prompt("Enter a name for this playlist:");
    const playlistURL = prompt("Paste the Spotify playlist link:");

    const embedURL = convertSpotifyURL(playlistURL);

    if (playlistName && embedURL) {
        playlists.push({ name: playlistName, url: embedURL });
        saveData();
        renderCards();
        spotifyPlayer.src = embedURL;
    } else {
        alert("Invalid Spotify playlist link. Please try again.");
    }
});

// Initialize
loadSavedData();
renderCards();

// Load default players
if (videos[0]) youtubePlayer.src = videos[0].url;
if (playlists[0]) spotifyPlayer.src = playlists[0].url;
