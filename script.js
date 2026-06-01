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
    { threshold: 0.08 }
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

const caseFilters = document.querySelectorAll("[data-case-filter]");
const portfolioCases = document.querySelectorAll("[data-case-categories]");
const caseFilterStatus = document.getElementById("case-filter-status");

caseFilters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const selectedFilter = filterButton.dataset.caseFilter;
    let visibleCases = 0;

    caseFilters.forEach((item) => {
      const isActive = item === filterButton;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    portfolioCases.forEach((portfolioCase) => {
      const categories = portfolioCase.dataset.caseCategories.split(" ");
      const isVisible = selectedFilter === "all" || categories.includes(selectedFilter);
      portfolioCase.hidden = !isVisible;
      if (isVisible) visibleCases += 1;
    });

    if (caseFilterStatus) {
      const label = filterButton.textContent.trim();
      caseFilterStatus.textContent =
        selectedFilter === "all"
          ? `${visibleCases} case studies`
          : `${visibleCases} case studies · ${label}`;
    }
  });
});
