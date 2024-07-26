var slideIndex = 1;

window.addEventListener('DOMContentLoaded', async () => {

    // TODO:
    // - set value of lang-select-menu to userPreferredLanguage
    // - fetch langData and updateContent in onChange listener of lang-select-menu

    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    changeLanguage(userPreferredLanguage);

    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
    };

    navbarShrink();

    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    // location.reload();
}

async function fetchLanguageData(lang) {
    const response = await fetch(`js/languages/general_${lang}.json`);
    return response.json();
}

async function changeLanguage(elem) {
    var lang = elem;
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}