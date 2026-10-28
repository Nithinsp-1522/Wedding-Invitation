const WEDDING = {
  partnerOne: "Nishanth S P",
  partnerTwo: "Gayathri Devi B P",
  // Update this with the confirmed venue URL from Google Maps if you have it.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Devi%20Community%20Hall%2C%20Cheruppaolor",
  // Countdown is based on India Standard Time (UTC+05:30).
  weddingDate: "2027-01-31T12:00:00+05:30"
};

document.title = `${WEDDING.partnerOne} & ${WEDDING.partnerTwo} | Wedding Invitation`;
document.getElementById("partner-one").textContent = WEDDING.partnerOne;
document.getElementById("partner-two").textContent = WEDDING.partnerTwo;
document.getElementById("couple-name-one").textContent = WEDDING.partnerOne;
document.getElementById("couple-name-two").textContent = WEDDING.partnerTwo;
document.getElementById("map-link").href = WEDDING.mapsUrl;

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Animated scroll reveals. Content remains visible if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("in-view"));
}

// Countdown to 31 January 2027 at 12:00 PM India Standard Time.
const target = new Date(WEDDING.weddingDate).getTime();
const countdownNote = document.getElementById("countdown-note");
function updateCountdown() {
  const remaining = target - Date.now();
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => document.getElementById(id).textContent = "0");
    countdownNote.textContent = "Today is the beginning of forever. Best wishes!";
    return;
  }
  const day = 86400000, hour = 3600000, minute = 60000;
  document.getElementById("days").textContent = Math.floor(remaining / day);
  document.getElementById("hours").textContent = String(Math.floor((remaining % day) / hour)).padStart(2, "0");
  document.getElementById("minutes").textContent = String(Math.floor((remaining % hour) / minute)).padStart(2, "0");
  document.getElementById("seconds").textContent = String(Math.floor((remaining % minute) / 1000)).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Display the couple photo automatically if assets/couple-photo.jpg is present.
const couplePhoto = document.getElementById("couple-photo");
const photoPlaceholder = document.getElementById("couple-photo-placeholder");
couplePhoto.addEventListener("load", () => {
  couplePhoto.classList.remove("hidden");
  photoPlaceholder.classList.add("hidden");
});
couplePhoto.addEventListener("error", () => {
  couplePhoto.classList.add("hidden");
  photoPlaceholder.classList.remove("hidden");
});

// Remove the intro screen after page assets have had a moment to render.
window.addEventListener("load", () => {
  window.setTimeout(() => document.querySelector(".page-loader")?.classList.add("done"), 450);
});
