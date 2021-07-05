let ingresosObj;
const ingresosMensualesJSON = $.getJSON("js/ingresos.json", function(json) {
            ingresosObj = json;
        });
let edadesObj;
const edadesJSON = $.getJSON("js/edades.json", function(json) {
    edadesObj = json;
        });


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
    getEdad=  (fechaNacimiento) =>{
        const anioNac= (parseDate(fechaNacimiento)).getFullYear() ;
        const today =new Date().getFullYear();
        const ageDifMs = today - anioNac;
        return ageDifMs;
    }
    getEsMayorDeEdad = (fechaNacimiento)=>{
        let edad =  this.getEdad(fechaNacimiento);
        if(edad >=18 )return true;
        else return false;
    }
    
    getPuntajeEdad = (fechaNacimiento)=>{   
        let edad =  this.getEdad(fechaNacimiento);
        if(edad >=edadesObj['edad']['mayorDeEdad'] && edad <=edadesObj['edad']['adulto']){return 2}
        else if(edad>edadesObj['edad']['adulto'] && edad <=edadesObj['edad']['jubilado']){return 1}
        else if(edad<edadesObj['edad']['mayorDeEdad']){return 0; /*no deberia otorgarse el credito por eso se asigna puntaje cero */}
        else{return 0}
    }
     getPuntajeAntiguedad = (antiguedad)=>{    
        if(antiguedad >=edadesObj['antiguedad']['media']['min'] 
            && antiguedad <=edadesObj['antiguedad']['media']['max']){return 2}
        else if(antiguedad>edadesObj['antiguedad']['alta']['min'] ) {return 3}
        else if(antiguedad==edadesObj['antiguedad']['baja']['max']){return 1}
        else{return 0}
    }
    
    
    getPuntajeSituacionTributaria = (situacionTributaria)=>{
        situacionTributaria=situacionTributaria.toLowerCase();
        if(situacionTributaria==situacionTributariaArray[2] 
            || situacionTributaria==situacionTributariaArray[1]){ return 3 }
        else if(situacionTributaria==situacionTributariaArray[3]){return 2}
        else if(situacionTributaria==situacionTributariaArray[4]
                ||situacionTributaria==situacionTributariaArray[5]){return 1}
        else { return 0}
    }
    
    getPuntajeIngresosMensuales = (ingresosMensuales)=>{
        
        if(ingresosMensuales>=ingresosObj['bajo'] && ingresosMensuales<ingresosObj['medio']){ return 1 }
        else if(ingresosMensuales>=ingresosObj['medio'] && ingresosMensuales<ingresosObj['medio_alto']){return 2 }
        else if(ingresosMensuales>=ingresosObj['medio_alto'] && ingresosMensuales<ingresosObj['alto']){return 3}
        else if(ingresosMensuales>ingresosObj['alto']){return 4}
        else { return 0}
    }
    
    getPuntajeEstadoCivil = (estadoCivil)=>{ 
        estadoCivil=estadoCivil.toLowerCase();
        if(estadoCivil==String(estadoCivilArray[1])){  return 3;  }
        else if(estadoCivil==String(estadoCivilArray[2])){ return 2  }
        else{return 0}
    }
    
    getPuntajeIngresosPareja =(ingresosMensualesPareja)=>{
        if(ingresosMensualesPareja>=ingresosObj['bajo'] && ingresosMensualesPareja<ingresosObj['medio']){ return 1 }
        else if(ingresosMensualesPareja>=ingresosObj['medio'] && ingresosMensualesPareja<ingresosObj['medio_alto']){return 2 }
        else if(ingresosMensualesPareja>=ingresosObj['medio_alto'] && ingresosMensualesPareja<ingresosObj['alto']){return 3}
        else if(ingresosMensualesPareja>ingresosObj['alto']){return 4}
        else { return 0}
    
    }
    
    getPuntajeTarjetaCredito = (tarjetaCredito)=>{
        tarjetaCredito=tarjetaCredito.toLowerCase();
        if(tarjetaCredito==tarjetaCreditoArray[1] || tarjetaCredito==tarjetaCreditoArray[2]){ return 2 }
        else if(tarjetaCredito==tarjetaCreditoArray[3] || tarjetaCredito==tarjetaCreditoArray[4]){return 1 }
        else if(tarjetaCredito=="ninguna"){return 0 }
        else {return 0}
    }
    getPuntajeTotal = ()=>{
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