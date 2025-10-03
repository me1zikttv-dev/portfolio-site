const burger = document.getElementById('burger');
const nav = document.querySelector('.nav ul');
const navLinks = document.querySelectorAll('.nav a');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('.section');
const statusMsg = document.getElementById('form-status');

/* Бургер */
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

/* Подсветка при клике */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    if(nav.classList.contains('active')) nav.classList.remove('active');
  });
});

/* Анимация появления секций */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

/* Форма → Telegram бот */
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const project = e.target.project.value.trim();
  if(!name || !project) return;

  const message = `📝 Новая заявка с сайта\n👤 Имя: ${name}\n💡 Проект: ${project}`;

  const token = "8016267066:AAEQxtfvmZNdDT_A6MRvpTz_QvDyPEeJFgU";
  const chatId = "6757896671";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });

    if(res.ok){
      statusMsg.textContent = "✅ Заявка отправлена!";
      e.target.reset();
    } else {
      statusMsg.textContent = "❌ Ошибка отправки, попробуйте позже.";
    }
  } catch(err){
    statusMsg.textContent = "⚠️ Не удалось связаться с Telegram API.";
  }
});
