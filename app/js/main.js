window.onload = () => {
  //get classNames from localStorage
  function getClassFromLocalStorage(i) {
    let result = localStorage.getItem(`btnIndex` + i);
    if (typeof result === "string") {
      return result.split(" ");
    }
  }
  //get text from localStorage
  function getTextFromLocalStorage(i) {
    return localStorage.getItem(`btnText` + i);
  }
  //buttons forEach
  document.querySelectorAll(".item__btn").forEach((element, index) => {
    let localStorageClass = getClassFromLocalStorage(index);
    let localStorageText = getTextFromLocalStorage(index);
    //get props from storage
    if (
      localStorageClass != null &&
      localStorageClass != "" &&
      localStorageClass != undefined
    ) {
      element.classList.remove("item__btn", "btn");
      localStorageClass.forEach((className) => {
        element.classList.add(className);
        console.log(className);
      });
    }
    if (
      localStorageText != null &&
      localStorageText != "" &&
      localStorageText != undefined
    ) {
      element.innerHTML = `${localStorageText}`;
    }
    //click function
    element.addEventListener("click", function () {
      //fetch
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(() => {
          element.innerHTML = "Загрузка";
          element.classList.add("btn-loading");
        })
        .then(() => {
          setTimeout(() => {
            if (!element.classList.contains("btn-success")) {
              element.innerHTML = "В корзине";
              element.classList.remove("btn-loading");
              element.classList.add("btn-success");
              localStorage.setItem("btnIndex" + index, element.classList.value);
              localStorage.setItem("btnText" + index, element.innerHTML);
            } else {
              element.classList.remove("btn-loading");
              element.innerHTML = "Купить";
              element.classList.remove("btn-success");
              localStorage.setItem("btnIndex" + index, element.classList.value);
              localStorage.setItem("btnText" + index, element.innerHTML);
            }
          }, 1000);
        })
        .catch((err) => alert(err));
    });
  });
};
