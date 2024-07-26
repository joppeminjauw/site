var slideIndex = 1;

window.addEventListener('DOMContentLoaded', async () => {

    document.getElementById('languageSelect').addEventListener('change', function () {
        var selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
    });

    document.getElementById('languageSelectSmall').addEventListener('change', function () {
        var selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
    });

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

    document.getElementById('languageSelect').value = lang;

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    changeLangImages(lang);
}

async function changeLangImages(lang) {
    var prefix = lang.toUpperCase();
    $("get_started_1").attr("src", `${prefix}_1.png`);
    $("get_started_2").attr("src", `${prefix}_2.png`);
    $("get_started_3").attr("src", `${prefix}_3.png`);
    $("get_started_4").attr("src", `${prefix}_4.png`);
    $("get_started_main_full").attr("src", `${prefix}_volledig schema.png`);
}