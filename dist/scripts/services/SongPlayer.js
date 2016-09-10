(function() {
	function SongPlayer(Fixtures) {

/**
* @desc An empty object used to assign methods and properties for use by Album Controller
* @type {Object}
*/

		var SongPlayer = {};

/**
* @desc Get the current album object
* @type {Object}
*/

		var currentAlbum = Fixtures.getAlbum();

 /**
 * @desc Buzz object audio file
 * @type {Object}
 */

		var currentBuzzObject = null;

 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			SongPlayer.currentSong = song;
		};

/**
* @function playSong
* @desc Starts playing audio fill from currentBuzzObject and sets song.playing to true
* @param {Object} song
*/

		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};

/**
* @desc Gets index from songs array within album object
* @type Number
*/

		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

/**
* @desc Holds currently playing song for use within play/pause/stop functions
* @type {Object}
*/

		SongPlayer.currentSong = null;

		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				
				setSong(song);
				playSong(song);

			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}

		};

/**
* @desc Method for pausing the song
* @type 
*/

		SongPlayer.pause = function(song) {
			
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

/**
* @desc Method for skipping to the previous song
*
*/

		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		return SongPlayer;
	}


	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();