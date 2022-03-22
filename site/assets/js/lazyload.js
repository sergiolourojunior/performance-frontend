window.addEventListener('load', function () {
    var esperar = false;

    window.addEventListener('scroll', function () {

        if(esperar) return
        esperar = true
        setTimeout(function () {
            esperar = false
        }, 300)

        var images = document.querySelectorAll('img[data-src]:not([src])')

        images.forEach(function (element) {
            if(element.getBoundingClientRect().top < window.innerHeight + 100) {
                element.src = element.getAttribute('data-src')
            }
        })

    })
})