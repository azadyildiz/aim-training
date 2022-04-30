const gameController = (function () {
    var username = ""
    var scoreCounter = 0
    function startGame(usernameInput) {
        username = usernameInput
    }
    function finishGame() {
        dataController.post(username, scoreCounter)
    }
    function setCounter() {
        scoreCounter++
    }
    function getCounter() {
        return scoreCounter
    }
    function getUsername() {
        return username
    }
    return {
        startGame, finishGame, setCounter, getCounter, getUsername
    }
})()