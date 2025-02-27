export default class LikeButtonWidget {
  constructor() {
    this.widget = document.createElement("div");
    this.widget.className = "like-button-widget";
    this.widget.innerHTML = `<button class="like-button">Like</button>`;
    this.button = this.widget.querySelector(".like-button");
    this.animationDuration = 10000; // Общая длительность анимации: 10 секунд
    this.isAnimating = false;

    this.initializeEvents();
  }

  initializeEvents() {
    this.button.addEventListener("click", () => this.startHeartsFlow());
  }

  /**
   * Запуск анимации сердец:
   * Создает сердца с увеличивающейся скоростью.
   */
  startHeartsFlow() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const totalHearts = 50; // Общее количество сердец
    let currentHeartCount = 0; // Счетчик созданных сердец

    /**
     * Рекурсивная функция для создания сердец:
     * - Увеличивает скорость появления сердец со временем.
     * - Создает одно сердце за раз.
     */
    const createNextHeart = () => {
      if (currentHeartCount >= totalHearts || !this.isAnimating) return;

      // Вычисляем интервал между сердцами
      const elapsedTime = Date.now() - startTime;
      const minInterval = 50; // Минимальный интервал (в конце)
      const maxInterval = 800; // Максимальный интервал (в начале)
      const currentInterval =
        maxInterval -
        ((maxInterval - minInterval) * elapsedTime) / this.animationDuration;

      // Создаем одно сердце
      this.createHeart();
      currentHeartCount++;

      // Рекурсивно вызываем следующий интервал
      setTimeout(createNextHeart, Math.max(minInterval, currentInterval));
    };

    const startTime = Date.now(); // Время начала анимации
    createNextHeart();

    // Останавливаем анимацию через 10 секунд
    setTimeout(() => {
      this.isAnimating = false;
    }, this.animationDuration);
  }

  /**
   * Создание одного сердца:
   * - Позиционирует сердце в центре кнопки.
   * - Назначает случайную траекторию.
   * - Добавляет анимацию и обработчик удаления.
   */
  createHeart() {
    const trajectories = [
      [0, -50, 0, 50, 0], // Центр → влево → центр → вправо → центр
      [0, 0, 50, -50, 0], // Центр → центр → вправо → влево → центр
      [0, 0, -50, 50, 0], // Центр → центр → влево → вправо → центр
      [0, 50, 0, -50, 0], // Центр → вправо → центр → влево → центр
    ];

    const heart = document.createElement("img");
    const buttonRect = this.button.getBoundingClientRect();
    heart.className = "heart";
    heart.src = "../img/heart.png";
    heart.alt = "❤️";

    // Позиционируем сердце в центре кнопки
    heart.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    heart.style.top = `${buttonRect.top + buttonRect.height / 2}px`;

    // Выбираем случайную траекторию
    // Устанавливает CSS-переменные для конкретного сердца, например:
    // [0, -50, 0, 50, 0]; ->
    // --x0: 0px; --x25: -50px; --x50: 0px; --x75: 50px; --x100: 0px;
    // они используются в CSS в ключевых кадрах анимации @keyframes heart-flight, где
    //  например в transform: translate(var(--x0), 0):
    //   var(--x0) — это CSS-переменная - смещения по горизонтали,
    //   0 — это смещение по вертикали (элемент остаётся на той же высоте)
    const trajectory =
      trajectories[Math.floor(Math.random() * trajectories.length)];
    heart.style.setProperty("--x0", `${trajectory[0]}px`);
    heart.style.setProperty("--x25", `${trajectory[1]}px`);
    heart.style.setProperty("--x50", `${trajectory[2]}px`);
    heart.style.setProperty("--x75", `${trajectory[3]}px`);
    heart.style.setProperty("--x100", `${trajectory[4]}px`);

    // Добавляем сердце в DOM
    document.body.appendChild(heart);

    // Принудительный рефлоу для запуска анимации (распространённый трюк в JS):
    // процесс, при котором браузер пересчитывает макет страницы (layout)
    // и перерисовывает её (paint)
    void heart.offsetWidth;

    // Устанавливаем анимацию
    heart.style.animation = "heart-flight 500ms ease-out forwards";

    // Удаляем сердце после завершения анимации
    heart.addEventListener("animationend", () => heart.remove());
  }

  /**
   * Инициализация виджета:
   * Добавляет виджет в указанный контейнер.
   */
  init(container) {
    container.appendChild(this.widget);
  }
}
