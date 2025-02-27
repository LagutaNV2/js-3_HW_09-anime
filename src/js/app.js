import FeedbackWidget from "./FeedbackWidget.js";
import LikeButtonWidget from "./LikeButtonWidget.js";

const btn = document.querySelector(".toggle-btn");
const content = document.querySelector(".content");

// Collapsible анимация
btn.addEventListener("mousedown", () => {
  content.style.animation = "rise-fade 4s infinite";
  content.style.animationPlayState = "running";
});

btn.addEventListener("mouseleave", () => {
  content.style.animationPlayState = "paused";
  content.style.opacity = "0";
  content.style.maxHeight = "0";
  content.style.animation = "none";
});

// Feedback Widget
const feedbackWidget = new FeedbackWidget();
feedbackWidget.init(document.getElementById("feedback-container"));

// Like Button Widget
const likeButtonWidget = new LikeButtonWidget();
likeButtonWidget.init(document.body);
