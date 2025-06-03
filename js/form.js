document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("suscriptionForm");
  const inputs = form.querySelectorAll("input");
  const formTitle = document.getElementById("formTitle");
  const hamburguesa = document.querySelector(".hamburguesa");
  const menu = document.querySelector(".menuNav ul");

  if (hamburguesa && menu) {
    hamburguesa.addEventListener("click", () => {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
  }

  function validarCampo(input) {
    const id = input.id;
    const value = input.value.trim();
    const errorSpan = document.getElementById("error-" + id);
    let error = "";

    if (id === "nombre") {
      if (value.length < 7 || !value.includes(" ")) {
        error = "Debe tener al menos 6 letras y un espacio";
      } else {
        const cleaned = value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúñÑ\s]/g, "").replace(/\s+/g, " ").trim();
        formTitle.textContent = "HOLA " + cleaned.toUpperCase();
      }
    }

    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Email inválido";
      }
    }

    if (id === "contrasena") {
      const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
      if (!regex.test(value)) {
        error = "Debe tener al menos 8 caracteres con letras y números";
      }
    }

    if (id === "repetirContrasena") {
      const pass = document.getElementById("contrasena").value;
      if (value !== pass) {
        error = "Las contraseñas no coinciden";
      }
    }

    if (id === "edad") {
      if (isNaN(value) || parseInt(value) < 18) {
        error = "Debes tener al menos 18 años";
      }
    }

    if (id === "telefono") {
      if (!/^\d{7,}$/.test(value)) {
        error = "Teléfono inválido (solo números, mínimo 7 dígitos)";
      }
    }

    if (id === "direccion") {
      if (value.length < 5 || !value.includes(" ")) {
        error = "Dirección inválida";
      }
    }

    if (id === "ciudad") {
      if (value.length < 3) {
        error = "Ciudad inválida";
      }
    }

    if (id === "cp") {
      if (value.length < 3) {
        error = "Código postal inválido";
      }
    }

    if (id === "dni") {
      if (!/^\d{7,8}$/.test(value)) {
        error = "DNI inválido";
      }
    }

    if (error) {
      errorSpan.textContent = error;
      input.classList.add("inputError");
      return false;
    } else {
      errorSpan.textContent = "";
      input.classList.remove("inputError");
      return true;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formularioValido = true;

    inputs.forEach((input) => {
      const valido = validarCampo(input);
      if (!valido) formularioValido = false;
    });

    if (formularioValido) {
      let resumen = "Formulario enviado con éxito:\n";
      inputs.forEach((input) => {
        resumen += `${input.previousElementSibling.textContent}: ${input.value.trim()}\n`;
      });
      alert(resumen);
    } else {
      alert("Revisá los campos con errores.");
    }
  });

  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validarCampo(input);
    });

    input.addEventListener("focus", () => {
      document.getElementById("error-" + input.id).textContent = "";
      input.classList.remove("inputError");
    });

    if (input.id === "nombre") {
      input.addEventListener("input", () => {
        const val = input.value.trim();
        if (val.length > 0) {
          const cleaned = val.replace(/[^a-zA-ZÁÉÍÓÚáéíóúñÑ\s]/g, "").replace(/\s+/g, " ").trim();
          formTitle.textContent = "HOLA " + cleaned.toUpperCase();
        } else {
          formTitle.textContent = "HOLA";
        }
      });
    }
  });
});
