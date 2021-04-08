const find = (find)=>{
  return $(".reviews__item").filter((ndx, item)=>{
    return $(item).attr("data-linked") === find;
  });
};


$(".interactive-avatar__link").click((e)=>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-link");
  const showItem = find(target);
  const currItem = $this.closest(".interactive-avatar");

  showItem.addClass("reviews__item-active").siblings().removeClass("reviews__item-active");
  currItem.addClass("interactive-avatar-active").siblings().removeClass("interactive-avatar-active");
})