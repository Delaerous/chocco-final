const validateFields = (form, fildsArray) => {
     
    fildsArray.forEach((field) => {
        field.removeClass("input-error");
        if (field.val().trim() == "") {
            field.addClass("input-error"); 
        }
    });

const errorFields = form.find(".input-error");
return errorFields.length == 0;
}

$("#form").on("submit", function(event) {
    event.preventDefault();
    const form = $(event.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const modal = $("#modal");
    const content = modal.find(".modal__content");

    modal.removeClass("error-modal");

    const isValid = validateFields(form, [name, phone, comment]);
    

if (isValid) {
        openModal();
}
});



function openModal(content) {
    $(".modal").addClass("modal-active");
    $("body").addClass("blocked");
    
}

$(".js-modal--close").click(function(event){
    event.preventDefault();
    $(".modal").removeClass("modal-active");
    $("body").removeClass("blocked");
    
})


