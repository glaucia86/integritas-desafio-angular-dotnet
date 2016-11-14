/**
 * Arquivo: SController.js
 * Author: Glaucia Lemos
 * Data: 11/14/2016
 * Description: Arquivo responsável por retornar os controles dos dados vindos do lado Serviço e
 * do Controller do WebApi
 */

app.controller("integritasCtrl", function($scope, integritasService) {

    $scope.divProduct = false;

    getAllProducts();

    /*
     * Função responsável por retornar os dados dos Produtos
     *  vindos do arquivo: Service.js
     */
    function getAllProducts() {

        //debugger;

        var productsData = integritasService.GetAllProducts();

        productsData.then(function (product) {

            $scope.products = product.data;
        }, function() {
            toastr["error"]("Erro ao retornar todos os Produtos", "Integritas System");
        });
    }
});