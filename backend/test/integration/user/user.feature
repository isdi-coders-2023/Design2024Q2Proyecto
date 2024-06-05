Feature: Registro usuarios

  Scenario: El usuario se registra correctamente
    Given Soy un nuevo usuario
    When Hago una peticion POST al endpoint "/api/user" con el cuerpo:
    """
    {
        "email": "alice@prisma.io",
        "name": "Alice",
        "password": "IamAlice",
        "surname": "Smith",
        "documentId": "75533442Q",
        "birthday": "12/10/2012",
        "phoneNumber": "+44625021454",
        "address": "pink road, 45",
        "city": "London",
        "postalCode": "08014",
        "iban": "ES6301880528345815513946",
        "occupationTarget": null,
        "employeePosition": null
    }
    """
    Then Debo ser respuesto con un statusCode 201
    Then El usario con id 1 debe ser persistido en base datos

  Scenario: El usuario se registra correctamente
    Given Soy un nuevo usuario
    When Hago una peticion POST al endpoint "/api/user" con el cuerpo:
    """
    {
        "email": "",
        "name": "",
        "password": "",
        "surname": "",
        "documentId": "",
        "birthday": "",
        "phoneNumber": "",
        "address": "",
        "city": "",
        "postalCode": "",
        "iban": "",
        "occupationTarget": null,
        "employeePosition": null
    }
    """
    Then Debo ser respuesto con un statusCode 422
    Then El respuesta debe ser
    """
    {
      "statusCode": 422,
      "message": "Error validando los campos"
    }
    """

    
