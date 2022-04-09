const playlist = {
    whatsTheDifference: {
        audio: `assets/album/drDre/audio/Y2Mate.is - What's The Difference--Ubyt7iWJ8Q-160k-1648734303996.mp3`,
        img: `assets/album/drDre/DrDre-2001.jpg`,
        songName: `What's the difference`,
        artists: [`Dr. Dre`, 'Eminem', 'Exzibit'],
        album: `2001`,
        dateAdded: `2 days ago`,
        songDuration: `4:04`,
        id: `whatsTheDifference`
    },
    iWontComplain: {
        audio: `assets/album/benjamineClementine/audio/Y2Mate.is - Benjamin Clementine - I Won’t Complain (Official Video)-JQ4mFaI17pk-48k-1649180195082.mp3`,
        img: `assets/album/benjamineClementine/img/atleastfornow_cover_sq-2b1ebd1afa609105b3311ce6145c72a0f8aa05e6.jpg`,
        songName: `I won't complain`,
        artists: [`Benjamin Clementine`],
        album: `At least for now (delux)`,
        dateAdded: `3 days ago`,
        songDuration: `4:40`,
        id: `iWontComplain`
    },
    comingHome: {
        audio: `assets/album/leonBridges/audio/Y2Mate.is - Leon Bridges - Coming Home (Official Music Video)-MTrKkqE9p1o-48k-1649015391822.mp3`,
        img: `assets/album/leonBridges/img/ea0ba47fd4268773fefe92cf0db8cd53.999x999x1.jpg`,
        songName: `Coming Home`,
        artists: [`Leon Bridges`],
        album: `Coming Home (delux)`,
        dateAdded: `5 days ago`,
        songDuration: `4:05`,
        id: `comingHome`
    },
    boomerang: {
        audio: `assets/album/jidenna/audio/Y2Mate.is - Jidenna - Boomerang-k2R5FNOEEGw-48k-1649352948257.mp3`,
        img: `assets/album/jidenna/img/jidenna-boomerang-ep-620x620.jpg`,
        songName: `Boomerang`,
        artists: [`Jidenna`],
        album: `Boomerang EP`,
        dateAdded: `10 days ago`,
        songDuration: `3:50`,
        id: `boomerang`
    }
}

const playlistValues = Object.values(playlist);
const playlistKeys = Object.keys(playlist);


window.addEventListener('DOMContentLoaded', () => {

    const playlistContainer = document.querySelector('#playlist');

    //POST PLAYLIST
    for(let i = 0; i < playlistValues.length; i++){
        const div = document.createElement('div');
        div.id = `${playlistValues[i].id}`;
        div.className = `song`;

        div.innerHTML = `
            <div class="song-position">${i + 1}</div>
            <div class="song-info">
                <div class="song-info__img">
                    <img src="${playlistValues[i].img}" alt="">
                </div>
                <div class="">
                    <div class="song-info__song-name">${playlistValues[i].songName}</div>
                    <div class="song-info__artists">${playlistValues[i].artists.join(', ')}</div>
                </div>
            </div>
            <diV class="song-album">${playlistValues[i].album}</diV>
            <diV class="song-date-added">${playlistValues[i].dateAdded}</diV>
            <diV class="song-duration">${playlistValues[i].songDuration}</diV>
            <div class="filter"></div>
        `
        playlistContainer.appendChild(div);
    }


    //Default set up
    const audio = document.querySelector('audio');
    audio.src = playlistValues[0].audio;

    const controlsImg = document.querySelector('.controls-song-info__img').firstElementChild;
    controlsImg.src = playlistValues[0].img;

    const controlsSongName = document.querySelector('.controls-song-info__song-name');
    controlsSongName.textContent = playlistValues[0].songName;

    const controlsArtist = document.querySelector('.controls-song-info__artists');
    controlsArtist.textContent = playlistValues[0].artists.join(', ');


    const playbackDuration = document.querySelector('.playback-time__duration');
    playbackDuration.textContent = `${playlistValues[0].songDuration}`;

    //Default play state toggle
    const playBtn = document.getElementById('play-toggle');
    const playIcon = playBtn.firstElementChild;
    const pauseIcon = playBtn.lastElementChild;

    pauseIcon.style.display = 'none';

    //STORE MUSIC ID 
    localStorage.setItem('id', `${playlistValues[0].id}`);

    audioData()

    //STORE AUDIO IN LOCAL STORAGE
    function audioData(){
        audio.onloadeddata = function(){
            localStorage.setItem('duration', `${parseInt(audio.duration)}`);

            setInterval(() =>{
                localStorage.setItem('timestamp', `${parseInt(audio.currentTime)}`)
            }, 1)
        }
    }

    
    //Playback slider
    const playbackSlider = document.querySelector('.playback-bar__slider');
    const songDuration = localStorage.getItem('duration');
    playbackSlider.style.transition = `all ease ${songDuration}s`;

    
    
    //RESET PLAYBACK SLIDER (DO NOT DELETE)
    function resetPlaybackSlider(){
        playbackSlider.style.width = '0';
        playbackSlider.style.transition = 'none';
        console.log(playbackSlider.clientWidth, playbackSlider.style.transition)
    }

    //UPDATE PLAYBACK SLIDER WITH NEW VALUES
    function updatePlaybackSlider(){
        const songDuration = localStorage.getItem('duration');
        playbackSlider.style.transition = `width linear ${songDuration}s`;
        playbackSlider.style.width = `100%`;

        
    }


    //TIMESTAMP FUNCTION (DO NOT DELETE)
    function timestamp(){
        let sec;
        let min;
        let i = 1;
        let x = 60;
        const base = 60;
        console.log(x)

        const secTimestamp = document.getElementById('sec');
        const minTimestamp = document.getElementById('min');
        setInterval(() => {
            const currentTime = parseInt(localStorage.getItem('timestamp'));

            sec = currentTime % base;
            if(currentTime === x){
                min = currentTime / base;
                i++
                x = base * i;
            } else if(currentTime > base){
                min = min
            }else{
                min = 0
            }

            //POST VALUES
            if(sec < 10){
                secTimestamp.textContent = `0${sec}`;
            } else{
                secTimestamp.textContent = sec;
            }

            minTimestamp.textContent = `${min}:`;
            //console.log(currentTime, min, sec, i, x)
        },1000);

    }

    //PLAY BUTTON TOGGLE (DO NOT DELETE)
    let isPlaying = false;
    playBtn.addEventListener('click', function(){
        if(!isPlaying){
            audio.play();
            playIcon.style.display = 'none'
            pauseIcon.style.display = 'block'

            //Play PLAYBACK SLIDER
            playbackSlider.style.width = `100%`;
            //

            timestamp()
            

            isPlaying = true;
        } else{
            audio.pause();
            playIcon.style.display = 'block'
            pauseIcon.style.display = 'none'

              //PAUSE PLAYBACK SLIDER
              playbackSlider.style.width = `${playbackSlider.clientWidth}px`;

            isPlaying = false
        }
    })




    //CHANGE MUSIC BY SELECTION (DO NOT DELETE)
    playlistContainer.addEventListener('click', function(e) {
        const key = e.target.parentElement.id;
        
        if(playlistKeys.includes(key)){
            const idObject = playlist[key];
            playIcon.style.display = 'none'
            pauseIcon.style.display = 'block'
            audio.src = idObject.audio;

            playbackDuration.textContent = `${idObject.songDuration}`;

            //STORE MUSIC ID 
            localStorage.setItem('id', `${idObject.id}`);
            
            //RESET PLAYBACK SLIDER WIDTH TO 0
            resetPlaybackSlider()
         
            //Place audio data in local storage
            audioData()
            timestamp()

            updatePlaybackSlider()


            audio.play();
            isPlaying = true;

            controlsArtist.textContent = idObject.artists.join(', ');
            controlsSongName.textContent = idObject.songName;
            controlsImg.src = idObject.img;
        }

        
        
    })

    //CHANGE MUSIC WITH NEXT AND PREVIOUS BUTTON
    const playbackControlsContainer = document.querySelector('.playback-controls');
    playbackControlsContainer.addEventListener('click', (e) => {
        
        //NEXT BUTTON
        if(e.target.id === 'next'){
            //Get song id
            const songId = localStorage.getItem('id');

            //Find song's position/index in playlist/array
            const songIndex = playlistKeys.indexOf(songId);
            
            //Taking last position into account
            //in order to loop back to beginning
            //of playlist
            let nextSong = songIndex;
            if(songIndex === playlistKeys.length - 1){
                nextSong = 0;
                audio.src = playlistValues[nextSong].audio;
                controlsImg.src = playlistValues[nextSong].img;
                controlsSongName.textContent = playlistValues[nextSong].songName;
                controlsArtist.textContent = playlistValues[nextSong].artists.join(', ');
                playbackDuration.textContent = `${playlistValues[nextSong].songDuration}`;

                
                audio.play();
                isPlaying = true;

                localStorage.id = `${playlistValues[nextSong].id}`

                if(isPlaying === true){
                    pauseIcon.style.display = `block`;
                    playIcon.style.display = 'none'
                }
                
                resetPlaybackSlider();
                updatePlaybackSlider();

            } else{
                nextSong += 1;
                audio.src = playlistValues[nextSong].audio;
                controlsImg.src = playlistValues[nextSong].img;
                controlsSongName.textContent = playlistValues[nextSong].songName;
                controlsArtist.textContent = playlistValues[nextSong].artists.join(', ');
                playbackDuration.textContent = `${playlistValues[nextSong].songDuration}`;

                
                audio.play();
                isPlaying = true;

                localStorage.id = `${playlistValues[nextSong].id}`

                if(isPlaying === true){
                    pauseIcon.style.display = `block`;
                    playIcon.style.display = 'none'
                }
                
                resetPlaybackSlider();
                updatePlaybackSlider();
            }
            //END OF NEXT BUTTON FUNCTION

            //BEGINNING OF PREVIOUS BUTTON FUNCTION
        } else if(e.target.id === 'previous'){
            //Get song id
            const songId = localStorage.getItem('id');

            //Find song's position/index in playlist/array
            const songIndex = playlistKeys.indexOf(songId);
            
            //Taking first position into account
            //in order to loop to end
            //of playlist
            let nextSong = songIndex;
            if(songIndex === 0){
                nextSong = playlistKeys.length - 1;
                audio.src = playlistValues[nextSong].audio;
                controlsImg.src = playlistValues[nextSong].img;
                controlsSongName.textContent = playlistValues[nextSong].songName;
                controlsArtist.textContent = playlistValues[nextSong].artists.join(', ');
                playbackDuration.textContent = `${playlistValues[nextSong].songDuration}`;

                
                audio.play();
                isPlaying = true;

                localStorage.id = `${playlistValues[nextSong].id}`

                if(isPlaying === true){
                    pauseIcon.style.display = `block`;
                    playIcon.style.display = 'none'
                }
                
                resetPlaybackSlider();
                updatePlaybackSlider();

            } else{
                nextSong -= 1;
                audio.src = playlistValues[nextSong].audio;
                controlsImg.src = playlistValues[nextSong].img;
                controlsSongName.textContent = playlistValues[nextSong].songName;
                controlsArtist.textContent = playlistValues[nextSong].artists.join(', ');
                playbackDuration.textContent = `${playlistValues[nextSong].songDuration}`;

                
                audio.play();
                isPlaying = true;

                localStorage.id = `${playlistValues[nextSong].id}`

                if(isPlaying === true){
                    pauseIcon.style.display = `block`;
                    playIcon.style.display = 'none'
                }
                
                resetPlaybackSlider();
                updatePlaybackSlider();
            }
        }
    })

    //CHANGE SONG WHEN FINISHED
    setInterval(() => {
        if(localStorage.getItem('timestamp') === localStorage.getItem('duration')){
            //Get song id
            const songId = localStorage.getItem('id');

            //Find song's position/index in playlist/array
            const songIndex = playlistKeys.indexOf(songId);
            
            //Taking last position into account
            //in order to loop back to beginning
            //of playlist
            let nextSong = songIndex;
            if(songIndex === playlistKeys.length - 1){
                nextSong = 0;
                audio.src = playlistValues[nextSong].audio;
                controlsImg.src = playlistValues[nextSong].img;
                controlsSongName.textContent = playlistValues[nextSong].songName;
                controlsArtist.textContent = playlistValues[nextSong].artists.join(', ');
                playbackDuration.textContent = `${playlistValues[nextSong].songDuration}`;

                
                audio.play();
                isPlaying = true;

                localStorage.id = `${playlistValues[nextSong].id}`

                if(isPlaying === true){
                    pauseIcon.style.display = `block`;
                    playIcon.style.display = 'none'
                }
                
                resetPlaybackSlider();
                updatePlaybackSlider();
                timestamp()

            } else{
                nextSong += 1;
                audio.src = playlistValues[nextSong].audio;
                controlsImg.src = playlistValues[nextSong].img;
                controlsSongName.textContent = playlistValues[nextSong].songName;
                controlsArtist.textContent = playlistValues[nextSong].artists.join(', ');
                playbackDuration.textContent = `${playlistValues[nextSong].songDuration}`;

                
                audio.play();
                isPlaying = true;

                localStorage.id = `${playlistValues[nextSong].id}`

                if(isPlaying === true){
                    pauseIcon.style.display = `block`;
                    playIcon.style.display = 'none'
                }
                
                resetPlaybackSlider();
                updatePlaybackSlider();
                timestamp()
            }
        }
    }, 1000)

})
