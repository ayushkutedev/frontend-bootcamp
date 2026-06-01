// ============================================================
// FORM VALIDATION & localStorage
// ============================================================

const form = document.getElementById('preorderForm');
const successMessage = document.getElementById('successMessage');

// Form field IDs
const fieldIds = ['fullname', 'email', 'phone', 'color'];
const STORAGE_KEY = 'iphone17_preorder';

// ============================================================
// INITIALIZE - Load saved data on page load
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
});

// ============================================================
// LOAD DATA FROM localStorage
// ============================================================

function loadFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Fill form with saved data
            document.getElementById('fullname').value = data.fullname || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('color').value = data.color || '';
            
            console.log('✅ Data loaded from storage');
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}

// ============================================================
// SAVE DATA TO localStorage
// ============================================================

function saveFormData() {
    const data = {
        fullname: document.getElementById('fullname').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        color: document.getElementById('color').value,
        savedTime: new Date().toLocaleString()
    };
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('✅ Data saved to storage:', data);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// ============================================================
// FORM VALIDATION
// ============================================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[^\d]/g, ''));
}

function validateForm() {
    let isValid = true;
    
    // Validate Full Name
    const fullname = document.getElementById('fullname').value.trim();
    const nameError = document.getElementById('nameError');
    if (fullname.length < 2) {
        document.getElementById('fullname').parentElement.classList.add('error');
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    } else {
        document.getElementById('fullname').parentElement.classList.remove('error');
        nameError.textContent = '';
    }
    
    // Validate Email
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    if (!validateEmail(email)) {
        document.getElementById('email').parentElement.classList.add('error');
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('email').parentElement.classList.remove('error');
        emailError.textContent = '';
    }
    
    // Validate Phone
    const phone = document.getElementById('phone').value.trim();
    const phoneError = document.getElementById('phoneError');
    if (!validatePhone(phone)) {
        document.getElementById('phone').parentElement.classList.add('error');
        phoneError.textContent = 'Phone must be 10 digits';
        isValid = false;
    } else {
        document.getElementById('phone').parentElement.classList.remove('error');
        phoneError.textContent = '';
    }
    
    // Validate Color
    const color = document.getElementById('color').value;
    const colorError = document.getElementById('colorError');
    if (!color) {
        document.getElementById('color').parentElement.classList.add('error');
        colorError.textContent = 'Please select a color';
        isValid = false;
    } else {
        document.getElementById('color').parentElement.classList.remove('error');
        colorError.textContent = '';
    }
    
    return isValid;
}

// ============================================================
// FORM SUBMISSION
// ============================================================

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        console.log('❌ Form validation failed');
        return;
    }
    
    // Save to localStorage
    saveFormData();
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Log submission data
    const data = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        color: document.getElementById('color').value,
        submittedAt: new Date().toLocaleString()
    };
    
    console.log('✅ Pre-order submitted:', data);
    
    // Simulate API call
    console.log('📤 Sending to server...');
    
    // Reset form after 2 seconds
    setTimeout(() => {
        form.reset();
        successMessage.style.display = 'none';
        console.log('✅ Form reset');
    }, 3000);
});

// ============================================================
// REAL-TIME AUTO-SAVE
// ============================================================

fieldIds.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    
    field.addEventListener('blur', function() {
        saveFormData();
        console.log(`💾 Auto-saved: ${fieldId}`);
    });
});

// ============================================================
// SCROLL TO SECTION
// ============================================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================================
// CLEAR ALL DATA (Optional)
// ============================================================

function clearAllData() {
    if (confirm('Are you sure you want to clear all saved data?')) {
        localStorage.removeItem(STORAGE_KEY);
        form.reset();
        console.log('🗑️ All data cleared');
    }
}

// ============================================================
// LOG STORAGE STATUS ON LOAD
// ============================================================

window.addEventListener('load', function() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        console.log('📦 Saved Data in Storage:', JSON.parse(savedData));
    } else {
        console.log('📦 No saved data found');
    }
});

// ============================================================
// KEYBOARD SHORTCUTS (Optional)
// ============================================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveFormData();
        alert('Form data saved!');
    }
});