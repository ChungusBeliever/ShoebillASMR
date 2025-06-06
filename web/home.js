const ShoebillSounds = new Audio("resources/ShoebillSounds.mp3")
const playButton = document.getElementById("ASMRButton")

function playAudio() {
	ShoebillSounds.play();
}

playButton.addEventListener("click", playAudio);