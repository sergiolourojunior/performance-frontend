var input = document.getElementById('email')
var btn = document.getElementById('btn')

btn.addEventListener('click', function () {
    if(validaEmail(input.value)) {
        alert('Cadastrado na newsletter')
        input.value = ""
    } else {
        input.classList.add('invalid')
    }
});

input.addEventListener('change', function () {
    input.classList.remove('invalid')
})

function validaEmail(email) {
    return (email.length >= 10)
}