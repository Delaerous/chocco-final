const slyder = $('.product__list').bxSlider({
    pager : false,
    controls : false
  });
  
  $(".arrow-left").click(e =>{
    e.preventDefault();
  
    slyder.goToPrevSlide();
  
  });
  
  $(".arrow-right").click(e =>{
  
    e.preventDefault();
  
    slyder.goToNextSlide();
  });

  