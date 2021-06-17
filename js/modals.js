createModal = () => {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("id", "myModal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("data-bs-backdrop","static");
    modal.setAttribute("data-bs-keyboard","false");
    modal.innerHTML = `<!-- Modal -->
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">SmartCredit</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <p>Seleccione un Producto antes de avanzar</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>`;
  
      document.body.appendChild(modal);
  };
  
  createModalPersona = () => {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("id", "modalPersonaNoValida");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("data-bs-backdrop","static");
    modal.setAttribute("data-bs-keyboard","false");
    modal.innerHTML = `<!-- Modal -->
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">SmartCredit</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <p>Complete todos los datos obligatorios antes de avanzar</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>`;
  
      document.body.appendChild(modal);
  };
  
  createModalMenor = () => {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("id", "modalMenor");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("data-bs-backdrop","static");
    modal.setAttribute("data-bs-keyboard","false");
    modal.innerHTML = `<!-- Modal -->
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">SmartCredit</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <p>Debe ser mayor de 18 años para solicitar un Credito</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>`;
  
      document.body.appendChild(modal);
  };

  createModalEmail = () => {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("id", "modalEmail");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("data-bs-backdrop","static");
    modal.setAttribute("data-bs-keyboard","false");
    modal.innerHTML = `<!-- Modal -->
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">SmartCredit</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <p>Ingrese un EMAIL Válido</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>`;
  
      document.body.appendChild(modal);
  };