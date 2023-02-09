import {render} from "ejs"
(function() {
    // Styles
    const css = document.createElement("link");
    css.rel = "stylesheet"
    css.href = "/css/index.css"
    document.head.appendChild(css)

    fetch("/pages/index.ejs").then((res: Response) => {
        if (res.ok) {
            res.text().then((template: string) => {
                let html = render(template, {
                    "logo": "BIQ-Cat OS - OS of the future",
                    "short-desc": "Simple, lightweight and modern"
                })

                document.body.innerHTML = html
            })
        }
    })
})()