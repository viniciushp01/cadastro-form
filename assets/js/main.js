class ValidaForm {
  constructor() {
    this.form = document.querySelector(".formulario");
    this.enviar = document.querySelector(".btn-enviar");
    this.evento();
  }
  evento() {
    this.enviar.addEventListener("click", (e) => {
      this.handleClick(e);
    });
  }

  handleClick(e) {
    e.preventDefault();
    const campoValidos = this.validaCampo();
    const senhasValidas = this.validaSenha();

    if (campoValidos && senhasValidas) {
      alert("Fomulário enviado");
      for (let campo of document.querySelectorAll(".validar")) {
        campo.value = "";
      }
    }
  }

  validaSenha() {
    let valida = true;

    const senha = this.form.querySelector(".senha");
    const confirmaSenha = this.form.querySelector(".confirma-senha");

    if (senha.value !== confirmaSenha.value) {
      valida = false;
      this.criaErro(
        senha,
        "Campos senha e confirma senha precisam ser iguais."
      );
      this.criaErro(
        confirmaSenha,
        "Campos senha e confirma senha precisam ser iguais."
      );
    }
    if (senha.value.length < 6 || senha.value.length > 12) {
      valida = false;
      this.criaErro(senha, "Senha precisa estar entre 6 e 12 caracteres");
    }

    return valida;
  }

  validaCampo() {
    let valida = true; // Criando uma variável que torna o campo verdadeiro

    // Criando um método para que os erros apareçam na tela somente uma vez após clicar no botão
    for (let errorText of this.form.querySelectorAll(".msg-erro")) {
      errorText.remove();
    }

    // Varrendo o array dos inputs
    for (let campo of document.querySelectorAll(".validar")) {
      let label = campo.previousElementSibling.innerHTML; // Criando uma variável que irá conter os nomes de cada campo que está errado
      // Se o campo de valor estiver vazio, valida se torna false e o erro aparece na tela
      if (!campo.value) {
        this.criaErro(campo, `Campo ${label} não está preenchido`);
        valida = false; // Campo vazio, valida é false
      }

      // Validando CPF
      if (campo.classList.contains("cpf")) {
        if (!this.validaCPF(campo)) valida = false;
      }
      if (campo.classList.contains("usuario")) {
        if (!this.validaUsuario(campo)) valida = false;
      }
    }
    return valida;
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valida = true;
    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, "Usuário precisa ter entre 3 e 12 caracteres");
      valida = false;
    }

    //Expressão ternária para saber se está sendo usado apenas letras ou apenas números
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(
        campo,
        "Nome de usuário precisa conter apenas letra e/ou números"
      );
    }
    return valida;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criaErro(campo, "CPF inválido.");
      return false;
    }
    return true;
  }

  // Criando a função que irá mostrar o erro na tela
  criaErro(campo, msg) {
    let erro = document.createElement("div");
    erro.innerText = msg;
    erro.classList.add("msg-erro");
    campo.insertAdjacentElement("afterend", erro); //Lugar onde o erro irá aparecer
  }
}

const validaForm = new ValidaForm();
