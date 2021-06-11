capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const guardarSession = (clave, valor) => {
    sessionStorage.setItem(clave, valor);
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