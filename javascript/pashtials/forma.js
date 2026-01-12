/*FORMA JS NATIVE NAPISI DA SI UZELA SA NETA KOD  */

// contact-form.js
export function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Native JavaScript - Submit event
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // jQuery - obriši greške
        $('.forma-input').removeClass('error success');
        $('.error-message').removeClass('show');
        $('.success-message').remove();
        
        let isValid = true;
        
        // Native JavaScript - validacija IME
        const nameInput = document.getElementById('name');
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameInput, 'Ime i prezime je obavezno polje');
            isValid = false;
        } else if (name.length < 3) {
            showError(nameInput, 'Ime mora imati najmanje 3 karaktera');
            isValid = false;
        } else {
            $(nameInput).addClass('success'); // jQuery animacija
        }
        
        // Native JavaScript - validacija EMAIL (regularni izraz)
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (email === '') {
            showError(emailInput, 'Email je obavezno polje');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, 'Unesite validnu email adresu (npr. primer@domen.com)');
            isValid = false;
        } else {
            $(emailInput).addClass('success');
        }
        
        // Native JavaScript - validacija TELEFON (regularni izraz)
        const phoneInput = document.getElementById('phone');
        const phone = phoneInput.value.trim();
        const phoneRegex = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{2,3}[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
        
        if (phone !== '' && !phoneRegex.test(phone)) {
            showError(phoneInput, 'Unesite validan broj telefona (npr. +381 11 123 4567)');
            isValid = false;
        } else if (phone !== '') {
            $(phoneInput).addClass('success');
        }
        
        // Native JavaScript - validacija PORUKA
        const messageInput = document.getElementById('message');
        const message = messageInput.value.trim();
        
        if (message === '') {
            showError(messageInput, 'Poruka je obavezno polje');
            isValid = false;
        } else if (message.length < 10) {
            showError(messageInput, 'Poruka mora imati najmanje 10 karaktera');
            isValid = false;
        } else {
            $(messageInput).addClass('success');
        }
        
        // Ako je validno - pošalji
        if (isValid) {
            submitForm(name, email, phone, message);
        }
    });
    
    // Native JavaScript - funkcija za prikaz greške
    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = input.parentElement.querySelector('.error-message');
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }
    
    // Kombinovano - slanje forme
    function submitForm(name, email, phone, message) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Šalje se...';
        
        // Simulacija slanja
        setTimeout(() => {
            // jQuery - dinamički kreiraj success poruku
            const $success = $(`
                <div class="success-message">
                    <strong>✓ Uspešno poslato!</strong><br>
                    Hvala ${name}, vaša poruka je primljena. Kontaktiraćemo vas uskoro na ${email}.
                </div>
            `);
            
            // jQuery - dodaj poruku sa animacijom
            $(form).parent().append($success);
            $success.hide().fadeIn(300);
            
            // Native JavaScript - console log
            console.log('=== PODACI FORME ===');
            console.log('Ime:', name);
            console.log('Email:', email);
            console.log('Telefon:', phone || 'Nije unet');
            console.log('Poruka:', message);
            console.log('====================');
            
            // Native JavaScript - resetuj formu
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // jQuery - ukloni poruku nakon 7 sekundi
            setTimeout(() => {
                $success.fadeOut(300, function() {
                    $(this).remove();
                });
            }, 7000);
            
        }, 1500);
    }
}