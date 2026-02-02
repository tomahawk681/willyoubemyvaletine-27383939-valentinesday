// --- 1. ELEMENTS ---
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const proceedBtn = document.getElementById('proceedToMenuBtn');
const buttonContainer = document.getElementById('buttonContainer');

const proposalSection = document.getElementById('proposalSection');
const messageSection = document.getElementById('messageSection');
const menuSection = document.getElementById('menuSection');
const detailsForm = document.getElementById('detailsForm');

// --- 2. FLOATING HEARTS BACKGROUND ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5 seconds
    document.body.appendChild(heart);
    
    // Remove heart after it floats away to keep the page fast
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 300); // Create a new heart every 0.3 seconds

// --- 3. THE "NO" BUTTON PRANK ---
noBtn.addEventListener('mouseover', () => {
    // Swap the order of the buttons in the flex container
    const currentDirection = buttonContainer.style.flexDirection;
    buttonContainer.style.flexDirection = currentDirection === 'row-reverse' ? 'row' : 'row-reverse';
});

noBtn.addEventListener('click', () => {
    // If they manage to click it, make it "fall off" the screen
    noBtn.style.transform = 'translateY(600px) rotate(110deg)';
    noBtn.style.opacity = '0';
    noBtn.style.pointerEvents = 'none';
});

// --- 4. NAVIGATION FLOW ---

// Screen 1 (Yes) -> Screen 2 (Message)
yesBtn.addEventListener('click', () => {
    proposalSection.classList.add('hidden');
    messageSection.classList.remove('hidden');
    
    // Optional: Trigger a celebration burst
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
});

// Screen 2 (Proceed) -> Screen 3 (Menu)
proceedBtn.addEventListener('click', () => {
    messageSection.classList.add('hidden');
    menuSection.classList.remove('hidden');
});

// --- 5. FORM SUBMISSION (FORMSPREE) ---
detailsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = detailsForm.querySelector('button');
    submitBtn.innerText = "Sending...";

    // Replace 'YOUR_ID_HERE' with your actual Formspree ID
    const response = await fetch("https://formspree.io/f/xnjzvvqb", {
        method: "POST",
        body: new FormData(detailsForm),
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        menuSection.innerHTML = "<h1>Can't wait! See you then! 🥰</h1>";
    } else {
        alert("Oops! Something went wrong. Try again?");
        submitBtn.innerText = "Lock it in! 💌";
    }
});