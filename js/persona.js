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
        if(edad >=18 && edad <=50){return 2}
        else if(edad>50 && edad <=65){return 1}
        else if(edad<18){return 0; /*no deberia otorgarse el credito por eso se asigna puntaje cero */}
        else{return 0}
    }
     getPuntajeAntiguedad = (antiguedad)=>{    
        if(antiguedad >=2 && antiguedad <=5){return 2}
        else if(antiguedad>5) {return 3}
        else if(antiguedad==1){return 1}
        else{return 0}
    }
    
    
    getPuntajeSituacionTributaria = (situacionTributaria)=>{
        situacionTributaria=situacionTributaria.toLowerCase();
        if(situacionTributaria=="autonomo"){ return 3 }
        else if(situacionTributaria=="empleado"){return 3 }
        else if(situacionTributaria=="monotributista"){return 2}
        else if(situacionTributaria=="freelance"){return 1}
        else { return 0}
    }
    
    getPuntajeIngresosMensuales = (ingresosMensuales)=>{
        if(ingresosMensuales>=50000 && ingresosMensuales<100000){ return 1 }
        else if(ingresosMensuales>=100000 && ingresosMensuales<150000){return 2 }
        else if(ingresosMensuales>=150000 && ingresosMensuales<200000){return 3}
        else if(ingresosMensuales>200000){return 4}
        else { return 0}
    }
    
    getPuntajeEstadoCivil = (estadoCivil)=>{ 
        estadoCivil=estadoCivil.toLowerCase();
        if(estadoCivil=="soltero"){  return 3 }
        else if(estadoCivil=="casado"){ return 2  }
        else{return 0}
    }
    
    getPuntajeIngresosPareja =(ingresosMensualesPareja)=>{
        if(ingresosMensualesPareja>=50000 && ingresosMensualesPareja<100000){ return 1 }
        else if(ingresosMensualesPareja>=100000 && ingresosMensualesPareja<150000){return 2 }
        else if(ingresosMensualesPareja>=150000 && ingresosMensualesPareja<200000){return 3}
        else if(ingresosMensualesPareja>200000){return 4}
        else { return 0}
    
    }
    
    getPuntajeTarjetaCredito = (tarjetaCredito)=>{
        tarjetaCredito=tarjetaCredito.toLowerCase();
        if(tarjetaCredito=="visa" || tarjetaCredito=="mastercard"){ return 2 }
        else if(tarjetaCredito=="cabal" || tarjetaCredito=="naranja"){return 1 }
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