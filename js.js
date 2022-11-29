/*cambio de skin*/
var opcion=document.getElementById("opciones");
var calculadora=document.getElementById("calculadora");

opcion.onchange=function(){
    switch(opcion.value){
        case "Clásica":
            calculadora.style.backgroundImage="url(img/calculadora5.png)";
        
            break;
        case "Clásica roja":
            calculadora.style.backgroundImage="url(img/calculadora4.png)";
            break;
        case "Azul":
            calculadora.style.backgroundImage="url(img/calculadora1.png)";
            break;
        case "Naranja":
            calculadora.style.backgroundImage="url(img/calculadora2.png)";
            break;
        case "Verde":
            calculadora.style.backgroundImage="url(img/calculadora3.png)";
            break;
        case "Rosa":
            calculadora.style.backgroundImage="url(img/calculadora6.png)";
            break;
    }

}

/*----------------------------------------------------------------------------*/
//coger numeros y signos
const numero=document.getElementsByName('num');
const operador=document.getElementsByName('operacion');
const igual=document.getElementsByName('igual')[0]; 
const borrar=document.getElementsByName('borrar')[0]; 
const signo=document.getElementsByName('signo')[0]; 
var resultado=document.getElementById('resultado'); 

var numActual='';
var numAnterior='';
var operacion=undefined;
var numeroReal='';
var calculo=undefined;

numero.forEach(function(boton){
    boton.addEventListener('click',function(){
        agregarNumero(boton.innerText);
    })
});

operador.forEach(function(boton){
    boton.addEventListener('click',function(){
        selectOperacion(boton.innerText);
    })
});

//capturar la accion
igual.addEventListener('click',function(){
    calcular();
    
});

borrar.addEventListener('click',function(){
    limpiar();
    actualizar();
});

signo.addEventListener('click',function(){
    if(numeroReal.includes('-')){
        numeroReal=numeroReal.replace('-','');
    }else{
        numeroReal='-'+numeroReal;
        numActual='-'+numActual;
    }
    actualizar();
});
/*----------------------------------------------------------------------------*/
//acciones
function agregarNumero(num){
    numeroReal+=num;
    numActual+=num;
    actualizar();

}

function actualizar(){
    resultado.value=numeroReal;
}

function limpiar(){
    numActual='';
    numAnterior='';
    numeroReal='';
    operacion=undefined;
    calculo=undefined;   
}

function selectOperacion(op){
    operacion=op.toString();
    numeroReal+=op.toString();
    numAnterior=numActual;
    numActual='';
}

//comprobar float o int
function isInt(num){
    return Number(num) === num && num % 1 == 0;
}
/*----------------------------------------------------------------------------*/

function calcular(){
    var expresion=/([\-\d\.]+(\+|\-|\*|\/|\%)[\-\d\.])/;
	var calcular=expresion.test(numeroReal);

    if(calcular){
    switch(operacion){
        case '+':
            if(calculo==undefined){
                calculo=parseFloat(numAnterior)+parseFloat(numActual);
            }else{
                calculo+=parseFloat(numActual);
            }
            break;
        case '-':
            if(calculo==undefined){
                calculo=parseFloat(numAnterior)-parseFloat(numActual);
            }else{
                calculo-=parseFloat(numActual);
            }
            break;
        case '*':
            if(calculo==undefined){
                calculo=parseFloat(numAnterior)*parseFloat(numActual);
            }else{
                calculo=calculo*parseFloat(numActual);
            }
            break;
        case '/':
            if(calculo==undefined){
                calculo=parseFloat(numAnterior)/parseFloat(numActual);
            }else{
                calculo=calculo/parseFloat(numActual);
            }
            break;
        case '%':
            if(calculo==undefined){
                calculo=parseFloat(numAnterior)-((parseFloat(numAnterior)*parseFloat(numActual))/100);
            }else{
                calculo=calculo%parseFloat(numActual);
            }
                break;
        default:
            return;
    }
    
        if((calculo=='Infinity') || (calculo=='-Infinity') || isNaN(calculo)){
            calculo='Error';
        }

        if(isInt(calculo)){
            resultado.value=calculo;
        }else{
            resultado.value=calculo.toFixed(3);
        }
    
    }else{
        alert("Error de cálculo, vuelve a intentarlo");
        limpiar();
        actualizar();
    }
}

