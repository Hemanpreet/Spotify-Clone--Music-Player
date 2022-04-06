console.log("welcome to spotify");
// Initialize the variables
let songIndex = 0;//variable to determine which song is playing
// we have to make a new audio
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');// masterPlay is the id of our play button
let myProgressBar = document.getElementById('myProgressBar');//where myProgressBar is the id of our progress Bar at the bottom
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// we make a array of objects with (key,value) pair 
let songs = [{songName:"Let Me Love You",filePath:"songs/1.mp3",coverPath:"covers/cover1.jpg"},
{songName:"At My Worst",filePath:"songs/2.mp3",coverPath:"covers/cover2.jpg"},
{songName:"Count On Me",filePath:"songs/3.mp3",coverPath:"covers/cover3.jpg"},
{songName:"Stay",filePath:"songs/4.mp3",coverPath:"covers/cover4.jpg"},
{songName:"Blank Space",filePath:"songs/5.mp3",coverPath:"covers/cover5.jpg"},
{songName:"We Don't Talk Anymore",filePath:"songs/6.mp3",coverPath:"covers/cover6.jpg"},
{songName:"On My Way",filePath:"songs/7.mp3",coverPath:"covers/cover7.jpg"},
{songName:"Shape Of You",filePath:"songs/8.mp3",coverPath:"covers/cover8.jpg"},
{songName:"Perfect",filePath:"songs/9.mp3",coverPath:"covers/cover9.jpg"},
{songName:"Let Me Down Slowly",filePath:"songs/10.mp3",coverPath:"covers/cover10.jpg"}]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
masterPlay.addEventListener('click', ()=>{
    // if anyone clicks play button with id->>masterPlay so listen to event->>click
    if(audioElement.paused || audioElement.currentTime<=0){
        // it means audio is not playing so we need to play the audio
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
         // after playing the song we want play icon to convert into pause icon
        masterPlay.classList.add('fa-pause-circle');
        // we have to make opacity of gif as 1 when song is playing
        gif.style.opacity = 1;
    }
    else{
         // if audio is playing then pause the audio
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        // we have to make opacity of gif as 0 when song is not playing
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', ()=>{ 
   // console.log("time update");
//     // update progress bar/seekbar
//     // we are calculating progress in percentage i.e how much percent our audio has already played where currentTime gives at which time audio is playing and duration gives the duration of entire audio so (currentTime/duration)*100 gives the percentage of audio played and parseInt becoz we want the result in integer
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    // console.log(progress);
    myProgressBar.value = progress;
})

// as we see a change in the progress bar so we want myProgressBar to listen to "change" event
myProgressBar.addEventListener('change', ()=>{
    // we want to seek/progress our audio as well when we see a change in progress bar
//     // generating formula->>
//     // (currentTime/duration)*100=percentage of progress(P)
//     // so currentTime = (P*duration)/100 where P=percentage
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    // this function will make all the pause buttons as play button
//     // Array.from() method returns an array from an object with length property
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    // if we click on play button of elements/all songs
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


// if anyone clicks on previous then run the function
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
     // // as song has changes so currenttime will change to 0
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

// document.getElementById("previous").
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
     // as song has changes so currenttime will change to 0
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

