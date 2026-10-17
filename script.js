const data = window.PORTFOLIO;

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element && value) element.textContent = value;
};

document.title = `${data.name} — ${data.title}`;
setText("monogram", data.initials);
setText("hero-initials", data.initials);
setText("header-name", data.displayName || data.name);
setText("footer-name", data.name);
setText("availability", data.availability);
setText("intro", data.intro);
setText("location", data.location);
setText("about-copy", data.about);
setText("now-copy", data.now);
setText("contact-address", data.address);
setText("year", new Date().getFullYear());

for (const id of ["cv-link-top", "cv-link-meta", "cv-link-bottom"]) {
  const link = document.getElementById(id);
  if (link) link.href = data.cv;
}

const phoneLink = document.getElementById("phone-link");
phoneLink.href = `tel:${data.phoneHref}`;
phoneLink.firstChild.textContent = `${data.phone} `;

const contactEmails = document.getElementById("contact-emails");
data.emails.forEach((email) => {
  const link = document.createElement("a");
  link.href = `mailto:${email}`;
  link.textContent = email;
  contactEmails.appendChild(link);
});

const interestList = document.getElementById("interest-list");
data.interests.forEach((interest) => {
  const item = document.createElement("span");
  item.textContent = interest;
  interestList.appendChild(item);
});

const academicPath = document.getElementById("academic-path");
data.academicPath.forEach((item) => {
  const entry = document.createElement("article");
  entry.innerHTML = `
    <div>
      <span>${item.period}</span>
      <h3>${item.institution}</h3>
    </div>
    <div>
      <strong>${item.role}</strong>
      <p>${item.detail}</p>
    </div>
  `;
  academicPath.appendChild(entry);
});

setText("seminar-kicker", data.seminar.kicker);
setText("seminar-title", data.seminar.title);
setText("seminar-copy", data.seminar.description);
setText("seminar-time", data.seminar.time);
document.getElementById("seminar-link").href = data.seminar.url;

setText("beyond-intro", data.beyond.intro);
const beyondGrid = document.getElementById("beyond-grid");
data.beyond.groups.forEach((group) => {
  const card = document.createElement("article");
  card.className = "beyond-card reveal";
  card.innerHTML = `
    <span>${group.number}</span>
    <h3>${group.title}</h3>
    <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  beyondGrid.appendChild(card);
});

const projectList = document.getElementById("project-list");
data.projects.forEach((project) => {
  const article = document.createElement("article");
  article.className = "project reveal";
  article.innerHTML = `
    <span class="project-number">${project.number}</span>
    <div>
      <h3>${project.title}</h3>
      <p class="project-category">${project.category}</p>
      <p class="project-description">${project.description}</p>
      <div class="project-actions">
        <a href="${project.link}" target="_blank" rel="noreferrer">${project.linkLabel || "Open project"} ↗</a>
        ${project.sourceLink ? `<a href="${project.sourceLink}" download>${project.sourceLabel || "Source files"} ↓</a>` : ""}
      </div>
    </div>
    <a class="project-preview ${project.color}" href="${project.link}" target="_blank" rel="noreferrer" aria-label="Open ${project.title} PDF">
      <span class="project-mark">${project.mark}</span>
    </a>
  `;
  projectList.appendChild(article);
});

const socials = document.getElementById("social-links");
data.socials.forEach(({ label, url }) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = label;
  socials.appendChild(link);
});

const updateLocalTime = () => {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: data.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date());
  setText("local-time", `Local time · ${time}`);
};
updateLocalTime();
setInterval(updateLocalTime, 30_000);

const storedTheme = localStorage.getItem("portfolio-theme");
if (storedTheme) document.documentElement.dataset.theme = storedTheme;
document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("portfolio-theme", next);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
