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
        this.producto="";
    }
    getAnalisisPuntaje =  (puntaje)=>{
        if(puntaje<=5 && puntaje>0){this.setInteresCuotasTopeByPuntaje(40,[3,6],50000)}
        if(puntaje<=9 && puntaje>5){this.setInteresCuotasTopeByPuntaje(35,[3,6,9],80000)}
        if(puntaje<=12 && puntaje>9){this.setInteresCuotasTopeByPuntaje(33,[3,6,9,12],100000)}
        if(puntaje<=15 && puntaje>12){this.setInteresCuotasTopeByPuntaje(30,[3,6,9,12],150000)}
    }
    setInteresCuotasTopeByPuntaje=(interes,cuotas,topeMaximo)=>{
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