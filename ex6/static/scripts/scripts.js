let nav_mousedown_m = 0;
let scroll_under_500 = false;

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
    document.getElementsByTagName('nav')[0].addEventListener('mousedown', nav_swip_down, true);
    document.getElementsByTagName('nav')[0].addEventListener('touchstart', nav_swip_down, true);
    document.getElementsByTagName('nav')[0].addEventListener('mouseup', nav_swip_up, true);
    document.getElementsByTagName('nav')[0].addEventListener('touchend', nav_swip_up, true);
};

/**
 * Assaign all event listeners for the page.
 */
function eventAssign() {
    window.addEventListener('resize', mobile_menu_close)
    document.getElementsByClassName('menu_btn')[0].addEventListener('click', scrollControl);
    navLinksEvents();
    mobile_nav_close_listener();
};

/**
 * Get and show the data from the form to the span below.
 */
function read_form() {
    let data_arry = document.querySelectorAll(".form_input");
    let show = document.querySelectorAll(".span_data");
    show.forEach((span, index) => {
        span.innerHTML = data_arry[index].value;
    });
    if (document.getElementById('age').value >= 18) {
        document.getElementById('naughty_section').classList.remove('hide');
    } else {
        document.getElementById('naughty_section').classList.add('hide');
        alert("Need to be at least 18 to see more");
    };
};


/**
 * Change the scroll message according to window.scrollY/ 
 */
function scroll_msg() {
    if (scroll_under_500 == true) {
        scroll_under_500 = false;
        document.getElementById('scroll_msg').innerHTML = 'rolling back up';
    } else if (window.scrollY >= 500) {
        scroll_under_500 = true;
    } else if (window.scrollY < 100) {
        document.getElementById('scroll_msg').innerHTML = 'we are going down';
    };
};

eventAssign();
document.addEventListener("scroll", scroll_msg);
document.onload = mobile_menu_close();