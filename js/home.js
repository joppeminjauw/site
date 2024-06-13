var slideIndex = 1;

window.addEventListener('DOMContentLoaded', async () => {
    showSlides(slideIndex);
    dropDown('dropdown_first');
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function dropDown(id) {
    if (document.getElementById(id).style.display === 'block') {
        document.getElementById(id).style.display = "none";
    } else {
        var elems = document.getElementsByClassName('dropdown-table');
        for(var i = 0; i < elems.length; i++) {
            elems.item(i).style.display = 'none';
        }
        document.getElementById(id).style.display = "block";
    }
}