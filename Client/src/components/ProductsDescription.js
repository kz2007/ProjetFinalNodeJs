function ProductsDescription() {
  
  let ProductsApi = [];

  fetch('https://api4286.s3.ap-south-1.amazonaws.com/products.json')
  .then(json=>ProductsApi = json)


    let GetProduct = (i) => {return{
        index: ProductsApi[i].id,
        name: ProductsApi[i].title,
        image: ProductsApi[i].filename,
        discount: 0,//Math.ceil(Math.random() * ) * .5,
        description: ProductsApi[i].description,
        stars: ProductsApi[i].rating,
        price: ProductsApi[i].price,
      }};
      
      let Products = [];
      for (let i = 0; i <= 48; i++) {
        let nProduct = GetProduct(i);
        nProduct.id = i;
        Products.push(nProduct);
      }
    
  return Products;
}
const TestList = ProductsDescription()

export default TestList;