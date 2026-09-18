@checkout
Feature: Proceso de compra en Sauce Demo
  Como cliente de Sauce Demo
  Quiero completar el proceso de compra
  Para adquirir los productos que necesito

  Background:
    Given que estoy autenticado como "standard_user"
    And he agregado el producto "Sauce Labs Backpack" al carrito
    And he navegado al carrito de compras

  @smoke @positive
  Scenario: Completar el proceso de compra exitosamente
    When inicio el proceso de checkout
    And completo la información con nombre "John", apellido "Doe" y código postal "12345"
    And continúo al resumen del pedido
    And finalizo el pedido
    Then debería ver el mensaje de confirmación

  @positive
  Scenario: Verificar resumen del pedido antes de confirmar
    When inicio el proceso de checkout
    And completo la información con nombre "Jane", apellido "Smith" y código postal "67890"
    And continúo al resumen del pedido
    Then el producto "Sauce Labs Backpack" debe aparecer en el resumen

  @negative
  Scenario: Error al omitir el nombre en el formulario de checkout
    When inicio el proceso de checkout
    And completo la información con nombre "", apellido "Doe" y código postal "12345"
    And continúo al resumen del pedido
    Then debería ver un error en el formulario "Error: First Name is required"

  @negative
  Scenario: Error al omitir el código postal en el formulario de checkout
    When inicio el proceso de checkout
    And completo la información con nombre "John", apellido "Doe" y código postal ""
    And continúo al resumen del pedido
    Then debería ver un error en el formulario "Error: Postal Code is required"
