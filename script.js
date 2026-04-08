// --- Matrix Hashing Background Effect ---
const canvas = document.createElement('canvas'); // Create canvas element
canvas.id = 'matrix-canvas';
document.body.prepend(canvas); // Add it to the start of the body
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const chars = "0101HASHSECURITYAESRSATLS";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(8, 4, 30, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#b05cff');
  gradient.addColorStop(0.45, '#7f64ff');
  gradient.addColorStop(0.75, '#4f93ff');
  gradient.addColorStop(1, '#2c6cff');

  ctx.fillStyle = gradient;
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(125, 95, 255, 0.8)';
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

// --- Original Encryption effect for name ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nameElement = document.querySelector('.encrypt');
const originalText = "Victoria Asenuga";
let iteration = 0;

function encryptEffect() {
  nameElement.innerText = originalText
    .split("")
    .map((letter, index) => {
      if (index < iteration) {
        return originalText[index];
      }
      return letters[Math.floor(Math.random() * 26)];
    })
    .join("");

  if (iteration >= originalText.length) {
    clearInterval(interval);
  }

  iteration += 1 / 3;
}

const interval = setInterval(encryptEffect, 30);

// --- Header Scroll Logic ---
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Navigation Functions ---
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function closeMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.remove('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// --- Intersection Observers for Animations ---
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach((el) => {
  fadeObserver.observe(el);
});

// Encryption animation for section titles
function animateEncryption(element) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const originalText = element.getAttribute('data-text');
  let iteration = 0;

  const interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        if (letter === " ") return " ";
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= originalText.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
}

const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const encryptTitle = entry.target;
      if (!encryptTitle.classList.contains('encrypted')) {
        encryptTitle.classList.add('encrypted');
        animateEncryption(encryptTitle);
      }
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.encrypt-title').forEach((el) => {
  titleObserver.observe(el);
});

// --- Project Tech Stack Hover Animation ---
document.querySelectorAll('.project-card').forEach(card => {
  const techElement = card.querySelector('.encrypt-tech');
  let hasEncrypted = false;

  card.addEventListener('mouseenter', function () {
    if (!hasEncrypted && techElement) {
      hasEncrypted = true;
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const originalText = techElement.getAttribute('data-tech');
      let iteration = 0;

      const interval = setInterval(() => {
        techElement.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            if (char === " " || char === ",") return char;
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, 30);
    }
  });
});

// --- Terminal Typing Animation ---
const terminalCommand = " cat journey.txt";
const terminalCommandElement = document.getElementById('terminalCommand');
const terminalOutput = document.getElementById('terminalOutput');
const terminalCursor = document.getElementById('terminalCursor');
let commandIndex = 0;

function typeCommand() {
  if (commandIndex < terminalCommand.length) {
    terminalCommandElement.textContent = terminalCommand.substring(0, commandIndex + 1);
    commandIndex++;
    setTimeout(typeCommand, 100);
  } else {
    setTimeout(() => {
      terminalOutput.style.display = 'block';
      terminalCursor.style.display = 'block';
    }, 800);
  }
}

const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && commandIndex === 0) {
      setTimeout(typeCommand, 500);
    }
  });
});

const terminalSection = document.querySelector('.terminal-window');
if (terminalSection) {
  terminalObserver.observe(terminalSection);
}