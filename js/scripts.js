function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const fieldsArray = [
                { id: 1,  fieldId: "nombre", fieldType: "text" , element:"input",placeholder:"",innerHTML:"Nombre",class:""},
                { id: 2,  fieldId: "apellido", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 3,  fieldId: "dni", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 4,  fieldId: "telefono", fieldType: "number" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 5,  fieldId: "direccion", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 6,  fieldId: "email", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 7,  fieldId: "fechaNacimiento", fieldType: "date" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 8,  fieldId: "situacionTributaria", fieldType: "text" , element:"select",placeholder:"",innerHTML:"Situacion Tributaria",class:"form-control-sm form-control"},
                { id: 9,  fieldId: "ingresosMensuales", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 10,  fieldId: "antiguedad", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 11,  fieldId: "estadoCivil", fieldType: "text" , element:"select",placeholder:"",innerHTML:"",class:"form-control-sm form-control"},
                { id: 12,  fieldId: "tarjetaCredito", fieldType: "text" , element:"select",placeholder:"",innerHTML:"",class:"form-control-sm form-control"},
                { id: 13,  fieldId: "ingresosMensualesPareja", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:""},
                { id: 14,  fieldId: "valorProducto", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:"",readonly:"true"},
                { id: 15,  fieldId: "elegirFormaPago", fieldType: "submit" , element:"input",placeholder:"",innerHTML:"",class:"btn btn-primary", value:"Elegir Forma de Pago", onclick:"inputData()"},
               ];
const fieldsArrayElegirFormaPago = [
                { id: 1,  fieldId: "selectCuotas", fieldType: "test" , element:"select",placeholder:"",innerHTML:"",class:"form-control-sm form-control", value:""},
                { id: 2,  fieldId: "montoCuota", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:"", value:"",readonly:"true"},
                { id: 3,  fieldId: "montoConInteres", fieldType: "text" , element:"input",placeholder:"",innerHTML:"",class:"", value:"",readonly:"true"},
                { id: 4,  fieldId: "solicitar", fieldType: "submit" , element:"input",placeholder:"solicitar",innerHTML:"solicitar",class:"btn btn-primary", value:"Solicitar", onclick:"inputData()"},
            ];
const createForm=(arrayOfFields, parentNode)=>{
    for (const field of arrayOfFields) {
            let formGroup = document.createElement("div");
            let label= document.createElement("label");
            let element= document.createElement(field.element);
            element.setAttribute("id",field.fieldId);
            element.setAttribute("name",field.fieldId);
            element.setAttribute("label",field.fieldId);
            element.setAttribute("type",field.fieldType);
            element.setAttribute("class",field.class);
            if(field.readonly=="true"){element.setAttribute("readonly","true")}
            formGroup.setAttribute("class","form-group");
            label.setAttribute("for",field.fieldId);
            if(field.fieldType=="submit"){
                element.setAttribute("value",field.value);
                element.setAttribute("onclick",field.onclick);
            }else{
                label.innerHTML= capitalize(field.innerHTML)!=""?capitalize(field.innerHTML):capitalize(field.fieldId);
                
            }
            formGroup.appendChild(label);
            formGroup.appendChild(element);
            parentNode.appendChild(formGroup);
    }
    
}


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



/* Se invoca onclick del boton Solicitar */
  const mostrarForm=()=>{
    
    let inputForm = document.getElementById('inputForm');  
    createForm(fieldsArray,inputForm);
    let formCuotas = document.getElementById('formCuotas');  
    createForm(fieldsArrayElegirFormaPago,formCuotas);

    let inputDiv = document.getElementById("inputDiv");
    let display = getComputedStyle(inputDiv).display;
    if (display == "none")  inputDiv.style.display = "block"; 


    const situacionTributariaArray =['seleccione->','empleado','autonomo','monotributista','freelance', 'jubilado','otro'];
    const estadoCivilArray =['seleccione->','soltero','casado','otro'];
    const tarjetaCreditoArray =['seleccione->','visa','mastercard','naranja','cabal','otro'];
    loadSelect("situacionTributaria",situacionTributariaArray);
    loadSelect("estadoCivil",estadoCivilArray);
    loadSelect("tarjetaCredito",tarjetaCreditoArray);
    document.getElementById("valorProducto").value=getValorSeleccionado();
  }

/* Se invoca onclick del boton Elegir Forma Pago */
const inputData =()=>{
    
    let formCuotas = document.getElementById("formCuotas");
    let display = getComputedStyle(formCuotas).display;
    if (display == "none") { formCuotas.style.display = "block";} 
    let dni = (document.getElementById("dni")||{}).value||"";
    let nombre = (document.getElementById("nombre")||{}).value||"";
    let apellido =( document.getElementById("apellido")||{}).value||"";
    let fechaNac = (document.getElementById("fechaNacimiento")||{}).value||"";
    let direccion = (document.getElementById("direccion")||{}).value||"";
    let situacionTributaria = (document.getElementById("situacionTributaria")||{}).value||"";
    let antiguedad=(document.getElementById("antiguedad")||{}).value||"";
    let ingresosMensuales=(document.getElementById("ingresosMensuales")||{}).value||"";
    let estadoCivil=(document.getElementById("estadoCivil")||{}).value||"";
    let ingresosMensualesPareja=(document.getElementById("ingresosMensualesPareja")||{}).value||"";
    let tarjetaCredito=(document.getElementById("tarjetaCredito")||{}).value||"";
    
    //esta valor sera obtenido despues que el solicitante elija
    let valorProducto=document.getElementById("valorProducto").value;
    /* Ejecucion - test */
    
    /* Datos obtenidos del formulario  */
    let p =new Persona(nombre,apellido,direccion,email,telefono,fechaNac, situacionTributaria,antiguedad ,estadoCivil, ingresosMensuales,ingresosMensualesPareja,tarjetaCredito,dni);
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
    
    
    loadSelect("selectCuotas",solicitudCredito.cuotas);
    document.getElementById("montoCuota").value = solicitudCredito.montoCuota!=null?solicitudCredito.montoCuota:"0";
    document.getElementById("montoConInteres").value   = solicitudCredito.montoConInteres;
}

const loadSelect =(elementId,arrayOfData)=>{
    for (let i=0;i< arrayOfData.length ; i++) {
        let option = document.createElement("option");

        option.innerHTML = typeof(arrayOfData[i])=='string'?arrayOfData[i].toUpperCase():arrayOfData[i] ;
        option.value = arrayOfData[i];
        document.getElementById(elementId).add(option);
    }
}


function inicializarProd(){
    let htmlActual=document.documentURI.split("/")[document.documentURI.split("/").length-1];
    if(htmlActual== "smartphone.html"){
        let productos  = document.getElementById("productos");
        createProductos(arrayOfSmartphones,productos);
    }
    else if(htmlActual== "tecno.html"){
        let productos  = document.getElementById("productos");
        createProductos(arrayOfTecno,productos);
    }
    else if(htmlActual== "xp.html"){
        let productos  = document.getElementById("productos");
        createProductos(arrayOfXP,productos);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    inicializarProd();
    let myRadios= document.querySelectorAll('[name=radio]');
    console.log(myRadios);
    myRadios.forEach((input) => {
        input.addEventListener('change', updateValorProducto);
    });
  });
function updateValorProducto(event) {
    if(document.getElementById("valorProducto")!=null){
        document.getElementById("valorProducto").value=event.target.value;
    }
     
}


/* solo se podra un producto a la vez antes de solicitar el credito */
function unselect(){
    document.querySelectorAll('[name=radio]').forEach((x) => x.checked=false); 
 }
/* obtener el radio seleccionado */
let getValorSeleccionado= ()=>{
    if(document.querySelector('[name=radio]:checked')!=null){
        return document.querySelector('[name=radio]:checked').value;
    };
}

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }
const arrayOfSmartphones = [
    { id: 1,  cardId: "smartphone1", cardSrc: "/assets/img/portfolio/smartphoneX.jpg" , cardAlt:"", cardTitle:"SmartphoneX", cardText:"Samsung Galaxy S10. 70.000$.-", radioType:"radio", radioId:"radio4", radioValue:"70000"},
    { id: 2,  cardId: "smartphone2", cardSrc: "/assets/img/portfolio/smartphone3.jpg" , cardAlt:"", cardTitle:"Smartphone1", cardText:"Samsung S5 80.000$.-", radioType:"radio", radioId:"radio5", radioValue:"80000"},
    { id: 3,  cardId: "smartphone3", cardSrc: "/assets/img/portfolio/smartphone.jpg" , cardAlt:"", cardTitle:"Smartphone3", cardText:"Samsung S1 S10. 90.000$.-", radioType:"radio", radioId:"radio6", radioValue:"90000"},
];
const arrayOfTecno = [
    { id: 1,  cardId: "accesorio1", cardSrc: "/assets/img/portfolio/smartwatch1.jpg" , cardAlt:"", cardTitle:"Accesorio1", cardText:"Smartwatch Xiaomi Mibro Air Reloj Inteligente 7.000$.-", radioType:"radio", radioId:"radio4", radioValue:"7000"},
    { id: 2,  cardId: "accesorio2", cardSrc: "/assets/img/portfolio/Parlante1.webp" , cardAlt:"", cardTitle:"Accesorio2", cardText:"Parlante Bluetooth JBL 5.000$.-", radioType:"radio", radioId:"radio5", radioValue:"5000"},
    { id: 3,  cardId: "accesorio3", cardSrc: "/assets/img/portfolio/auriculares.jpg" , cardAlt:"", cardTitle:"Accesorio3", cardText:"Auriculares DAUER $4.234 .-", radioType:"radio", radioId:"radio6", radioValue:"4234"},
];
const arrayOfXP = [
    { id: 1,  cardId: "xp1", cardSrc: "/assets/img/portfolio/salta.JPG" , cardAlt:"", cardTitle:"Salta", cardText:"Cerro siete colores Salta 7.000$.-", radioType:"radio", radioId:"radio4", radioValue:"7000"},
    { id: 2,  cardId: "xp2", cardSrc: "/assets/img/portfolio/corrientes.jpg" , cardAlt:"", cardTitle:"Corrientes", cardText:"Estadia playas de Ituzaingó en Corrientes 5.000$.-", radioType:"radio", radioId:"radio5", radioValue:"5000"},
    { id: 3,  cardId: "xp3", cardSrc: "/assets/img/portfolio/chalten.JPG" , cardAlt:"", cardTitle:"Chaltén", cardText:"Caminata guiada Chalten $4.000 .-", radioType:"radio", radioId:"radio6", radioValue:"4000"},
];
const createProductos=(arrayOfCards, parentNode)=>{
    for (const card of arrayOfCards) {
            let divPpal = document.createElement("div");
            let div2 = document.createElement("div");
            let img = document.createElement("img");
            let div3 = document.createElement("div");
            let h4 = document.createElement("h4");
            let p = document.createElement("p");
            let input = document.createElement("input");
            let label= document.createElement("label");
            divPpal.setAttribute("class","col-lg-4 col-md-6 mb-4");
            div2.setAttribute("class","card h-100");
            img.setAttribute("height","250px");
            img.setAttribute("class","card-img-top");
            img.setAttribute("src",card.cardSrc);
            img.setAttribute("data-toggle","popover");
            img.setAttribute("data-trigger","hover");
            div3.setAttribute("class","card-body");
            h4.setAttribute("class","card-title");
            h4.innerHTML=card.cardTitle;
            p.setAttribute("class","card-text");
            p.innerHTML=card.cardText;
            input.setAttribute("type",card.radioType);
            input.setAttribute("id",card.radioId);
            input.setAttribute("name",card.radioType);
            input.setAttribute("class",card.radioType);
            input.setAttribute("value",card.radioValue);
            label.setAttribute("for",card.radioId);
            label.innerHTML=card.cardTitle;
            var br = document.createElement('br');
            div2.appendChild(img);
            div2.appendChild(div3);
            div3.appendChild(h4);
            div3.appendChild(p);
            div3.appendChild(input);
            div3.appendChild(label);
            div3.appendChild(br);
            divPpal.appendChild(div2);
            parentNode.appendChild(divPpal);
        }
        console.log(document.documentElement.innerHTML);
}