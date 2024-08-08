var slideIndex = 1;

window.addEventListener('DOMContentLoaded', async () => {

    const userPreferredLanguage = localStorage.getItem('language') || "en";;
    const urlPath = window.location.pathname;
    const match = urlPath.match(/^\/(en|nl)\//);
    const lang = match ? match[1] : userPreferredLanguage;

    if (!match) {
        const newUrl = `/${userPreferredLanguage}${urlPath}`;
        window.location.replace(newUrl);
    }

    changeLanguage(lang);

    document.getElementById('languageSelect').addEventListener('change', function () {
        var selectedLanguage = this.value;
        const newUrl = `/${selectedLanguage}${window.location.pathname.substring(3)}`;
        window.history.pushState({}, '', newUrl);
        location.reload();
        // changeLanguage(selectedLanguage);
    });

    document.getElementById('languageSelectSmall').addEventListener('change', function () {
        var selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
    });

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
}

async function fetchLanguageData(lang) {
    const response = await fetch(`/js/languages/general_${lang}.json`);
    return response.json();
}

async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    document.getElementById('languageSelect').value = lang;
    document.getElementById('languageSelectSmall').value = lang;

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    changeLangImages(lang);
    updateLinks(lang)
}

async function changeLangImages(lang) {
    // get started page images
    try {
        var prefix = `/assets/img/get_started/${lang.toUpperCase()}`;
        document.getElementById("get_started_1").src = `${prefix}_1.png`;
        document.getElementById("get_started_2").src = `${prefix}_2.png`;
        document.getElementById("get_started_3").src = `${prefix}_3.png`;
        document.getElementById("get_started_4").src = `${prefix}_4.png`;
        document.getElementById("get_started_main_full").src = `${prefix}_volledig schema.png`;
    } catch (e) {
        console.log("Not on get started page, no images set");
    }

    // index - tour page images
    try {
        var prefix = `/assets/img/homepage/${lang.toUpperCase()}`;
        document.getElementById("team_img").src = `${prefix}_team.png`;
        // document.getElementById("addition_img").src = `${prefix}_addition.png`; --> no NL-image yet
        // header last so it doesn't fail in tour-page
        document.getElementById("header_img").src = `${prefix}_header.png`;
    } catch (e) {
        console.log("Not on home - or tour page, no images set");
    }

    function updateLinks(lang) {
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('/')) {
                link.setAttribute('href', `/${lang}${href}`);
            }
        });
    }
}