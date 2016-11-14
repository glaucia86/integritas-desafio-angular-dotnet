/**
 * Arquivo: Controller.js
 * Author: Glaucia Lemos
 * Data: 11/14/2016
 * Description: Arquivo responsável por retornar os controles dos dados vindos do lado Serviço e
 * do Controller do WebApi
 */

app.controller("integritasCtrl", function($scope, integritasService) {

    $scope.divProduct = false;

    getAllProducts();

    /**
     * Função responsável por retornar os dados do Banco para o lado dos server-side 
     * pelo Angular.Js
     */
    function getAllProducts() {

        debugger;

        var productsData = integritasService.GetAllProducts();

        productsData.then(function(product) {
            $scope.products = product.data;
        }, function() {
            toastr["error"]("Erro ao retornar todos os Produtos.", "Integritas System");
        });
    }

    /* Função responsável por realizar a exclusão pela ação do botão Excluir */
    $scope.deleteProduct = function (product) {

        var productData = integritasService.DeleteProduct(product.Id);

        productData.then(function(data) {
            if (data.status == 200) {
                toastr["success"]("Produto Excluído com Sucesso!", "Integritas System");
            }

            /* Depois que realizar a exclusão, retornar os produtos gravados na base de dados */
            getAllProducts();

        }, function() {
            toastr["error"]("Erro ao Excluir o Produto.", "Integritas System");
        });
    }
});