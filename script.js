// Функція для розгортання/згортання підменю
function toggleSubItems(subId) {
    const subItems = document.getElementById(subId); // Отримуємо елемент підменю
    subItems.classList.toggle('active'); // Перемикаємо клас active для показу/приховування

    // Додаємо/прибираємо клас active для пункту "Навчання", щоб змінити стрілку
    const parentItem = subItems.parentElement.querySelector('.learning');
    if (parentItem) {
        parentItem.classList.toggle('active');
    }
}

// Функція для показу контенту при виборі підпункту
function showContent(contentId) {
    // Приховуємо всі блоки контенту
    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });

    // Показуємо вибраний блок контенту
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Видаляємо клас .active з усіх пунктів меню
    document.querySelectorAll('.sub-sub-item').forEach(item => {
        item.classList.remove('active');
    });

    // Додаємо клас .active до вибраного пункту
    const menuItems = document.querySelectorAll(`.sub-sub-item[onclick="showContent('${contentId}')"]`);
    menuItems.forEach(item => {
        item.classList.add('active');
    });
}

// Функція для підвантаження HTML-файлу та CSS для вибраного предмету
function switchSubject() {
    const subject = document.getElementById('subject-select').value; // Отримуємо вибраний предмет
    const menuContent = document.getElementById('menu-content'); // Контейнер для меню
    const contentWrapper = document.getElementById('content-wrapper'); // Контейнер для контенту
    const subjectStyles = document.getElementById('subject-styles'); // Елемент для підключення CSS

    // Оновлюємо CSS-файл для вибраного предмету
    subjectStyles.href = `css/${subject}.css`;

    // Очищаємо попередній контент
    menuContent.innerHTML = '';
    contentWrapper.innerHTML = '';

    // Завантажуємо HTML-файл для вибраного предмету
    fetch(`${subject}.html`)
        .then(response => response.text())
        .then(data => {
            // Створюємо тимчасовий елемент для парсингу HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Отримуємо меню та контент з завантаженого HTML
            const menuSection = doc.querySelector('.menu-section');
            const contentWrapperSection = doc.querySelector('.content-wrapper');

            // Додаємо меню до контейнера
            if (menuSection) {
                menuSection.classList.add('active'); // Показуємо секцію
                menuContent.appendChild(menuSection);
            }

            // Додаємо контент до контейнера
            if (contentWrapperSection) {
                const contents = contentWrapperSection.querySelectorAll('.content');
                contents.forEach(content => {
                    contentWrapper.appendChild(content);
                });
            }

            // Показуємо початковий контент після завантаження (наприклад, перший блок)
            const firstContent = contentWrapper.querySelector('.content');
            if (firstContent) {
                showContent(firstContent.id);
            }
        })
        .catch(error => console.error('Помилка завантаження HTML:', error));
}

// Завантажуємо початковий предмет при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    switchSubject();
});