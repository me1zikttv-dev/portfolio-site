const burger = document.getElementById('burger');
const nav = document.querySelector('.nav ul');
const navLinks = document.querySelectorAll('.nav a');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('.section');
const statusMsg = document.getElementById('form-status');

/* Бургер */
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

/* Подсветка пунктов меню */
if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if(nav.classList.contains('active')) nav.classList.remove('active');
    });
  });
}

/* Анимация появления секций */
if (sections.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
}

/* Форма → Telegram бот */
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const project = e.target.project.value.trim();
    if(!name || !project) return;

    const message = `📝 Новая заявка с сайта\n👤 Имя: ${name}\n💡 Проект: ${project}`;

    const token = "ТВОЙ_ТОКЕН";
    const chatId = "ТВОЙ_CHAT_ID";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });

      if(res.ok){
        if(statusMsg) statusMsg.textContent = "✅ Заявка отправлена!";
        e.target.reset();
      } else {
        if(statusMsg) statusMsg.textContent = "❌ Ошибка отправки, попробуйте позже.";
      }
    } catch(err){
      if(statusMsg) statusMsg.textContent = "⚠️ Не удалось связаться с Telegram API.";
    }
  });
}
