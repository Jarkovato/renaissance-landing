# renaissance-landing
example langing page html5, scss, jquery, gulp

Тестовое задание по условиям: 
Верстка должна быть выполнена по методологии БЭМ
Верстка должна максимально соответствовать предоставленному макету и ui-киту. Желательно PixelPerfect. Адаптив делать не нужно.
Результат должен корректно отображаться во всех популярных браузерах, включая IE 11 версии при разрешении экрана 1200px и выше
При работе над заданием обязательно использование средств автоматизации (webpack или gulp). Конфигурацию мы не предоставляем. Конфигурация должна корректно работать на 12 версии Node.js
Обязательно использование scss при выполнении тестового задания (именно scss, не sass)
Запрещено использовать css-фреймворки (bootstrap, foundation и т.д.)
Кнопка “купить” должна реализовывать следующий функционал:
по ее нажатию должен отправляться ajax запрос методом get по адресу https://jsonplaceholder.typicode.com/posts/1 или https://reqres.in/api/products/3
На время выполнения запроса вместо надписи “купить” должен появляться лоадер. Внешний вид лоадера необходимо продумать самостоятельно
После удачного запроса внешний вид кнопки должен менять состояние: “в корзине”
После перезагрузки страницы состояния товаров (в корзине он или нет) должно сохраняться
Для запросов к серверу использовать fetch или axios. Не забудьте про поддержку IE11
