// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Download Button Functionality
const downloadBtn = document.getElementById('download-btn');
const videoUrlInput = document.getElementById('video-url');

downloadBtn.addEventListener('click', () => {
    const videoUrl = videoUrlInput.value.trim();
    
    if (!videoUrl) {
        showNotification('कृपया TikTok video URL पेस्ट करें', 'error');
        return;
    }
    
    if (!isValidTikTokUrl(videoUrl)) {
        showNotification('कृपया सही TikTok URL डालें', 'error');
        return;
    }
    
    // Simulate processing
    showNotification('वीडियो प्रोसेस हो रहा है...', 'info');
    
    // Simulate download after processing
    setTimeout(() => {
        showNotification('वीडियो डाउनलोड के लिए तैयार है!', 'success');
        // In a real implementation, this would trigger the actual download
        simulateDownload();
    }, 2000);
});

// Quick Options
const optionBtns = document.querySelectorAll('.option-btn');

optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        handleOptionClick(type);
    });
});

function handleOptionClick(type) {
    switch(type) {
        case 'mp4':
            showNotification('MP4 डाउनलोड सिलेक्ट किया गया', 'info');
            break;
        case 'mp3':
            showNotification('MP3 डाउनलोड सिलेक्ट किया गया', 'info');
            break;
        case 'bulk':
            showNotification('बल्क डाउनलोड सिलेक्ट किया गया', 'info');
            // Show bulk download modal
            showBulkDownloadModal();
            break;
        case 'profile':
            showNotification('प्रोफाइल डाउनलोड सिलेक्ट किया गया', 'info');
            // Show profile download modal
            showProfileDownloadModal();
            break;
        case 'ringtone':
            showNotification('रिंगटोन मेकर सिलेक्ट किया गया', 'info');
            // Show ringtone maker modal
            showRingtoneMakerModal();
            break;
    }
}

// Utility Functions
function isValidTikTokUrl(url) {
    const tiktokRegex = /https?:\/\/(www\.)?tiktok\.com\/.+/;
    return tiktokRegex.test(url);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    if (type === 'error') {
        notification.style.backgroundColor = '#ff4757';
    } else if (type === 'success') {
        notification.style.backgroundColor = '#2ed573';
    } else {
        notification.style.backgroundColor = '#3742fa';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function simulateDownload() {
    // In a real implementation, this would be the actual download logic
    // For demo purposes, we'll just show a success message
    console.log('Download simulation complete');
}

// Modal Functions
function showBulkDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>बल्क डाउनलोड</h3>
            <p>एक साथ 5-10 TikTok वीडियो डाउनलोड करें</p>
            <textarea placeholder="TikTok URLs (एक लाइन में एक URL)"></textarea>
            <button class="btn-primary">डाउनलोड करें</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: var(--surface-color);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
    `;
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const textarea = modal.querySelector('textarea');
    textarea.style.cssText = `
        width: 100%;
        height: 150px;
        padding: 1rem;
        margin: 1rem 0;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--background-color);
        color: var(--text-primary);
        resize: vertical;
    `;
    
    // Close modal events
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showProfileDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>प्रोफाइल डाउनलोड</h3>
            <p>TikTok username डालें और सारे वीडियोज़ डाउनलोड करें</p>
            <input type="text" placeholder="@username">
            <button class="btn-primary">डाउनलोड करें</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Apply same styling as bulk download modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: var(--surface-color);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
    `;
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const input = modal.querySelector('input');
    input.style.cssText = `
        width: 100%;
        padding: 1rem;
        margin: 1rem 0;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--background-color);
        color: var(--text-primary);
    `;
    
    // Close modal events
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showRingtoneMakerModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>रिंगटोन मेकर</h3>
            <p>MP3 को 30 सेकंड कट करें (रिंगटोन के लिए)</p>
            <input type="text" placeholder="TikTok video URL">
            <div class="ringtone-controls">
                <label>शुरुआत: <span id="start-time">0s</span></label>
                <input type="range" id="start-slider" min="0" max="30" value="0">
                <label>अंत: <span id="end-time">30s</span></label>
                <input type="range" id="end-slider" min="0" max="30" value="30">
            </div>
            <button class="btn-primary">रिंगटोन बनाएं</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Apply same styling as other modals
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: var(--surface-color);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
    `;
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const input = modal.querySelector('input[type="text"]');
    input.style.cssText = `
        width: 100%;
        padding: 1rem;
        margin: 1rem 0;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--background-color);
        color: var(--text-primary);
    `;
    
    // Slider functionality
    const startSlider = modal.querySelector('#start-slider');
    const endSlider = modal.querySelector('#end-slider');
    const startTime = modal.querySelector('#start-time');
    const endTime = modal.querySelector('#end-time');
    
    startSlider.addEventListener('input', () => {
        startTime.textContent = `${startSlider.value}s`;
        if (parseInt(startSlider.value) >= parseInt(endSlider.value)) {
            endSlider.value = parseInt(startSlider.value) + 1;
            endTime.textContent = `${endSlider.value}s`;
        }
    });
    
    endSlider.addEventListener('input', () => {
        endTime.textContent = `${endSlider.value}s`;
        if (parseInt(endSlider.value) <= parseInt(startSlider.value)) {
            startSlider.value = parseInt(endSlider.value) - 1;
            startTime.textContent = `${startSlider.value}s`;
        }
    });
    
    // Close modal events
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
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
