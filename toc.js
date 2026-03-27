/* toc.js — auto-generates a floating ToC from all h2 elements */
(function () {
    function buildTOC() {
        const headings = Array.from(document.querySelectorAll('h2'));
        if (headings.length === 0) return;

        headings.forEach((h, i) => {
            if (!h.id) h.id = 'toc-section-' + i;
        });

        const nav = document.createElement('nav');
        nav.id = 'toc';

        const label = document.createElement('div');
        label.id = 'toc-label';
        label.textContent = 'Contents';
        nav.appendChild(label);

        const list = document.createElement('ul');

        const topLi = document.createElement('li');
        const topA = document.createElement('a');
        topA.href = '#';
        topA.textContent = 'Project details';
        topA.id = 'toc-top-link';
        topA.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState(null, '', window.location.pathname);
        });
        topLi.appendChild(topA);
        list.appendChild(topLi);

        headings.forEach(h => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            a.addEventListener('click', e => {
                e.preventDefault();
                h.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', '#' + h.id);
            });
            li.appendChild(a);
            list.appendChild(li);
        });
        nav.appendChild(list);
        document.body.appendChild(nav);

        /* highlight active section */
        const links = nav.querySelectorAll('a');
        const topLink = nav.querySelector('#toc-top-link');
        function onScroll() {
            const atTop = window.scrollY < (headings[0].offsetTop - 200);
            let active = atTop ? null : headings[0];
            if (!atTop) {
                headings.forEach(h => {
                    if (window.scrollY >= h.offsetTop - 200) active = h;
                });
            }
            topLink.classList.toggle('toc-active', atTop);
            links.forEach(a => {
                if (a === topLink) return;
                a.classList.toggle('toc-active', active && a.getAttribute('href') === '#' + active.id);
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildTOC);
    } else {
        buildTOC();
    }
})();