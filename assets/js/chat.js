/**
 * ============================================================================
 * EHYLEEN · Asistente Botánica y Cuidado de Jardines
 * Cumple con AbortController, resiliencia y sanitización defensiva
 * ============================================================================
 */

import { CONFIG } from './config.js';

export class BotanicalChatBot {
  constructor(containerElement) {
    this.container = containerElement;
    this.messages = [
      {
        sender: "bot",
        text: "Te doy la bienvenida a **EHYLEEN**. Te oriento en servicios de jardinería profesional, siembra, podas y suministro de viveros en Barranquilla. ¿En qué podemos ayudarte con tu jardín?"
      }
    ];
    this.isThinking = false;
    this.currentAbortController = null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.input = this.container.querySelector("#chat-input-text");
    this.sendBtn = this.container.querySelector("#chat-send-btn");
    this.msgList = this.container.querySelector("#chat-msg-list");
    this.quickChips = this.container.querySelectorAll(".quick-prompt-chip");

    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener("click", () => this.sendMessage());
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    this.quickChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const prompt = chip.getAttribute("data-prompt");
        if (prompt && this.input) {
          this.input.value = prompt;
          this.sendMessage();
        }
      });
    });

    this.renderMessages();
  }

  escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  formatMarkdown(text) {
    let clean = this.escapeHTML(text);
    clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    clean = clean.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return clean;
  }

  renderMessages() {
    if (!this.msgList) return;
    this.msgList.innerHTML = "";

    this.messages.forEach(msg => {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${msg.sender}`;
      bubble.innerHTML = this.formatMarkdown(msg.text);
      this.msgList.appendChild(bubble);
    });

    if (this.isThinking) {
      const thinkingBubble = document.createElement("div");
      thinkingBubble.className = "chat-bubble bot";
      thinkingBubble.innerHTML = "<em>Consultando guía botánica...</em>";
      this.msgList.appendChild(thinkingBubble);
    }

    this.msgList.scrollTop = this.msgList.scrollHeight;
  }

  async sendMessage() {
    const rawText = this.input.value.trim();
    if (!rawText || this.isThinking) return;

    this.messages.push({ sender: "user", text: rawText });
    this.input.value = "";
    this.isThinking = true;
    this.renderMessages();

    this.currentAbortController = new AbortController();
    const timeoutId = setTimeout(() => this.currentAbortController.abort(), 9000);

    try {
      const response = await fetch(CONFIG.urls.apiChat, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: rawText,
          history: this.messages.slice(-6)
        }),
        signal: this.currentAbortController.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const reply = data.reply || "Disculpa, no pude procesar la consulta en este instante.";
      this.messages.push({ sender: "bot", text: reply });
    } catch (err) {
      console.warn("EHYLEEN Asistente Fallback:", err.message);
      this.messages.push({
        sender: "bot",
        text: "Para coordinar una revisión de tu jardín o consultar sobre plantas de vivero en Barranquilla, puedes pasar a la pestaña **Concierge** o [abrir WhatsApp directamente](" + CONFIG.urls.whatsappBase + ")."
      });
    } finally {
      this.isThinking = false;
      this.renderMessages();
    }
  }
}
