(function() {
    // Styles
    const css = document.createElement("link");
    css.rel = "stylesheet"
    css.href = "/css/index.css"
    document.head.appendChild(css)
    const banner = document.createElement("div")
    banner.className = "banner"
    const label = document.createTextNode("BIQ-Cat OS - OS of the future")
    banner.appendChild(label)
    document.body.appendChild(banner)
})()