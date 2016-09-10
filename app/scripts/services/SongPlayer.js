(function() {
	function SongPlayer() {

/**
* @desc An empty object used to assign methods and properties for use by Album Controller
* @type {Object}
*/

		var SongPlayer = {};

/**
* @desc Holds currently playing song for use within play/pause/stop functions
* @type {Object}
*/

		var currentSong = null;

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
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
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

		SongPlayer.play = function(song) {

			if (currentSong !== song) {
				
				setSong(song);
				playSong(song);

			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}

		};

		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}


	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();