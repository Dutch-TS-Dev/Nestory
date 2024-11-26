import Product from "../../models/Product.model.js";
const searchProducts = async (req, res) => {
    const { query } = req.query;

    try {
        // Suchkriterien festlegen (Suche in 'name' oder 'category')
        const conditions = {
            $or: [
                { name: { $regex: new RegExp(query, "i") } }, // Suchbegriff im Produktnamen
                { category: { $regex: new RegExp(query, "i") } }, // Suchbegriff in der Kategorie
            ],
        };
        // Produkte finden, die die Kriterien erfüllen
        const products = await Product.find(conditions);

        res.send({ products });
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};

export default searchProducts;

// import Product from "../../models/Product.model.js";

// const searchProducts = async ({ query: { type } }, res) => {
//     try {
//          Model.find(category,conditions, projection, options)

//          if (type === "deals") {
//              const products = await Product.find({ percentage: { $gt: 40 } });
//              res.send(products);
//          } else if (type === "topRated") {
//              const products = await Product.find({})
//                  .sort({ rating: -1 })
//                  .limit(6);
//              res.send(products);
//          } else {
//              const products = await Product.find({});
//              res.send(products);
//          }
//         let conditions = {};
//         let options = {};
//         if (type === "deals") {
//             conditions = { percentage: { $gt: 40 } };
//         } else if (type === "topRated") {
//             options = { sort: { rating: -1 }, limit: 6 };
//         }

//         const products = await Product.find(conditions, null, options);
//         res.send(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).send({ error: "Internal server error" });
//     }
// };

// export default searchProducts;
//-----------------------------------------
// const getAllProducts = (req,res,next) =>{
//     const product =products.find ((item)=> item.id === req.params.id)
//     res.json(product)
// }
// export default getAllProducts;
//-------------------------------------------------------------
// const searchProducts = async (req,res)=>{
//     const query = req.query.q;
//     const filter ={};
//     if (query){
//         filter.name = new RegExp(query, `i`);
//     }
//     if(minPrice || maxPrice) {
//         filter.price = {};
//         if (minPrice) filter.price.$gte = parseFloat(minPrice);
//         if (maxPrice) filter.price.$gte = parseFloat(maxPrice);
//     }
//     try {
//         try {
//             // Finde Items in der Datenbank, die den Kriterien entsprechen
//             const items = await Item.find(filter);
//             res.json(items);
//         } catch (err) {
//             console.error('Fehler bei der Suche:', err);
//             res.status(500).json({ error: 'Fehler bei der Suche in der Datenbank' });
//         }
//     }
// }
// export default searchProducts;
// const products = [
//     { id: 1, name: 'Laptop', category: 'Electronics' },
//     { id: 2, name: 'Phone', category: 'Electronics' },
//     { id: 3, name: 'Shoes', category: 'Fashion' },
//     { id: 4, name: 'Bag', category: 'Fashion' },
//   ];

// Route für Produktsuche
//------------------------------------------------------
//   app.get('/search', (req, res) => {
//     const query = req.query.q;
//     const results = Product.filter((product) =>
//       product.name.toLowerCase().includes(query.toLowerCase())
//     );
//     res.json(results);
//   });
//------------------------------------------------------------
