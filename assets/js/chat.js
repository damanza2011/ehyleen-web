/**
 * ============================================================================
 * EHYLEEN · Botanical AI Assistant Controller
 * Cumple estrictamente con AbortController, resiliencia y sanitización defensiva
 * ============================================================================
 */

import { CONFIG } from './config.js';

export class BotanicalChatBot {
  constructor(containerElement) {
    this.container = containerElement;
    this.messages = [
      {
        sender: "bot",
        text: "Hola, soy **Ehyleen Asesora**, tu asistente botánica de alta gama. ¿En qué espacio o proyecto de Barranquilla deseas integrar naturaleza viva hoy? (Ej. terraza en Riomar, casa campestre en Caujaral, o muro verde corporativo)."
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
    // Bold
    clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Links safe
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
      thinkingBubble.innerHTML = "<em>Consultando base botánica caribeña...</em>";
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

    // AbortController con timeout de 9 segundos
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

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || "Disculpa, no pude procesar la consulta botánica en este instante.";
      this.messages.push({ sender: "bot", text: reply });
    } catch (err) {
      console.warn("EHYLEEN Botanical Chatbot Fallback Activado:", err.message);
      // Fallback elegante sin romper la experiencia
      this.messages.push({
        sender: "bot",
        text: "Para evaluar tu caso con precisión climática y botánica en Barranquilla, nuestro ingeniero agrónomo senior puede atenderte de inmediato. Puedes tocar la pestaña **'Concierge'** o [abrir WhatsApp directamente](" + CONFIG.urls.whatsappBase + ")."
      });
    } finally {
      this.isThinking = false;
      this.renderMessages();
    }
  }
}
