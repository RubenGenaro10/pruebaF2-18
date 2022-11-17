const jsProductos = 
    [
        {
            id: 1,
            name: "Polo De Cuello Clásico",
            price: 69.95,
            stock: 7,
            image: "images/products/1.jpg",
            category: "verano",
            description:"Compra Online tu Polo Madison Con Cuello En Jersey Hombre y conviértelo en pieza clave de tu outfit esta temporada de primavera verano."
        },
        {
            id: 2,
            name: "Chaqueta de mujer",
            price: 149.95,
            stock: 15,
            image: "images/products/2.jpg",
            category: "invierno",
            description : "Compra Online tu Casaca Cortaviento 1 Mujer y conviértela en pieza clave de tu outfit esta temporada de otoño invierno."
        },
        {
            id: 3,
            name: "Short Sfera Denim Basica",
            price: 44.95,
            stock: 13,
            image: "images/products/3.jpg",
            category: "verano",
            description: "Bermuda básica denim con cierre de botón y cremallera."
        },
        {
            id: 4,
            name: "Producto 4",
            price: 74.95,
            stock: 15,
            image: "images/products/4.jpg",
            category: "verano",
            description : "Material: tela Oxford, tela de nylon. Color: gris y negro. Tamaño: 9x4x13cm Características: 1. Hecho de tela Oxford de alta calidad, duradera y resistente a la suciedad, fácil de limpiar. 2. El diseño de cierre de nylon puede evitar que las golosinas y artículos de mascotas se caigan, y es fácil llevar la comida. 3. El Pequeño bolsillo de malla separado es cómodo de usar como bolsa de basura. 4. La hebilla es fácil y estable de fijar en el cinturón que puede liberar sus manos y es fácil de llevar. 5. Aplicable a escuelas de entrenamiento de mascotas, competiciones de mascotas, caminatas personales de perros, etc. 6. Hay 3 diseños hermosos diferentes para usted."
        },
        {
            id: 5,
            name: "Zapatillas Urbanas",
            price: 109.95,
            stock: 25,
            image: "images/products/5.jpg",
            category: "zapatillas",
            description : "Disfruta de lo más nuevo, Zapatillas Urbanas para Mujer Vans Sk8-Hi Tapered Vn0A5Kruvd3.Ub.W Celeste que Oechsle.pe tiene para ti. ¡Elige tus favoritos y arma tu mejor outfit esta temporada!"
        },
        {
            id: 6,
            name: "Zapatillas Converse",
            price: 74.99,
            stock: 10,
            image: "images/products/6.jpg",
            category: "zapatillas",
            description : "Disfruta de lo más nuevo, Zapatillas Converse Urbanas Mujer 560845C Verde que Oechsle.pe tiene para ti. ¡Elige tus favoritos y arma tu mejor outfit esta temporada!"
        },
        {
            id: 7,
            name: "Camisa Madison Miniprint",
            price: 89.95,
            stock: 4,
            image: "images/products/7.jpg",
            category: "camisa",
            description : "Compra Online tu Camisa Madison Miniprint Hombre y conviértelo en pieza clave de tu outfit esta temporada de primavera verano."
        },
        {
            id: 8,
            name: "Camisa Madison Solida",
            price: 82.95,
            stock: 9,
            image: "images/products/8.jpg",
            category: "camisa",
            description : "Compra Online tu Camisa Madison Solida Hombre y conviértelo en pieza clave de tu outfit esta temporada de primavera verano."
        }
];
const carrito=[];

let app = angular.module("mi-app",['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl: "templates/home.html",
        controller:"productController"
    })
    .when("/catalogo-productos",{
        templateUrl: "templates/catalogo-productos.html",
        controller:"productController"
    })
    .when("/detalle-producto/:id",{
        templateUrl:"templates/producto-detalles.html",
        controller:"productController"
    })
    .otherwise("/");
});
app.controller("productController",function($scope,$routeParams){
    
	const productos = JSON.stringify(jsProductos);
    const objProductos = JSON.parse(productos);

    let idCart = 1;
    $scope.productos = objProductos;
    $scope.carrito=carrito;
    $scope.detalleProducto = $scope.productos.find(obj=>{
        return obj.id == $routeParams.id;
    });
    $scope.addToCart = function(id){
        let amount = 1;
        let itemCart = $scope.carrito.find(itemCart=>{return itemCart.idProducto == id;});
        let itemCartExists = itemCart != undefined ? true: false;

        if(!itemCartExists){
            let producto = $scope.productos.find(obj=>{
                return obj.id == id;
            });
            $scope.carrito.push({id:idCart,idProducto:producto.id,name: producto.name,image:producto.image,price:producto.price,amount:amount,total:producto.price*amount})
            idCart++;
        }else{
            $scope.increaseAmount(itemCart.id);
        }
    }

    $scope.getTotalAmountCarrito = function(){
        let totalAmount = $scope.carrito.reduce((acc,itemCart)=>{
            return acc + itemCart.amount;
        },0);
        return totalAmount;
    }

    $scope.getTotalPriceCarrito = function(){
        let total = 0;
        $scope.carrito.forEach(product =>{
            total += parseFloat(product.total);
        });
        return total.toFixed(2);
    }

    $scope.removeItemCart = function(id){
        let itemCart = $scope.carrito.find(obj=>{
            return obj.id == id;
        });
        let indexItem = $scope.carrito.indexOf(itemCart);
        $scope.carrito.splice(indexItem,1);
        $scope.getTotalAmountCarrito();
    }

    $scope.removeCart = function(){
        $scope.carrito.splice(0,);
        $scope.getTotalAmountCarrito();
    }

    $scope.increaseAmount = function(id){
        let itemCart = $scope.carrito.find(obj=>{
            return obj.id == id;
        });
        itemCart.amount++;
        itemCart.total = (itemCart.amount*itemCart.price).toFixed(2);
    }

    $scope.decreaseAmount = function(id){
        let itemCart = $scope.carrito.find(obj=>{
            return obj.id == id;
        });
        if(itemCart.amount>1){
            itemCart.amount--;
            itemCart.total = (itemCart.amount * itemCart.price).toFixed(2);
        }else{
            $scope.removeItemCart(id);
        }
    }

    $scope.start=function(){
        const carritoDOM = document.querySelector(".carrito");
        const openCarrito = document.querySelector(".carrito__icon");
        const closeCarrito = document.querySelector(".close__carrito");
        const overlay = document.querySelector(".carrito__overlay");
        openCarrito.addEventListener("click", ()=>{
            carritoDOM.classList.add("show");
            overlay.classList.add("show");
        });
        closeCarrito.addEventListener("click", ()=>{
            carritoDOM.classList.remove("show");
            overlay.classList.remove("show");
        });
    }
    $scope.start()
});