const dataController = (function () {
    const URL = "https://c1-na.altogic.com/e:626c39a478667de501424a2a/leaderboard"
    async function get() {
        var data = await fetch(URL)
            .then(res => res.json())
            .then(data => data)
        return data
    }
    async function getHTML() {
        var list = document.createElement("div")
        var data = await get()
        data.forEach(e => {
            var element = document.createElement("div")
            element.className = "element"
            element.innerHTML = `<div class="username">${e.username}</div>
            <div class="score">${e.score}</div>`
            list.appendChild(element)
        });
        return await list
    }
    function post(username, score) {
        var data = { "username": username, "score": score }
        fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    return {
        getHTML, post
    }
})()