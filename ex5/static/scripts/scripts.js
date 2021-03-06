let nav_mousedown_m = 0;

/**
 * Toggle class 'disable_scroll' when mobile menu open or close
 */
function scrollControl() {
    document.getElementsByTagName('body')[0].classList.toggle('disable_scroll');
};

/**
 * Close mobile menu, un check the checkbox and enable scrolling.
 */
function mobile_menu_close() {
    document.getElementById('menu_toggle').checked = false;
    document.getElementsByTagName('body')[0].classList.remove('disable_scroll');
};

/**
 * When click/touch down in mobile menu get the start coordinate.
 * 
 * @param {Object} event event object from the listener
 */
function nav_swip_down(event) {
    if (event.type == 'mousedown') {
        nav_mousedown_m = event.clientX;
    } else {
        nav_mousedown_m = event.touches[0].clientX;
    };
};

/**
 * When click/touch down in mobile menu and moved to the left close the menu.
 * 
 * @param {Object} event event object from the listener
 */
function nav_swip_up(event) {
    if (event.type == 'mouseup') {
        if (event.clientX < nav_mousedown_m) {
            mobile_menu_close();
        };
    } else {
        if (event.changedTouches[0].clientX < nav_mousedown_m) {
            mobile_menu_close();
        };
    };
};

/**
 * Event listener to close the mobile menu when a link is clicked.
 */
function navLinksEvents() {
    let links = document.getElementsByTagName('nav')[0].children;
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', mobile_menu_close);
    };
};

/**
 * Event listeners to close mobile menu when draging left.
 */
function mobile_nav_close_listener() {
    document.getElementsByTagName('nav')[0].addEventListener('mousedown', nav_swip_down);
    document.getElementsByTagName('nav')[0].addEventListener('touchstart', nav_swip_down);
    document.getElementsByTagName('nav')[0].addEventListener('mouseup', nav_swip_up);
    document.getElementsByTagName('nav')[0].addEventListener('touchend', nav_swip_up);
};

/**
 * Switch display from python to web projects.
 */
function project_tab_switch() {
    let tab_offset = document.getElementById(this.dataset.show).offsetLeft;
    document.getElementById('projects_continer').className = this.dataset.show;
    document.getElementById('projects_folder').scrollTo({ left: tab_offset, top: 0, behavior: 'smooth' });
    document.querySelectorAll('.projects_tab').forEach((tab) => { tab.classList.add('sunken_tab') });
    this.classList.remove('sunken_tab');
};

/**
 * Assaign all event listeners for the page.
 */
function eventAssign() {
    window.addEventListener('resize', mobile_menu_close);
    document.getElementsByClassName('menu_btn')[0].addEventListener('click', scrollControl);
    navLinksEvents();
    mobile_nav_close_listener();
    document.querySelectorAll('.projects_tab').forEach((tab) => {
        tab.addEventListener('click', project_tab_switch);
    });
};

/**
 * Show or hide projects according to page position.
 */
function show_hide_projects() {
    let folder = document.getElementById('projects_folder');
    if (folder.getBoundingClientRect().y > window.innerHeight || folder.getBoundingClientRect().bottom < 0) { return };
    let zip = [document.getElementById('python_projects').children, document.getElementById('web_projects').children];
    let max;
    zip[0].length > zip[1].length ? max = zip[0].length : max = zip[1].length;
    for (let i = 0; i < max; i++) {
        let projet_pos = zip[0][i].getBoundingClientRect();
        if (!document.getElementById('projects_folder').classList.contains('python_tab')) { projet_pos = zip[1][i].getBoundingClientRect() };
        if (projet_pos.bottom - (projet_pos.height * 0.7) <= window.innerHeight) {
            zip[0][i].classList.remove('hide');
            if (zip[1][i]) { zip[1][i].classList.remove('hide'); }
        } else {
            zip[0][i].classList.add('hide');
            if (zip[1][i]) { zip[1][i].classList.add('hide'); }
        };
    };
};

eventAssign();
window.onload = () => {
    mobile_menu_close();
    show_hide_projects();
    document.getElementById('projects_folder').scrollTo(0, 0);
};
window.onresize = () => {
    show_hide_projects();
    document.querySelector('.projects_tab.' + document.getElementById('projects_continer').className).click();
};
window.addEventListener('scroll', show_hide_projects);