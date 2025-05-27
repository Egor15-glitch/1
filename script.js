document.addEventListener("DOMContentLoaded", () => {
    const extras = document.querySelectorAll(".char.extra");
    const loading = document.querySelectorAll(".char.loading");
    const soup = document.querySelector(".soup");
    const width = soup.offsetWidth;
    const height = soup.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const soupRadius = width / 2 - 12;
    const deadZoneRadius = 80;
    const sideBuffer = 40;

    extras.forEach((letter) => {
        let x, y;
        while (true) {
            const angle = Math.random() * Math.PI * 2;
            const distance =
                Math.random() * (soupRadius - deadZoneRadius - 8) +
                (deadZoneRadius + 8);
            x = centerX + Math.cos(angle) * distance;
            y = centerY + Math.sin(angle) * distance;
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (
                dist - 8 >= deadZoneRadius &&
                dist + 8 <= soupRadius &&
                Math.abs(dx) < soupRadius - sideBuffer
            )
                break;
        }
        letter.style.left = `${x}px`;
        letter.style.top = `${y}px`;

        const floatX = Math.random() * 16 - 8;
        const floatY = Math.random() * 16 - 8;
        const rotate = Math.random() * 360 - 180;
        const duration = 8000 + Math.random() * 4000;
        const delay = Math.random() * 2000;

        letter.animate(
            [
                { transform: "translate(0, 0) rotate(0deg)" },
                {
                    transform: `translate(${floatX}px, ${floatY}px) rotate(${rotate}deg)`
                },
                { transform: "translate(0, 0) rotate(0deg)" }
            ],
            { duration, iterations: Infinity, easing: "ease-in-out", delay }
        );
    });

    loading.forEach((letter) => {
        const floatX = Math.random() * 6 - 3;
        const floatY = Math.random() * 6 - 3;
        const rotate = Math.random() * 10 - 5;
        const duration = 5000 + Math.random() * 1500;
        const delay = Math.random() * 500;

        letter.animate(
            [
                { transform: "translate(0, 0) rotate(0deg)" },
                {
                    transform: `translate(${floatX}px, ${floatY}px) rotate(${rotate}deg)`
                },
                { transform: "translate(0, 0) rotate(0deg)" }
            ],
            { duration, iterations: Infinity, easing: "ease-in-out", delay }
        );
    });

    function createBubble(x, y) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = x + "px";
        bubble.style.top = y + "px";
        soup.appendChild(bubble);
        setTimeout(() => bubble.remove(), 1500);
    }

    setTimeout(() => {
        const fadeOut = document.querySelectorAll(".fade-away");
        const loadingContainer = document.querySelector(".loading-container");
        const soupRect = soup.getBoundingClientRect();

        fadeOut.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add("sink");

                const letterRect = letter.getBoundingClientRect();
                const relativeX =
                    letterRect.left - soupRect.left + letterRect.width / 2;
                const relativeY = letterRect.top - soupRect.top + letterRect.height / 2;

                setTimeout(() => createBubble(relativeX - 4, relativeY), 500);
                setTimeout(() => createBubble(relativeX + 2, relativeY - 8), 800);
                setTimeout(() => createBubble(relativeX - 2, relativeY + 5), 1100);
            }, index * 300);
        });

        setTimeout(() => {
            const iLetter = document.querySelector('[data-letter="I"]');
            const nLetter = document.querySelector('[data-letter="N"]');

            if (iLetter) {
                const newE = document.createElement("span");
                newE.className = "char loading new-letter";
                newE.textContent = "E";
                newE.style.margin = "0 3px";

                const iRect = iLetter.getBoundingClientRect();
                const containerRect = loadingContainer.getBoundingClientRect();
                newE.style.left = iRect.left - containerRect.left + "px";
                newE.style.top = iRect.top - containerRect.top + "px";

                loadingContainer.appendChild(newE);

                const eRect = newE.getBoundingClientRect();
                const eSoupX = eRect.left - soupRect.left + eRect.width / 2;
                const eSoupY = eRect.top - soupRect.top + eRect.height / 2;
                createBubble(eSoupX - 4, eSoupY);
                createBubble(eSoupX + 2, eSoupY - 5);

                setTimeout(() => {
                    newE.classList.add("surface");
                    setTimeout(() => {
                        const eFloatX = Math.random() * 8 - 4;
                        const eFloatY = Math.random() * 8 - 4;
                        const eRotate = Math.random() * 20 - 10;
                        const eDuration = 6000 + Math.random() * 2000;
                        const eDelay = Math.random() * 500;

                        newE.animate(
                            [
                                { transform: "translate(0, 0) rotate(0deg)" },
                                {
                                    transform: `translate(${eFloatX}px, ${eFloatY}px) rotate(${eRotate}deg)`
                                },
                                { transform: "translate(0, 0) rotate(0deg)" }
                            ],
                            {
                                duration: eDuration,
                                iterations: Infinity,
                                easing: "ease-in-out",
                                delay: eDelay
                            }
                        );
                    }, 2500);
                }, 100);
            }

            if (nLetter) {
                const newD = document.createElement("span");
                newD.className = "char loading new-letter";
                newD.textContent = "D";
                newD.style.margin = "0 6px";

                const nRect = nLetter.getBoundingClientRect();
                const containerRect = loadingContainer.getBoundingClientRect();
                newD.style.left = nRect.left - containerRect.left + 8 + "px";
                newD.style.top = nRect.top - containerRect.top + "px";

                loadingContainer.appendChild(newD);

                const dRect = newD.getBoundingClientRect();
                const dSoupX = dRect.left - soupRect.left + dRect.width / 2;
                const dSoupY = dRect.top - soupRect.top + dRect.height / 2;
                createBubble(dSoupX - 3, dSoupY);
                createBubble(dSoupX + 1, dSoupY - 6);

                setTimeout(() => {
                    newD.classList.add("surface");
                    setTimeout(() => {
                        const dFloatX = Math.random() * 8 - 4;
                        const dFloatY = Math.random() * 8 - 4;
                        const dRotate = Math.random() * 15 - 7.5;
                        const dDuration = 6500 + Math.random() * 2000;
                        const dDelay = Math.random() * 700;

                        newD.animate(
                            [
                                { transform: "translate(0, 0) rotate(0deg)" },
                                {
                                    transform: `translate(${dFloatX}px, ${dFloatY}px) rotate(${dRotate}deg)`
                                },
                                { transform: "translate(0, 0) rotate(0deg)" }
                            ],
                            {
                                duration: dDuration,
                                iterations: Infinity,
                                easing: "ease-in-out",
                                delay: dDelay
                            }
                        );
                    }, 2500);
                }, 400);
            }

            setTimeout(() => {
                loadingContainer.style.transform = "translate(-50%, -50%)";
            }, 3000);
        }, 1500);
    }, 4000);

    const canvas = document.querySelector(".soup-wave");
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    let t = 0;

    function drawWave() {
        ctx.clearRect(0, 0, size, size);
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${0.03 + i * 0.01})`;
            const offset = i * 40;
            for (let x = 0; x < size; x++) {
                const wave =
                    Math.sin((x + t + offset) * 0.025) * 9 +
                    Math.cos((x + t + offset) * 0.06) * 5;
                const y = size / 2 + wave;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.lineTo(size, size);
            ctx.lineTo(0, size);
            ctx.closePath();
            ctx.fill();
        }
        t -= 0.3;
        requestAnimationFrame(drawWave);
    }
    drawWave();
});
