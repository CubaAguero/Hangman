/// :::: VALIDATION  ::::: /////

$(document).ready (function (){
   $('#form').validate ({
        rules: {
           name: {
                required: true,
                lettersonly: true,
         }
        },
        messages: {
            name: {
                required: "¡Debes ingresar tu nombre para jugar!",
                lettersonly: "¡Solo se permiten ingresar letras!"
            }
        },
        errorElement : 'span'
    });
       
})

var vName;
function validarForm(){
    var vNombre = document.getElementById('name');
    var letras = new RegExp(/^([A-Za-z ñ]+)*$/);

    if(vNombre.value.trim()==""){
       vNombre.setCustomValidity('¡Debes ingresar tu nombre para jugar!');
    }else{
        if(letras.test(vNombre.value)){
            vNombre.setCustomValidity('');
            document.getElementById('jugar').disabled=false;
            document.getElementById('jugar').onclick = Iniciarpartida;
            vName= document.getElementById('name').value;
        }else{
            vNombre.setCustomValidity('¡Solo se pueden ingresar letras!')
        }
    }
}

window.onload = function () {
    document.getElementById('name').onchange = validarForm;
}


/////--------------///////////

////----------JUEGO-------------///////////////
///////////////////////////////////////////////

String.prototype.replaceAt=function(index, character) { return this.substr(0, index) + character + this.substr(index+character.length); } 

var vpalabras = ['casa','perro','gato','javascript','ahorcado','jquery'];
var vPistas = ['Lugar para vivir','Animal','Animal','Lenguaje de Programacion','Juego','libreria']
let maxint = 6;
var vpalabra= [];
var vpista = [];
var vPguiones = [];
var teclasBloqueadas = [];


function Iniciarpartida(){
    document.getElementById('header').style.display = 'none'
    document.getElementById('main').style.display = 'flex'
    
    var vnramdon = Math.floor(Math.random()*vpalabras.length)
    vpalabra = vpalabras[vnramdon];
    vpista = vPistas[vnramdon];
    vPguiones = vpalabra.replace(/./g,"_ ");
    document.getElementById("palabraOculta").innerHTML = vPguiones;
    document.getElementById('intentos').innerHTML = maxint;
    document.getElementById('pista').innerHTML = vpista;
}

function mostrarcolgado() {
    switch(maxint) {
        case 5:
            document.getElementById('colgado').src = 'img/cabeza.svg';
            break
        case 4:
            document.getElementById('colgado').src = 'img/cuerpo.svg';
            break
        case 3:
            document.getElementById('colgado').src = 'img/brazoIzq.svg';
            break
        case 2:
            document.getElementById('colgado').src = 'img/brazoDer.svg';
            break
        case 1:
            document.getElementById('colgado').src = 'img/piernaIzq.svg';
            break
    }
}

function compPartida() {
    if(maxint>0){
        if (vPguiones.indexOf("_")==-1){
           gano();
        }
    }else{
       perdio();
    }
}

function gano(){
    document.getElementById('colgado').src = 'img/victoria.svg'
    blockbtn();
    //document.getElementById('pista').innerHTML = vNombre;
    document.getElementById('mostrar').style.display = 'none';
    document.getElementById('ocultar').style.display = 'flex';
    document.getElementById('mensaje').innerHTML = '¡Felicitaciones '+vName+' Ganaste! <br> La palabra correcta era '+vpalabra;
    document.getElementById('reiniciar').onclick = reiniciar;
}

function perdio(){
    document.getElementById('colgado').src = 'img/piernaDer.svg'
    blockbtn();
    // document.getElementById('pista').innerHTML = vNombre;
    document.getElementById('mostrar').style.display = 'none';
    document.getElementById('ocultar').style.display = 'flex'
    document.getElementById('mensaje').innerHTML = '¡Lo sentimos '+vName+' has perdido! <br> La palabra correca era '+vpalabra
    document.getElementById('reiniciar').onclick = reiniciar;
}

function blockbtn() {
    var btn = document.querySelectorAll('button.letra')


    for (i=0;i<btn.length;i++){
        btn[i].disabled = true;
        teclasBloqueadas.push(btn[i].id);
    }
}


function comprobar(letter){
    var letra = letter
    var acierto = false;
    for(i=0;i<vpalabra.length;i++){
        if(letra == vpalabra[i]){
        vPguiones = vPguiones.replaceAt(i*2,letra)
        acierto= true;
        }
    }
    if(!acierto){
        maxint = maxint-1;
        mostrarcolgado();
    }
    document.getElementById("palabraOculta").innerHTML = vPguiones
    document.getElementById("intentos").innerHTML = maxint;
    compPartida();
}
 
function reiniciar() {
    maxint = 6;
    vpalabra= [];
    vpista = [];
    vPguiones = [];

    document.getElementById('colgado').src = 'img/horca.svg';
    document.getElementById('mostrar').style.display = 'flex';
    document.getElementById('ocultar').style.display = 'none';

    for (i=0;i<teclasBloqueadas.length;i++){
        document.getElementById(teclasBloqueadas[i]).disabled = false;
    }
    
    Iniciarpartida();
}