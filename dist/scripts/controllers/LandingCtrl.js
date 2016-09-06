(function() {
	function LandingCtrl() {
		this.heroTitle = "Turn the Music Up!";
	}

	angular
		.module('blocJams')
		.controllers('LandingCtrl', LandingCtrl);
})();