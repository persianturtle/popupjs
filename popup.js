(function() {
  window.popup = { open, close, register };

  var active = [];

  function register(className, options) {
    var popup = {
      triggers:
        (options && options.triggers) ||
        document.querySelectorAll(".trigger." + className),
      element:
        (options && options.element) ||
        document.querySelector(".popup." + className)
    };

    if (!popup.element) {
      console.warn(`No popup element for ${className}`);
      return;
    }

    Object.assign(popup, options);

    popup.triggers.forEach(trigger => {
      trigger.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        window.popup.open(popup, event);
      });
    });

    popup.element.querySelector(".content").addEventListener("click", event => {
      event.stopPropagation();
    });

    var x = popup.element.querySelector(".close");
    if (x) {
      x.addEventListener("click", event => {
        window.popup.close(popup, event);
      });
    }

    if (!popup.preventCloseOnOutsideClick) {
      window.addEventListener("click", event => {
        window.popup.close(popup, event);
      });
    }

    return popup;
  }

  function open(popup, event) {
    if (popup.beforeOpen) {
      if (popup.beforeOpen(event) === false) {
        return;
      }
    }

    active.forEach(popup => {
      if (popup.beforeClose) {
        popup.beforeClose(event);
      }

      popup.element.querySelector(".content").removeAttribute("style");
      popup.element.removeAttribute("style");
      active = [];

      if (popup.afterClose) {
        popup.afterClose(event);
      }
    });

    active.push(popup);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    document.querySelector("body").classList.add("interstitial");

    popup.element.style.display = "flex";
    if (popup.center) {
      popup.element.style.alignItems = "center";
    } else {
      popup.element.style.alignItems = "flex-start";
    }
    popup.element.style.justifyContent = "center";
    popup.element.style.opacity = 1;
    popup.element.style.zIndex = 999999;
    popup.element.scrollTop = 0;

    setTimeout(function() {
      popup.element.querySelector(".content").style.transform = "scale(1)";

      if (popup.afterOpen) {
        popup.afterOpen(event);
      }
    }, 30);
  }

  function close(popup, event) {
    if (!active.includes(popup)) return;

    active.splice(active.indexOf(popup), 1);

    if (popup.beforeClose) {
      popup.beforeClose(event);
    }

    popup.element.querySelector(".content").style.transform = "scale(0.85)";
    popup.element.style.opacity = 0;

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    setTimeout(function() {
      popup.element.removeAttribute("style");
      popup.element.querySelector(".content").removeAttribute("style");
      document.querySelector("body").classList.remove("interstitial");

      if (popup.afterClose) {
        popup.afterClose(event);
      }
    }, 300);
  }
})();
