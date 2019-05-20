exports.index = function(req, res, next) {
  res.render("pages/types/index", { title: "Quản lý loại sản phẩm"});
};

// exports.getProducts = async function(req,res,next) {
//   const dbProducts = await getProducts();
//   res.send(dbProducts);
// }

// exports.crud = function(req, res, next) {
//   res.render("pages/products/index", { title: "Quản lý sản phẩm" });
// };
