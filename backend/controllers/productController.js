const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create Product -- ADMIN Route
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.body.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;

  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);


  const products = await apiFeature.query;



  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});



//Update Product -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));

  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    success: true,
    product
  });

});

//Delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "product has been deleted successfully"
  });
});

//Get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {


  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });

});

//Product review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body
  review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id)
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  }
  else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  let avg = 0;
  product.ratings = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length;

  await product.save({ validate: false })
  res.status(200).json({
    success: true,
  })
});

//Get all product review List -- Admin
exports.getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    next(new ErrorHandler("Product not found", 404))
  }

  res.status(200).json({

    success: true,
    reviews: product.reviews,

  });

});


//Delete a review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);


  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }


  const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
  //here query.id is taken from the _id in the reviews section, and rev._id is received from query.productId which is the objectID from the DB

  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(req.query.productId, {
      reviews: [],
      ratings: 0,
      numOfReviews: 0,
    }, {
      new: true,
      runValidators: true,
    })
  } else {

    const ratings = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
    const numOfReviews = reviews.length;



    await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numOfReviews,
    }, {
      new: true,
      runValidators: true,
    });
  }
  res.status(200).json({
    success: true,
    message: "Review has been deleted successfully!"
  })
})