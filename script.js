const videoSelect = document.getElementById("videoSelect");
const spotifySelect = document.getElementById("spotifySelect");
const youtubePlayer = document.getElementById("youtubePlayer");
const spotifyPlayer = document.getElementById("spotifyPlayer");

const addVideoBtn = document.getElementById("addVideoBtn");
const deleteVideoBtn = document.getElementById("deleteVideoBtn");
const addPlaylistBtn = document.getElementById("addPlaylistBtn");
const deletePlaylistBtn = document.getElementById("deletePlaylistBtn");

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

// Populate dropdown menus
function populateDropdowns() {
    videoSelect.innerHTML = "";
    spotifySelect.innerHTML = "";

    videos.forEach(video => {
        const option = document.createElement("option");
        option.textContent = video.name;
        option.value = video.url;
        videoSelect.appendChild(option);
    });

    playlists.forEach(playlist => {
        const option = document.createElement("option");
        option.textContent = playlist.name;
        option.value = playlist.url;
        spotifySelect.appendChild(option);
    });
}

// Helper function to convert YouTube URL to embed format
function convertYouTubeURL(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
}

// Helper function to convert Spotify playlist URL to embed format
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
        populateDropdowns();
        videoSelect.value = embedURL;
        youtubePlayer.src = embedURL;
    } else {
        alert("Invalid YouTube link. Please try again.");
    }
});

// Delete selected video
deleteVideoBtn.addEventListener("click", () => {
    const selectedIndex = videoSelect.selectedIndex;
    if (selectedIndex !== -1) {
        videos.splice(selectedIndex, 1);
        saveData();
        populateDropdowns();
        youtubePlayer.src = videos[0] ? videos[0].url : "";
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
        populateDropdowns();
        spotifySelect.value = embedURL;
        spotifyPlayer.src = embedURL;
    } else {
        alert("Invalid Spotify playlist link. Please try again.");
    }
});

// Delete selected playlist
deletePlaylistBtn.addEventListener("click", () => {
    const selectedIndex = spotifySelect.selectedIndex;
    if (selectedIndex !== -1) {
        playlists.splice(selectedIndex, 1);
        saveData();
        populateDropdowns();
        spotifyPlayer.src = playlists[0] ? playlists[0].url : "";
    }
});

// Load and initialize
loadSavedData();
populateDropdowns();

// Load default players
youtubePlayer.src = videoSelect.value;
spotifyPlayer.src = spotifySelect.value;

// Change video when user selects new one
videoSelect.addEventListener("change", () => {
    youtubePlayer.src = videoSelect.value;
});

// Change playlist when user selects new one
spotifySelect.addEventListener("change", () => {
    spotifyPlayer.src = spotifySelect.value;
});
