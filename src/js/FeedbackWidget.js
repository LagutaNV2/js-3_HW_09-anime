export default class FeedbackWidget {
  constructor() {
    this.widget = document.createElement("div");
    this.widget.className = "feedback-widget";
    this.widget.innerHTML = `
       <div class="feedback-trigger"></div>
        <div class="feedback-modal">
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <form class="feedback-form">
              <h2 class="form-title">Напишите нам</h2>
              <textarea class="message-input full-width" placeholder="Ваше сообщение..." rows="5"></textarea>
              <button type="submit" class="submit-btn full-width">
                Отправить
              </button>
            </form>
          </div>
        </div>
      `;

    this.trigger = this.widget.querySelector(".feedback-trigger");
    this.modal = this.widget.querySelector(".feedback-modal");
    this.closeBtn = this.widget.querySelector(".close-modal");
    this.form = this.widget.querySelector(".feedback-form");

    this.initializeEvents();
  }

  initializeEvents() {
    this.trigger.addEventListener("click", () => this.toggleModal(true));
    this.closeBtn.addEventListener("click", () => this.toggleModal(false));
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    // --- Логика отправки формы ---
    console.log("Форма отправлена!");
    this.toggleModal(false);
  }

  toggleModal(show) {
    if (show) {
      this.trigger.classList.add("hidden");
      this.modal.classList.add("active");
    } else {
      this.modal.classList.remove("active");
      setTimeout(() => {
        this.trigger.classList.remove("hidden");
      }, 100); // Задержка равна длительности анимации
    }
  }

  init(container) {
    container.appendChild(this.widget);
  }
}
