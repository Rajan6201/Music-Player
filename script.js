console.log("Welcome to Music Player");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Kitne Dino Ke Baad Mile Ho - Andolan", filePath: "songs/1.mp3", coverPath: "CoverPhotos/1.jpg"},
    {songName: "Is Tarah Aashiqui Ka - Kumar Sanu", filePath: "songs/2.mp3", coverPath: "CoverPhotos/2.jpg"},
    {songName: "Ae Mere Humsafar - Alka Yagnik", filePath: "songs/3.mp3", coverPath: "CoverPhotos/3.jpg"},
    {songName: "Aye Mere Humsafar - Udit Narayan, Alka yagnik", filePath: "songs/4.mp3", coverPath: "CoverPhotos/4.jpg"},
    {songName: "Na Kajre Ki Dhaar", filePath: "songs/5.mp3", coverPath: "CoverPhotos/5.jpg"},
    {songName: "Saanson Ki Mala", filePath: "songs/6.mp3", coverPath: "CoverPhotos/6.jpg"},
    {songName: "Photo - Luka Chuppi", filePath: "songs/7.mp3", coverPath: "CoverPhotos/7.jpg"},
    {songName: "Ram Siya Ram - Adipurush", filePath: "songs/8.mp3", coverPath: "CoverPhotos/8.jpg"},
    {songName: "Ae Kash Ke Hm - Kumar Sanu", filePath: "songs/9.mp3", coverPath: "CoverPhotos/9.jpg"},
    {songName: "Tumse Milne Ki Tamannah - Sajan", filePath: "songs/10.mp3", coverPath: "CoverPhotos/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})