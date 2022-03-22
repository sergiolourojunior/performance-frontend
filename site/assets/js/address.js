window.addEventListener('load', function () {

    var maps_loaded = false;

    window.addEventListener('scroll', function () {
        if(!maps_loaded && window.scrollY > 450) {
            var maps = document.getElementById('address-map')
            maps.src = maps.getAttribute('data-src')

            maps_loaded = true
        }
    })
})