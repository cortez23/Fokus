
//llamamos los elemetons de html colocando una variable 'const'
const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const botonIniciarPausar = document.querySelector('#start-pause')
const textoIniciarPausar = document.querySelector('#start-pause span')
const imgIniciarPausar = document.querySelector('#start-pause img')
const tiempoEnPantalla = document.querySelector('#timer')

const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const audioPlay = new Audio('./sonidos/play.wav')
const audioPausa = new Audio('./sonidos/pause.mp3')
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')




let tiempoTranscurridoEnSegundos = 1500
let idIntervalo = null

// colocar musica apretando un boton
musica.loop = true 

inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
});


botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300
    // colocamos la  funcion en vez de contexto colocamos el parametro que esta esperando
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
    // html.setAttribute('data-contexto','descanso-corto')
    // banner.setAttribute('src','./imagenes/descanso-corto.png')
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
    // html.setAttribute('data-contexto' , 'enfoque')
    // banner.setAttribute('src','./imagenes/enfoque.png')

})

botonLargo.addEventListener('click' , () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
    // html.setAttribute('data-contexto' , 'descanso-largo')
    // banner.setAttribute('src','./imagenes/descanso-largo.png')
});

// se crea una funcion para resumir  las lineas anteriores

function cambiarContexto(contexto){

    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove("active")
    })

    // reemplazamos con el nombre  de la function descanso corto por contexto
    html.setAttribute('data-contexto' , contexto)
    // reemplaza el nombre de la img por contexto en ves de comillas simple por comillas imnvertidas y ${}
    banner.setAttribute('src',`./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro? 
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;

        case "descanso-largo":
            titulo.innerHTML =` Hora de volver a la superficie
                <strong class="app__title-strong"> Haz una pausa larga.</strong>`
        default:
            break;
        
    }
}

const cuentaRegresiva = () => {

    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado .play() //agregar sonido al finalizar el tiempo  
        alert('para')
        reiniciar()
        return
    }
    
    imgIniciarPausar.src = './imagenes/pause.png';
    textoIniciarPausar.textContent = "Pausar"
    //.textContent para agregar texto al HTML
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar (){
    if(idIntervalo){
       audioPausa.play(); //agregar sonido cuando se coloque pausa al tiempo
       reiniciar()
       return 
    }
    audioPlay.play(); // agregar sonidos al comiezo de la cuenta regresiva    
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo)    
    //cuando este en pausa aparecera la palabra comenzar
    imgIniciarPausar.src = './imagenes/play_arrow.png';
    textoIniciarPausar.textContent = "Comenzar"
    idIntervalo = null
}
//agregar tiempo cronometro
function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000 )
    const tiempoFormateado = tiempo.toLocaleTimeString('es-CL', { minute:'2-digit', second: '2-digit'} )
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
    
}
mostrarTiempo()