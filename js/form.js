/**
 * Form — Real-time validation + UX
 */
(function () {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  const rules = {
    name: {
      validate: v => v.trim().length >= 2,
    },
    email: {
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
    phone: {
      validate: v => v === '' || /^[+\d\s()-]{6,20}$/.test(v),
    },
    sejour: {
      validate: v => v !== '',
    },
    hebergement: {
      validate: v => v !== '',
    },
    guests: {
      validate: v => v !== '',
    },
    checkin: {
      validate: v => v !== '',
    },
    checkout: {
      validate: v => v !== '',
    },
  };

  function validateField(name) {
    const field = form.elements[name];
    if (!field || !rules[name]) return true;

    const value = field.value;
    const isValid = rules[name].validate(value);
    const group = field.closest('.form-group');

    if (group) {
      group.classList.toggle('has-error', !isValid);
    }
    return isValid;
  }

  /* Real-time validation on blur */
  Object.keys(rules).forEach(name => {
    const field = form.elements[name];
    if (!field) return;
    field.addEventListener('blur', () => validateField(name));
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        validateField(name);
      }
    });
  });

  /* Set min date for checkin to today */
  const checkin = form.elements.checkin;
  const checkout = form.elements.checkout;
  if (checkin) {
    const today = new Date().toISOString().split('T')[0];
    checkin.setAttribute('min', today);
    checkin.addEventListener('change', () => {
      if (checkout && checkin.value) {
        checkout.setAttribute('min', checkin.value);
        if (checkout.value && checkout.value < checkin.value) {
          checkout.value = '';
        }
      }
    });
  }

  /* Submit */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(rules).forEach(name => {
      if (!validateField(name)) allValid = false;
    });

    if (!allValid) {
      const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    /* Simulate submission with loader */
    const btn = form.querySelector('.btn--submit');
    btn.classList.add('is-loading');
    btn.disabled = true;

    setTimeout(() => {
      btn.classList.remove('is-loading');
      btn.disabled = false;

      /* Success feedback */
      const btnText = btn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      btnText.textContent = 'Demande envoyee !';
      btn.style.background = 'var(--forest-500)';
      btn.style.borderColor = 'var(--forest-500)';

      setTimeout(() => {
        btnText.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        form.reset();
        form.querySelectorAll('.has-error').forEach(g => g.classList.remove('has-error'));
      }, 3000);
    }, 1500);
  });
})();
