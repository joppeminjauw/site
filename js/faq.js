const plus_class = '<i class="fa-solid fa-plus fa-2x"></i>';
const minus_class = '<i class="fa-solid fa-minus fa-2x"></i>';

function openAnswer(id) {
    if (document.getElementById(`faq_txt_${id}`).style.display === 'none') {
        document.getElementById(`i_${id}`).innerHTML = minus_class;
        document.getElementById(`faq_txt_${id}`).style.display = 'block';
        document.getElementById(`faq_title_${id}`).style.color = 'rgba(4, 184, 245, 255)';
    } else {
        document.getElementById(`i_${id}`).innerHTML = plus_class;
        document.getElementById(`faq_txt_${id}`).style.display = 'none';
        document.getElementById(`faq_title_${id}`).style.color = 'rgba(0, 66, 88, 255)';
    }
}