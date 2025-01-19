console.log("lets write some JS")
mpp = "MediaPlayPause"
let currentSong = new Audio();
async function getSongs(){
    let a = await fetch("https://github.com/Phenominer/spotify_clone/tree/main/songs")
    let response = await a.text();
    let div= document.createElement("div")
    div.innerHTML = response;
    let as= div.getElementsByTagName("a")
    let songs = []
    for(let index=0; index < as.length; index++){
        const element = as[index]
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("songs/")[1].split(".mp3")[0])
        }
    }
    console.log('helloi')
    return songs

}
function convertToMinutesAndSeconds(seconds) {
    seconds = Math.floor(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}
const playMusic = (track)=>{
    bgimg = track+".jpg"
    currentSong.src='http://127.0.0.1:8080/songs/'+track+".mp3"
    currentSong.play()
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00/00:00"
}
async function main(){
    let songs= await getSongs()
    console.log(songs)
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML=songUL.innerHTML + `<li>${song.replaceAll("%20"," ")}</li>`;
    playMusic(songs[0])
    console.log(currentSong.duration)
    currentSong.pause()
        document.querySelector(".songtime").innerHTML=`${convertToMinutesAndSeconds(currentSong.currentTime)}/${convertToMinutesAndSeconds(currentSong.duration)}`
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.innerHTML)
            playMusic(e.innerHTML)
            play.src="pause.svg"
        })
    })
    play.addEventListener("click",(e)=>{
        console.log(e)
        if (currentSong.paused){
            currentSong.play()
            play.src="pause.svg"
        }
        else{
            currentSong.pause()
            play.src="play.svg"
        }

    })
   currentSong.addEventListener("timeupdate",()=>{
    document.querySelector(".songtime").innerHTML=`${convertToMinutesAndSeconds(currentSong.currentTime)}/${convertToMinutesAndSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%"
    })
    document.querySelector(".seekbar").addEventListener("click",e=>{
        percent= (e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left= percent +"%"
        currentSong.currentTime= (percent/100)*currentSong.duration
    })
    previous.addEventListener("click",()=>{
        console.log("previous")
        let index= songs.indexOf(currentSong.src.split("songs/")[1].split(".mp3")[0])
        if (index == 0) {
            playMusic(songs[songs.length-1])
        }
        else{
            playMusic(songs[index-1])
        }

    })

    next.addEventListener("click",()=>{
       let index= songs.indexOf(currentSong.src.split("songs/")[1].split(".mp3")[0])
       if (index == songs.length-1) {
              playMusic(songs[0])
       }
       else{ 
            playMusic(songs[index+1])
        }
    })
    if(currentSong.paused){
        play.src="play.svg"
    }
    else{
        play.src="pause.svg"
    }
    document.querySelector(".volume").addEventListener("input",e=>{
        currentSong.volume=(e.target.value)/100
        if (e.target.value==0){
            volumesvg.src="volume_mute.svg"
        }
        else{
            volumesvg.src="volume.svg"
        }
    })
    document.querySelector(".volumesvg").addEventListener("click",()=>{
        if (currentSong.volume==0){
            currentSong.volume=1
            document.querySelector(".volume").value=100
            volumesvg.src="volume.svg"
        }
        else{
            currentSong.volume=0
            document.querySelector(".volume").value=0
            volumesvg.src="volume_mute.svg"
        }
    })
   /* document.addEventListener("keydown", e => {
        console.log(e)
        if( e.target.key == mpp && currentSong.paused){
            play.src="play.svg"
        }
        else if( e.key ==mpp){
            play.src="pause.svg"
        }

    })*/
    document.addEventListener("click", (e) => {
        let a = currentSong.src.split("songs/")[1].split(".mp3")[0].replaceAll("%20", " ") + ".jpg";
        document.querySelector(".spotifyPlaylists").style.backgroundImage = `url("${a}")`;
        console.log(a);
    });
   /* document.addEventListener("play",(e)=>{
        console.log(e)
        play.src ="pause.svg"
    })  
    document.addEventListener("pause",(e)=>{
        console.log(e)
        play.src= "pause.svg"
    })*/
   document.querySelector




}
main()
 