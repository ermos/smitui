// Elevator

class Elevator {
    isActive = false;
    isLock = false;

    constructor() {
        this.elevator = document.createElement("div");
        this.elevator.id = "elevator";
        document.body.appendChild(this.elevator);

        document.addEventListener("scroll", () => {
            if (this.isLock) {
                return;
            }

            if (!this.isActive && window.scrollY > 400) {
                this.isActive = true;
                this.elevator.classList.add("active");
            } else if (this.isActive && window.scrollY < 400) {
                this.isLock = true;
                this.isActive = false;
                this.elevator.classList.add("leave");
                setTimeout(() => {
                    this.elevator.classList.remove("leave", "active");
                    this.isLock = false;
                }, 300)
            }
        }, true)

        this.elevator.addEventListener("click", () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        })
    }
}

new Elevator()

// Head

class Head {
    head = null;
    curr = "f";

    constructor() {
        this.construct()

        var ctx = this;
        this.defineValues();

        window.onresize = this.defineValues;

        document.addEventListener("mousemove", function(e) {
            if (e.clientY > (ctx.headPosition.top + ctx.head.clientHeight)) {
                if (e.clientX < ctx.firstArea) {
                    ctx.activate("dl");
                } else if (e.clientX > ctx.thirdArea) {
                    ctx.activate("dr");
                } else {
                    ctx.activate("d");
                }
            } else {
                if (e.clientX < ctx.firstArea) {
                    ctx.activate("l");
                } else if (e.clientX > ctx.thirdArea) {
                    ctx.activate("r");
                } else {
                    ctx.activate("f");
                }
            }
        });
    }

    construct() {
        this.head = document.getElementById("head");
        this.headPosition = this.head.getBoundingClientRect();

        for (var i = 0; i < this.head.children.length; i++) {
            const el = this.head.children[i];
            this[el.getAttribute("data-pos")] = el;
        }
    }

    activate(pos) {
        if (pos === this.curr) {
            return;
        }

        this[this.curr].classList.remove("active");
        this[pos].classList.add("active");
        this.curr = pos;
    }

    defineValues() {
        const rect = document.body.getBoundingClientRect();
        const area = rect.width / 3;
        this.firstArea = rect.left + area;
        this.thirdArea = this.firstArea + area;
    }
}

new Head()