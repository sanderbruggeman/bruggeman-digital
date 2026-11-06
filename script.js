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

  // 4. Contact Form Integration (Web3Forms API + WhatsApp/Mailto fallback)
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
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '<span>Bericht versturen</span>';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = `<span>Verzenden...</span>`;
      }

      // Collect form field values for potential fallback
      const naam = (document.getElementById('naam')?.value || '').trim();
      const bedrijf = (document.getElementById('bedrijf')?.value || '').trim();
      const email = (document.getElementById('email')?.value || '').trim();
      const telefoon = (document.getElementById('telefoon')?.value || '').trim();
      const onderwerp = (document.getElementById('onderwerp')?.value || '').trim();
      const bericht = (document.getElementById('bericht')?.value || '').trim();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: json,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        let data = null;
        try {
          data = await res.json();
        } catch (_) {}

        if (res.ok && data && (data.success === true || data.success === 'true')) {
          const formHeading = document.getElementById('form-heading');
          if (formHeading) formHeading.style.display = 'none';
          form.innerHTML = `
            <div style="padding: 2rem 1rem; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background-color: #D1FAE5; color: #059669; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.5rem;">
                ✓
              </div>
              <h4 style="font-size: 1.4rem; margin-bottom: 0.5rem; color: #13294B;">Bericht succesvol verzonden!</h4>
              <p style="font-size: 0.9rem; color: #5C616B; max-width: 42ch; margin: 0 auto 1.25rem; line-height: 1.6;">
                Bedankt voor je aanvraag${naam ? ', ' + naam : ''}. Ik heb je gegevens in goede orde ontvangen en neem uiterlijk binnen één werkdag persoonlijk contact met je op.
              </p>
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 600; color: #047857; background-color: #ECFDF5; padding: 0.4rem 0.85rem; border-radius: 8px; border: 1px solid #A7F3D0;">
                Bevestiging verzonden naar ${email || 'je e-mail'}
              </span>
            </div>
          `;
          return;
        }

        throw new Error((data && data.message) || 'Verzending mislukt via server');
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn('Formulier submit fallback geactiveerd:', err);

        // Pre-fill WhatsApp message text
        const waText = encodeURIComponent(
          `Hallo Sander,\n\nIk stuur een bericht via je website (Bruggeman Digital):\n` +
          `• Naam: ${naam}\n` +
          (bedrijf ? `• Bedrijf: ${bedrijf}\n` : '') +
          `• E-mail: ${email}\n` +
          (telefoon ? `• Telefoon: ${telefoon}\n` : '') +
          `• Onderwerp: ${onderwerp}\n\n` +
          `Bericht:\n${bericht}`
        );

        // Pre-fill Mailto link
        const mailSubject = encodeURIComponent(`Nieuwe aanvraag via website: ${onderwerp || naam}`);
        const mailBody = encodeURIComponent(
          `Naam: ${naam}\nBedrijf: ${bedrijf}\nE-mail: ${email}\nTelefoon: ${telefoon}\nOnderwerp: ${onderwerp}\n\nBericht:\n${bericht}`
        );

        // Reset submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
          submitBtn.innerHTML = originalBtnText;
        }

        // Show friendly in-place fallback notice above form (preserves all typed input)
        let errorNotice = document.getElementById('form-error-notice');
        if (!errorNotice) {
          errorNotice = document.createElement('div');
          errorNotice.id = 'form-error-notice';
          form.insertBefore(errorNotice, form.firstChild);
        }

        errorNotice.style.cssText =
          'margin-bottom: 1.25rem; padding: 1.15rem; border-radius: 12px; background-color: #FFF7ED; border: 1px solid #FFEDD5; color: #9A3412; font-size: 0.88rem;';
        errorNotice.innerHTML = `
          <strong style="display: block; font-size: 0.95rem; margin-bottom: 0.35rem; color: #C2410C;">Verbinding met mailserver tijdelijk vertraagd</strong>
          <p style="margin-bottom: 0.85rem; line-height: 1.5; color: #7C2D12;">
            Je ingevulde gegevens zijn bewaard. Je kunt direct met 1 klik contact opnemen via WhatsApp of e-mail:
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="https://wa.me/31619588717?text=${waText}" target="_blank" rel="noopener noreferrer" class="btn btn--orange" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; text-decoration: none;">
              Stuur via WhatsApp ↗
            </a>
            <a href="mailto:srabruggeman@gmail.com?subject=${mailSubject}&body=${mailBody}" class="btn btn--surface" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; text-decoration: none;">
              Stuur via E-mail ↗
            </a>
          </div>
        `;
      }
    });
  }
});
