1. Создайте API-ключ для метода «Модуль авторизации»
2. Вызовите API модуля для генерации и отправки кода

```
POST https://direct.i-dgtl.ru/api/v1/verifier/send
Authorization: Basic {ваш ключ}
Content-Type: application/json
{
    "channelType": "SMS",
    "destination": "номер абонента, которому надо отправить код",
    "gatewayId": "ptOGx1"
}
```

3. Вызовите API модуля для проверки кода

```
POST https://direct.i-dgtl.ru/api/v1/verifier/check
Authorization: Basic {ваш ключ}
Content-Type: application/json
{
"uuid": "uuid из ответа на запрос предыдущего шага",
"code": "код, который ввел абонент"
}
```

c3RldmVyOmNsaWVudDp0ZXN0
