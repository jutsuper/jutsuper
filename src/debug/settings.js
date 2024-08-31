(function () {
  document.getElementById("jutsuper-dev-visibility-checkbox").onchange = event => {
    const target = /** @type {HTMLInputElement} */ (event.target);
    if (target.checked) {
      document.getElementById("jutsuper-settings-root").classList.add("jutsuper-visible")
    }
    else {
      document.getElementById("jutsuper-settings-root").classList.remove("jutsuper-visible")
    }
  }
})();