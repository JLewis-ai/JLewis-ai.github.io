const data = window.PORTFOLIO;

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element && value) element.textContent = value;
};

document.title = `${data.name} — ${data.title}`;
setText("monogram", data.initials);
setText("hero-initials", data.initials);
setText("header-name", data.name);
setText("footer-name", data.name);
setText("availability", data.availability);
setText("intro", data.intro);
setText("location", data.location);
setText("about-copy", data.about);
setText("now-copy", data.now);
setText("year", new Date().getFullYear());

for (const id of ["email-link-top", "email-link-bottom"]) {
  const link = document.getElementById(id);
  link.href = `mailto:${data.email}`;
  if (id === "email-link-bottom") link.firstChild.textContent = `${data.email} `;
}

const projectList = document.getElementById("project-list");
data.projects.forEach((project) => {
  const link = document.createElement("a");
  link.className = "project reveal";
  link.href = project.link;
  if (project.link.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  link.innerHTML = `
    <span class="project-number">${project.number}</span>
    <div>
      <h3>${project.title}</h3>
      <p class="project-category">${project.category}</p>
      <p class="project-description">${project.description}</p>
    </div>
    <div class="project-preview ${project.color}" aria-hidden="true">
      <span class="project-mark">${project.mark}</span>
    </div>
  `;
  projectList.appendChild(link);
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
