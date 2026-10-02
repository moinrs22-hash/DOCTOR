/**
 * MYDOCTOR - AI Healthcare Platform
 * Interactive Features, Chatbot Simulation & Direct WhatsApp Messaging
 * Target Phone: 8104593452 (+91 8104593452)
 */

const DOCTOR_WHATSAPP_NUMBER = "918104593452";

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initFaqAccordion();
  initChatWidget();
  initAppointmentForm();
  initServiceModals();
  initLucide();
});

// Refresh Lucide icons safely
function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -----------------------------------------------------------
// 1. Mobile Menu Toggle
// -----------------------------------------------------------
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// -----------------------------------------------------------
// 2. Direct WhatsApp Communication Helper
// -----------------------------------------------------------
window.sendWhatsAppMessage = function(customMessage = "") {
  let message = customMessage || "Hello MyDoctor! I am reaching out through the website for healthcare consultation.";
  const url = `https://wa.me/${DOCTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// Direct WhatsApp helper for specific Doctor card
window.contactDoctorWhatsApp = function(doctorName, specialty) {
  const text = `Hello ${doctorName} (${specialty}),\nI found your profile on MyDoctor. I would like to consult with you regarding a health query.\n\nCould you please guide me on consultation availability?`;
  window.sendWhatsAppMessage(text);
};

// -----------------------------------------------------------
// 3. Appointment Form -> Direct WhatsApp Booking
// -----------------------------------------------------------
function initAppointmentForm() {
  const form = document.getElementById("appointment-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("apt-name").value.trim();
    const phone = document.getElementById("apt-phone").value.trim();
    const doctor = document.getElementById("apt-doctor").value;
    const date = document.getElementById("apt-date").value;
    const notes = document.getElementById("apt-notes").value.trim();

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const formattedMessage = `🏥 *NEW APPOINTMENT REQUEST - MYDOCTOR*\n\n` +
      `👤 *Patient Name:* ${name}\n` +
      `📱 *Contact Number:* ${phone}\n` +
      `👨‍⚕️ *Requested Doctor/Dept:* ${doctor}\n` +
      `📅 *Preferred Date:* ${date || "Earliest available"}\n` +
      `📝 *Symptoms / Medical Notes:* ${notes || "General checkup requested"}\n\n` +
      `_Sent via MyDoctor Online Portal_`;

    window.sendWhatsAppMessage(formattedMessage);
  });
}

// -----------------------------------------------------------
// 4. Interactive Live AI Healthcare Chatbot
// -----------------------------------------------------------
const knowledgeBase = {
  greetings: [
    "Hello! I am your MyDoctor AI Healthcare Assistant. How can I support your health and wellness today?",
    "Welcome to MyDoctor! I can help you with symptoms analysis, appointment procedures, hospital departments, lab reports, and doctor consultations.",
  ],
  symptoms: {
    fever: "🌡️ *Fever & Temperature Guidance:*\n• Normal body temp is around 98.6°F (37°C).\n• Stay well hydrated with fluids, electrolytes, and plenty of rest.\n• Monitor for warning signs: temperature above 102°F, severe stiff neck, shortness of breath, or persistent chills.\n\n⚠️ Would you like me to connect you directly with our on-call General Physician on WhatsApp right now?",
    headache: "💆 *Headache Guidance:*\n• Rest in a quiet, dark room and drink plenty of water.\n• Avoid prolonged screen exposure and caffeine.\n• *Emergency red flags:* Sudden 'thunderclap' headache, vision changes, confusion, or weakness on one side.\n\nClick below to consult a neurologist or doctor directly on WhatsApp.",
    cough: "🫁 *Cough & Cold Advisory:*\n• Stay warm, drink warm honey-lemon water, and try steam inhalation.\n• If cough persists > 2 weeks or is accompanied by blood, high fever, or wheezing, consult a doctor promptly.\n\nOur doctors are available for instant consultation on WhatsApp (+91 8104593452).",
    default: "Thank you for sharing your symptoms. As an AI Healthcare Assistant, I can provide preliminary guidance, but an accurate medical diagnosis requires clinical examination by a qualified doctor.\n\nFor personalized care, you can immediately send your symptoms to our medical team via WhatsApp."
  },
  appointment: "📅 *Appointment Information:*\n• OPD Hours: Monday to Saturday, 8:00 AM – 8:00 PM\n• Instant appointments can be scheduled online or via WhatsApp.\n• Please bring your valid ID card, previous prescriptions, and lab history.\n\nTo lock your preferred time slot immediately, message our coordinator on WhatsApp at 8104593452.",
  hospital: "🏥 *Hospital Information:*\n• Core Departments: Cardiology, Neurology, Pediatrics, Internal Medicine, Orthopedics, and Radiology.\n• 24/7 Emergency & Trauma Care unit active.\n• Fully equipped ICU, CCU, and digital pathology laboratory.\n\nNeed assistance finding a specific department? Let me know or message us on WhatsApp.",
  report: "📋 *Medical Report Guidance:*\n• Routine blood & urine tests: Available within 6 to 12 hours.\n• Imaging (X-Ray, Ultrasound, CT, MRI): Available within 24 hours.\n• You can securely send your report PDFs to our doctor on WhatsApp (8104593452) for a second opinion.",
  medicine: "💊 *Medicine Information & Educational Safety:*\n\n⚠️ *CRITICAL MEDICAL WARNING:*\nSelf-medication can be dangerous. Never start, discontinue, or alter dosages of any prescription medication without the express guidance of a licensed medical practitioner.\n\nWould you like our physician on WhatsApp (8104593452) to review your current prescription?"
};

function initChatWidget() {
  const chatModal = document.getElementById("chat-modal");
  const openChatBtns = document.querySelectorAll(".open-chat-trigger");
  const closeChatBtn = document.getElementById("close-chat-btn");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  if (!chatModal) return;

  // Open Chat
  openChatBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      chatModal.classList.remove("hidden");
      chatModal.classList.add("flex");
      if (chatInput) chatInput.focus();
    });
  });

  // Close Chat
  if (closeChatBtn) {
    closeChatBtn.addEventListener("click", () => {
      chatModal.classList.add("hidden");
      chatModal.classList.remove("flex");
    });
  }

  // Handle Quick Chips
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("quick-chip")) {
      const prompt = e.target.getAttribute("data-prompt") || e.target.innerText;
      if (chatInput) {
        chatInput.value = prompt;
        processChatMessage(prompt);
        chatInput.value = "";
      }
    }
  });

  // Handle Submit
  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      processChatMessage(message);
      chatInput.value = "";
    });
  }

  function appendMessage(sender, text, isAi = false, showWhatsAppCTA = false) {
    if (!chatMessages) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = `flex ${isAi ? "justify-start" : "justify-end"} mb-3`;

    const bubble = document.createElement("div");
    bubble.className = isAi
      ? "max-w-[85%] bg-slate-50 border border-slate-200/90 text-slate-800 rounded-2xl rounded-tl-sm p-3.5 shadow-sm text-sm leading-relaxed"
      : "max-w-[85%] bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl rounded-tr-sm p-3.5 shadow-md text-sm leading-relaxed";

    // Format newlines
    let formattedHtml = text.replace(/\n/g, "<br/>");
    // Bold formatting
    formattedHtml = formattedHtml.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    bubble.innerHTML = formattedHtml;

    if (showWhatsAppCTA) {
      const ctaDiv = document.createElement("div");
      ctaDiv.className = "mt-3 pt-2 border-t border-slate-200";
      ctaDiv.innerHTML = `
        <button onclick="window.sendWhatsAppMessage('Health inquiry from MyDoctor AI Chatbot: ${encodeURIComponent(text.substring(0, 80))}')" 
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs shadow transition">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.771.899 2.796.899 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm0 10.43c-.887 0-1.748-.242-2.502-.702l-.179-.11-1.859.488.497-1.815-.118-.189c-.512-.816-.782-1.766-.781-2.736.001-2.617 2.128-4.744 4.745-4.744 2.616 0 4.743 2.127 4.744 4.744 0 2.616-2.127 4.744-4.743 4.744z"/></svg>
          Direct Doctor on WhatsApp (8104593452)
        </button>
      `;
      bubble.appendChild(ctaDiv);
    }

    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processChatMessage(userText) {
    appendMessage("user", userText, false);

    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typing-indicator";
    typingIndicator.className = "flex justify-start mb-3";
    typingIndicator.innerHTML = `
      <div class="bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center space-x-1.5">
        <span class="w-2 h-2 rounded-full bg-sky-500 animate-bounce"></span>
        <span class="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 0.15s"></span>
        <span class="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style="animation-delay: 0.3s"></span>
        <span class="text-xs text-slate-500 ml-2">MyDoctor AI is analyzing...</span>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const indicator = document.getElementById("typing-indicator");
      if (indicator) indicator.remove();

      const lower = userText.toLowerCase();
      let response = "";
      let showCTA = true;

      if (lower.includes("fever") || lower.includes("temp") || lower.includes("hot")) {
        response = knowledgeBase.symptoms.fever;
      } else if (lower.includes("headache") || lower.includes("migraine") || lower.includes("head pain")) {
        response = knowledgeBase.symptoms.headache;
      } else if (lower.includes("cough") || lower.includes("cold") || lower.includes("throat") || lower.includes("sneeze")) {
        response = knowledgeBase.symptoms.cough;
      } else if (lower.includes("appointment") || lower.includes("book") || lower.includes("timing") || lower.includes("slot")) {
        response = knowledgeBase.appointment;
      } else if (lower.includes("hospital") || lower.includes("department") || lower.includes("emergency") || lower.includes("icu")) {
        response = knowledgeBase.hospital;
      } else if (lower.includes("report") || lower.includes("lab") || lower.includes("blood test") || lower.includes("mri") || lower.includes("scan")) {
        response = knowledgeBase.report;
      } else if (lower.includes("medicine") || lower.includes("tablet") || lower.includes("dose") || lower.includes("drug") || lower.includes("pill")) {
        response = knowledgeBase.medicine;
      } else if (lower.includes("doctor") || lower.includes("whatsapp") || lower.includes("call") || lower.includes("contact") || lower.includes("number")) {
        response = "👨‍⚕️ You can instantly speak with our verified doctor directly on WhatsApp at *+91 8104593452*. Our medical team reviews inquiries 24/7.";
      } else if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
        response = "Hello! I am MyDoctor AI. You can ask me regarding:\n• Symptoms & first aid advice\n• Booking an appointment\n• Understanding lab reports\n• Hospital departments\n• Medicine disclaimers & guidance\n• Or connecting directly with a Doctor on WhatsApp (+91 8104593452).";
        showCTA = false;
      } else {
        response = knowledgeBase.symptoms.default;
      }

      appendMessage("ai", response, true, showCTA);
    }, 600);
  }
}

// -----------------------------------------------------------
// 5. Service Detail Interactive Modals
// -----------------------------------------------------------
const serviceDetails = {
  appointment: {
    title: "Appointment Information & Guidance",
    subtitle: "Understand appointment-related procedures & seamless scheduling",
    icon: "calendar-check",
    content: `
      <div class="space-y-4 text-slate-600 text-sm leading-relaxed">
        <div class="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-blue-900">
          <strong>Quick Process:</strong> You can schedule OPD consultations online in under 60 seconds, or directly message our coordinator on WhatsApp.
        </div>
        <h4 class="font-semibold text-slate-900">Step-by-Step Procedure:</h4>
        <ul class="list-disc pl-5 space-y-1.5">
          <li><strong>Select Department/Doctor:</strong> Browse through Cardiology, Neurology, Pediatrics, or General Internal Medicine.</li>
          <li><strong>Choose Slot:</strong> Morning (9 AM - 1 PM) or Evening (4 PM - 8 PM).</li>
          <li><strong>WhatsApp Instant Confirmation:</strong> Send your confirmation to <strong>8104593452</strong> to receive SMS & WhatsApp token.</li>
          <li><strong>Arrival:</strong> Please arrive 15 minutes before your scheduled slot with your government photo ID and past reports.</li>
        </ul>
        <div class="pt-3 flex gap-3">
          <button onclick="window.sendWhatsAppMessage('Hi, I need assistance with scheduling an appointment at MyDoctor.')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 shadow transition">
            Book via WhatsApp (8104593452)
          </button>
        </div>
      </div>
    `
  },
  hospital: {
    title: "Hospital Information & Departments",
    subtitle: "Departments, inpatient care, ICU, and emergency protocols",
    icon: "building-2",
    content: `
      <div class="space-y-4 text-slate-600 text-sm leading-relaxed">
        <p>Our integrated hospital network offers multi-specialty clinical infrastructure equipped with state-of-the-art robotic surgery, advanced catheterization labs, and critical care units.</p>
        <h4 class="font-semibold text-slate-900">Key Departments:</h4>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200"><strong>Cardiology:</strong> ECG, Echo, Angiography, Pacemaker</div>
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200"><strong>Neurology:</strong> Stroke unit, EEG, Spine care</div>
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200"><strong>Pediatrics:</strong> Neonatal ICU, Immunization</div>
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200"><strong>Internal Medicine:</strong> Chronic disease, Diabetology</div>
        </div>
        <p class="text-xs text-slate-500">24/7 Ambulance & Emergency Triage available round the clock.</p>
      </div>
    `
  },
  faq: {
    title: "Healthcare Services FAQ",
    subtitle: "Answers to common healthcare and AI consultation questions",
    icon: "help-circle",
    content: `
      <div class="space-y-3 text-slate-600 text-sm leading-relaxed">
        <div>
          <h5 class="font-semibold text-slate-900">How reliable is the MyDoctor AI Assistant?</h5>
          <p class="text-xs text-slate-600 mt-1">MyDoctor AI is trained on clinical protocols to provide general educational guidance and triage. It is designed to assist, not replace, licensed medical doctors.</p>
        </div>
        <div>
          <h5 class="font-semibold text-slate-900">How do I connect to a real doctor?</h5>
          <p class="text-xs text-slate-600 mt-1">You can click any 'Direct WhatsApp' button or text our verified consultation number at <strong>8104593452</strong>.</p>
        </div>
        <div>
          <h5 class="font-semibold text-slate-900">Are my health queries kept private?</h5>
          <p class="text-xs text-slate-600 mt-1">Yes, all communications follow HIPAA and national health data privacy guidelines.</p>
        </div>
      </div>
    `
  },
  report: {
    title: "Report Guidance & Access",
    subtitle: "Understanding your laboratory and radiology diagnostics",
    icon: "file-text",
    content: `
      <div class="space-y-4 text-slate-600 text-sm leading-relaxed">
        <p>Access your pathology, hematology, and radiological imaging results effortlessly.</p>
        <div class="p-3 bg-purple-50/80 border border-purple-100 rounded-xl text-purple-950 text-xs">
          <strong>Digital Turnaround Times:</strong>
          <ul class="list-disc pl-4 mt-1 space-y-1">
            <li>CBC, Lipid Profile, Thyroid, LFT/KFT: 4 to 8 hours</li>
            <li>Digital X-Ray & Ultrasound: Same day</li>
            <li>CT Scan, MRI, Biopsy: 24 to 48 hours</li>
          </ul>
        </div>
        <p class="text-xs">Have a report you'd like a doctor to review? Send the photo or PDF directly via WhatsApp to <strong>8104593452</strong>.</p>
        <button onclick="window.sendWhatsAppMessage('Hello Doctor, I would like to share my medical report for review.')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 shadow transition">
          Send Report for Review (8104593452)
        </button>
      </div>
    `
  },
  medicine: {
    title: "Medicine Information & Safe Usage",
    subtitle: "Educational drug guides with essential clinical precautions",
    icon: "pill",
    content: `
      <div class="space-y-4 text-slate-600 text-sm leading-relaxed">
        <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
          <h5 class="font-bold flex items-center gap-1.5 text-sm">
            <span>⚠️</span> Mandatory Health & Medication Warning
          </h5>
          <p class="text-xs mt-1 leading-normal">
            Information provided by MyDoctor is strictly for educational purposes. <strong>Never begin, stop, or adjust prescription dosages without direct consultation with a qualified medical professional.</strong>
          </p>
        </div>
        <ul class="list-disc pl-5 text-xs space-y-1.5">
          <li>Always inform your treating physician of known drug allergies or existing conditions.</li>
          <li>Never consume expired medicines or share antibiotics.</li>
          <li>For dosage clarification or adverse symptom checks, contact our doctor immediately.</li>
        </ul>
        <button onclick="window.sendWhatsAppMessage('Hello Doctor, I have a query regarding my prescribed medication.')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 shadow transition">
          Ask Doctor About Medication (8104593452)
        </button>
      </div>
    `
  }
};

function initServiceModals() {
  const modal = document.getElementById("service-modal");
  const modalTitle = document.getElementById("service-modal-title");
  const modalSubtitle = document.getElementById("service-modal-subtitle");
  const modalBody = document.getElementById("service-modal-body");
  const closeBtn = document.getElementById("close-service-modal");

  if (!modal) return;

  window.openServiceModal = function(serviceKey) {
    const data = serviceDetails[serviceKey];
    if (!data) return;

    modalTitle.innerText = data.title;
    modalSubtitle.innerText = data.subtitle;
    modalBody.innerHTML = data.content;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    initLucide();
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });
}

// -----------------------------------------------------------
// 6. FAQ Accordion
// -----------------------------------------------------------
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-trigger");

  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isExpanded = !content.classList.contains("hidden");

      // Close all other faqs
      document.querySelectorAll(".faq-content").forEach(el => el.classList.add("hidden"));
      document.querySelectorAll(".faq-icon").forEach(el => el.style.transform = "rotate(0deg)");

      if (!isExpanded) {
        content.classList.remove("hidden");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
}
