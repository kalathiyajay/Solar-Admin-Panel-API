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
const { createSlideBarCategory, getAllSlideBarCategory, getSlideBarCategory, updateSlideBarCategory, deleteSlidBarCategory } = require('../controller/slideBarCategory.Controller');
const { createSlideBarSubCategory, getAllSlideBarSubCategory, getSlideBarSubCategory, updateSlideBarSubCategory, deleteSlidBarSubCategory } = require('../controller/slideBarSubCategory.controller');
const { auth } = require('../helper/auth');
const { createConditions, getAllConditions, getConditionById, updateConditionById, deleteConditionById } = require('../controller/termsAndConditionsController');

// ------ All Rouutes ------

// Auth Routes 

indexRoutes.post('/login', userlogin);                      // User Login 
indexRoutes.put('/changePassword/:id', changePassword);     // User Change Password Using Id

// Product Routes 

indexRoutes.post('/addNewProduct', auth(["Super Admin"]), createNewProduct);
indexRoutes.get('/allproduct', getAllProductData);
indexRoutes.get('/getProduct/:id', auth(["Super Admin"]), getProductById);
indexRoutes.put('/updateProduct/:id', auth(["Super Admin"]), updateProductData);
indexRoutes.delete('/deleteProduct/:id', auth(["Super Admin"]), deleteProductData);

//Category Routes

indexRoutes.post('/addCategory', auth(["Super Admin"]), createCategory);
indexRoutes.get('/allCategory', auth(["Super Admin", "user", "Fabiricator"]), getAllCategory);
indexRoutes.get('/getCategory/:id', auth(["Super Admin"]), getCategoryById);
indexRoutes.put('/updateCategory/:id', auth(["Super Admin"]), updateCategory);
indexRoutes.delete('/deleteCategory/:id', auth(["Super Admin"]), deleteCategory);

//subCategory Routes

indexRoutes.post('/addSubCategory', auth(["Super Admin"]), createSubCategory);
indexRoutes.get('/allSubCategory', getAllSubCategory);
indexRoutes.get('/getSubCategory/:id', auth(["Super Admin"]), getSubCategoryById);
indexRoutes.put('/updateSubCategory/:id', auth(["Super Admin"]), updateSubCategory);
indexRoutes.delete('/deleteSubCategory/:id', auth(["Super Admin"]), deleteSubCategory);

//roles Routes 

indexRoutes.post('/createRole', auth(["Super Admin"]), createRole);
indexRoutes.get('/allRoles', getAllRoles);
indexRoutes.get('/getRoleById/:id', auth(["Super Admin"]), getRoleById);
indexRoutes.put('/updateRole/:id', auth(["Super Admin"]), upadetRoleById);
indexRoutes.delete('/deleteRole/:id', auth(["Super Admin"]), deleteRoleById);


// user Routes 

indexRoutes.post('/createUser', auth(["Super Admin"]), upload.single('image'), createNewUser);
indexRoutes.get('/allUsers', getAllUsers);
indexRoutes.get('/getUserById/:id', auth(["Super Admin"]), getUserById);
indexRoutes.put('/userUpdate/:id', auth(["Super Admin"]), upload.single('image'), updateUser);
indexRoutes.delete('/deleteUser/:id', auth(["Super Admin"]), removeUser);
indexRoutes.post('/refreshToken', refreshToken);

// wareHouse Routes

indexRoutes.post('/createWarehous', auth(["Super Admin"]), createWareHouse);
indexRoutes.get('/getAllWarehouse', getAllWareHouse);
indexRoutes.get('/geWareHouseById/:id', auth(["Super Admin"]), getWareHouseById);
indexRoutes.put('/updateWareHouse/:id', auth(["Super Admin"]), updateWareHouseById);
indexRoutes.delete('/deleteWarehouse/:id', auth(["Super Admin"]), deleteWareHouseById);

//kitProduct Routes 

indexRoutes.post('/createKitProduct', auth(["Super Admin"]), createKitProduct);
indexRoutes.get('/getAllKitProduct', getAllKitProduct);
indexRoutes.get('/getKitProductById/:id', auth(["Super Admin"]), getkitProductById);
indexRoutes.put('/updateKitProduct/:id', auth(["Super Admin"]), updateKitProductById);
indexRoutes.delete('/deleteKitProduct/:id', auth(["Super Admin"]), deleteKitProductById);

// vedor Routes

indexRoutes.post('/createVandore', auth(["Super Admin"]), createNewVendor);
indexRoutes.get('/getAllVender', getAllvendor);
indexRoutes.get('/getVenderbyId/:id', auth(["Super Admin"]), getvendorById);
indexRoutes.put('/updateVenode/:id', auth(["Super Admin"]), updateVandor);
indexRoutes.delete('/deleteVendor/:id', auth(["Super Admin"]), removeVendor);


//  dealer Routes 

indexRoutes.post('/createDealer', auth(["Super Admin"]), upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), createDealer);
indexRoutes.get('/getAllDealer', getAllDealers);
indexRoutes.get('/getDealerById/:id', auth(["Super Admin"]), getDealerById);
indexRoutes.put('/updateDealer/:id', auth(["Super Admin"]), upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), updateDealer);
indexRoutes.delete('/deleteDealer/:id', auth(["Super Admin"]), deleteDealer)


// Credit routes 

indexRoutes.post('/createCredit', auth(["Super Admin"]), createCredit);
indexRoutes.get('/getAllCredit', getAllCreadit);
indexRoutes.get('/getCreditById/:id', auth(["Super Admin"]), getCerditById);
indexRoutes.put('/updateCredit/:id', auth(["Super Admin"]), updateCredit);
indexRoutes.delete('/deletCredit/:id', auth(["Super Admin"]), deleteCredit);


// Dispatch routes

indexRoutes.post('/createDispatch', createDispatch);
indexRoutes.get('/getAllDespatch', getAllDispatchData);
indexRoutes.get('/getdispatchId/:id', getDispatchDataById);
indexRoutes.put('/updateDispatch/:id', updateDispatchById);
indexRoutes.delete('/deleteDispatch/:id', deleteDispatchById);

// Account Rourtes

indexRoutes.post('/createAccount', auth(["Super Admin"]), createAccount);
indexRoutes.get('/getAllAccount', getAllAccount);
indexRoutes.get('/getAccountById/:id', auth(["Super Admin"]), getAccountById);
indexRoutes.put('/updateAccountById/:id', auth(["Super Admin"]), updateAccount);
indexRoutes.delete('/deleteAccount/:id', auth(["Super Admin"]), deleteAccount);


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

indexRoutes.post("/createResidentMarket", auth(["Super Admin"]), createResidentialMarket);
indexRoutes.get('/getAllresidentMarket', getAllResidentmarket);
indexRoutes.get('/getResidentMarket/:id', auth(["Super Admin"]), getResidentMarketById);
indexRoutes.put('/updateResidentMarket/:id', auth(["Super Admin"]), updateResidentMasrket);
indexRoutes.delete('/deleteResidenMarket/:id', auth(["Super Admin"]), deleteResidentMasrket);

// Commercial Market Routes

indexRoutes.post('/createCommercialMarket', auth(["Super Admin"]), upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), createcommercialMarket);
indexRoutes.get('/getAllCommercialMarket', getAllCommercialmarket);
indexRoutes.get('/getCommercialMarket/:id', auth(["Super Admin"]), getCommercialMarketById);
indexRoutes.put('/updateCommercial/:id', auth(["Super Admin"]), upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), updateCommercialMarket);
indexRoutes.delete('/deleteCommercial/:id', auth(["Super Admin"]), deleteCommercialMasrket);

// Daily Price

indexRoutes.post('/addDailyPrice', auth(["Super Admin"]), createDailyPrice);
indexRoutes.get('/getAllDailyPrice', getAllDailyPrice);
indexRoutes.get('/getDailyPrice/:id', auth(["Super Admin"]), getDailyPriceById);
indexRoutes.put('/updateDailPrice/:id', auth(["Super Admin"]), updatedailyPriceById);
indexRoutes.delete('/deleteDailyPrice/:id', auth(["Super Admin"]), deletedailyPriceById);


// Dealer Register 

indexRoutes.post('/createDealerRegister', auth(["Super Admin"]), upload.single('image'), createDealerRegister);
indexRoutes.get('/getAllDealerRegiser', getAllDealersRegister);
indexRoutes.get('/getDelerRegister/:id', auth(["Super Admin"]), getDealerRegisterById);
indexRoutes.put('/updateDealerRegister/:id', auth(["Super Admin"]), upload.single('image'), updateDealerRegister);
indexRoutes.delete('/deleteDelerRegiste/:id', auth(["Super Admin"]), deleteDealerRegister);

// Purchase Invoice Routes

indexRoutes.post('/createPurchaseInvoice', auth(["Super Admin"]), upload.single('uplodFile'), createNewPurchaseInvoice);
indexRoutes.get('/getAllPurcahseInvoice', getAllPurchaseInvoiceData);
indexRoutes.get('/getPurchaseInvoice/:id', auth(["Super Admin"]), getPurchaseInvoiceById);
indexRoutes.put('/updatePurchaseInvoice/:id', auth(["Super Admin"]), updatePurchaseInvoiceData);
indexRoutes.delete('/deletePurchaseInvoive/:id', auth(["Super Admin"]), deletePurchaseInvoice);

// Purchase routes

indexRoutes.post('/CreatePurchase', auth(["Super Admin"]), createNewPurchase);
indexRoutes.get('/getAllPurchase', getAllPurchaseData);
indexRoutes.get('/getPurchaseData/:id', auth(["Super Admin"]), getPurchaseById);
indexRoutes.put('/updatePurchase/:id', auth(["Super Admin"]), updatePurchaseData);
indexRoutes.delete('/deletePurchase/:id', auth(["Super Admin"]), deletePurchase);


// Transport Routes 

indexRoutes.post('/crateTarsport', auth(["Super Admin"]), createTrasportDetaile);
indexRoutes.get('/allTransportDetails', getAllTransportDetails);
indexRoutes.get('/getTransportDetails/:id', auth(["Super Admin"]), getTransportByID);
indexRoutes.put('/updateTransportDetails/:id', auth(["Super Admin"]), updateTransportDetails);
indexRoutes.delete('/deleteTransportDetails/:id', auth(["Super Admin"]), deleteTransportDetails);

// Slide Bar Category

indexRoutes.post('/creaeSlidebarCategory', auth(["Super Admin"]), upload.single('slideBarImage'), createSlideBarCategory)
indexRoutes.get('/AllSlideBarCategory', getAllSlideBarCategory);
indexRoutes.get('/GetslideBarCategory/:id', auth(["Super Admin"]), getSlideBarCategory);
indexRoutes.put('/updateSlideBarCategory/:id', auth(["Super Admin"]), upload.single('slideBarImage'), updateSlideBarCategory);
indexRoutes.delete('/deleteSlideBarCategory/:id', auth(["Super Admin"]), deleteSlidBarCategory)

// slide Bar sub Category 

indexRoutes.post('/createSlidebarSubCategory', auth(["Super Admin"]), createSlideBarSubCategory);
indexRoutes.get('/AllslideBarSubcategory', getAllSlideBarSubCategory);
indexRoutes.get('/getSlidebarSubCategory/:id', auth(["Super Admin"]), getSlideBarSubCategory);
indexRoutes.put('/updateSlideBarSubCategory/:id', auth(["Super Admin"]), updateSlideBarSubCategory);
indexRoutes.delete('/deleteSlideBarSubCategory/:id', auth(["Super Admin"]), deleteSlidBarSubCategory)


// Terms And Conditions 

indexRoutes.post('/createTermsAndCondition', createConditions);
indexRoutes.get('/allTermsAndConditions', getAllConditions);
indexRoutes.get('/getTermsAndCondition/:id', getConditionById);
indexRoutes.put('/updateTermsAndCondition/:id', updateConditionById);
indexRoutes.delete('/deleteTermsAndCondition/:id', deleteConditionById);

module.exports = indexRoutes;
