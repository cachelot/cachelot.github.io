/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar-main").style.top = "0";
    } else if (currentScrollPos > 100) {
        document.getElementById("navbar-main").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}