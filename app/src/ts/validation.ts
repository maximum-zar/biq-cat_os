(function () {
    const forms = document.forms;

    const setErrorMessage = (msg: string, el: HTMLElement, errType: string) => {
        if (el.getAttribute('data-errors')?.split(' ').includes(errType)) {
            return;
        }
        const errors = el.getAttribute('data-errors')?.split(' ') || [];
        errors.push(errType);
        const errorBlock = document.createElement('div');
        errorBlock.className = 'error ' + errType;
        errorBlock.textContent = msg;
        el.parentNode?.insertBefore(errorBlock, el.nextSibling);
        el.setAttribute('data-errors', errors.join(' '));
    };

    const removeErrorMessage = (el: Element, errType: string) => {
        const errorBlock = el.nextElementSibling;
        if (errorBlock?.className === 'error ' + errType) {
            errorBlock.remove();
            let errors =
                el
                    .getAttribute('data-errors')
                    ?.split(' ')
                    .filter((error) => error === errType) || [];
            errorBlock.setAttribute('data-errors', errors.join(' '));
        } else if (errorBlock?.nextElementSibling?.classList.contains('error')) removeErrorMessage(errorBlock, errType);
    };
    const regexp = {
        number: /^\d+$/,
        email: /[^@]+@[^@]+/,
        tel: /^\+?[1-9][0-9]{7,14}$/,
    };
    for (let i = 0; i < forms.length; i++) {
        const currentForm = forms[i];
        currentForm.noValidate = true;
        currentForm.onsubmit = () => {
            const elements = currentForm.elements;
            let valid = true;

            for (let k = 0; k < elements.length; k++) {
                let currentElement = <HTMLElement>elements[k];
                const isEmpty = (currentElement as HTMLInputElement).value?.trim() === '';
                if (currentElement.hasAttribute('required')) {
                    if (isEmpty) {
                        setErrorMessage('This field is required', currentElement, 'required');
                        valid = false;
                    } else removeErrorMessage(currentElement, 'required');
                } else if (isEmpty) continue;

                Object.keys(regexp).forEach((key: string, i: number) => {
                    if (key === currentElement.getAttribute('type')) {
                        const result = Object.values(regexp)[i].test((currentElement as HTMLInputElement).value);
                        if (result) removeErrorMessage(currentElement, 'badtype');
                        else {
                            setErrorMessage(`Incorrect ${key} format`, currentElement, 'badtype');
                            valid = false;
                        }
                    }
                });

                if (currentElement.hasAttribute('minlength') || currentElement.hasAttribute('maxlength')) {
                    const length = (currentElement as HTMLInputElement).value.length;
                    const minlength = currentElement.getAttribute('minlength') || Number.NEGATIVE_INFINITY.toString();
                    const maxlength = currentElement.getAttribute('maxlength') || Number.POSITIVE_INFINITY.toString();
                    if (length < parseInt(maxlength) && length > parseInt(minlength))
                        removeErrorMessage(currentElement, 'notbetween');
                    else {
                        setErrorMessage(
                            `Field's length is not between ${minlength} and ${maxlength}`,
                            currentElement,
                            'notbetween',
                        );
                        valid = false;
                    }
                }
                if (currentElement.id === 'confirm-password') {
                    if (
                        (currentElement as HTMLInputElement).value !==
                        (document.getElementById('password') as HTMLInputElement).value
                    ) {
                        setErrorMessage("Passwords don't equal", currentElement, 'checkpwd');
                        valid = false;
                    } else {
                        removeErrorMessage(currentElement, 'checkpwd');
                    }
                }
            }
            return valid;
        };
    }
})();
