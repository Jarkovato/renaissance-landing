$(function () {
  //get classNames from localStorage
  function getClassFromLocalStorage(i) {
    return localStorage.getItem(`btnIndex` + i);
  }
  //get text from localStorage
  function getTextFromLocalStorage(i) {
    return localStorage.getItem(`btnText` + i);
  }
  //buttons forEach
  $(".item__btn").each(function (index, element) {
    let localStorageClass = getClassFromLocalStorage(index);
    let localStorageText = getTextFromLocalStorage(index);
    //get props from storage
    if (localStorageClass != null && localStorageClass != '' && localStorageClass != undefined) {
      $(this).removeClass('item__btn btn').addClass(`${localStorageClass}`);
    }
    if (localStorageText != null && localStorageText != '' && localStorageText != undefined) {
      $(this).text(`${localStorageText}`);
    }
    //click function
    element.addEventListener("click", function () {
      //fetch
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(() => {
          $(this).text("Загрузка");
          $(this).addClass("btn-loading");
        })
        .then(() => {
          setTimeout(() => {
            if (!$(this).hasClass("btn-success")) {
              $(this).text("В корзине");
              $(this).removeClass("btn-loading");
              $(this).addClass("btn-success");
              localStorage.setItem('btnIndex' + index, $(this).attr('class'))
              localStorage.setItem('btnText' + index, $(this).text())
            } else {
              $(this).removeClass("btn-loading");
              $(this).text("Купить");
              $(this).removeClass("btn-success");
              localStorage.setItem('btnIndex' + index, $(this).attr('class'))
              localStorage.setItem('btnText' + index, $(this).text())
            }
          }, 1000)
        })
        .catch(err => alert(err));
    });
  });
});
