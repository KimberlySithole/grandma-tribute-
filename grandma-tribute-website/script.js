// Grandma Tribute Website - Interactive Features and Animations

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    createFloatingHearts();
    setupSmoothScrolling();
    setupMemorySharing();
    setupCounterAnimations();
    setupScrollAnimations();
    setupNavbarEffects();
    setupInteractiveElements();
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 6000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 800);
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function for buttons
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Memory sharing functionality
function setupMemorySharing() {
    const memoryForm = document.getElementById('memoryForm');
    const sharedMemoriesContainer = document.getElementById('sharedMemories');
    
    // Load existing memories from localStorage
    loadSharedMemories();
    
    memoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memoryText = document.getElementById('memoryText').value.trim();
        
        if (memoryText) {
            addSharedMemory(memoryText);
            document.getElementById('memoryText').value = '';
            
            // Show success animation
            showMemorySuccess();
        }
    });
}

function addSharedMemory(memoryText) {
    const sharedMemoriesContainer = document.getElementById('sharedMemories');
    const memoryElement = document.createElement('div');
    memoryElement.className = 'shared-memory';
    
    const timestamp = new Date().toLocaleDateString();
    memoryElement.innerHTML = `
        <div class="memory-content">
            <p>"${memoryText}"</p>
            <small class="memory-timestamp">Shared on ${timestamp}</small>
        </div>
    `;
    
    sharedMemoriesContainer.insertBefore(memoryElement, sharedMemoriesContainer.firstChild);
    
    // Save to localStorage
    saveMemoryToStorage(memoryText, timestamp);
    
    // Add animation
    memoryElement.style.opacity = '0';
    memoryElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        memoryElement.style.transition = 'all 0.5s ease';
        memoryElement.style.opacity = '1';
        memoryElement.style.transform = 'translateY(0)';
    }, 100);
}

function saveMemoryToStorage(memoryText, timestamp) {
    let memories = JSON.parse(localStorage.getItem('grandmaMemories') || '[]');
    memories.unshift({ text: memoryText, timestamp: timestamp });
    
    // Keep only last 20 memories
    if (memories.length > 20) {
        memories = memories.slice(0, 20);
    }
    
    localStorage.setItem('grandmaMemories', JSON.stringify(memories));
}

function loadSharedMemories() {
    const memories = JSON.parse(localStorage.getItem('grandmaMemories') || '[]');
    const sharedMemoriesContainer = document.getElementById('sharedMemories');
    
    memories.forEach(memory => {
        const memoryElement = document.createElement('div');
        memoryElement.className = 'shared-memory';
        memoryElement.innerHTML = `
            <div class="memory-content">
                <p>"${memory.text}"</p>
                <small class="memory-timestamp">Shared on ${memory.timestamp}</small>
            </div>
        `;
        sharedMemoriesContainer.appendChild(memoryElement);
    });
}

function showMemorySuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.5rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
        animation: fadeInOut 2s ease;
    `;
    successMessage.textContent = 'Memory shared with love ❤️';
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 2000);
}

// Counter animations for tribute stats
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.memory-card, .comfort-card, .tribute-quote');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Navbar effects
function setupNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Interactive elements
function setupInteractiveElements() {
    // Add hover effects to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to comfort cards
    const comfortCards = document.querySelectorAll('.comfort-card');
    comfortCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Virtual hug functionality
function sendVirtualHug() {
    const hugMessage = document.getElementById('hugMessage');
    const messages = [
        "Grandma felt your hug! ❤️",
        "She's smiling down at you! ✨",
        "Your love reaches her heart! 💕",
        "She's wrapping you in her arms! 🤗",
        "Grandma sends her love back! 💖"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    hugMessage.textContent = randomMessage;
    hugMessage.classList.add('show');
    
    // Create floating hearts around the button
    createHugHearts();
    
    setTimeout(() => {
        hugMessage.classList.remove('show');
    }, 3000);
}

function createHugHearts() {
    const hugButton = document.querySelector('.hug-button');
    const rect = hugButton.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                color: #ff69b4;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                animation: hugHeartFloat 2s ease-out forwards;
            `;
            heart.textContent = '❤️';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

// Memory jar functionality
let memoryJarCount = 0;
const jarMemories = [
    "Her warm hugs",
    "Bedtime stories",
    "Delicious cookies",
    "Wise advice",
    "Gentle laughter",
    "Sunday dinners",
    "Her beautiful smile",
    "Unconditional love",
    "Family traditions",
    "Her caring heart"
];

function addMemoryToJar() {
    const jarMemoriesElement = document.getElementById('jarMemories');
    const jarCount = document.querySelector('.jar');
    
    if (memoryJarCount < jarMemories.length) {
        const memory = jarMemories[memoryJarCount];
        memoryJarCount++;
        
        // Update jar fill
        const fillPercentage = (memoryJarCount / jarMemories.length) * 100;
        jarMemoriesElement.style.height = fillPercentage + '%';
        
        // Show memory text
        showJarMemory(memory);
        
        // Add sparkle effect
        createJarSparkles();
    } else {
        showJarMemory("Jar is full of beautiful memories! 💕");
    }
}

function showJarMemory(memory) {
    const jarContainer = document.querySelector('.jar-container');
    
    const memoryText = document.createElement('div');
    memoryText.style.cssText = `
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
        white-space: nowrap;
        z-index: 1000;
        animation: jarMemoryFloat 3s ease-out forwards;
        box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
    `;
    memoryText.textContent = memory;
    
    jarContainer.style.position = 'relative';
    jarContainer.appendChild(memoryText);
    
    setTimeout(() => {
        if (memoryText.parentNode) {
            memoryText.parentNode.removeChild(memoryText);
        }
    }, 3000);
}

function createJarSparkles() {
    const jar = document.querySelector('.jar');
    const rect = jar.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                color: #ffd700;
                font-size: 16px;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleFloat 1.5s ease-out forwards;
            `;
            sparkle.textContent = '✨';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }, i * 100);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes hugHeartFloat {
        0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translate(${Math.random() * 200 - 100}px, -100px) scale(0.5); 
        }
    }
    
    @keyframes jarMemoryFloat {
        0% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(-50px) scale(0.8); 
        }
    }
    
    @keyframes sparkleFloat {
        0% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0.5) rotate(180deg); 
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        const openElements = document.querySelectorAll('.show');
        openElements.forEach(element => {
            element.classList.remove('show');
        });
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console message for developers
console.log(`
❤️ Grandma Tribute Website ❤️
Created with love and care
May her memory live on forever
`);




