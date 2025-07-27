document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.button, .shoulder, .start, .select');
    const screenContent = document.querySelector('.screen-content');
    //Joystick
    const leftStickElement = document.getElementById('joystick-left').querySelector('.joystick-stick');
    const rightStickElement = document.getElementById('joystick-right').querySelector('.joystick-stick');

    const joystickLeft = new Joystick(leftStickElement, 75 / 2); // max distance is radius of base
    const joystickRight = new Joystick(rightStickElement, 75 / 2);

    function handleTouch(e) {
        e.preventDefault();
        const touches = e.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const touchId = touch.identifier;

            // Assign touch to joystick on touchstart
            if (e.type === 'touchstart') {
                const touchX = touch.clientX;
                const touchY = touch.clientY;

                // Check for left joystick
                const distLeft = Math.hypot(touchX - joystickLeft.center.x, touchY - joystickLeft.center.y);
                if (distLeft <= (joystickLeft.base.offsetWidth / 2) && !joystickLeft.active) {
                    joystickLeft.activate(touchId, touchX, touchY);
                }
                // Check for right joystick
                else if (distLeft > (joystickLeft.base.offsetWidth / 2)) { // Ensure not in left joystick zone
                    const distRight = Math.hypot(touchX - joystickRight.center.x, touchY - joystickRight.center.y);
                    if (distRight <= (joystickRight.base.offsetWidth / 2) && !joystickRight.active) {
                        joystickRight.activate(touchId, touchX, touchY);
                    }
                }
            }
            // Update joystick on touchmove
            else if (e.type === 'touchmove') {
                if (touchId === joystickLeft.touchId) {
                    joystickLeft.update(touch.clientX, touch.clientY);
                    updateScreen(leftStickElement);
                } else if (touchId === joystickRight.touchId) {
                    joystickRight.update(touch.clientX, touch.clientY);
                    updateScreen(rightStickElement);
                }
            }
            // Reset joystick on touchend/touchcancel
            else if (e.type === 'touchend' || e.type === 'touchcancel') {
                if (touchId === joystickLeft.touchId) {
                    joystickLeft.reset();
                } else if (touchId === joystickRight.touchId) {
                    joystickRight.reset();
                }
            }
        }
    }

    const container = document.getElementById('controller');
    container.addEventListener('touchstart', handleTouch, { passive: false });
    container.addEventListener('touchmove', handleTouch, { passive: false });
    container.addEventListener('touchend', handleTouch, { passive: false });
    container.addEventListener('touchcancel', handleTouch, { passive: false });

    // For mouse support on desktop for testing
    let mouseActive = false;
    document.addEventListener('mousedown', (e) => {
        mouseActive = true;
        handleTouch({ type: 'touchstart', changedTouches: [{ identifier: 'mouse', clientX: e.clientX, clientY: e.clientY }], preventDefault: () => { } });
    });
    document.addEventListener('mousemove', (e) => {
        if (mouseActive) {
            handleTouch({ type: 'touchmove', changedTouches: [{ identifier: 'mouse', clientX: e.clientX, clientY: e.clientY }], preventDefault: () => { } });
        }
    });
    document.addEventListener('mouseup', (e) => {
        mouseActive = false;
        handleTouch({ type: 'touchend', changedTouches: [{ identifier: 'mouse', clientX: e.clientX, clientY: e.clientY }], preventDefault: () => { } });
    });
    // Botões
    buttons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            button.style.transform = 'scale(0.9)';
            button.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.5)';
            updateScreen(button);
        });

        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        });

        button.addEventListener('touchcancel', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        });
    });

    function updateScreen(button) {
        let text = 'Button pressed: ';
        if (button.classList.contains('up')) text += 'Up';
        else if (button.classList.contains('down')) text += 'Down';
        else if (button.classList.contains('left')) text += 'Left';
        else if (button.classList.contains('right')) text += 'Right';
        else if (button.classList.contains('y')) text += 'Y';
        else if (button.classList.contains('b')) text += 'B';
        else if (button.classList.contains('x')) text += 'X';
        else if (button.classList.contains('a')) text += 'A';
        else if (button.classList.contains('l1')) text += 'L1';
        else if (button.classList.contains('r1')) text += 'R1';
        else if (button.classList.contains('l2')) text += 'L2';
        else if (button.classList.contains('r2')) text += 'R2';
        else if (button.classList.contains('start')) text += 'Start';
        else if (button.classList.contains('select')) text += 'Select';
        else if (button.classList.contains('joystick-stick')) {
            text = `Left Joystick: X=${joystickLeft.value.x.toFixed(2)}, Y=${joystickLeft.value.y.toFixed(2)}<br>`;
            text += `Right Joystick: X=${joystickRight.value.x.toFixed(2)}, Y=${joystickRight.value.y.toFixed(2)}`;
        } 
        screenContent.innerHTML = text;
    }

    // Keyboard controls (unchanged)
    document.addEventListener('keydown', (e) => {
        let button;
        switch (e.key) {
            case 'ArrowUp': button = document.querySelector('.d-pad .up'); break;
            case 'ArrowDown': button = document.querySelector('.d-pad .down'); break;
            case 'ArrowLeft': button = document.querySelector('.d-pad .left'); break;
            case 'ArrowRight': button = document.querySelector('.d-pad .right'); break;
            case 'i': case 'I': button = document.querySelector('.action-buttons .y'); break;
            case 'j': case 'J': button = document.querySelector('.action-buttons .x'); break;
            case 'k': case 'K': button = document.querySelector('.action-buttons .a'); break;
            case 'l': case 'L': button = document.querySelector('.action-buttons .b'); break;
            case 'Enter': button = document.querySelector('.start'); break;
            case 'Shift': button = document.querySelector('.select'); break;
            case 'q': case 'Q': button = document.querySelector('.l-shoulder'); break;
            case 'w': case 'W': button = document.querySelector('.r-shoulder'); break;
        }
        if (button) {
            button.style.transform = 'scale(0.9)';
            button.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.5)';
            updateScreen(button);
        }
    });

    document.addEventListener('keyup', (e) => {
        let button;
        switch (e.key) {
            case 'ArrowUp': button = document.querySelector('.d-pad .up'); break;
            case 'ArrowDown': button = document.querySelector('.d-pad .down'); break;
            case 'ArrowLeft': button = document.querySelector('.d-pad .left'); break;
            case 'ArrowRight': button = document.querySelector('.d-pad .right'); break;
            case 'i': case 'I': button = document.querySelector('.action-buttons .y'); break;
            case 'j': case 'J': button = document.querySelector('.action-buttons .x'); break;
            case 'k': case 'K': button = document.querySelector('.action-buttons .a'); break;
            case 'l': case 'L': button = document.querySelector('.action-buttons .b'); break;
            case 'Enter': button = document.querySelector('.start'); break;
            case 'Shift': button = document.querySelector('.select'); break;
            case 'q': case 'Q': button = document.querySelector('.l-shoulder'); break;
            case 'w': case 'W': button = document.querySelector('.r-shoulder'); break;
        }
        if (button) {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        }
    });
});