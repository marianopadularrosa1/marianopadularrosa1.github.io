capitalize=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
const guardarSession = (clave, valor) => { sessionStorage.setItem(clave, valor) };

const createForm=(arrayOfFields, parentNode)=>{
    alert("parentNode.childNodes.length:"+parentNode.childNodes.length);
    if(parentNode.childNodes.length==1){
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
    
}


const getValorCuota =(valorProducto, cantCuotas)=>  valorProducto / cantCuotas;




/* Se invoca onclick del boton Solicitar */
  const mostrarForm=()=>{
    
    let inputForm = document.getElementById('inputForm');  
    createForm(fieldsArrayForm,inputForm);
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
    document.getElementById("montoCuota").value = solicitudCredito.montoCuota!=null?solicitudCredito.montoCuota[0]:"0";
    document.getElementById("montoConInteres").value   = solicitudCredito.montoConInteres;
    guardarSession('solicitudCredito', JSON.stringify(solicitudCredito));
    
    let selectCuotas = document.getElementById("selectCuotas");
    selectCuotas.addEventListener('change',updateMontoCuota);
}

updateMontoCuota=(event)=> {
    if(document.getElementById("selectCuotas")!=null){
        let sc = JSON.parse(sessionStorage.getItem("solicitudCredito"));
        let idMonto = sc.cuotas.indexOf(parseInt(event.target.value)); 
        document.getElementById("montoCuota").value=sc.montoCuota[idMonto];
    }
}
/**Carga valores para select */
const loadSelect =(elementId,arrayOfData)=>{
    let select = document.getElementById(elementId);
    let cantSelect = select.options.length;
    if(cantSelect>0 ){
        removeOptions(select);
    }
    for (let i=0;i< arrayOfData.length ; i++) {
        let option = document.createElement("option");
        option.innerHTML = typeof(arrayOfData[i])=='string'?arrayOfData[i].toUpperCase():arrayOfData[i] ;
        option.value = arrayOfData[i];
        select.add(option);
    }
    
}

removeOptions=(selectElement)=> {
    $(selectElement).empty();
 }
 
 


/* Inicializa productos de cada html */
function inicializarProd(){
    let htmlActual=document.documentURI.split("/")[document.documentURI.split("/").length-1];
    if(htmlActual== "smartphone.html"){
        let productos  = document.getElementById("productos");
        createProductos(arrayOfSmartphones,productos);
        createFooter();
    }
    else if(htmlActual== "tecno.html"){
        let productos  = document.getElementById("productos");
        createProductos(arrayOfTecno,productos);
        createFooter();
    }
    else if(htmlActual== "xp.html"){
        let productos  = document.getElementById("productos");
        createProductos(arrayOfXP,productos);
        createFooter();
    }
}
/*Cuando se carga la pagina onload */
document.addEventListener("DOMContentLoaded", function(event) {
    /*inicializacion de productos */
    inicializarProd();
    let myRadios= document.querySelectorAll('[name=radio]');
    myRadios.forEach((input) => {
        input.addEventListener('change', updateValorProducto);
    });
  });
/* actualiza el valor del producto cuando el user cambia la seleccion del producto */
updateValorProducto=(event)=> {
    if(document.getElementById("valorProducto")!=null){
        document.getElementById("valorProducto").value=event.target.value;
        guardarSession('valorProducto', event.target.value);
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
}

createFooter=()=>{
    let footer = document.createElement("footer");
    footer.setAttribute("id","footer");
    footer.setAttribute("class","footer");
    let div = document.createElement("div");
    div.setAttribute("class","container py-4");
    let div2 = document.createElement("div");
    div2.setAttribute("class","copyright");
    div2.innerHTML="&copy; Copyright <strong><span>SmartCredit</span></strong>. All Rights Reserved";
    let div3 = document.createElement("div");
    div3.setAttribute("class","credits");
    div3.innerHTML="Designed by <strong><span>MP</span></strong>";
    div.appendChild(div2);
    div.appendChild(div3);
    footer.appendChild(div);
    document.body.appendChild(footer);

}