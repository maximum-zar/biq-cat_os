(function () {
    const forms = document.forms;
    for (let i = 0; i < forms.length; i++) {
        const currentForm = forms[i];
        currentForm.noValidate = true;
        currentForm.onsubmit = () => {
            const elements = currentForm.elements;
            let valid = true;
            const setErrorMessage = (msg: string, el: Element) => {
                const errorBlock = document.createElement("div");
                errorBlock.className = "error";
                errorBlock.textContent = msg;
                el.parentNode?.insertBefore(errorBlock, el.nextSibling);
            };
            for (let k = 0; k < elements.length; k++) {
                if (
                    elements[k].hasAttribute("required") &&
                    elements[k].textContent!.trim() === ""
                )
                    setErrorMessage("This field is required", elements[k]);
                valid = false;
            }
            return valid;
        };
    }
})();
