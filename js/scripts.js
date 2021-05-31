let nombre="Test";
let apellido="Test";
let direccion="Calle 1234";
let telefono="12345678910";
let dni="123213123";
let email="mariano.padularrosa@gmail.com";

const getValorCuota =(valorProducto, cantCuotas)=>  valorProducto / cantCuotas;

/**metodos generales */
const toDate=(dateStr)=> {
    var parts = dateStr.split("-")
    return new Date(parts[2], parts[1] - 1, parts[0])
  }

/*Clases */

class SolicitudCredito{
    constructor(montoProducto){
        
        this.cuotas=[];
        this.cuotasElegidas=0;
        this.montoProducto=parseFloat(montoProducto);
        this.montoCuota=[];
        this.montoConInteres=0;
        this.topeMaximo = 0;
        this.preAprobado=false;
    }
    getAnalisisPuntaje = function (puntaje){
        if(puntaje<=5 && puntaje>0){this.setInteresCuotasTopeByPuntaje(40,[3,6],50000)}
        if(puntaje<=9 && puntaje>5){this.setInteresCuotasTopeByPuntaje(35,[3,6,9],80000)}
        if(puntaje<=12 && puntaje>9){this.setInteresCuotasTopeByPuntaje(33,[3,6,9,12],100000)}
        if(puntaje<=15 && puntaje>12){this.setInteresCuotasTopeByPuntaje(30,[3,6,9,12],150000)}
    }
    setInteresCuotasTopeByPuntaje(interes,cuotas,topeMaximo){
        this.interes=parseFloat(interes);
        this.cuotas=cuotas; 
        this.topeMaximo=parseFloat(topeMaximo);
        this.montoConInteres=parseFloat((this.montoProducto * (this.interes/100)) + parseFloat(this.montoProducto));
        //se calcula el valor de la cuota y se redondea para que el user elija
        this.montoCuota = cuotas.map((cuota)=>{return (getValorCuota(this.montoConInteres,cuota)).toFixed(2)});
        if(this.montoConInteres<topeMaximo){this.preAprobado=true}
    }
    setCuotasElegidas(cuotasElegidas){
        this.cuotasElegidas=cuotasElegidas;
    }
}

class Persona{
    constructor(nombre,apellido,direccion,email,telefono,fechaNacimiento,situacionTributaria,antiguedad,estadoCivil,ingresosMensuales,ingresosMensualesPareja,tarjetaCredito,dni){
        this.nombre=nombre;
        this.apellido=apellido;
        this.direccion=direccion;
        this.email=email;
        this.telefono=parseInt(telefono);
        this.dni=parseInt(dni);
        this.edad=this.getEdad(fechaNacimiento);
        this.esMayorDeEdad=false;
        this.fechaNacimiento=fechaNacimiento;
        this.situacionTributaria=situacionTributaria;
        this.antiguedad=antiguedad;
        this.estadoCivil=estadoCivil;
        this.ingresosMensuales=ingresosMensuales;
        this.ingresosMensualesPareja=ingresosMensualesPareja;
        this.tarjetaCredito=tarjetaCredito;
        this.puntajeTotal=0;
    }
    getEdad= function (fechaNacimiento) {
        const anioNac= toDate(fechaNacimiento) ;
        const ageDifMs = Date.now() - anioNac;
        const ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    getEsMayorDeEdad = (fechaNacimiento)=>{
        let edad =  this.getEdad(fechaNacimiento);
        if(edad >=18 )return true;
        else return false;
    }
    
    getPuntajeEdad = function(fechaNacimiento){   
        let edad =  this.getEdad(fechaNacimiento);
        if(edad >=18 && edad <=50){return 2}
        else if(edad>50 && edad <=65){return 1}
        else if(edad<18){return 0; /*no deberia otorgarse el credito por eso se asigna puntaje cero */}
        else{return 0}
    }
     getPuntajeAntiguedad = function(antiguedad){    
        if(antiguedad >=2 && antiguedad <=5){return 2}
        else if(antiguedad>5) {return 3}
        else if(antiguedad==1){return 1}
        else{return 0}
    }
    
    
    getPuntajeSituacionTributaria = function(situacionTributaria){
        situacionTributaria=situacionTributaria.toLowerCase();
        if(situacionTributaria=="autonomo"){ return 3 }
        else if(situacionTributaria=="empleado"){return 3 }
        else if(situacionTributaria=="monotributista"){return 2}
        else if(situacionTributaria=="freelance"){return 1}
        else { return 0}
    }
    
    getPuntajeIngresosMensuales = function(ingresosMensuales){
        if(ingresosMensuales>=50000 && ingresosMensuales<100000){ return 1 }
        else if(ingresosMensuales>=100000 && ingresosMensuales<150000){return 2 }
        else if(ingresosMensuales>=150000 && ingresosMensuales<200000){return 3}
        else if(ingresosMensuales>200000){return 4}
        else { return 0}
    }
    
    getPuntajeEstadoCivil =function (estadoCivil){ 
        estadoCivil=estadoCivil.toLowerCase();
        if(estadoCivil=="soltero"){  return 3 }
        else if(estadoCivil=="casado"){ return 2  }
        else{return 0}
    }
    
    getPuntajeIngresosPareja =function(ingresosMensualesPareja){
        if(ingresosMensualesPareja>=50000 && ingresosMensualesPareja<100000){ return 1 }
        else if(ingresosMensualesPareja>=100000 && ingresosMensualesPareja<150000){return 2 }
        else if(ingresosMensualesPareja>=150000 && ingresosMensualesPareja<200000){return 3}
        else if(ingresosMensualesPareja>200000){return 4}
        else { return 0}
    
    }
    
    getPuntajeTarjetaCredito = function(tarjetaCredito){
        tarjetaCredito=tarjetaCredito.toLowerCase();
        if(tarjetaCredito=="visa" || tarjetaCredito=="mastercard"){ return 2 }
        else if(tarjetaCredito=="cabal" || tarjetaCredito=="naranja"){return 1 }
        else if(tarjetaCredito=="ninguna"){return 0 }
        else {return 0}
    }
    getPuntajeTotal = function(){
        this.esMayorDeEdad = this.getEsMayorDeEdad(this.fechaNacimiento);
        if(this.esMayorDeEdad==true)
            this.puntajeTotal=(this.getPuntajeEdad(this.fechaNacimiento) + 
                                this.getPuntajeAntiguedad(this.antiguedad) + 
                                this.getPuntajeSituacionTributaria(this.situacionTributaria) +
                                this.getPuntajeIngresosMensuales(this.ingresosMensuales) +
                                this.getPuntajeIngresosPareja (this.ingresosMensualesPareja) +
                                this.getPuntajeEstadoCivil(this.estadoCivil) +
                                this.getPuntajeTarjetaCredito(this.tarjetaCredito))
        else{this.puntajeTotal=0}
    }
    
}

/* solo se podra un producto a la vez antes de solicitar el credito */
function unselect(){
    document.querySelectorAll('[name=radio]').forEach((x) => x.checked=false);
  }


/* Se invoca onclick del boton Solicitar Credito */
const inputData =()=>{
    
    let fechaNacimiento=prompt("Ingrese su Fecha de Nacimiento (DD-MM-AAAA):");
    let situacionTributaria=prompt("Ingrese su situacion laboral:(empleado,autonomo,monotributista,freelance)");
    let antiguedad=parseInt(prompt("Ingrese su antigüedad con su empleo(años)"));
    let ingresosMensuales=parseFloat(prompt("Ingrese sus ingresos mensuales (pesos) aprox:"));
    let estadoCivil=prompt("Ingrese su estado civil (soltero,casado,otro)");
    let ingresosMensualesPareja="0";
    let tarjetaCredito=prompt("Ingrese su tarjeta de crédito (visa/master/otro)");
    
    //esta valor sera obtenido despues que el solicitante elija
    let valorProducto=parseFloat(prompt("Ingrese el valor del producto que desea solicitar:"));
    /* Ejecucion - test */
    
    /* Datos obtenidos del formulario  */
    let p =new Persona(nombre,apellido,direccion,email,telefono,fechaNacimiento, situacionTributaria,antiguedad ,estadoCivil, ingresosMensuales,ingresosMensualesPareja,tarjetaCredito,dni);
    p.getPuntajeTotal();
    
    for (const propiedad in p){
        console.log(propiedad+":"+p[propiedad]);
    }

    /* Despues de la eleccion del producto y completado los datos se realiza la solicitud del credito */
    let solicitudCredito=new SolicitudCredito(valorProducto);
    solicitudCredito.getAnalisisPuntaje(p.puntajeTotal);
    
    
    for (const propiedad in solicitudCredito){
        console.log(propiedad+":"+solicitudCredito[propiedad]);
    }

}


