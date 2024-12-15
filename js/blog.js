var slideIndex = 1;
var blogsHTML = "";
var pagination = `<div class="hexagon" id="blog_hexagon"></div>
            <a class="prev m-2" onclick="plusSlides(-1)"><i class="fa-solid fa-circle-arrow-left fa-lg"></i></a>
            <div class="dot-container m-2">`;
var page = 1;


window.addEventListener('DOMContentLoaded', async () => {
    await showBlogs();
    showSlides(slideIndex);
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("blog_articles_list");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " active";
}

async function showBlogs() {
    await fetch('js/blog_posts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const size = Object.keys(data).length;
        var blogsHTML = "";
        Object.entries(data).forEach(([key, item], index) => {
            blogsHTML += addBlogPost(item, index, size);
        });
        document.getElementById("blog_main_div").innerHTML = blogsHTML;
        pagination += `</div>
            <a class="next m-2" onclick="plusSlides(1)"><span><i
                        class="fa-solid fa-circle-arrow-right fa-lg"></i></span></a>`;
        document.getElementById("blog_pagination").innerHTML = pagination;
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
}

function addBlogPost(item, index, size) {
    var blogPost = "";
    if (index % 6 === 0) {
        blogPost += `<div class="blog_articles_list">`;
    }
    blogPost += `<div class="blog_article p-4">
                    <div class="blog_img">
                        <div class="blog_overlay">
                            <a href="${item.url}" target="_blank" class="btn btn-lwb">Read more</a></div>
                        <img src="assets/img/blog/${item.image_name}" />
                    </div>
                    <div class="blog_article_text p-4">${item.intro}</div>
                </div>`;
    if (index % 6 === 5 || index === size - 1) {
        blogPost += `</div>`;
        pagination += `<span class="dot" onclick="currentSlide(${page})">${page}</span>`;
        page++;
    }

    return blogPost;
}
