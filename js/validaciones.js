const validarEdad =(event)=>{
    if(!getEsMayorDeEdad((document.getElementById("fechaNacimiento") || {}).value || "0")){
      $("#modalMenor").modal("show");
      document.getElementById("fechaNacimiento").style.borderColor = "red";
      document.getElementById("fechaNacimiento").style.borderWidth = "1px";
    }
}

/*validacion datos de la persona */
const validarPersona=(nombre,apellido,direccion,email,telefono,fechaNac,situacionTributaria,antiguedad,estadoCivil,ingresosMensuales,ingresosMensualesPareja,tarjetaCredito,dni)=>{
 
    let personaValida=true;
    if(nombre==""){
      document.getElementById("nombre").style.borderColor = "red";
      document.getElementById("nombre").style.borderWidth = "1px";
      personaValida=false;
    }
    if(apellido==""){
      document.getElementById("apellido").style.borderColor = "red";
      document.getElementById("apellido").style.borderWidth = "1px";
      personaValida=false;
    }
    if(direccion==""){
      document.getElementById("direccion").style.borderColor = "red";
      document.getElementById("direccion").style.borderWidth = "1px";
      personaValida=false;
    }
    if(telefono==""){
      document.getElementById("telefono").style.borderColor = "red";
      document.getElementById("telefono").style.borderWidth = "1px";
      personaValida=false;
    }
    if(email=="" || (email.toString().split("@").length) !=2 ){
      document.getElementById("email").style.borderColor = "red";
      document.getElementById("email").style.borderWidth = "1px";
      personaValida=false;
    }
    if(dni=="" ){
      document.getElementById("dni").style.borderColor = "red";
      document.getElementById("dni").style.borderWidth = "1px";
      personaValida=false;
    }
    if(fechaNac=="" || !getEsMayorDeEdad(fechaNac) ){
      document.getElementById("fechaNacimiento").style.borderColor = "red";
      document.getElementById("fechaNacimiento").style.borderWidth = "1px";
      personaValida=false;
    }
    if(ingresosMensuales=="" ){
      document.getElementById("ingresosMensuales").style.borderColor = "red";
      document.getElementById("ingresosMensuales").style.borderWidth = "1px";
      personaValida=false;
    }
    if(personaValida){
      $('#inputForm>div').children(".form-control").css('border-color','grey');
      $('#inputForm>div').children(".form-control").prop("readonly", true);
      $('#inputForm>div>select').attr("disabled", true);
      $('input[name=radio]').attr("disabled",true);
      
    }
    return personaValida;
  }