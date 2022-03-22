window.addEventListener('load', function () {
    var video = document.getElementById('background-video')

    this.setTimeout(function () {
        video.src = video.getAttribute('data-src')

        video.addEventListener('load', function () {
            setTimeout(function () {
                document.getElementById('header-page').style = ""
            }, 2400)
        })
    }, 1000)

})