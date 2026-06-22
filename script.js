// ========================================
// GET HTML ELEMENTS
// ========================================
var navbar = document.getElementById("navbar");
var navLinks = document.getElementById("navLinks");
var menuBtn = document.getElementById("menuBtn");
var menuIcon = document.getElementById("menuIcon");
var themeBtn = document.getElementById("themeBtn");
var themeIcon = document.getElementById("themeIcon");
var backToTop = document.getElementById("backToTop");
var contactForm = document.getElementById("contactForm");
var typingText = document.getElementById("typingText");
var profileImg = document.getElementById("profileImg");
var profileIcon = document.querySelector(".hero-img-circle .fallback-icon");


// ========================================
// 1. TYPING ANIMATION
// ========================================
var words = ["Frontend Developer", "Web Designer", "Problem Solver"];
var wordIndex = 0;
var charIndex = 0;
var isDeleting = false;

function type() {
    var currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    var speed = 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    } else if (isDeleting) {
        speed = 50;
    }

    setTimeout(type, speed);
}

type();

// ========================================
// PROFILE IMAGE: show fallback if image fails
// ========================================
if (profileImg) {
    profileImg.addEventListener('error', function () {
        profileImg.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'flex';
    });

    profileImg.addEventListener('load', function () {
        if (profileIcon) profileIcon.style.display = 'none';
        profileImg.style.display = 'block';
    });

    if (profileImg.complete && profileImg.naturalWidth === 0) {
        // image failed to load previously
        profileImg.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'flex';
    }
}


// ========================================
// 2. SCROLL EVENTS
// ========================================
window.addEventListener("scroll", function () {
    // Sticky navbar
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

    highlightNavLink();
    animateSkillBars();
    revealOnScroll();
});


// ========================================
// 3. ACTIVE NAV LINK
// ========================================
function highlightNavLink() {
    var sections = document.querySelectorAll("section[id]");
    var links = document.querySelectorAll(".nav-link");
    var current = "";

    sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}


// ========================================
// 4. MOBILE MENU
// ========================================
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    if (navLinks.classList.contains("open")) {
        menuIcon.className = "fas fa-times";
        document.body.style.overflow = "hidden";
    } else {
        menuIcon.className = "fas fa-bars";
        document.body.style.overflow = "";
    }
});

document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuIcon.className = "fas fa-bars";
        document.body.style.overflow = "";
    });
});


// ========================================
// 5. DARK MODE
// ========================================
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.className = "fas fa-sun";
}

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeIcon.className = "fas fa-sun";
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.className = "fas fa-moon";
        localStorage.setItem("theme", "light");
    }
});


// ========================================
// 6. BACK TO TOP
// ========================================
backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ========================================
// 7. SKILL BARS
// ========================================
var skillsDone = false;

function animateSkillBars() {
    if (skillsDone) return;

    var section = document.getElementById("skills");
    if (section.getBoundingClientRect().top < window.innerHeight * 0.75) {
        skillsDone = true;
        document.querySelectorAll(".bar-fill").forEach(function (bar) {
            bar.style.width = bar.getAttribute("data-width") + "%";
        });
    }
}


// ========================================
// 8. SCROLL REVEAL
// ========================================
function revealOnScroll() {
    document.querySelectorAll(".fade-in").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
            el.classList.add("show");
        }
    });
}

revealOnScroll();


// ========================================
// 9. CONTACT FORM
// ========================================
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show success toast
    var toast = document.createElement("div");
    toast.textContent = "Message sent successfully! 🎉";
    toast.style.cssText =
        "position:fixed; bottom:30px; left:50%; transform:translateX(-50%);" +
        "background:linear-gradient(135deg,#7c3aed,#2563eb); color:#fff;" +
        "padding:14px 30px; border-radius:12px; font-size:14px; font-weight:600;" +
        "font-family:Poppins,sans-serif; box-shadow:0 8px 25px rgba(124,58,237,0.3);" +
        "z-index:10000; opacity:0; transition:opacity 0.3s;";

    document.body.appendChild(toast);
    setTimeout(function () { toast.style.opacity = "1"; }, 10);
    setTimeout(function () {
        toast.style.opacity = "0";
        setTimeout(function () { toast.remove(); }, 300);
    }, 3000);

    contactForm.reset();
});


// ========================================
// 10. SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
        var id = this.getAttribute("href");
        if (id === "#") return;
        e.preventDefault();
        var target = document.querySelector(id);
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});
