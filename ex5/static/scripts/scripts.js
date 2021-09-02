let nav_mousedown_m = 0;

function scrollControl() {
    // toggle class 'disable_scroll' when mobile menu open or close
    document.getElementsByTagName('body')[0].classList.toggle('disable_scroll');
};

function mobile_menu_close() {
    // close mobile menu, un check the checkbox and enable scrolling
    document.getElementById('menu_toggle').checked = false;
    document.getElementsByTagName('body')[0].classList.remove('disable_scroll');
};

function nav_swip_down(event) {
    // when click/touch down in mobile menu get the start coordinate
    if (event.type == 'mousedown') {
        nav_mousedown_m = event.clientX;
    } else {
        nav_mousedown_m = event.touches[0].clientX;
    };
};

function nav_swip_up(event) {
    // when click/touch down in mobile menu and moved to the left close the menu
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

function navLinksEvents() {
    // event listener to close the mobile menu when a link is clicked
    let links = document.getElementsByTagName('nav')[0].children;
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', mobile_menu_close);
    };
};

function mobile_nav_close_listener() {
    // event listeners to close mobile menu when draging left
    document.getElementsByTagName('nav')[0].addEventListener('mousedown', nav_swip_down, true);
    document.getElementsByTagName('nav')[0].addEventListener('touchstart', nav_swip_down, true);
    document.getElementsByTagName('nav')[0].addEventListener('mouseup', nav_swip_up, true);
    document.getElementsByTagName('nav')[0].addEventListener('touchend', nav_swip_up, true);
};

function eventAssign() {
    // assaign all event listeners for the page
    window.addEventListener('resize', mobile_menu_close)
    document.getElementsByClassName('menu_btn')[0].addEventListener('click', scrollControl);
    navLinksEvents();
    mobile_nav_close_listener();
};

eventAssign();
document.onload = mobile_menu_close();