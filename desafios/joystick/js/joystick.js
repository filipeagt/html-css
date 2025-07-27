class Joystick {
    constructor(stickElement, maxDistance) {
        this.stick = stickElement;
        this.base = stickElement.parentElement;
        this.maxDistance = maxDistance;
        this.active = false;
        this.touchId = null;
        this.value = { x: 0, y: 0, angle: 0, distance: 0 };
        this.center = { x: 0, y: 0 };
        this.reset();
        this.recalculateCenter();
        window.addEventListener('resize', this.recalculateCenter.bind(this));
    }

    recalculateCenter() {
        const rect = this.base.getBoundingClientRect();
        this.center.x = rect.left + rect.width / 2;
        this.center.y = rect.top + rect.height / 2;
    }

    activate(touchId, touchX, touchY) {
        this.active = true;
        this.touchId = touchId;
        this.update(touchX, touchY);
    }
    
    update(touchX, touchY) {
        if (!this.active) return;
        
        let deltaX = touchX - this.center.x;
        let deltaY = touchY - this.center.y;
        
        const distance = Math.hypot(deltaX, deltaY);
        const angle = Math.atan2(deltaY, deltaX);
        
        let stickX = deltaX;
        let stickY = deltaY;

        if (distance > this.maxDistance) {
            stickX = Math.cos(angle) * this.maxDistance;
            stickY = Math.sin(angle) * this.maxDistance;
        }

        this.stick.style.transform = `translate(${stickX}px, ${stickY}px)`;

        this.value = {
            x: stickX / this.maxDistance,
            y: stickY / this.maxDistance,
            angle: angle * (180 / Math.PI), // convert to degrees
            distance: distance / this.maxDistance
        };
    }

    reset() {
        this.active = false;
        this.touchId = null;
        this.stick.style.transform = `translate(0px, 0px)`;
        this.value = { x: 0, y: 0, angle: 0, distance: 0 };
    }
}

