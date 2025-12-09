$(document).ready(function() {
  $('.slider').slick({
    slidesToShow: 3,      // показывать 3 слайда на десктопе
    slidesToScroll: 1,    // прокручивать по 1 слайду
    arrows: true,         // включить стрелки
    dots: true,          // включить пейджер (точки)
    appendDots: $('.pager'), // контейнер для пейджера
    responsive: [
      {
        breakpoint: 768,  // для экранов меньше 768px
        settings: {
          slidesToShow: 1,  // показывать 1 слайд
          slidesToScroll: 1
        }
      }
    ],
    speed: 300,         // скорость анимации (мс)
    draggable: true,     // разрешить перетаскивание мышью/пальцем
    infinite: false     // отключить бесконечную прокрутку
  });
});
