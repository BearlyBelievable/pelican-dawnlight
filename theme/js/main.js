;(function () {
    var navbar = document.querySelector('.navbar')
    var strings = {}
    try {
        strings = JSON.parse(
            document.getElementById('theme-strings').textContent
        )
    } catch (e) {}
    if (strings.externalLink) {
        document.documentElement.style.setProperty(
            '--link-ext-label',
            JSON.stringify(strings.externalLink)
        )
    }

    function isNavCollapsed() {
        return !!navbar && navbar.classList.contains('nav-collapsed')
    }

    function setExpanded(el, expanded) {
        el.setAttribute('aria-expanded', expanded ? 'true' : 'false')
    }

    function initThemeToggle() {
        var checkbox = document.getElementById('themeToggle')
        if (!checkbox) return

        var root = document.documentElement
        var wrap = checkbox.closest('.theme-toggle')

        window.addEventListener('pageshow', function () {
            wrap.classList.add('is-syncing')
            window.syncTheme()
            wrap.getBoundingClientRect()
            wrap.classList.remove('is-syncing')
        })

        checkbox.addEventListener('change', function () {
            var next = checkbox.checked ? 'dark' : 'light'
            root.setAttribute('data-theme', next)
            try {
                localStorage.setItem('theme-mode', next)
            } catch (e) {}
        })
    }

    function initNavCollapse() {
        var navLinks = document.getElementById('navLinks')
        var logo = document.querySelector('.logo')
        var navActions = document.querySelector('.navbar-actions')
        if (!navbar || !navLinks || !logo || !navActions) return

        var measureWrap = document.createElement('div')
        measureWrap.className = 'nav-links-measure-wrap'
        var measure = navLinks.cloneNode(true)
        measure.removeAttribute('id')
        measure.setAttribute('aria-hidden', 'true')
        measure.className = 'nav-links-measure'
        measureWrap.appendChild(measure)
        document.body.appendChild(measureWrap)

        function update() {
            var styles = getComputedStyle(navbar)
            var gap = parseFloat(styles.columnGap || styles.gap) || 0
            var available =
                navbar.getBoundingClientRect().width -
                logo.getBoundingClientRect().width -
                navActions.getBoundingClientRect().width -
                gap * 2
            var shouldCollapse = measure.scrollWidth > available
            if (shouldCollapse === isNavCollapsed()) return
            navbar.classList.toggle('nav-collapsed', shouldCollapse)
            document.dispatchEvent(new Event('navcollapsechange'))
        }

        update()
        var logoImage = logo.querySelector('img')
        if (logoImage && !logoImage.complete) {
            logoImage.addEventListener('load', update)
        }
        navbar.getBoundingClientRect()
        navbar.classList.add('nav-ready')
        window.addEventListener('resize', update)
    }

    function initHamburgerNav() {
        var toggle = document.getElementById('navToggle')
        var nav = document.getElementById('navLinks')
        if (!toggle || !nav) return

        function setOpen(open) {
            setExpanded(toggle, open)
            nav.classList.toggle('is-open', open)
            if (open) {
                nav.querySelectorAll('.dropdown-toggle.active').forEach(
                    function (groupToggle) {
                        groupToggle.parentElement.classList.add('is-open')
                        setExpanded(groupToggle, true)
                    }
                )
            } else {
                nav.querySelectorAll('.dropdown.is-open').forEach(
                    function (group) {
                        group.classList.remove('is-open')
                        var groupToggle =
                            group.querySelector('.dropdown-toggle')
                        if (groupToggle) setExpanded(groupToggle, false)
                    }
                )
            }
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true')
        })

        nav.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') setOpen(false)
        })

        document.addEventListener('click', function (event) {
            if (
                toggle.getAttribute('aria-expanded') === 'true' &&
                !nav.contains(event.target) &&
                !toggle.contains(event.target)
            ) {
                setOpen(false)
            }
        })

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setOpen(false)
        })

        document.addEventListener('navcollapsechange', function () {
            if (!isNavCollapsed()) setOpen(false)
        })
    }

    function initDropdowns() {
        document.querySelectorAll('.dropdown').forEach(function (group) {
            var toggle = group.querySelector('.dropdown-toggle')

            function sync() {
                var open = isNavCollapsed()
                    ? group.classList.contains('is-open')
                    : group.classList.contains('is-open') ||
                      group.matches(':hover') ||
                      group.contains(document.activeElement)
                setExpanded(toggle, open)
            }

            group.addEventListener('mouseenter', sync)
            group.addEventListener('mouseleave', sync)
            group.addEventListener('focusin', sync)
            group.addEventListener('focusout', sync)

            toggle.addEventListener('click', function () {
                if (isNavCollapsed()) {
                    group.classList.toggle('is-open')
                    sync()
                } else {
                    toggle.blur()
                    sync()
                }
            })

            group.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    group.classList.remove('is-open')
                    toggle.blur()
                    sync()
                }
            })

            document.addEventListener('navcollapsechange', sync)
        })
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text)
        }
        return new Promise(function (resolve, reject) {
            var previous = document.activeElement
            var area = document.createElement('textarea')
            area.value = text
            area.setAttribute('readonly', '')
            area.style.position = 'fixed'
            area.style.opacity = '0'
            document.body.appendChild(area)
            area.select()
            var ok = document.execCommand('copy')
            document.body.removeChild(area)
            if (previous && previous.focus) previous.focus()
            if (ok) resolve()
            else reject(new Error('copy failed'))
        })
    }

    function initCopyButtons() {
        document.querySelectorAll('.highlight').forEach(function (block) {
            var code =
                block.querySelector('.code pre') || block.querySelector('pre')
            if (!code) return

            var button = document.createElement('button')
            button.type = 'button'
            button.className = 'copy-button'
            button.setAttribute('aria-label', strings.copyCode)

            var status = document.createElement('span')
            status.className = 'sr-only'
            status.setAttribute('role', 'status')

            var timer
            function report(message, copied) {
                clearTimeout(timer)
                status.textContent = message
                button.classList.toggle('copied', copied)
                timer = setTimeout(function () {
                    status.textContent = ''
                    button.classList.remove('copied')
                }, 1500)
            }

            button.addEventListener('click', function () {
                copyText(code.textContent.trimEnd()).then(
                    function () {
                        report(strings.copied, true)
                    },
                    function () {
                        report(strings.copyFailed, false)
                    }
                )
            })

            block.appendChild(button)
            block.appendChild(status)
        })
    }

    function initScrollRegions() {
        var regions = []

        document
            .querySelectorAll(
                '#content table:not(.highlighttable), .content-card table:not(.highlighttable)'
            )
            .forEach(function (table) {
                var wrap = document.createElement('div')
                wrap.className = 'table-scroll'
                table.parentNode.insertBefore(wrap, table)
                wrap.appendChild(table)
                regions.push(wrap)
            })

        document
            .querySelectorAll('.highlight .code pre, .highlight > pre')
            .forEach(function (pre) {
                regions.push(pre)
            })

        function update() {
            regions.forEach(function (el) {
                var scrolls = el.scrollWidth > el.clientWidth
                if (scrolls) el.setAttribute('tabindex', '0')
                else el.removeAttribute('tabindex')
                if (el.className === 'table-scroll') {
                    if (scrolls) {
                        el.setAttribute('role', 'region')
                        el.setAttribute('aria-label', strings.scrollableTable)
                    } else {
                        el.removeAttribute('role')
                        el.removeAttribute('aria-label')
                    }
                }
            })
        }

        update()
        window.addEventListener('resize', update)
    }

    initThemeToggle()
    initNavCollapse()
    initHamburgerNav()
    initDropdowns()
    initCopyButtons()
    initScrollRegions()
})()
