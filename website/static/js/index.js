document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // =========== LOCK SCREEN LOGIC ===========
    // ===================================

    
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');
    const codeDisplay = document.getElementById('code-display');
    const unlockBtn = document.getElementById('unlock-btn');
    const keypadBtns = document.querySelectorAll('.keypad-btn');
    
    let currentInput = "";

    function handleKeyPress(key) {
        // Only allow input if it's less than 8 digits
        if (currentInput.length < 8) {
            currentInput += key;
            updateDisplay();
        }
    }

    function handleBackspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function handleClear() {
        currentInput = "";
        updateDisplay();
    }

    function updateDisplay() {
        codeDisplay.textContent = '•'.repeat(currentInput.length);
        
        // Enable or disable the unlock button based on length
        if (currentInput.length === 8) {
            unlockBtn.disabled = false;
        } else {
            unlockBtn.disabled = true;
        }
    }

    function checkPassword() {
        if (currentInput === CORRECT_PASSWORD) {
            // Success! Fade out lock screen and show main content.
            lockScreen.classList.add('fade-out');
            
            setTimeout(() => {
                lockScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                initializeHomepageScripts(); 
            }, 500);

        } else {
            // Failure. Shake the display and clear it.
            codeDisplay.classList.add('shake');
            setTimeout(() => {
                codeDisplay.classList.remove('shake');
                handleClear();
            }, 500);
        }
    }

    if (lockScreen) {
        keypadBtns.forEach(btn => {
            if (btn.id === 'keypad-clear') {
                btn.addEventListener('click', handleClear);
            } else if (btn.id === 'keypad-backspace') {
                btn.addEventListener('click', handleBackspace);
            } else {
                btn.addEventListener('click', () => handleKeyPress(btn.textContent));
            }
        });

        unlockBtn.addEventListener('click', checkPassword);
    } else {
        initializeHomepageScripts();
    }

    // =======================================
    // ========= HOMEPAGE SCRIPT LOGIC =========
    // =======================================
    function initializeHomepageScripts() {
        const loveCounter = document.getElementById('love-counter');
        const startDate = new Date(2025, 5, 28); // June 28, 2023

        function updateCounter() {
            if (!loveCounter) return;
            const now = new Date();
            const diff = now - startDate;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            loveCounter.innerHTML = `<i class="ri-heart-pulse-fill mr-1"></i> ${days}d ${hours}h ${minutes}m ${seconds}s of Love`;
        }
        
        if (loveCounter) {
            setInterval(updateCounter, 1000);
            updateCounter();
        }

        const accordionItems = document.querySelectorAll('.accordion-item h4');
        accordionItems.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.accordion-icon');
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.textContent = '+';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '-';
                }
            });
        });

        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuButton && mobileMenu) {
            const menuIcon = menuButton.querySelector('i');
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                menuIcon.classList.toggle('ri-menu-line');
                menuIcon.classList.toggle('ri-close-line');
            });
        }

        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                backToTopButton.classList.toggle('active', window.scrollY > 300);
            });
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
});