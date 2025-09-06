document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const plusIcon = item.querySelector('.plus-icon');

            // Close all other open FAQ items
            faqQuestions.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.nextElementSibling;
                    const otherPlusIcon = otherItem.querySelector('.plus-icon');
                    otherAnswer.style.maxHeight = null;
                    otherPlusIcon.textContent = '+';
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the clicked FAQ item
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                plusIcon.textContent = '+';
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                plusIcon.textContent = '-';
                item.classList.add('active');
            }
        });
    });
});