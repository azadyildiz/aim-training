const uiController = (function () {
    var container = document.getElementById("container")
    var dot = document.getElementById('dot')
    var counter = document.getElementById('counter')
    var countdown = document.getElementById("countdown")
    var countdownText = document.querySelector(".countdown-text")
    var usernameInput = document.getElementById("username-input")
    var playButton = document.getElementById('play')
    var leaderboardButton = document.getElementById("leaders")
    var backButton = document.getElementById("back")
    var startPopup = document.getElementById('startPopup')
    var leaderboardPopup = document.getElementById("leaderboardPopup")
    var endPopup = document.getElementById("endPopup")

    // GET NEW WIDTH AND HEIGHT WHEN WINDOW SIZE CHANGED
    var windowWidth = window.innerWidth
    var windowHeight = window.innerHeight
    window.addEventListener("resize", () => {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
    })

    // GET LEADERBOARD DATA
    window.addEventListener("load", async () => {
        var HTMLdata = await dataController.getHTML()
        leaderboardPopup.children[1].appendChild(HTMLdata)
    })

    // CONTROL USERNAME INPUT
    usernameInput.addEventListener("keyup", (e) => {
        if (!(e.key == " ")) {
            usernameInput.value = usernameInput.value.toLowerCase()
                .replaceAll('ğ', 'g')
                .replaceAll('ü', 'u')
                .replaceAll('ş', 's')
                .replaceAll('ı', 'i')
                .replaceAll('ö', 'o')
                .replaceAll('ç', 'c')
                .replaceAll(/[^a-zA-Z0-9]/g, "");
        }
        else {
            usernameInput.value = usernameInput.value.replaceAll(" ", "")
        }
    })

    // CHANGE SCENE AND START THE GAME
    playButton.addEventListener('click', () => {
        if (!(usernameInput.value == "")) {
            changeScene("start")
            startCountdown()
            gameController.startGame(usernameInput.value)
        }
        else {
            console.log("username is empty.");
        }
    })

    // CHANGE SCENE WHEN CLICK LEADERBOARD BUTTON
    leaderboardButton.addEventListener("click", () => {
        changeScene("leaderboard")
    })

    // CHANGE POSITION OF DOT
    dot.addEventListener('click', () => {
        var rndH = Math.random()
        var rndW = Math.random()
        if (rndW > 0.5) {
            dot.style.left = rndW * windowWidth - 13; +'px';
            if (rndH > 0.5) {
                dot.style.top = rndH * windowHeight - 13; +'px';
            }
            else {
                dot.style.top = rndH * windowHeight + 13; +'px';
            }
        }
        else {
            dot.style.left = rndW * windowWidth + 13; +'px';
            if (rndH > 0.5) {
                dot.style.top = rndH * windowHeight - 13; +'px';
            }
            else {
                dot.style.top = rndH * windowHeight + 13; +'px';
            }
        }
        gameController.setCounter()
        counter.innerHTML = gameController.getCounter()
    })

    // CHANGE SCENE AND GO BACK START POPUP
    backButton.addEventListener("click", () => {
        changeScene("back")
    })

    function startCountdown() {
        var miliseconds = 99
        var seconds = 59
        countdown.style.animationDuration = "60s";
        const countdownInterval = setInterval(() => {
            var milisecondsText = "99"
            var secondsText = "59"
            if (seconds == 0 && miliseconds == 0) {
                clearInterval(countdownInterval)
                changeScene("end")
                gameController.finishGame()
            }
            else {
                if (miliseconds == 0) {
                    seconds--
                    miliseconds = 99
                }
                miliseconds--
                if (miliseconds < 10) {
                    milisecondsText = "0" + miliseconds
                }
                else {
                    milisecondsText = miliseconds.toString()
                }
                if (seconds < 10) {
                    secondsText = "0" + seconds
                }
                else {
                    secondsText = seconds.toString()
                }
                countdownText.innerHTML = `${secondsText} : ${milisecondsText}`
            }
        }, 10)
    }
    function changeScene(mode) {
        if (mode == "start") {
            startPopup.style.display = 'none';
            container.style.display = "block"
        }
        else if (mode == "leaderboard") {
            leaderboardPopup.style.display = "flex"
            startPopup.style.display = "none"
        }
        else if (mode == "end") {
            endPopup.style.display = "flex";
            endPopup.children[0].textContent = gameController.getUsername()
            endPopup.children[1].textContent = `Your Score: ${gameController.getCounter()}`
            container.style.display = "none"
        }
        else if (mode == "back") {
            startPopup.style.display = "flex"
            leaderboardPopup.style.display = "none"
        }
    }
})()