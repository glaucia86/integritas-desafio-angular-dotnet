/**
 * Arquivo: Controller.js
 * Author: Glaucia Lemos
 * Data: 11/14/2016
 * Description: Arquivo responsável por retornar os controles dos dados vindos do lado Serviço e
 * do Controller do WebApi
 */

app.controller("integritasCtrl", function ($scope, integritasService) {

    $scope.divProduct = false;

    getAllProducts();

    /*
     * Função responsável por retornar um determinado Produto por Id pela ação do Botão
     */
    $scope.getById = function (product) {

        var productData = integritasService.GetById(product.Id);

        productData.then(function (_product) {
            $scope.product = _product.data;
            $scope.ProductIdId = _product.Id;
            $scope.ProductName = _product.ProductName;
            $scope.ProductType = _product.ProductType;
            $scope.Quantity = _product.Quantity;
            $scope.Price = _product.Price;
            $scope.Action = "Atualizar";
            $scope.divProduct = true;
        }, function () {
            toastr["error"]("Erro ao retornar Produto Por Id!", "Integritas System");
        });
    }

    /*
     * Função responsável por adicionar e criar um produto pela ação do Botão
     */
    $scope.createUpdateProduct = function() {

        var product = {
            ProductName: $scope.ProductName,
            ProductType: $scope.ProductType,
            Quantity: $scope.Quantity,
            Price: $scope.Price
        };

        var action = $scope.Action;

        if (action == "Atualizar") {
            product.Id = $scope.ProductId;

            var productData = integritasService.UpdateProduct(product);

            productData.then(function (data) {
                getAllProducts();
                $scope.divProduct = false;

                if (data.status == 200) {
                    toastr["success"]("Produto Atualiazado com Sucesso!", "Integritas System");
                }
            }, function() {
                toastr["error"]("Erro ao Atualizar Produto!", "Integritas System");
            });
        } else {
            var productData = integritasService.CreateProduct(product);

            productData.then(function(data) {
                getAllProducts();

                if (data.status == 200) {
                    toastr["success"]("Produto Cadastrado com Sucesso!", "Integritas System");
                }

                $scope.divProduct = false;
            }, function () {
                toastr["error"]("Erro ao Cadastrar Produto!", "Integritas System");
            });
        }
    }

    $scope.createProductByDiv = function () {

        limparCampos();
        $scope.Action = "Cadastrar";
        $scope.divProduct = true;
    }

    $scope.cancel = function() {
        $scope.divProduct = false;
    };
    
    /*
     * Função responsável por limpar os campos da table.
     */
    function limparCampos() {
        $scope.ProductName = "";
        $scope.ProductType = "";
        $scope.Quantity = "";
        $scope.Price = "";
    }

    /**
     * Função responsável por retornar os dados do Banco para o lado dos server-side 
     * pelo Angular.Js
     */
    function getAllProducts() {

        //debugger;

        var productsData = integritasService.GetAllProducts();

        productsData.then(function (product) {
            $scope.products = product.data;
        }, function () {
            toastr["error"]("Erro ao retornar todos os Produtos.", "Integritas System");
        });
    }

    /* Função responsável por realizar a exclusão pela ação do botão Excluir */
    $scope.deleteProduct = function (product) {

        var productData = integritasService.DeleteProduct(product.Id);

        productData.then(function (data) {
            if (data.status == 200) {
                toastr["success"]("Produto Excluído com Sucesso!", "Integritas System");
            }

            /* Depois que realizar a exclusão, retornar os produtos gravados na base de dados */
            getAllProducts();

        }, function () {
            toastr["error"]("Erro ao Excluir o Produto.", "Integritas System");
        });
    }
});