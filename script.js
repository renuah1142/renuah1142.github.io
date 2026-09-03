const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const currentYear = document.getElementById('current-year');
const backToTop = document.querySelector('.back-to-top');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalObjective = document.getElementById('modal-objective');
const modalRole = document.getElementById('modal-role');
const modalTech = document.getElementById('modal-tech');
const modalChallenges = document.getElementById('modal-challenges');
const modalImplementation = document.getElementById('modal-implementation');
const modalSecurity = document.getElementById('modal-security');
const modalResults = document.getElementById('modal-results');
const modalClose = document.querySelector('.modal-close');

const projectData = {
  wan: {
    title: 'WAN Infrastructure & Network Security Lab',
    category: 'Networking / Cybersecurity',
    objective: 'Designed and implemented a multi-router enterprise WAN environment in GNS3, integrating routing, VPN, network security controls, and centralized infrastructure services.',
    role: 'Project Lead & Network Engineer',
    tech: 'GNS3, Cisco IOS, Frame Relay, eBGP, GRE, NAT/PAT, ACL, DHCP, DNS, NTP',
    challenges: [
      'Integrating heterogeneous routing domains and service functions.',
      'Validating connectivity and policy enforcement across simulated branch paths.',
      'Troubleshooting interface, addressing, and route propagation issues.'
    ],
    implementation: [
      'Configured Frame Relay connectivity and PVC/DLCI mappings.',
      'Implemented GRE VPN tunnels and eBGP routing across the simulated environment.',
      'Applied NAT/PAT and Cisco ACLs to control network traffic.',
      'Deployed DHCP, DNS, and NTP for centralized services.'
    ],
    security: 'Network segmentation, policy control, and secure service routing in a lab environment.',
    results: 'A functional WAN simulation with resilient connectivity, routing validation, and documented troubleshooting workflows.'
  },
  campus: {
    title: 'Hierarchical Campus LAN Infrastructure & Multi-Protocol Design',
    category: 'Networking',
    objective: 'Designed and deployed a redundant, multi-tier campus LAN in GNS3, connecting six client buildings and a centralized data center to dual ISP edge routers.',
    role: 'Project Lead & Network Engineer',
    tech: 'GNS3, Cisco IOS, EIGRP, OSPF, GLBP, VLSM, IPv4, DHCP, DNS, NTP, Tailscale',
    challenges: [
      'Balancing redundancy and scalability across a multi-building campus.',
      'Coordinating route redistribution between routing domains.',
      'Maintaining availability and service continuity during failover scenarios.'
    ],
    implementation: [
      'Designed a hierarchical campus topology connecting six client buildings.',
      'Implemented EIGRP across access/distribution layers and OSPF across the core/WAN edge.',
      'Configured GLBP to support active/active gateway load balancing and failover.',
      'Designed a VLSM scheme with 39 subnets and configured DHCP, DNS, and NTP.'
    ],
    security: 'Layered network segmentation, controlled access paths, and resilient gateway design.',
    results: 'A scalable GNS3 campus design demonstrating enterprise-style routing, failover, and documentation-driven project execution.'
  },
  bigbackcooks: {
    title: 'BigBackCooks — Kitchen Inventory & Recipe Platform',
    category: 'Development / DevOps',
    objective: 'Designed and deployed a full-stack application with authentication, a database, a REST API, and CI/CD.',
    role: 'Lead Developer & DevOps',
    tech: 'Python, Flask, PostgreSQL, JWT, REST APIs, GitHub Actions, CI/CD, Render',
    challenges: [
      'Integrating secure authentication and application access patterns.',
      'Designing reliable API and database interactions.',
      'Creating a maintainable deployment pipeline.'
    ],
    implementation: [
      'Built the application in Flask with PostgreSQL data storage.',
      'Implemented JWT-based authentication and API access control.',
      'Created a GitHub Actions pipeline for automated testing and deployment.',
      'Deployed the solution to Render for a production-like environment.'
    ],
    security: 'Authentication, access control, API security, and deployment considerations were built into the project.',
    results: 'A functional application combining user-facing features with secure backend patterns and deployment automation.'
  },
  houseglimpse: {
    title: 'HouseGlimpse — Real Estate Listing Platform',
    category: 'Development',
    objective: 'Designed and deployed a full-stack real estate listing platform with authentication, database integration, and a production deployment.',
    role: 'Lead Developer & DevOps',
    tech: 'Full-Stack Application, Firebase, Authentication, Deployment, UI Design',
    challenges: [
      'Managing secure user access and listing data flows.',
      'Combining front-end and back-end responsibilities in a production-ready setup.',
      'Keeping deployment reliable for ongoing user access.'
    ],
    implementation: [
      'Built a complete real-estate platform with authentication and listing features.',
      'Integrated Firebase database services and secure access logic.',
      'Handled deployment and ongoing maintenance duties.',
      'Maintained a production application with consistent availability.'
    ],
    security: 'Secure authentication and controlled access patterns were built into the workflow.',
    results: 'A polished, deployable property platform with a stable production presence.'
  }
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mainNav) mainNav.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  }
});

const highlightActiveNav = () => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const navItems = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if (!sections.length || !navItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((item) => {
          const targetId = item.getAttribute('href');
          item.classList.toggle('active', targetId === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
};

highlightActiveNav();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const visible = selectedFilter === 'all' || categories.includes(selectedFilter);
      card.classList.toggle('hidden', !visible);
    });
  });
});

let lastFocusedElement = null;

const openModal = (projectKey) => {
  const project = projectData[projectKey];
  if (!project || !modal) return;

  lastFocusedElement = document.activeElement;

  modalTitle.textContent = project.title;
  modalObjective.textContent = project.objective;
  modalRole.textContent = project.role;
  modalTech.textContent = project.tech;
  modalSecurity.textContent = project.security;
  modalResults.textContent = project.results;

  modalChallenges.innerHTML = '';
  project.challenges.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    modalChallenges.appendChild(li);
  });

  modalImplementation.innerHTML = '';
  project.implementation.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    modalImplementation.appendChild(li);
  });

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) focusable[0].focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
};

document.querySelectorAll('.project-button').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target && event.target.matches('[data-close="true"]')) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();

    if (event.key === 'Tab') {
      const focusable = Array.from(
        modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
