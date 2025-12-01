import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.esm.js';
import { registerUser } from '../../api/logeoService.js';
import { navigateTo } from '../router.js';

export function initRegister() {
  const form = document.getElementById('register-form');
  const roleSelect = document.getElementById('register-role');
  const systemIDInput = document.getElementById('register-systemID');

  // Manejar cambios en el rol
  roleSelect.addEventListener('change', () => {
    const selectedRole = roleSelect.value;
    
    if (selectedRole === 'admin') {
      // Bloquear y limpiar el campo para administradores
      systemIDInput.disabled = true;
      systemIDInput.value = '';
      systemIDInput.placeholder = 'No requerido para administradores';
      systemIDInput.style.opacity = '0.5';
      systemIDInput.style.cursor = 'not-allowed';
    } else if (selectedRole === 'user') {
      // Habilitar el campo para usuarios
      systemIDInput.disabled = false;
      systemIDInput.placeholder = '00001';
      systemIDInput.style.opacity = '1';
      systemIDInput.style.cursor = 'text';
    } else {
      // Estado inicial (sin selección)
      systemIDInput.disabled = true;
      systemIDInput.value = '';
      systemIDInput.placeholder = 'Selecciona primero tu rol';
      systemIDInput.style.opacity = '0.5';
      systemIDInput.style.cursor = 'not-allowed';
    }
  });

  // Estado inicial: campo bloqueado hasta seleccionar rol
  systemIDInput.disabled = true;
  systemIDInput.placeholder = 'Selecciona primero tu rol';
  systemIDInput.style.opacity = '0.5';
  systemIDInput.style.cursor = 'not-allowed';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name     = document.getElementById('register-name').value.trim();
    const email    = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm  = document.getElementById('register-confirm-password').value;
    const role     = roleSelect.value;
    const systemID = parseInt(systemIDInput.value, 10) || undefined;

    if (password !== confirm) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        showConfirmButton: false,
        timer: 2000
      });
    }

    // Validar que usuario tenga ID de sistema
    if (role === 'user' && !systemID) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'ID de sistema requerido para usuario',
        showConfirmButton: false,
        timer: 2000
      });
    }

    // Validar que administrador NO envíe ID de sistema
    if (role === 'admin' && systemID) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Los administradores no requieren ID de sistema',
        showConfirmButton: false,
        timer: 2000
      });
    }

    try {
      await registerUser({ name, email, password, role, id_Sistema: systemID });
      await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Registrado con éxito',
        showConfirmButton: false,
        timer: 2000
      });
      navigateTo('#/login');
    } catch (err) {
      const msg = err.message === 'ID de sistema inválido para este rol'
        ? 'ID de sistema no autorizado'
        : (err.message || 'Error al registrarse');
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 2500
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', initRegister);