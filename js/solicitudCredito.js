/*settings para otorgar creditos segun el puntaje */
let creditSettingsByScore;
const creditSettingsByScoreJSON = $.getJSON("js/interesCuotasTopeByPuntaje.json", function(json) {
    creditSettingsByScore = json;
        });
//clase de Solicitud del credito
class SolicitudCredito{
    constructor(montoProducto){
        
        this.cuotas=[];
        this.cuotasElegidas="";
        this.montoProducto=parseFloat(montoProducto);
        this.montoCuota=[];
        this.montoCuotaElegida="";
        this.montoConInteres=0;
        this.topeMaximo = 0;
        this.preAprobado=false;
        this.producto="";
    }
    //segun el puntaje se invocará setInteresCuotasTopeByPuntaje las caracteristicas configuradas en el archivo JSON
    getAnalisisPuntaje =  (puntaje)=>{
        if(puntaje>creditSettingsByScore['escala']['bajo']['min'] 
        && puntaje<=creditSettingsByScore['escala']['bajo']['max']){
            this.setInteresCuotasTopeByPuntaje(creditSettingsByScore['bajo']['interes'],creditSettingsByScore['bajo']['cuotas'],creditSettingsByScore['bajo']['topeMaximo'])}
        else if(puntaje>creditSettingsByScore['escala']['medio']['min'] 
                && puntaje<=creditSettingsByScore['escala']['medio']['max']){
                    this.setInteresCuotasTopeByPuntaje(creditSettingsByScore['medio']['interes'],creditSettingsByScore['medio']['cuotas'],creditSettingsByScore['medio']['topeMaximo'])}
        else if(puntaje>creditSettingsByScore['escala']['medio_alto']['min'] 
            && puntaje<=creditSettingsByScore['escala']['medio_alto']['max']){
                this.setInteresCuotasTopeByPuntaje(creditSettingsByScore['medio_alto']['interes'],creditSettingsByScore['medio_alto']['cuotas'],creditSettingsByScore['medio_alto']['topeMaximo'])}
        else if(puntaje>creditSettingsByScore['escala']['alto']['min'] 
            && puntaje<=creditSettingsByScore['escala']['alto']['max']){
                this.setInteresCuotasTopeByPuntaje(creditSettingsByScore['alto']['interes'],creditSettingsByScore['alto']['cuotas'],creditSettingsByScore['alto']['topeMaximo'])}
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