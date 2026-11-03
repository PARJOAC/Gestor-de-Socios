const modal = document.getElementById("modal-alta");
const btnOpen = document.getElementById("btn-open-alta");
const btnClose = document.getElementById("btn-close-alta");

btnOpen.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

btnClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
