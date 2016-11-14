/**
 * Arquivo: Service.js
 * Author: Glaucia Lemos
 * Data: 11/14/2016
 * Description: Arquivo responsável por consumir os métodos criados no Controller - WebApi 
 *  no lado do server-side através do Angular.Js
 */

app.service("integritasService", function($http) {

    /**
     * Aqui estamos retornando todos os produtos cadastrados na Base de dados
     */
    this.GetAllProducts = function() {
        return $http.get("/api/v1/public/products");
    }
   
    /*
     * Retornando um determinado Produto pelo Id
     */
    this.GetById = function(id) {
        return $http.get("/api/v1/public/product" + id);
    }

    /*
     * Retornando a atualização do Produto
     */
    this.UpdateProduct = function(product) {
        var response = $http({
            method: "put",
            url: "/api/v1/public/updateProduct",
            data: JSON.stringify(product),
            dataType: "json"
        });

        return response;
    }
});