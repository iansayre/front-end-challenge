var domObj = function() {
    var self = this;
    self.products = [];

    self.getProducts = function(url) {
        $.getJSON( url, function(response) {
            for( i = 0; i < response.sales.length; i++ ){
                self.products.push( new self.productObj( response.sales[i], i) );
            }
        });
    };

    self.updateDom = function(){
        var contentNode = document.getElementById('content'),
            divRow = '<div class="row"></div>';

        for ( var i = 0; i < self.products.length; i++ ) {
            console.log('appenedin some thigns');
            if ( i % 3 === 0 ) {
                contentNode.innerHTML = divRow;
            }
            self.updateHtml(self.products[i], i);
        }
    };

    self.productObj = function(product, i) {
        var prod              = this;
            prod.photo        = product.photos.medium_half;
            prod.title        = product.name;
            prod.tagline      = product.tagline;
            prod.url          = product.url;
            prod.custom_class = 'col-' + ( ( i % 3) +1 );

        return( self.updateDom(prod) );
    };

    self.updateHtml = function(product, i) {
        console.log('update it brah!');
        var row = document.getElementsByClassName('row')[i % 3];
        console.log('found dat row');
       $(row).load('product-template.html');
    };

    /*self.getHtmlTemplate = function() {
        var template = '<!--#include file="product-template.html"-->';
        return(template);
    };*/
};





/*function domobj() {
  var self = this;
  self.products = [];

  self.getproducts = function(url){
    $.getJSON(url, function(response){
        console.log(response);
        for( i = 0; i < response.sales.length ; i++ ){
          self.products.push( new productobj(response.sales[i], i)  );
        }
      console.log('PRODUCTS! : '  + self.products);
    });
    page.updateproducthtml();
    page.updatedom();
  };

  self.updateproducthtml = function(){
    console.log('UPDATEPRODUCTHTML CALLED!!');
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml();
    }
  };

  self.updatedom = function(){
    var i=0;
    thishtml='';
    for( i = 0; i < self.products.length; i++){
      if (i % 3 === 0 ){
        thishtml += "<div class='row'>";
        console.log("START");
      }
      thishtml += self.products[i].htmlview;
      if ( (i % 3 === 2) || i === (self.products.length-1) ){
        thishtml += "</div>";
        console.log("FINISH");
      }
    }
    $("#content").append(thishtml);
  };
}

function productobj(product, i){
  // console.dir('WHAT IS GOING ON?! ' + product);
  var self          = this;
  console.log(self);
  self.photo        = product.photos.medium_half;
  console.log(self.photo);
  self.title        = product.name;
  console.log(self.name);
  self.tagline      = product.tagline;
  console.log(self.tagline);
  self.url          = product.url;
  self.htmlview     = "";
  self.index        = i;
  self.custom_class = "col"+ ((i % 3) +1);
  self.updatehtml = function(){
    var template = 'product-template.html';
    console.log('TEMPLATE!!! : ' + template);
    $.get(template, function(){
      self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{custom_class}', self.custom_class);
      console.dir('&*&*&*! ' + self.htmlview);
    });
  };
  self.updatehtml();
}*/


var page = new domObj();

page.getProducts('data.json');
