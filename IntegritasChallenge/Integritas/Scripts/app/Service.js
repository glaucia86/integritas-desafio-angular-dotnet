/**
 * Arquivo: Service.js
 * Author: Glaucia Lemos
 * Data: 11/14/2016
 * Description: Arquivo responsável por consumir os métodos criados no Controller - WebApi 
 *  no lado do server-side através do Angular.Js
 */

app.service("integritasService", function($http) {

    this.GetAllProducts = function() {
        return $http.get("/api/v1/public/products");
    }
   
});