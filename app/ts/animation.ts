$(function() {
    let $features = $("section.features>article")
    $features.each((_, el) => {
        $(el).slideToggle()
    })
    $(window).on("scroll", () => {
        $features.each((_, el) => {
            let $el = $(el);
            if($(this).scrollTop() == $el.height()) {
                $el.slideToggle()
            }
        })
    })
})