@cart
Feature: Carrito de compras en Sauce Demo
  Como cliente de Sauce Demo
  Quiero poder agregar productos al carrito
  Para revisarlos antes de realizar la compra

  Background:
    Given que estoy autenticado como "standard_user"

  @smoke @positive
  Scenario: Agregar un producto al carrito
    When agrego el producto "Sauce Labs Backpack" al carrito
    Then el badge del carrito debe mostrar "1"

  @positive
  Scenario: Ver el producto agregado en el carrito
    When agrego el producto "Sauce Labs Backpack" al carrito
    And navego al carrito de compras
    Then el producto "Sauce Labs Backpack" debe estar en el carrito

  @positive
  Scenario: Agregar múltiples productos al carrito
    When agrego el producto "Sauce Labs Backpack" al carrito
    And agrego el producto "Sauce Labs Bike Light" al carrito
    Then el badge del carrito debe mostrar "2"
    And navego al carrito de compras
    And el carrito debe contener 2 productos

  @positive
  Scenario: Verificar el título de la página del carrito
    When agrego el producto "Sauce Labs Backpack" al carrito
    And navego al carrito de compras
    Then el título de la página del carrito debe ser "Your Cart"
