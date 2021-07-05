capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const guardarSession = (clave, valor) => {
    sessionStorage.setItem(clave, valor);
  };
  const guardarLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, valor);
  };
  const getValorCuota = (valorProducto, cantCuotas) => valorProducto / cantCuotas;
  /**Carga valores para select */
const loadSelect = (elementId, arrayOfData) => {
    let select = document.getElementById(elementId);
    let cantSelect = select.options.length;
    if (cantSelect > 0) {
      removeOptions(select);
    }
    for (let i = 0; i < arrayOfData.length; i++) {
      let option = document.createElement("option");
      option.innerHTML =
        typeof arrayOfData[i] == "string"
          ? arrayOfData[i].toUpperCase()
          : arrayOfData[i];
      option.value = arrayOfData[i];
      select.add(option);
    }
  };
  
  removeOptions = (selectElement) => {
    $(selectElement).empty();
  };

  getEdad=  (fechaNacimiento) =>{
    const anioNac= (parseDate(fechaNacimiento)).getFullYear() ;
    const today =new Date().getFullYear();
    const ageDifMs = today - anioNac;
    return ageDifMs;
  }
  getEsMayorDeEdad = (fechaNacimiento)=>{
    let edad =  getEdad(fechaNacimiento);
    if(edad >=18 )return true;
    else return false;
  }
  function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }

  addCSS=(parentNode)=>{
    let link1 = document.createElement('link');
    let link2 = document.createElement('link');
    let link3 = document.createElement('link');
    let link4 = document.createElement('link');
    let link5 = document.createElement('link');
    let link6 = document.createElement('link');
    let link7 = document.createElement('link');
    link1.setAttribute("href","/css/styles.css");
    link2.setAttribute("href","/assets/css/style.css");
    link3.setAttribute("href","/assets/vendor/aos/aos.css");
    link4.setAttribute("href","/assets/vendor/bootstrap-icons/bootstrap-icons.css");
    link5.setAttribute("href","/assets/vendor/boxicons/css/boxicons.min.css");
    link6.setAttribute("href","/assets/vendor/glightbox/css/glightbox.min.css");
    link7.setAttribute("href","/assets/vendor/swiper/swiper-bundle.min.css");
    link1.setAttribute("rel","stylesheet");
    link2.setAttribute("rel","stylesheet");
    link3.setAttribute("rel","stylesheet");
    link4.setAttribute("rel","stylesheet");
    link5.setAttribute("rel","stylesheet");
    link6.setAttribute("rel","stylesheet");
    link7.setAttribute("rel","stylesheet");
    parentNode.appendChild(link1);
    parentNode.appendChild(link2);
    parentNode.appendChild(link3);
    parentNode.appendChild(link4);
    parentNode.appendChild(link5);
    parentNode.appendChild(link6);
    parentNode.appendChild(link7);
}
updateMontoCuota = (event) => {
  if (document.getElementById("selectCuotas") != null) {
    let sc = JSON.parse(sessionStorage.getItem("solicitudCredito"));
    let idMonto = sc.cuotas.indexOf(parseInt(event.target.value));
    sc.cuotasElegidas = parseInt(event.target.value).toString();
    document.getElementById("montoCuota").value = sc.montoCuota[idMonto];
    sc.montoCuotaElegida = (sc.montoCuota[idMonto]).toString();
    guardarSession("solicitudCredito", JSON.stringify(sc));
    guardarSession("cuotasElegidas", sc.cuotasElegidas);
    guardarSession("montoCuotasElegidas", sc.montoCuotaElegida);
  }
};
/* actualiza el valor del producto cuando el user cambia la seleccion del producto */
updateValorProducto = (event) => {
  if (document.getElementById("valorProducto") != null) {
    document.getElementById("valorProducto").value = event.target.value;
    document.getElementById("nombreProducto").value = event.target.id;
    guardarSession("valorProducto", event.target.value);
    guardarSession("nombreProducto", event.target.id);
  }
};
/* solo se podra un producto a la vez antes de solicitar el credito */
function unselect() {
  document.querySelectorAll("[name=radio]").forEach((x) => (x.checked = false));
}
/* obtener el radio seleccionado */
let getValorSeleccionado = () => {
  if (document.querySelector("[name=radio]:checked") != null) {
    return document.querySelector("[name=radio]:checked").value;
  }
};
/* obtener el radio seleccionado */
let getProductoSeleccionado = () => {
  if (document.querySelector("[name=radio]:checked") != null) {
    return document.querySelector("[name=radio]:checked").id;
  }
};
//Crea el footer de cada pagina
createFooter = () => {
  let footer = document.createElement("footer");
  footer.setAttribute("id", "footer");
  footer.setAttribute("class", "footer");
  let div = document.createElement("div");
  div.setAttribute("class", "container py-4");
  let div2 = document.createElement("div");
  div2.setAttribute("class", "copyright");
  div2.innerHTML =
    "&copy; Copyright <strong><span>SmartCredit</span></strong>. All Rights Reserved";
  let div3 = document.createElement("div");
  let div4 = document.createElement("div");
  let div5 = document.createElement("div");
  div4.innerHTML = `<div class="icon"><i class="bx bx-mobile"></i> </div>`;
  div5.innerHTML = `<div class="icon"><i class="bi bi-check2"></i> </div>`;
  div3.setAttribute("class", "credits");
  div5.setAttribute("class", "credits");
  div3.innerHTML = `Designed by <strong><span>MP</span></strong><a href="https://www.linkedin.com/in/marianopadularrosa/" class="linkedin"><i class="bi bi-linkedin"></i>`;
  div.appendChild(div2);
  div.appendChild(div4);
  div.appendChild(div5);
  div.appendChild(div3);
  footer.appendChild(div);
  document.body.appendChild(footer);
};

String.prototype.hashCode = function() {
  let hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};