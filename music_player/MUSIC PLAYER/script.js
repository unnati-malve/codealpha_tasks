const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const progressBar = document.getElementById("progress-bar");
const volumeBar = document.getElementById("volume-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");


const songs = [
    { name: "HaayeReDilMeraGoriye", file: "songs/HaayeReDilMeraGoriye.mp3" },
    { name: "Jab Tak", file: "songs/Jab Tak.mp3" },
    { name: "Kesariya Tera Ishq Hai Piya", file: "songs/Kesariya Tera Ishq Hai Piya" }
];

let currentSongIndex = 0;
let isPlaying = false;


function loadSong(index) {
    songTitle.innerText = songs[index].name;
    audioPlayer.src = songs[index].file;
}


function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayer.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}


function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
}


function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
}


audioPlayer.addEventListener("timeupdate", () => {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;

 
    currentTimeEl.innerText = formatTime(audioPlayer.currentTime);
    totalTimeEl.innerText = formatTime(audioPlayer.duration);
});


progressBar.addEventListener("input", () => {
    let seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

volumeBar.addEventListener("input", () => {
    audioPlayer.volume = volumeBar.value;
});


function formatTime(time) {
    if (isNaN(time)) return "0:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

playButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
audioPlayer.addEventListener("ended", nextSong);


loadSong(currentSongIndex);
