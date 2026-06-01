const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );
  reveals.forEach((element) => observer.observe(element));
}

const stageDetail = document.getElementById("stage-detail");
const stageLabel = document.getElementById("stage-label");
const stagePractices = document.getElementById("stage-practices");
const stages = document.querySelectorAll(".lifecycle-stage");

stages.forEach((stage) => {
  const activate = () => {
    stages.forEach((item) => {
      const isActive = item === stage;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    if (stageLabel) stageLabel.textContent = stage.dataset.stageLabel;
    if (stageDetail) stageDetail.textContent = stage.dataset.stageDetail;
    if (stagePractices) {
      const practices = stage.dataset.stagePractices.split("|");
      stagePractices.replaceChildren(
        ...practices.map((practice) => {
          const item = document.createElement("li");
          item.textContent = practice;
          return item;
        })
      );
    }
  };

  stage.addEventListener("click", activate);
  stage.addEventListener("mouseenter", activate);
  stage.addEventListener("focus", activate);
});
