document.addEventListener("DOMContentLoaded", function () {
  const audio = document.querySelector(".main-audio");
  const playPauseBtn = document.querySelector(".play-pause");
  const previousBtn = document.querySelector(".previous-music");
  const nextBtn = document.querySelector(".next-music");
  const CoverImg = document.getElementById("Cover");
  const songName = document.querySelector(".name");
  const artistName = document.querySelector(".artist");
  const currentTime = document.querySelector(".current-time");
  const maxTime = document.querySelector(".max-time");
  const progress = document.querySelector(".progress-bar");
  const volumeControl = document.querySelector(".volume-control");

  let isPlaying = false;
  let isDragging = false;

  const playlist = [
    {
      title: "Carols of the bell",
      artist: "Linsey strling",
      source: "/musics/carol of the bells   lindsey stirling edit audio.mp3",
      Cover: "/img/Cover.png",
    },
    {
      title: "Cheque",
      artist: "Shubh",
      source: "/musics/song2.mp3",
      Cover: "/img/Cover.png",
    },
    
  ];

  let currentTrackIndex = 0;

  function playTrack(index) {
    const track = playlist[index];
    audio.src = track.source;
    CoverImg.src = track.Cover;
    songName.textContent = track.title;
    artistName.textContent = track.artist;
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
  }

  function togglePlayPause() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
  }

  function updatePlayPauseIcon() {
    const iconClass = isPlaying ? "fa-pause" : "fa-play";
    playPauseBtn.innerHTML = `<i class="fas ${iconClass}"></i>`;
  }

  function updateProgress() {
    const duration = audio.duration || 1;
    const currentTimeValue = audio.currentTime;

    currentTime.textContent = formatTime(currentTimeValue);
    maxTime.textContent = formatTime(duration);

    if (!isDragging) {
      const progressPercentage = (currentTimeValue / duration) * 100;
      progress.style.width = `${progressPercentage}%`;
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  function updateProgressOnDrag(e) {
    const progressBarRect = progress.getBoundingClientRect();
    const progressPercentage = (e.clientX - progressBarRect.left) / progressBarRect.width;
    progress.style.width = `${progressPercentage * 100}%`;
    const newTime = progressPercentage * audio.duration;
    currentTime.textContent = formatTime(newTime);
  }

  function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentTrackIndex);
  }

  function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(currentTrackIndex);
  }

  playPauseBtn.addEventListener("click", togglePlayPause);
  previousBtn.addEventListener("click", playPrevious);
  nextBtn.addEventListener("click", playNext);

  audio.addEventListener("timeupdate", updateProgress);

  audio.addEventListener("ended", function () {
    isPlaying = false;
    updatePlayPauseIcon();
  });

  progress.addEventListener("mousedown", function (e) {
    isDragging = true;
    updateProgressOnDrag(e);
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      audio.currentTime = (parseFloat(progress.style.width) / 100) * audio.duration;
    }
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      updateProgressOnDrag(e);
    }
  });

  volumeControl.addEventListener("input", function () {
    audio.volume = volumeControl.value / 100;
  });

  
  playTrack(currentTrackIndex);
});
