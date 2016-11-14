/**
 * Arquivo: Service.js
 * Author: Glaucia Lemos
 * Data: 11/14/2016
 * Description: Arquivo responsável por consumir os métodos criados no Controller - WebApi 
 *  no lado do server-side através do Angular.Js
 */

app.service("integritasService", function($http) {

    /**
     * Retornando a Api GetAllProducts
     */
    this.GetAllProducts = function() {
        return $http.get("/api/v1/public/products");
    }
   
    /*
     * Retornando a Api GetById
     */
    this.GetById = function(id) {
        return $http.get("/api/v1/public/product" + id);
    }

    /*
     * Retornando a Api UpdateProduct
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

    /*
     * Retornando a Api CreateProduct
     */
    this.CreateProduct = function (product) {
        var response = $http({
            method: "post",
            url: "/api/v1/public/postProduct",
            data: JSON.stringify(product),
            dataType: "json"
        });

        return response;
    }
});