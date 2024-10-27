class MyDynamicButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleClick = this.handleClick.bind(this); // Asegura que el contexto de `this` sea correcto
  }

  static get observedAttributes() {
    return ["label", "color", "type", "pill", "onclick"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "pill") {
      this.pill = this.hasAttribute("pill");
    } else if (oldValue !== newValue) {
      this[name] = newValue;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const styles = {
      success: {
        background: "#28b463",
        border: "2px solid #239b56",
        color: "#FFFFFF",
        hoverBackground: "#1e8449",
        hoverBorder: "#1e8449",
        ringColor: "#81c784",
      },
      danger: {
        background: "#F44336",
        border: "2px solid #D32F2F",
        color: "#FFFFFF",
        hoverBackground: "#D32F2F",
        hoverBorder: "#D32F2F",
        ringColor: "#e57373",
      },
      warning: {
        background: "#FFC107",
        border: "2px solid #FFA000",
        color: "#FFFFFF",
        hoverBackground: "#FFA000",
        hoverBorder: "#FFC107",
        ringColor: "#ffd54f",
      },
      default: {
        background: this.color || "#2196F3",
        border: "2px solid #1976D2",
        color: "#FFFFFF",
        hoverBackground: "#1976D2",
        hoverBorder: this.color || "#2196F3",
        ringColor: "#64b5f6",
      },
    };

    const style = styles[this.type] || styles.default;
    const borderRadius = this.pill ? "999px" : "10px";

    this.shadowRoot.innerHTML = `
        <style>
          button {
            padding: 8px 16px;
            border: ${style.border};
            cursor: pointer;
            color: ${style.color};
            background-color: ${style.background};
            font-size: 16px;
            border-radius: ${borderRadius};
            transition: background-color 0.3s, border-color 0.3s, box-shadow 0.2s;
            outline: none;
          }

          button:hover, button:focus, button:active {
            background-color: ${style.hoverBackground};
            border-color: transparent;
            box-shadow: 0 0 0 2px #fff, 0 0 0 6px ${style.ringColor};
          }
        </style>
        <button>${this.label || "Click me"}</button>
      `;

    // Asigna el manejador de eventos si existe
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    const funcName = this.getAttribute('onclick');
    if (funcName && typeof window[funcName] === "function") {
      window[funcName](event); // Ejecuta la función en el contexto global
    }
  }
}

customElements.define("micro-button", MyDynamicButton);
