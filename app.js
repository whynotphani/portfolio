document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
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

    const particles = Array.from({ length: 45 }, () => ({
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

          if (dist < 130) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 130)})`;
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
  const projectCards = document.querySelectorAll('.project-card');

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

  // --- SKILLS MATRIX INTERACTIVE SEARCH & TABS ---
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

  // Project Specifications Data for Modal
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
      
      <h3 style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--accent-cyan);">Key Engineering Highlights</h3>
      <div class="modal-feature-list">
        ${spec.features.map(f => `
          <div class="feature-item">
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        ${spec.github ? `
          <a href="${spec.github}" target="_blank" rel="noopener" class="btn btn-primary">
            <i data-lucide="github"></i> View GitHub Repository
          </a>
        ` : ''}
        <button class="btn btn-glass copy-modal-path-btn" data-path="${spec.path}">
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

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
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
            • <span class="term-green">resume</span> - Display summary profile of Marpu Phanindra<br>
            • <span class="term-green">list</span> - List engineering projects<br>
            • <span class="term-green">skills</span> - Output technical skills matrix<br>
            • <span class="term-green">certifications</span> - Display verified credentials<br>
            • <span class="term-green">contact</span> - Show email, phone & location<br>
            • <span class="term-green">info [wificsi | cybercrime | shuttletrack | autopentest]</span> - Inspect project<br>
            • <span class="term-green">clear</span> - Clear console output
          </div>
        `);
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
        printLine(`
          <div style="margin-top: 0.3rem;">
            <span class="term-cyan">Verified Certifications:</span><br>
            • Cybercrime Internship - <span class="term-green">Cybercrime Police Station</span><br>
            • Cybersecurity Essentials - <span class="term-green">Cisco Networking Academy</span><br>
            • Cisco Packet Tracer - <span class="term-green">Cisco Networking Academy</span><br>
            • Exploring Networking - <span class="term-green">Cisco Networking Academy</span><br>
            • Introduction to Cybersecurity - <span class="term-yellow">Netmaxin Online Program</span><br>
            • C Programming - <span class="term-yellow">Netmaxin Academy</span><br>
            • AI / ML - <span class="term-purple">Netmaxin Academy</span>
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
