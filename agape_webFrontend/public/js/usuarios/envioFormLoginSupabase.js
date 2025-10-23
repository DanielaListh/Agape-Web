import { supabase } from './supabaseClient';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form-login');

    if (form) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const correoElectronico = document.getElementById('correoElectronico').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!correoElectronico || !password) {
          showError("Correo electrónico y contraseña son requeridos");
          return;
        }

        // Validaciones básicas
        if (password.length < 6 || password.length > 20) {
          showError("La contraseña debe tener entre 6 y 20 caracteres");
          return;
        }

        if (!correoElectronico.includes('.com') || correoElectronico.length < 4) {
          showError("Correo inválido");
          return;
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: correoElectronico,
            password: password
          });

          if (error) {
            showError("Credenciales inválidas");
            return;
          }

          // Guardar sesión y redirigir
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('token', data.session.access_token);
            window.location.href = '/html/adminHome.html';
        } catch (err) {
          showError("Error al conectar con Supabase");
        }
      });
    }

    function showError(message) {
      const errorMensajeElement = document.getElementById('textoValidacionLogin');
      if (errorMensajeElement) {
        errorMensajeElement.innerText = message;
      }
    }
});
