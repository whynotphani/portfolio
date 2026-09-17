document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');

  if (mobileMenuBtn && mobileNavDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDropdown.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDropdown.classList.remove('active');
      });
    });
  }

  // Dynamic Particles Canvas Background
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(168, 85, 247, '
    }));

    const animateCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color + '0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateCanvas);
    };

    animateCanvas();
  }

  // Projects Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card:not(.cert-card-item)');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // --- SKILLS MATRIX SEARCH & TABS ---
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-pill-card');
  const searchInput = document.getElementById('skills-search-input');

  let activeSkillTab = 'all';

  const filterSkills = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    skillCards.forEach(card => {
      const category = card.dataset.category;
      const textContent = card.textContent.toLowerCase();
      const keywords = card.dataset.keywords || '';

      const matchesTab = (activeSkillTab === 'all' || category === activeSkillTab);
      const matchesSearch = !query || textContent.includes(query) || keywords.includes(query);

      if (matchesTab && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 30);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => { card.style.display = 'none'; }, 150);
      }
    });
  };

  skillTabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeSkillTab = tab.dataset.tab;
      filterSkills();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterSkills);
  }

  // --- CERTIFICATES SEARCH & CATEGORY FILTERS ---
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card-item');
  const certSearchInput = document.getElementById('cert-search-input');

  let activeCertTab = 'all';

  const filterCertificates = () => {
    const query = certSearchInput ? certSearchInput.value.toLowerCase().trim() : '';

    certCards.forEach(card => {
      const category = card.dataset.category;
      const textContent = card.textContent.toLowerCase();
      const keywords = card.dataset.keywords || '';

      const matchesTab = (activeCertTab === 'all' || category === activeCertTab);
      const matchesSearch = !query || textContent.includes(query) || keywords.includes(query);

      if (matchesTab && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 30);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => { card.style.display = 'none'; }, 150);
      }
    });
  };

  certFilterBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      certFilterBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCertTab = tab.dataset.filter;
      filterCertificates();
    });
  });

  if (certSearchInput) {
    certSearchInput.addEventListener('input', filterCertificates);
  }

  // Project Specs Data
  const projectSpecs = {
    wificsi: {
      title: "Wi-Fi CSI Based 3D Environment Scanner",
      subtitle: "Camera-less Indoor Sensing & Spatial Mapping Engine",
      repo: "IoT Sensing & Subcarrier Signal Processing",
      img: "assets/wificsi.jpg",
      description: "An IoT sensing system extracting Wi-Fi Channel State Information (CSI) across subcarriers to map indoor environments and detect physical obstacles dynamically without relying on cameras.",
      features: [
        { title: "Camera-less Spatial Sensing", desc: "Detects human presence and obstacle boundaries using Wi-Fi subcarrier perturbations." },
        { title: "CSI Signal Extractor", desc: "Processes Channel State Information amplitude & phase shifts in real-time." },
        { title: "3D Grid Reconstruction", desc: "Generates 3D indoor spatial maps and obstacle location coordinates." },
        { title: "Privacy-Preserving", desc: "Zero optical camera recording ensuring 100% privacy compliance." }
      ],
      github: null,
      path: "C:\\Users\\PHANINDRA\\Desktop\\MINI PROJECT"
    },
    cybercrime: {
      title: "Cyber Crime Reporting & Management Portal",
      subtitle: "3-Tier Dual-Portal System with 1930 Helpline Integration",
      repo: "whynotphani/CyberCrime-Case-Reporting-Portal",
      img: "assets/cybercrime.jpg",
      description: "Developed a streamlined dual-portal system integrating 1930 helpline registration to enable direct citizen case reporting, evidence uploads, and real-time police officer case evaluation.",
      features: [
        { title: "Citizen Reporting Portal", desc: "File cyber fraud incidents, track acknowledgment status (CC-2026-XXXX)." },
        { title: "1930 Helpline Dispatch", desc: "Rapid incident call dispatch interface for financial fraud holds." },
        { title: "Officer Dashboard", desc: "Live case review, suspect tagging, evidence inspection, and audit trail." },
        { title: "Multer & Security", desc: "File attachment validation (PDF/Images) and JWT auth security." }
      ],
      github: "https://github.com/whynotphani/CyberCrime-Case-Reporting-Portal",
      path: "C:\\Users\\PHANINDRA\\Desktop\\MINI PROJECT\\CYBERCRIME"
    },
    shuttletrack: {
      title: "ShuttleTrack — Live Bus Tracking System",
      subtitle: "Real-Time GPS Transport Monitor & GIS Route Map",
      repo: "whynotphani/ShuttleTrack",
      img: "assets/shuttletrack.jpg",
      description: "Developed a real-time bus tracking system enabling college students to monitor transport location, route ETA estimates, and arrival times on interactive Leaflet GIS maps.",
      features: [
        { title: "Interactive GIS Map", desc: "Leaflet map displaying live shuttle positions and route paths." },
        { title: "Live ETA Calculation", desc: "Calculates arrival estimates at student stops and campus halls." },
        { title: "Radix UI Drawer/Modals", desc: "Accessible UI panels, dark theme glassmorphism, responsive design." },
        { title: "Render & Vercel Blueprints", desc: "1-click automated cloud deployment blueprints." }
      ],
      github: "https://github.com/whynotphani/ShuttleTrack",
      path: "C:\\Users\\PHANINDRA\\Desktop\\ShuttleTrack\\SHUTTLE TRACKER"
    },
    autopentest: {
      title: "AutoPenTest AI — Vulnerability Scanner",
      subtitle: "Autonomous Cybersecurity Penetration & Vulnerability Assessment",
      repo: "Local Workspace / Yash",
      img: "assets/autopentest.jpg",
      description: "Autonomous cybersecurity assessment engine featuring FastAPI backend, Framer Motion UI, automated port vulnerability scanning, and real-time exploit execution logs.",
      features: [
        { title: "FastAPI Async Engine", desc: "Python 3.14 REST API conducting asynchronous network scans." },
        { title: "Recharts Analytics", desc: "Visualizes threat score gauges, vulnerability distributions, and risk levels." },
        { title: "Automated Port Auditing", desc: "Identifies exposed services and potential CVE exploit vectors." },
        { title: "Live Exploit Stream", desc: "Real-time terminal log viewer displaying scanning operations." }
      ],
      github: null,
      path: "C:\\Users\\PHANINDRA\\Desktop\\Yash"
    }
  };

  // Certificate Specs Data
  const certSpecs = {
    cybercrime_internship: {
      title: "Cybercrime Police Station Internship",
      issuer: "Cybercrime Police Station, Visakhapatnam City",
      pdf: "CERTIFICATES/CYBER CRIME INTERNSHIP CERTIFICATE PHANINDRA.pdf",
      img: "assets/cert_cybercrime_internship.png",
      recipient: "Marpu Phanindra",
      description: "Official internship completion certificate issued by the Cybercrime Police Station for practical field training in cyber incident complaint processing, financial fraud logs, digital evidence handling, and 1930 helpline dispatch procedures.",
      details: [
        { label: "Issuing Organization", val: "Cybercrime Police Station" },
        { label: "Verification Status", val: "Verified Official Police Station Certificate" },
        { label: "Specialization", val: "Cyber Incident Handling & Digital Evidence" }
      ]
    },
    cisco_jr_analyst: {
      title: "Junior Cybersecurity Analyst Career Path",
      issuer: "Cisco Networking Academy",
      pdf: "CERTIFICATES/[23331A4732-1] Junior_Cybersecurity_Analyst_Career_Path_certificate_marpuphani00-gmail-com_d0aa353e-6d3c-4207-b53d-63a0f8f67bbc.pdf",
      img: "assets/cert_cisco_jr_analyst.png",
      recipient: "Marpu Phanindra (marpuphani00@gmail.com)",
      description: "Career path certificate awarded by Cisco Networking Academy verifying mastery in Security Operations Center (SOC) procedures, vulnerability analysis, endpoint security, and network attack mitigation.",
      details: [
        { label: "Issuing Organization", val: "Cisco Networking Academy" },
        { label: "Credential ID", val: "d0aa353e-6d3c-4207-b53d-63a0f8f67bbc" },
        { label: "Specialization", val: "Junior Cybersecurity Analyst" }
      ]
    },
    cisco_packet_tracer: {
      title: "Getting Started with Cisco Packet Tracer",
      issuer: "Cisco Networking Academy",
      pdf: "CERTIFICATES/[23331A4732-2] Getting_Started_with_Cisco_Packet_Tracer_certificate_marpuphani00-gmail-com_7b298253-1069-4cd6-9fb9-e1781b99614a.pdf",
      img: "assets/cert_cisco_packet_tracer.png",
      recipient: "Marpu Phanindra (marpuphani00@gmail.com)",
      description: "Verification certificate from Cisco Networking Academy demonstrating hands-on competence in constructing and simulating virtual router/switch network topologies using Packet Tracer.",
      details: [
        { label: "Issuing Organization", val: "Cisco Networking Academy" },
        { label: "Credential ID", val: "7b298253-1069-4cd6-9fb9-e1781b99614a" },
        { label: "Specialization", val: "Packet Tracer Network Simulation" }
      ]
    },
    cisco_networking: {
      title: "Exploring Networking with Cisco Packet Tracer",
      issuer: "Cisco Networking Academy",
      pdf: "CERTIFICATES/[23331A4732-3] Exploring_Networking_with_Cisco_Packet_Tracer_certificate_marpuphani00-gmail-com_702e4f0d-ee1c-46a5-bee5-b19211b7651c.pdf",
      img: "assets/cert_cisco_networking.png",
      recipient: "Marpu Phanindra (marpuphani00@gmail.com)",
      description: "Certificate demonstrating advanced networking knowledge in TCP/IP protocol suites, IPv4/IPv6 subnetting, LAN switching, and dynamic packet routing.",
      details: [
        { label: "Issuing Organization", val: "Cisco Networking Academy" },
        { label: "Credential ID", val: "702e4f0d-ee1c-46a5-bee5-b19211b7651c" },
        { label: "Specialization", val: "Computer Networks & Protocols" }
      ]
    },
    cybersecurity_netmaxin: {
      title: "Introduction to Cybersecurity",
      issuer: "Netmaxin Online Program",
      pdf: "CERTIFICATES/Cyber Security.pdf",
      img: "assets/cert_cybersecurity_netmaxin.png",
      recipient: "Marpu Phanindra",
      description: "Online program certificate in Cybersecurity covering network security fundamentals, threat surface auditing, system protection strategies, and digital hygiene.",
      details: [
        { label: "Issuing Organization", val: "Netmaxin Online Program" },
        { label: "Verification Status", val: "Verified Certificate" },
        { label: "Specialization", val: "Cybersecurity Fundamentals" }
      ]
    },
    c_prog: {
      title: "C Programming Certification",
      issuer: "Netmaxin Academy",
      pdf: "CERTIFICATES/C Programming.pdf",
      img: "assets/cert_c_prog.png",
      recipient: "Marpu Phanindra",
      description: "Academy certification in C Programming covering core data structures, low-level memory pointers, dynamic allocation, and system algorithms.",
      details: [
        { label: "Issuing Organization", val: "Netmaxin Academy" },
        { label: "Verification Status", val: "Verified Certificate" },
        { label: "Specialization", val: "C System Programming" }
      ]
    },
    aiml: {
      title: "AI / ML Certification",
      issuer: "Netmaxin Academy",
      pdf: "CERTIFICATES/AIML.pdf",
      img: "assets/cert_aiml.png",
      recipient: "Marpu Phanindra",
      description: "Certification in Artificial Intelligence and Machine Learning covering supervised model training, evaluation metrics, and neural network algorithms.",
      details: [
        { label: "Issuing Organization", val: "Netmaxin Academy" },
        { label: "Verification Status", val: "Verified Certificate" },
        { label: "Specialization", val: "Artificial Intelligence & Machine Learning" }
      ]
    }
  };

  // Modal Control
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalContainer = document.getElementById('modal-content-container');

  const openModal = (key) => {
    const spec = projectSpecs[key];
    if (!spec) return;

    modalContainer.innerHTML = `
      <img src="${spec.img}" alt="${spec.title}" class="modal-img">
      <h2 class="modal-h2">${spec.title}</h2>
      <div class="modal-subtitle"><i data-lucide="git-branch"></i> ${spec.repo}</div>
      <p class="modal-desc">${spec.description}</p>
      
      <h3 style="font-size: 1.05rem; margin-bottom: 0.8rem; color: var(--accent-cyan);">Key Engineering Highlights</h3>
      <div class="modal-feature-list">
        ${spec.features.map(f => `
          <div class="feature-item">
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
        ${spec.github ? `
          <a href="${spec.github}" target="_blank" rel="noopener" class="btn btn-primary w-100-mobile">
            <i data-lucide="github"></i> View GitHub Repository
          </a>
        ` : ''}
        <button class="btn btn-glass copy-modal-path-btn w-100-mobile" data-path="${spec.path}">
          <i data-lucide="folder"></i> Copy Local Directory Path
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modal.classList.add('active');

    const copyBtn = modalContainer.querySelector('.copy-modal-path-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(spec.path);
        copyBtn.innerHTML = `<i data-lucide="check"></i> Copied to Clipboard!`;
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          copyBtn.innerHTML = `<i data-lucide="folder"></i> Copy Local Directory Path`;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    }
  };

  const openCertModal = (key) => {
    const cert = certSpecs[key];
    if (!cert) return;

    modalContainer.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.2rem;">
        <img src="${cert.img}" alt="${cert.title}" style="max-height: 420px; width: auto; max-width: 100%; border-radius: 8px; border: 1px solid var(--border-glow); box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
      </div>
      <h2 class="modal-h2">${cert.title}</h2>
      <div class="modal-subtitle"><i data-lucide="award"></i> Issued by ${cert.issuer}</div>
      <p class="modal-desc">${cert.description}</p>
      
      <div class="modal-feature-list" style="margin-bottom: 1.5rem;">
        ${cert.details.map(d => `
          <div class="feature-item">
            <h4 style="color: var(--accent-cyan); font-size: 0.82rem;">${d.label}</h4>
            <p style="font-weight: 600; color: #fff;">${d.val}</p>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
        <a href="${cert.pdf}" target="_blank" class="btn btn-primary btn-lg w-100-mobile">
          <i data-lucide="file-text"></i> Open Full PDF Document
        </a>
        <button class="btn btn-glass copy-cert-pdf-path w-100-mobile" data-path="${cert.pdf}">
          <i data-lucide="copy"></i> Copy File Path
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modal.classList.add('active');

    const copyBtn = modalContainer.querySelector('.copy-cert-pdf-path');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cert.pdf);
        copyBtn.innerHTML = `<i data-lucide="check"></i> Copied Path!`;
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          copyBtn.innerHTML = `<i data-lucide="copy"></i> Copy File Path`;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    }
  };

  // EXECUTIVE RESUME DOCUMENT MODAL FUNCTION
  const openFullPortfolioModal = () => {
    modalContainer.innerHTML = `
      <div class="resume-actions-bar">
        <button class="btn btn-gradient btn-sm" id="print-resume-btn">
          <i data-lucide="printer"></i> Print / Download Portfolio PDF
        </button>
        <button class="btn btn-outline btn-sm" id="copy-resume-text-btn">
          <i data-lucide="copy"></i> Copy Portfolio Text
        </button>
      </div>

      <div class="resume-modal-container" id="printable-resume">
        <!-- Compact Header -->
        <header class="resume-header">
          <h1 class="resume-name">MARPU PHANINDRA</h1>
          <p class="resume-title-role">COMPUTER SCIENCE STUDENT & SECURITY RESEARCHER</p>
          <div class="resume-contact-row">
            <span><i data-lucide="map-pin"></i> Visakhapatnam, AP, India</span> •
            <a href="tel:+918121088558"><i data-lucide="phone"></i> +91 8121088558</a> •
            <a href="mailto:marpuphani00@gmail.com"><i data-lucide="mail"></i> marpuphani00@gmail.com</a> •
            <a href="https://github.com/whynotphani" target="_blank"><i data-lucide="github"></i> github.com/whynotphani</a>
          </div>
        </header>

        <!-- 2-Column Single-Page Layout -->
        <div class="resume-grid-layout">
          <!-- LEFT COLUMN -->
          <div class="resume-grid-col">
            <!-- Summary -->
            <section class="resume-section">
              <h2 class="resume-section-heading"><i data-lucide="user"></i> Summary</h2>
              <p class="resume-summary-text">
                Computer Science student specializing in <strong>Cybersecurity, IoT, and Blockchain</strong>. Experienced QA Tester & Assessment Lead at NetMaxin Group, focused on delivering reliable, secure, high-performance applications.
              </p>
            </section>

            <!-- Technical Skills Matrix -->
            <section class="resume-section">
              <h2 class="resume-section-heading"><i data-lucide="code-2"></i> Skills Matrix</h2>
              <div class="resume-skills-block">
                <div class="resume-skill-cat">
                  <strong>Languages</strong>
                  <p>C, C++, JavaScript (ES6+), Java, Python</p>
                </div>
                <div class="resume-skill-cat">
                  <strong>Web & Frameworks</strong>
                  <p>React, Next.js, HTML5, CSS3, Tailwind, Node.js</p>
                </div>
                <div class="resume-skill-cat">
                  <strong>Cybersecurity & IoT</strong>
                  <p>Penetration Testing, Bug Hunting, Wi-Fi CSI, Blockchain</p>
                </div>
                <div class="resume-skill-cat">
                  <strong>Core CS & Tools</strong>
                  <p>DSA, OOP, DBMS, VS Code, GitHub, Android Studio, Figma</p>
                </div>
              </div>
            </section>

            <!-- Education -->
            <section class="resume-section" style="margin-bottom: 0;">
              <h2 class="resume-section-heading"><i data-lucide="graduation-cap"></i> Education</h2>
              <div class="resume-item">
                <div class="resume-item-top">
                  <span class="resume-item-title">MVGR College of Engineering</span>
                  <span class="resume-item-date">2023 — Present</span>
                </div>
                <div class="resume-item-sub">B.Tech CS (GPA: 6.84) • IoT & Security</div>
              </div>
              <div class="resume-item">
                <div class="resume-item-top">
                  <span class="resume-item-title">Sri Viswa Academy</span>
                  <span class="resume-item-date">2021 — 2023</span>
                </div>
                <div class="resume-item-sub">Class 12 (MPC) — Score: 89.7%</div>
              </div>
              <div class="resume-item" style="margin-bottom: 0;">
                <div class="resume-item-top">
                  <span class="resume-item-title">Chalapathi Public School</span>
                  <span class="resume-item-date">2020 — 2021</span>
                </div>
                <div class="resume-item-sub">Class 10 — Score: 97.8%</div>
              </div>
            </section>
          </div>

          <!-- RIGHT COLUMN -->
          <div class="resume-grid-col">
            <!-- Experience -->
            <section class="resume-section">
              <h2 class="resume-section-heading"><i data-lucide="briefcase"></i> Experience</h2>
              <div class="resume-item">
                <div class="resume-item-top">
                  <span class="resume-item-title">Netmaxin Group & Foundation</span>
                  <span class="resume-item-date">2023 — Present</span>
                </div>
                <div class="resume-item-sub">QA Tester & Tech Assessment Lead</div>
                <ul class="resume-bullet-list">
                  <li>Executed cross-platform QA testing & detailed bug reports.</li>
                  <li>Evaluated intern technical projects & progress reports.</li>
                  <li>Conceptualized digital graphics & mockups for Elyqra Muse.</li>
                </ul>
              </div>
            </section>

            <!-- Key Projects -->
            <section class="resume-section">
              <h2 class="resume-section-heading"><i data-lucide="boxes"></i> Key Projects</h2>
              <div class="resume-item">
                <div class="resume-item-top">
                  <span class="resume-item-title">Wi-Fi CSI 3D Environment Scanner</span>
                  <span class="resume-item-date">IoT Sensing System</span>
                </div>
                <p class="resume-summary-text" style="margin-top: 0.1rem;">
                  Camera-free indoor 3D obstacle mapping using Wi-Fi CSI subcarriers.
                </p>
              </div>

              <div class="resume-item">
                <div class="resume-item-top">
                  <span class="resume-item-title">Cyber Crime Reporting & Management Portal</span>
                  <span class="resume-item-date">Dual-Portal</span>
                </div>
                <p class="resume-summary-text" style="margin-top: 0.1rem;">
                  Direct citizen incident reporting system integrated with 1930 helpline.
                </p>
              </div>

              <div class="resume-item">
                <div class="resume-item-top">
                  <span class="resume-item-title">ShuttleTrack – Live Bus Telemetry</span>
                  <span class="resume-item-date">GPS Fleet Telemetry</span>
                </div>
                <p class="resume-summary-text" style="margin-top: 0.1rem;">
                  Real-time college bus location & arrival ETA tracking on Leaflet GIS maps.
                </p>
              </div>
            </section>

            <!-- Certifications -->
            <section class="resume-section" style="margin-bottom: 0;">
              <h2 class="resume-section-heading"><i data-lucide="award"></i> Certifications</h2>
              <ul class="resume-bullet-list" style="display: grid; grid-template-columns: 1fr; gap: 0.2rem;">
                <li><strong>Cybercrime Internship</strong> — Cybercrime Police Station</li>
                <li><strong>Jr Cybersecurity Analyst</strong> — Cisco Networking Academy</li>
                <li><strong>Packet Tracer & Networking</strong> — Cisco Academy</li>
                <li><strong>Cybersecurity, C & AI/ML</strong> — Netmaxin Academy</li>
              </ul>
            </section>
          </div>
        </div>

        <!-- Footer -->
        <footer class="resume-print-footer">
          <span>Official Portfolio & Resume of Marpu Phanindra</span> •
          <span>MVGR College CS & Security Researcher</span> •
          <span>github.com/whynotphani</span>
        </footer>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    modal.classList.add('active');

    // Print Button Handler
    const printBtn = modalContainer.querySelector('#print-resume-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Copy Resume Text Handler
    const copyTextBtn = modalContainer.querySelector('#copy-resume-text-btn');
    if (copyTextBtn) {
      copyTextBtn.addEventListener('click', () => {
        const plainText = `
MARPU PHANINDRA
Computer Science Student & Security Researcher
Visakhapatnam, India | +91 8121088558 | marpuphani00@gmail.com | github.com/whynotphani

SUMMARY
Tech-driven Computer Science student specializing in Cybersecurity, IoT, and Blockchain, with practical development experience at NetMaxin Group and leadership experience at NetMaxin Foundation.

EDUCATION
- MVGR College - B.Tech Computer Science (GPA: 6.84, 2023-Present)
  Specialization: IoT, Cybersecurity & Blockchain Technology
- Sri Viswa IIT and Medical Academy - Class 12 MPC (89.7%, 2021-2023)
- Chalapathi Public School Gajuwaka - Class 10 (97.8%, 2020-2021)

EXPERIENCE
- Netmaxin Group - QA Tester & Technical Assessment Lead (2023-Present)

PROJECTS
- Wi-Fi CSI Based 3D Environment Scanner
- Cyber Crime Reporting & Management Portal
- ShuttleTrack - Live Bus Tracking System

SKILLS
Programming Languages: C, C++, JavaScript, Java, Python
Web Development: React, Next.js, HTML5, CSS3, Tailwind CSS
Cybersecurity: Penetration Testing, Bug Hunting, IoT Wi-Fi CSI Sensing, Blockchain
Tools: Figma, Canva, GitHub, VS Code, AutoCAD, Blender, Android Studio, Antigravity IDE

CERTIFICATIONS
- Cybercrime Internship: Cybercrime Police Station
- Cybersecurity Analyst: Cisco Networking Academy
- Cisco Packet Tracer: Cisco Networking Academy
- Exploring Networking: Cisco Networking Academy
- Introduction to Cybersecurity: Netmaxin Academy
- C Programming & AI/ML: Netmaxin Academy
        `.trim();
        navigator.clipboard.writeText(plainText);
        copyTextBtn.innerHTML = `<i data-lucide="check"></i> Copied Resume Text!`;
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          copyTextBtn.innerHTML = `<i data-lucide="copy"></i> Copy Resume Text`;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    }
  };

  // View Portfolio Buttons Listeners
  const portfolioBtns = [
    document.getElementById('view-portfolio-nav-btn'),
    document.getElementById('view-portfolio-mobile-btn')
  ];

  portfolioBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', openFullPortfolioModal);
    }
  });

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
  });

  document.querySelectorAll('.open-cert-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openCertModal(btn.dataset.cert));
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Console Terminal Logic
  const termOutput = document.getElementById('terminal-output');
  const termForm = document.getElementById('terminal-form');
  const termInput = document.getElementById('terminal-input');
  const clearTermBtn = document.getElementById('clear-term-btn');

  const printLine = (htmlContent) => {
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = htmlContent;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
  };

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    printLine(`<span class="prompt-user">marpuphani@portal</span>:<span class="prompt-path">~</span>$ <span class="term-cmd">${escapeHtml(cmd)}</span>`);

    if (!cleanCmd) return;

    switch (cleanCmd) {
      case 'help':
        printLine(`
          <div style="margin-top: 0.3rem;">
            <span class="term-cyan">Available Commands:</span><br>
            • <span class="term-green">portfolio</span> - Open executive resume viewer<br>
            • <span class="term-green">resume</span> - Display summary profile of Marpu Phanindra<br>
            • <span class="term-green">list</span> - List engineering projects<br>
            • <span class="term-green">certifications</span> - Display all 7 verified certificates<br>
            • <span class="term-green">skills</span> - Output technical skills matrix<br>
            • <span class="term-green">contact</span> - Show email, phone & location<br>
            • <span class="term-green">info [cybercrime | shuttletrack | wificsi | autopentest]</span> - Inspect project<br>
            • <span class="term-green">clear</span> - Clear console output
          </div>
        `);
        break;

      case 'portfolio':
      case 'view portfolio':
      case 'view resume':
        openFullPortfolioModal();
        printLine(`<span class="term-green">✓ Opened executive resume viewer modal.</span>`);
        break;

      case 'resume':
      case 'bio':
        printLine(`
          <div style="margin-top: 0.3rem;">
            <span class="term-purple">MARPU PHANINDRA</span> - Computer Science Student<br>
            Location: <span class="term-cyan">Visakhapatnam, India</span> | Phone: <span class="term-cyan">+91 8121088558</span><br>
            Email: <span class="term-cyan">marpuphani00@gmail.com</span><br>
            Education: <span class="term-green">MVGR College B.Tech CS (GPA: 6.84)</span><br>
            Experience: <span class="term-yellow">QA Tester @ Netmaxin Group (2023 - Present)</span>
          </div>
        `);
        break;

      case 'list':
      case 'projects':
        printLine(`
          <div style="margin-top: 0.3rem;">
            <span class="term-cyan">Projects Breakdown:</span><br>
            [1] <span class="term-green">Wi-Fi CSI Based 3D Environment Scanner</span> (IoT Sensing)<br>
            [2] <span class="term-green">Cyber Crime Reporting & Management Portal</span> (Dual-Portal System)<br>
            [3] <span class="term-green">ShuttleTrack – Live Bus Tracking System</span> (Live GIS Fleet)<br>
            [4] <span class="term-purple">AutoPenTest AI</span> (Autonomous Vulnerability Assessment)
          </div>
        `);
        break;

      case 'skills':
        printLine(`
          <div style="margin-top: 0.3rem;">
            <span class="term-cyan">Skills Matrix:</span><br>
            Languages: <span class="term-green">C, C++, JavaScript (ES6+), Java, Python</span><br>
            Web Tech: <span class="term-green">React.js, Next.js, HTML5, CSS3, Tailwind CSS</span><br>
            Specializations: <span class="term-yellow">Penetration Testing, Bug Hunting, IoT Wi-Fi CSI Sensing, Blockchain Basics</span><br>
            Core CS: <span class="term-cyan">Data Structures & Algorithms, OOP, DBMS/MongoDB, OS, Computer Networks (TCP/IP)</span><br>
            Tools: <span class="term-purple">Git, GitHub, VS Code, Antigravity IDE, Android Studio, Figma, Canva, AutoCAD, Blender</span>
          </div>
        `);
        break;

      case 'certifications':
      case 'certs':
      case 'certificates':
        printLine(`
          <div style="margin-top: 0.3rem;">
            <span class="term-cyan">All 7 Verified PDF Certificates:</span><br>
            [1] <span class="term-green">Cybercrime Police Station Internship</span> (Cybercrime Police Station)<br>
            [2] <span class="term-purple">Junior Cybersecurity Analyst Career Path</span> (Cisco Networking Academy)<br>
            [3] <span class="term-purple">Getting Started with Cisco Packet Tracer</span> (Cisco Networking Academy)<br>
            [4] <span class="term-purple">Exploring Networking with Cisco Packet Tracer</span> (Cisco Networking Academy)<br>
            [5] <span class="term-yellow">Introduction to Cybersecurity</span> (Netmaxin Online Program)<br>
            [6] <span class="term-yellow">C Programming Certification</span> (Netmaxin Academy)<br>
            [7] <span class="term-yellow">AI / ML Certification</span> (Netmaxin Academy)
          </div>
        `);
        break;

      case 'contact':
        printLine(`
          <div style="margin-top: 0.3rem;">
            <span class="term-cyan">Contact Marpu Phanindra:</span><br>
            Email: <a href="mailto:marpuphani00@gmail.com" class="term-green">marpuphani00@gmail.com</a><br>
            Phone: <span class="term-green">+91 8121088558</span><br>
            Location: Visakhapatnam, India<br>
            GitHub: <a href="https://github.com/whynotphani" target="_blank" class="term-purple">@whynotphani</a>
          </div>
        `);
        break;

      case 'info wificsi':
        openModal('wificsi');
        printLine(`<span class="term-green">✓ Opened Wi-Fi CSI 3D Environment Scanner modal.</span>`);
        break;

      case 'info cybercrime':
        openModal('cybercrime');
        printLine(`<span class="term-green">✓ Opened Cyber Crime Reporting Portal modal.</span>`);
        break;

      case 'info shuttletrack':
        openModal('shuttletrack');
        printLine(`<span class="term-green">✓ Opened ShuttleTrack telemetry modal.</span>`);
        break;

      case 'info autopentest':
        openModal('autopentest');
        printLine(`<span class="term-green">✓ Opened AutoPenTest AI modal.</span>`);
        break;

      case 'clear':
        termOutput.innerHTML = '';
        break;

      default:
        printLine(`<span style="color: #ef4444;">Command not recognized: '${escapeHtml(cmd)}'. Type 'help' for commands.</span>`);
        break;
    }
  };

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  if (termForm) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = termInput.value;
      termInput.value = '';
      handleCommand(value);
    });
  }

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleCommand(btn.dataset.cmd);
    });
  });

  if (clearTermBtn) {
    clearTermBtn.addEventListener('click', () => {
      termOutput.innerHTML = '';
    });
  }
});
