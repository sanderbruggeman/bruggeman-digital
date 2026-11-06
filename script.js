/**
 * Bruggeman Digital — Vanilla JS Interactions, Smooth Anchor Scrolling & Form Wiring
 * Zero dependencies, ultra-fast execution.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // 2. Reliable Smooth Anchor Scrolling (with sticky header offset)
  const HEADER_OFFSET = 84;

  function scrollToHash(hash, updateHistory = true) {
    if (!hash || hash === '#' || hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (updateHistory && history.pushState) {
        history.pushState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }

    const targetEl = document.querySelector(hash);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const targetTop = rect.top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      if (updateHistory && history.pushState) {
        history.pushState(null, '', hash);
      }
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Close mobile menu first if open so layout height is stable before calculating offset
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      }

      if (href === '#' || href === '#top' || document.querySelector(href)) {
        e.preventDefault();
        scrollToHash(href, true);
      }
    });
  });

  // 3. Package Selection Pre-fill for Contact Form
  const subjectSelect = document.getElementById('onderwerp');
  const packageButtons = document.querySelectorAll('[data-package-select]');

  if (subjectSelect) {
    const params = new URLSearchParams(window.location.search);
    const pakketParam = params.get('pakket');
    if (pakketParam === 'ai') {
      subjectSelect.value = 'AI & Automatisering Sprint (richtprijs € 1.750,-)';
    } else if (pakketParam === 'web') {
      subjectSelect.value = 'All-In Bedrijfswebsite / Webapp (richtprijs € 2.000,-)';
    } else if (pakketParam === 'dashboard') {
      subjectSelect.value = 'Data & KPI Dashboard Setup (richtprijs € 1.250,-)';
    } else if (pakketParam === 'verkenning') {
      subjectSelect.value = 'Vrijblijvende kennismaking / sparsessie (30 min)';
    }

    if (packageButtons.length > 0) {
      packageButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetValue = btn.getAttribute('data-package-select');
          if (targetValue) {
            subjectSelect.value = targetValue;
          }
        });
      });
    }
  }

  // Ensure initial URL hash lands accurately below sticky header
  if (window.location.hash && document.querySelector(window.location.hash)) {
    setTimeout(() => {
      scrollToHash(window.location.hash, false);
    }, 60);
  }

  // 4. Contact Form Integration (Preserving FormSubmit.co endpoint & AJAX flow)
  const form = document.getElementById('contact-form');
  if (form) {
    if (window.location.search.includes('bericht=verzonden')) {
      const successNotice = document.createElement('div');
      successNotice.style.cssText =
        'margin-bottom: 1.25rem; padding: 1rem 1.25rem; border-radius: 12px; background-color: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; font-size: 0.88rem; display: flex; align-items: flex-start; gap: 0.75rem;';
      successNotice.innerHTML = `
        <span style="width: 24px; height: 24px; border-radius: 50%; background-color: #10B981; color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; flex-shrink: 0; margin-top: 2px;">✓</span>
        <div>
          <strong style="display: block; font-weight: 700; color: #065F46;">Bedankt voor je bericht!</strong>
          <span style="font-size: 0.8rem; color: #047857;">Ik heb je aanvraag ontvangen en neem binnen één werkdag contact met je op.</span>
        </div>
      `;
      form.parentNode.insertBefore(successNotice, form);
    }

    form.addEventListener('submit', async (e) => {
      if (!form.checkValidity()) return;

      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = `<span>Verzenden...</span>`;
      }

      try {
        const formData = new FormData(form);
        const res = await fetch('https://formsubmit.co/ajax/srabruggeman@gmail.com', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        const data = await res.json();
        if (
          res.ok ||
          (data &&
            (data.success === 'true' ||
              data.success === true ||
              (data.message && data.message.includes('Activate'))))
        ) {
          const formHeading = document.getElementById('form-heading');
          if (formHeading) formHeading.style.display = 'none';
          form.innerHTML = `
            <div style="padding: 2rem 1rem; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background-color: #D1FAE5; color: #059669; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.5rem;">
                ✓
              </div>
              <h4 style="font-size: 1.4rem; margin-bottom: 0.5rem; color: #13294B;">Bericht succesvol verzonden!</h4>
              <p style="font-size: 0.9rem; color: #5C616B; max-width: 42ch; margin: 0 auto 1.25rem; line-height: 1.6;">
                Bedankt voor je aanvraag. Ik heb je gegevens in goede orde ontvangen en neem uiterlijk binnen één werkdag persoonlijk contact met je op.
              </p>
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 600; color: #047857; background-color: #ECFDF5; padding: 0.4rem 0.85rem; border-radius: 8px; border: 1px solid #A7F3D0;">
                Directe bevestiging verstuurd naar je inbox
              </span>
            </div>
          `;
        } else {
          throw new Error('Verzending mislukt');
        }
      } catch (err) {
        form.submit();
      }
    });
  }
});
