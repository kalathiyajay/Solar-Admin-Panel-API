const express = require('express');
const indexRoutes = express.Router();
const { userlogin, changePassword } = require('../auth/auth');
const upload = require('../helper/imageUplode');
const { createNewProduct, getAllProductData, getProductById, updateProductData, deleteProductData } = require('../controller/product.controller');
const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require('../controller/category.controller');
const { createSubCategory, getAllSubCategory, getSubCategoryById, updateSubCategory, deleteSubCategory } = require('../controller/subCategory.controller');
const { createRole, getAllRoles, getRoleById, upadetRoleById, deleteRoleById } = require('../controller/role.controller');
const { createNewUser, getAllUsers, getUserById, updateUser, removeUser, refreshToken } = require('../controller/user.controller');
const { createWareHouse, getAllWareHouse, getWareHouseById, updateWareHouseById, deleteWareHouseById } = require('../controller/warehouse.controllle');
const { createKitProduct, getAllKitProduct, updateKitProductById, deleteKitProductById, getkitProductById } = require('../controller/kitproduct.controller');
const { createNewVendor, getAllvendor, getvendorById, updateVandor, removeVendor } = require('../controller/vendor.controller');
const { createDealer, getAllDealers, getDealerById, updateDealer, deleteDealer } = require('../controller/dealerEntery.controller');
const { createCredit, getAllCreadit, getCerditById, updateCredit, deleteCredit } = require('../controller/credit.controller');
const { createDispatch, getAllDispatchData, getDispatchDataById, updateDispatchById, deleteDispatchById } = require('../controller/dispatch.controller');
const { createAccount, getAllAccount, getAccountById, updateAccount, deleteAccount } = require('../controller/account.controller');
const { createTechnical, getAllTechnical, getTechnicalById, updateTechnicalDetails, deleteTechnicalDetails } = require('../controller/technical.controller');
const { createLiasoning, getAllLiasoning, getLiasoningById, updateLiasoning, deleteLiasoning } = require('../controller/liasoning.controller');
const { getAllResidentmarket, getResidentMarketById, updateResidentMasrket, deleteResidentMasrket, createResidentialMarket } = require('../controller/residentialmasrketing.controller');
const { createcommercialMarket, getAllCommercialmarket, getCommercialMarketById, updateCommercialMarket, deleteCommercialMasrket } = require('../controller/commercialMarket.controller');
const { createDailyPrice, getAllDailyPrice, getDailyPriceById, updatedailyPriceById, deletedailyPriceById } = require('../controller/dailyPrice.controller');
const { createDealerRegister, getAllDealersRegister, getDealerRegisterById, updateDealerRegister, deleteDealerRegister } = require('../controller/dealerRegister.controller');
const { createNewPurchaseInvoice, getAllPurchaseInvoiceData, getPurchaseInvoiceById, updatePurchaseInvoiceData, deletePurchaseInvoice } = require('../controller/purcahseInvoice.controller');
const { createNewPurchase, getAllPurchaseData, getPurchaseById, updatePurchaseData, deletePurchase } = require('../controller/purchase.controller');
const { createTrasportDetaile, getAllTransportDetails, getTransportByID, updateTransportDetails, deleteTransportDetails } = require('../controller/transport.controller');

// ------ All Rouutes ------

// Auth Routes 

indexRoutes.post('/login', userlogin);                      // User Login 
indexRoutes.put('/changePassword/:id', changePassword);     // User Change Password Using Id

// Product Routes 

indexRoutes.post('/addNewProduct', createNewProduct);
indexRoutes.get('/allproduct', getAllProductData);
indexRoutes.get('/getProduct/:id', getProductById);
indexRoutes.put('/updateProduct/:id', updateProductData);
indexRoutes.delete('/deleteProduct/:id', deleteProductData);

//Category Routes

indexRoutes.post('/addCategory', createCategory);
indexRoutes.get('/allCategory', getAllCategory);
indexRoutes.get('/getCategory/:id', getCategoryById);
indexRoutes.put('/updateCategory/:id', updateCategory);
indexRoutes.delete('/deleteCategory/:id', deleteCategory);

//subCategory Routes

indexRoutes.post('/addSubCategory', createSubCategory);
indexRoutes.get('/allSubCategory', getAllSubCategory);
indexRoutes.get('/getSubCategory/:id', getSubCategoryById);
indexRoutes.put('/updateSubCategory/:id', updateSubCategory);
indexRoutes.delete('/deleteSubCategory/:id', deleteSubCategory);

//roles Routes 

indexRoutes.post('/createRole', createRole);
indexRoutes.get('/allRoles', getAllRoles);
indexRoutes.get('/getRoleById/:id', getRoleById);
indexRoutes.put('/updateRole/:id', upadetRoleById);
indexRoutes.delete('/deleteRole/:id', deleteRoleById);


// user Routes 

indexRoutes.post('/createUser', upload.single('image'), createNewUser);
indexRoutes.get('/allUsers', getAllUsers);
indexRoutes.get('/getUserById/:id', getUserById);
indexRoutes.put('/userUpdate/:id', upload.single('image'), updateUser);
indexRoutes.delete('/deleteUser/:id', removeUser);
indexRoutes.post('/refreshToken', refreshToken);

// wareHouse Routes

indexRoutes.post('/createWarehous', createWareHouse);
indexRoutes.get('/getAllWarehouse', getAllWareHouse);
indexRoutes.get('/geWareHouseById/:id', getWareHouseById);
indexRoutes.put('/updateWareHouse/:id', updateWareHouseById);
indexRoutes.delete('/deleteWarehouse/:id', deleteWareHouseById);

//kitProduct Routes 

indexRoutes.post('/createKitProduct', createKitProduct);
indexRoutes.get('/getAllKitProduct', getAllKitProduct);
indexRoutes.get('/getKitProductById/:id', getkitProductById);
indexRoutes.put('/updateKitProduct/:id', updateKitProductById);
indexRoutes.delete('/deleteKitProduct/:id', deleteKitProductById);

// vedor Routes

indexRoutes.post('/createVandore', createNewVendor);
indexRoutes.get('/getAllVender', getAllvendor);
indexRoutes.get('/getVenderbyId/:id', getvendorById);
indexRoutes.put('/updateVenode/:id', updateVandor);
indexRoutes.delete('/deleteVendor/:id', removeVendor);


//  dealer Routes 

indexRoutes.post('/createDealer', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), createDealer);
indexRoutes.get('/getAllDealer', getAllDealers);
indexRoutes.get('/getDealerById/:id', getDealerById);
indexRoutes.put('/updateDealer/:id', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), updateDealer);
indexRoutes.delete('/deleteDealer/:id', deleteDealer)


// Credit routes 

indexRoutes.post('/createCredit', createCredit);
indexRoutes.get('/getAllCredit', getAllCreadit);
indexRoutes.get('/getCreditById/:id', getCerditById);
indexRoutes.put('/updateCredit/:id', updateCredit);
indexRoutes.delete('/deletCredit/:id', deleteCredit);


// Dispatch routes

indexRoutes.post('/createDispatch', createDispatch);
indexRoutes.get('/getAllDespatch', getAllDispatchData);
indexRoutes.get('/getdispatchId/:id', getDispatchDataById);
indexRoutes.put('/updateDispatch/:id', updateDispatchById);
indexRoutes.delete('/deleteDispatch/:id', deleteDispatchById);

// Account Rourtes

indexRoutes.post('/createAccount', createAccount);
indexRoutes.get('/getAllAccount', getAllAccount);
indexRoutes.get('/getAccountById/:id', getAccountById);
indexRoutes.put('/updateAccountById/:id', updateAccount);
indexRoutes.delete('/deleteAccount/:id', deleteAccount);


// Technical Routes 

indexRoutes.post('/createTechnicalDetails', createTechnical);
indexRoutes.get('/getAllTecnicalDetails', getAllTechnical);
indexRoutes.get('/getTechnicalDetails/:id', getTechnicalById);
indexRoutes.put('/updateTechnicalDetails/:id', updateTechnicalDetails);
indexRoutes.delete('/deleteTecnicalDetails/:id', deleteTechnicalDetails);

// Liasoniing Routes

indexRoutes.post('/createLiasonig', createLiasoning);
indexRoutes.get('/getAllLiasoning', getAllLiasoning);
indexRoutes.get('/getLiasoning/:id', getLiasoningById);
indexRoutes.put('/updateLiasoning/:id', updateLiasoning);
indexRoutes.delete('/deleteLisoning/:id', deleteLiasoning);


// Resident Marketing Routes 

indexRoutes.post("/createResidentMarket", createResidentialMarket);
indexRoutes.get('/getAllresidentMarket', getAllResidentmarket);
indexRoutes.get('/getResidentMarket/:id', getResidentMarketById);
indexRoutes.put('/updateResidentMarket/:id', updateResidentMasrket);
indexRoutes.delete('/deleteResidenMarket/:id', deleteResidentMasrket);

// Commercial Market Routes

indexRoutes.post('/createCommercialMarket', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), createcommercialMarket);
indexRoutes.get('/getAllCommercialMarket', getAllCommercialmarket);
indexRoutes.get('/getCommercialMarket/:id', getCommercialMarketById);
indexRoutes.put('/updateCommercial/:id', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), updateCommercialMarket);
indexRoutes.delete('/deleteCommercial/:id', deleteCommercialMasrket);

// Daily Price

indexRoutes.post('/addDailyPrice', createDailyPrice);
indexRoutes.get('/getAllDailyPrice', getAllDailyPrice);
indexRoutes.get('/getDailyPrice/:id', getDailyPriceById);
indexRoutes.put('/updateDailPrice/:id', updatedailyPriceById);
indexRoutes.delete('/deleteDailyPrice/:id', deletedailyPriceById);


// Dealer Register 

indexRoutes.post('/createDealerRegister', upload.single('image'), createDealerRegister);
indexRoutes.get('/getAllDealerRegiser', getAllDealersRegister);
indexRoutes.get('/getDelerRegister/:id', getDealerRegisterById);
indexRoutes.put('/updateDealerRegister/:id', upload.single('image'), updateDealerRegister);
indexRoutes.delete('/deleteDelerRegiste/:id', deleteDealerRegister);

// Purchase Invoice Routes

indexRoutes.post('/createPurchaseInvoice', upload.single('uplodFile'), createNewPurchaseInvoice);
indexRoutes.get('/getAllPurcahseInvoice', getAllPurchaseInvoiceData);
indexRoutes.get('/getPurchaseInvoice/:id', getPurchaseInvoiceById);
indexRoutes.put('/updatePurchaseInvoice/:id', updatePurchaseInvoiceData);
indexRoutes.delete('/deletePurchaseInvoive/:id', deletePurchaseInvoice);

// Purchase routes

indexRoutes.post('/CreatePurchase', createNewPurchase);
indexRoutes.get('/getAllPurchase', getAllPurchaseData);
indexRoutes.get('/getPurchaseData/:id', getPurchaseById);
indexRoutes.put('/updatePurchase/:id', updatePurchaseData);
indexRoutes.delete('/deletePurchase/:id', deletePurchase);


// Transport Routes 

indexRoutes.post('/crateTarsport', createTrasportDetaile);
indexRoutes.get('/allTransportDetails', getAllTransportDetails);
indexRoutes.get('/getTransportDetails/:id', getTransportByID);
indexRoutes.put('/updateTransportDetails/:id', updateTransportDetails);
indexRoutes.delete('/deleteTransportDetails/:id', deleteTransportDetails);

module.exports = indexRoutes;
