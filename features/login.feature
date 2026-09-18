@login
Feature: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero poder iniciar sesión en la aplicación
  Para poder acceder a los productos y realizar compras

  Background:
    Given que estoy en la página de login de Sauce Demo

  @smoke @positive
  Scenario: Login exitoso con usuario estándar
    When ingreso el usuario "standard_user" y la contraseña "secret_sauce"
    Then debería ser redirigido a la página de productos

  @negative
  Scenario Outline: Login fallido con credenciales inválidas
    When ingreso el usuario "<usuario>" y la contraseña "<password>"
    Then debería ver el mensaje de error "<mensaje>"

    Examples:
      | usuario         | password     | mensaje                                                                   |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
      | invalid_user    | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
      | standard_user   |              | Epic sadface: Password is required                                        |
      |                 | secret_sauce | Epic sadface: Username is required                                        |
