void (function (warningsBlock: HTMLElement) {
    let warnings = warningsBlock.children;
    for (let i = 0; i < warnings.length; i++) {
        warnings[i].getElementsByClassName('close')[0].addEventListener('click', () => {
            warnings[i]
                .animate(
                    [
                        {
                            opacity: 1,
                        },
                        {
                            opacity: 0,
                        },
                    ],
                    {
                        duration: 500,
                    },
                )
                .addEventListener('finish', () => warnings[i].remove());
        });
    }
})(document.getElementById('warnings') || document.createElement('div'));
