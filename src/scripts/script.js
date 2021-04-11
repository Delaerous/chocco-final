

const fullMenu = $(".menu__mobile");
const hamburger = $(".hamburger");
const body = $('body');
const link = $('.menu__link');

hamburger.on('click', e => {
  e.preventDefault();
  if ($(fullMenu).hasClass('menu__mobile-active')) {

    $(hamburger).removeClass('hamburger-active');
    $(body).removeClass('body__block');
    $(fullMenu).removeClass('menu__mobile-active')
  } else {
    $(fullMenu).addClass('menu__mobile-active');
    $(hamburger).addClass('hamburger-active');
    $(body).addClass('body__block');
  }
});

link.on('click', (e) => {
  e.preventDefault();
  const curLink = $(e.currentTarget);
  const dataValue = curLink.attr('data-scroll-to');
  scrollToSection(dataValue); 
  if ($("body").hasClass('body__block')) {
    $(hamburger).removeClass('hamburger-active');
    $(body).removeClass('body__block');
    $(fullMenu).removeClass('menu__mobile-active');
  }
})

const scrollToSection = (value) => {
  const elem = document.querySelector(`[data-section=${value}]`);
  window.scroll({
    left: 0,
    top: elem.offsetTop,
    behavior: "smooth"
  });
}
