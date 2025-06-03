    document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("suscriptionForm")
  const inputs = form.querySelectorAll("input")
  const formTitle = document.getElementById("formTitle")

  form.addEventListener("submit", e => {
    e.preventDefault()
    let valid = true

    inputs.forEach(input => {
      const errorSpan = document.getElementById("error" + input.id)
      const value = input.value.trim()
      let error = ""

      if (input.id === "nombre") {
        if (value.length < 7 || !value.includes(" ")) {
          error = "Debe tener al menos 6 letras y un espacio"
        } else {
          const cleaned = value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúñÑ\s]/g, "").replace(/\s+/g, " ").trim()
          formTitle.textContent = "HOLA " + cleaned.toUpperCase()
        }
      }

      if (input.id === "email") {
        if (!value.includes("@") || !value.includes(".")) {
          error = "Email inválido"
        }
      }

      if (input.id === "contrasena") {
        if (value.length < 8) {
          error = "Debe tener al menos 8 caracteres"
        }
      }

      if (input.id === "repetirContrasena") {
        const pass = document.getElementById("contrasena").value
        if (value !== pass) {
          error = "Las contraseñas no coinciden"
        }
      }

      if (input.id === "edad") {
        if (isNaN(value) || parseInt(value) < 18) {
          error = "Debes tener al menos 18 años"
        }
      }

      if (input.id === "telefono") {
        if (value.length < 7 || isNaN(value)) {
          error = "Teléfono inválido"
        }
      }

      if (input.id === "direccion") {
        if (value.length < 5 || !value.includes(" ")) {
          error = "Dirección inválida"
        }
      }

      if (input.id === "ciudad") {
        if (value.length < 3) {
          error = "Ciudad inválida"
        }
      }

      if (input.id === "cp") {
        if (value.length < 3) {
          error = "Código postal inválido"
        }
      }

      if (input.id === "dni") {
        if (isNaN(value) || value.length < 7 || value.length > 8) {
          error = "DNI inválido"
        }
      }

      if (error) {
        errorSpan.textContent = error
        valid = false
      } else {
        errorSpan.textContent = ""
      }
    })

    if (valid) {
      alert("Formulario enviado correctamente")
    } else {
      alert("Revisa los campos con errores")
    }
  })

  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      document.getElementById("error" + input.id).textContent = ""
    })
  })
})
