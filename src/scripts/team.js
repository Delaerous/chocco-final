const openItem = (person) => {
    const container = person.closest(".team__item");
    const contentBlock = container.find(".team__description");
    const textBlock = contentBlock.find(".team__description-block");
    const reqHeight = textBlock.height();
    const arrow = container.find(".team__arrow");

    arrow.addClass("team__arrow_up");
    container.addClass("active");
    contentBlock.height(reqHeight);
};

const closeEveryItem = (container) => {
    const items = container.find(".team__description");
    const itemContainer = container.find(".team__item");
    const arrowUp = container.find(".team__arrow");

    arrowUp.removeClass("team__arrow_up");
    itemContainer.removeClass("active");
    items.height(0);
};

$(".team__item").click((e) => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
})