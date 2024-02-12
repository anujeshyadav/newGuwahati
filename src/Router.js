import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, HashRouter } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import knowledgeBaseCategory from "./views/pages/knowledge-base/Category";
import knowledgeBaseQuestion from "./views/pages/knowledge-base/Questions";
import { ContextLayout } from "./utility/context/Layout";
import AddPurchaseOrder from "./views/apps/freshlist/order/purchase/AddPurchaseOrder";

// const analyticsDashboard = lazy(() =>
//   import("./views/dashboard/analytics/AnalyticsDashboard")
// );
const MainDash = lazy(() => import("./views/dashboard/analytics/MainDash"));

const ecommerceDashboard = lazy(() =>
  import("./views/dashboard/ecommerce/EcommerceDashboard")
);
// const sellerDashboard = lazy(()=> import("./views/dashboard/seller/SellerDeshboard"));

// Customer
const CustomerGroup = lazy(() =>
  import("./views/apps/freshlist/customer/CustomerGroup")
);
const AddCustomer = lazy(() =>
  import("./views/apps/freshlist/customer/AddCustomer")
);

const CustomerList = lazy(() =>
  import("./views/apps/freshlist/customer/CustomerList")
);
const CustomerRegistration = lazy(() =>
  import("./views/apps/freshlist/customer/CustomerRegistration")
);

// Parts
const AddPart = lazy(() => import("./views/apps/freshlist/parts/AddPart"));
const PartList = lazy(() => import("./views/apps/freshlist/parts/PartList"));

const Cashbook = lazy(() => import("./views/apps/freshlist/parts/Cashbook"));
const PartyLedger = lazy(() =>
  import("./views/apps/freshlist/parts/PartyLedger")
);

const UserLedger = lazy(() =>
  import("./views/apps/freshlist/parts/UserLedger")
);
const ReceiptList = lazy(() => import("./views/apps/freshlist/parts/Receipt"));
const PartCatalougue = lazy(() =>
  import("./views/apps/freshlist/parts/PartCatalougue")
);
const Scheduler = lazy(() => import("./views/apps/freshlist/parts/Scheduler"));
const ReviewTable = lazy(() =>
  import("./views/apps/freshlist/customer/ReviewTable")
);
const CustomerReview = lazy(() =>
  import("./views/apps/freshlist/customer/CustomerReview")
);

const FilterOption = lazy(() =>
  import("./views/apps/freshlist/customer/FilterOption")
);
const Summary = lazy(() => import("./views/apps/freshlist/customer/Summary"));
const AddFund = lazy(() => import("./views/apps/freshlist/customer/AddFund"));
const EditCustomer = lazy(() =>
  import("./views/apps/freshlist/customer/EditCustomer")
);
const ViewCustomer = lazy(() =>
  import("./views/apps/freshlist/customer/ViewCustomer")
);
// wallet
const WalletType = lazy(() =>
  import("./views/apps/freshlist/wallet/WalletType")
);
const AddTransactions = lazy(() =>
  import("./views/apps/freshlist/wallet/AddTransactions")
);
const ViewWallet = lazy(() =>
  import("./views/apps/freshlist/wallet/ViewWallet")
);

// Login
const Login = lazy(() => import("./views/pages/authentication/login/Login"));

// Hub List
const AddHub = lazy(() => import("./views/apps/freshlist/hubs/AddHub"));
const HubList = lazy(() => import("./views/apps/freshlist/hubs/HubList"));
const ViewHub = lazy(() => import("./views/apps/freshlist/hubs/ViewHub"));
const EditHub = lazy(() => import("./views/apps/freshlist/hubs/EditHub"));

// Sales
const TotalSales = lazy(() =>
  import("./views/apps/freshlist/sales/TotalSales")
);
const HubSales = lazy(() => import("./views/apps/freshlist/sales/HubSales"));
//Banner
const BannerList = lazy(() =>
  import("./views/apps/freshlist/banner/BannerList")
);
const AddBanner = lazy(() => import("./views/apps/freshlist/banner/AddBanner"));
const ViewBanner = lazy(() =>
  import("./views/apps/freshlist/banner/ViewBanner")
);
const EditBanner = lazy(() =>
  import("./views/apps/freshlist/banner/EditBanner")
);

// Zone
const AddZone = lazy(() => import("./views/apps/freshlist/zone/AddZone"));
const ZonesList = lazy(() => import("./views/apps/freshlist/zone/ZonesList"));
const AddDeliveryCharges = lazy(() =>
  import("./views/apps/freshlist/zone/AddDeliveryCharges")
);
//Vendor
const AddVendor = lazy(() => import("./views/apps/freshlist/vendor/AddVendor"));

const VendorList = lazy(() =>
  import("./views/apps/freshlist/vendor/VendorList")
);
const EditVendor = lazy(() =>
  import("./views/apps/freshlist/vendor/EditVendor")
);
const ViewVendor = lazy(() =>
  import("./views/apps/freshlist/vendor/ViewVendor")
);
const WithDraws = lazy(() => import("./views/apps/freshlist/vendor/WithDraws"));
const ViewWithDraws = lazy(() =>
  import("./views/apps/freshlist/vendor/ViewWithDraws")
);
//Driver

const AddDriver = lazy(() => import("./views/apps/freshlist/driver/AddDriver"));
const DriverList = lazy(() =>
  import("./views/apps/freshlist/driver/DriverList")
);

const EditDriver = lazy(() =>
  import("./views/apps/freshlist/driver/EditDriver")
);

//User management

const ManageRole = lazy(() => import("./views/apps/freshlist/user/ManageRole"));
const UserList = lazy(() => import("./views/apps/freshlist/user/UserList"));

//special offer
const SpecialList = lazy(() =>
  import("./views/apps/freshlist/special/SpecialList")
);

//Coupon
const CouponList = lazy(() =>
  import("./views/apps/freshlist/coupon/CouponList")
);

// Discount
const DiscountList = lazy(() =>
  import("./views/apps/freshlist/discount/DiscountList")
);
const AddDiscount = lazy(() =>
  import("./views/apps/freshlist/discount/AddDiscount")
);
const EditDiscount = lazy(() =>
  import("./views/apps/freshlist/discount/EditDiscount")
);
const EditDeal = lazy(() =>
  import("./views/apps/freshlist/dealOfDay/EditDeal")
);
const Points = lazy(() => import("./views/apps/freshlist/points/Points"));
//FlashSale
const FlashSale = lazy(() =>
  import("./views/apps/freshlist/flashSale/FlashSale")
);
// Deal Of Day
const DealOfDay = lazy(() =>
  import("./views/apps/freshlist/dealOfDay/DealOfDay")
);
const EditFlashSale = lazy(() =>
  import("./views/apps/freshlist/flashSale/EditFlashSale")
);
const AddFlashSale = lazy(() =>
  import("./views/apps/freshlist/flashSale/AddFlashSale")
);
//FeatureDeal

const FeatureDeal = lazy(() =>
  import("./views/apps/freshlist/featuredeal/FeatureDeal")
);

const EditFeatureDeal = lazy(() =>
  import("./views/apps/freshlist/featuredeal/EditFeatureDeal")
);

const AddFeatureDeal = lazy(() =>
  import("./views/apps/freshlist/featuredeal/AddFeatureDeal")
);

//Language

const LanguageList = lazy(() =>
  import("./views/apps/freshlist/language/LanguageList")
);
const AddLanguage = lazy(() =>
  import("./views/apps/freshlist/language/AddLanguage")
);
//Gallery

const Gallery = lazy(() => import("./views/apps/freshlist/gallery/Gallery"));
const AddGallery = lazy(() =>
  import("./views/apps/freshlist/gallery/AddGallery")
);

//order
const OrderOne = lazy(() => import("./views/apps/freshlist/order/OrderOne"));
const OrderSearch = lazy(() =>
  import("./views/apps/freshlist/order/OrderSearch")
);
const Achivement = lazy(() =>
  import("./views/apps/freshlist/order/Achivement")
);
const Selectedorder = lazy(() =>
  import("./views/apps/freshlist/order/Selectedorder")
);
const editPlaceorder = lazy(() =>
  import("./views/apps/freshlist/order/EditPlaceOrder")
);
const EditCompletedorders = lazy(() =>
  import("./views/apps/freshlist/order/EditCompletedorders")
);
const ViewoneInvoiceRegen = lazy(() =>
  import("./views/apps/freshlist/order/ViewoneInvoiceRege")
);
const ViewOneOrder = lazy(() =>
  import("./views/apps/freshlist/order/ViewOneOrder")
);
const ViewOneReceivedOrder = lazy(() =>
  import("./views/apps/freshlist/order/ViewOneReceivedorder")
);

const AddOrder = lazy(() => import("./views/apps/freshlist/order/AddOrder"));
const EditOrder = lazy(() => import("./views/apps/freshlist/order/EditOrder"));
const EditProductionProcess = lazy(() =>
  import("./views/apps/freshlist/order/EditProductionProcess")
);
const AddReturnProductionProduct = lazy(() =>
  import("./views/apps/freshlist/order/AddReturnProductionProduct")
);
const ViewAll = lazy(() => import("./views/apps/freshlist/order/ViewAll"));
const ViewPending = lazy(() =>
  import("./views/apps/freshlist/order/ViewPending")
);

const ConfirmedOrder = lazy(() =>
  import("./views/apps/freshlist/order/CompleteOrder")
);
const ViewConfirmed = lazy(() =>
  import("./views/apps/freshlist/order/ViewConfirmed")
);
const InProcess = lazy(() => import("./views/apps/freshlist/order/InProcess"));
const ViewPackaging = lazy(() =>
  import("./views/apps/freshlist/order/ViewPackaging")
);
const Outfordelivery = lazy(() =>
  import("./views/apps/freshlist/order/Outfordelivery")
);
const ViewOutfordelivery = lazy(() =>
  import("./views/apps/freshlist/order/ViewOutfordelivery")
);
const Delivered = lazy(() => import("./views/apps/freshlist/order/Delivered"));
const ViewDelivered = lazy(() =>
  import("./views/apps/freshlist/order/ViewDelivered")
);

const ViewReturned = lazy(() =>
  import("./views/apps/freshlist/order/ViewReturned")
);
const Failedtodeliver = lazy(() =>
  import("./views/apps/freshlist/order/Failedtodeliver")
);
const ViewFailedtodeliver = lazy(() =>
  import("./views/apps/freshlist/order/ViewFailedtodeliver")
);
const Canceled = lazy(() => import("./views/apps/freshlist/order/Canceled"));
const Returned = lazy(() => import("./views/apps/freshlist/order/Returned"));
const ViewCanceled = lazy(() =>
  import("./views/apps/freshlist/order/ViewCanceled")
);
const OrderTracking = lazy(() =>
  import("./views/apps/freshlist/order/OrderTracking")
);
const PaymentGateway = lazy(() =>
  import("./views/apps/freshlist/order/PaymentGateway")
);
//Refund Request

const AddRefund = lazy(() =>
  import("./views/apps/freshlist/refundrequest/AddRefund")
);
const PendingRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/PendingRequest")
);

const ViewPendingRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/ViewPendingRequest")
);
const ApprovedRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/ApprovedRequest")
);

const ViewApprovedRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/ViewApprovedRequest")
);
const RejectedRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/RejectedRequest")
);

const ViewRejectedRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/ViewRejectedRequest")
);
const CompletedRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/CompletedRequest")
);

const ViewRefundRequest = lazy(() =>
  import("./views/apps/freshlist/refundrequest/ViewRefundRequest")
);
// T& c
const TermsAndCondition = lazy(() =>
  import("./views/apps/freshlist/termsAndCondition/TAndCList")
);
const AddTAndC = lazy(() =>
  import("./views/apps/freshlist/termsAndCondition/AddTAndC")
);

// options
const AttributeList = lazy(() =>
  import("./views/apps/freshlist/options/AttributeList")
);
const CreateAttribute = lazy(() =>
  import("./views/apps/freshlist/options/CreateAttribute")
);
// report
// const StockReport = lazy(() =>
//   import("./views/apps/freshlist/report/StockReport")
// );

// import HRM

// hrm start by jayesh adsule
const Recruitmentandplacement = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/HRMList")
);

const jobcreate = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/jobcreate")
);
const JobList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/JobList")
);

const JobViewform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/ViewHrm/JobviewList")
);

const JobApView = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/HrmjpbApp/JobapView")
);

const InterView_viewList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/HrminterView/InterView")
);

const JobeditList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/ViewHrm/JobeditList")
);

const IntereditList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/HrminterView/InterViewedit")
);

const JobapEdList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/HrmjpbApp/JobapeditList")
);

const JobappList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/jobappList")
);

const practiceList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/practiceList")
);

const InterviewList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/interviewList")
);
const offerList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/offerList")
);

const CreateemployeList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/empList")
);
const TrainingList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/trainList")
);

const AttendList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/attenList")
);
const RuleList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/ruleList")
);

const LeaveList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/leaveList")
);
const IndicList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/indicatList")
);

const IncenList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/incentList")
);
const BonusList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/bonusList")
);
const GoalList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/goalList")
);
const TermList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/termList")
);
const AdvanceList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/advanceList")
);
const OvertList = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/overtList")
);

const Pflist = lazy(() => import("./views/apps/freshlist/customer/HRM/pfList"));
const Esilist = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/esiList")
);

const Lonelist = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/loneList")
);
const Talist = lazy(() => import("./views/apps/freshlist/customer/HRM/taList"));
const Dalist = lazy(() => import("./views/apps/freshlist/customer/HRM/daList"));
const Travllinglist = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/travlingList")
);
const Insurancelist = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/insuranceList")
);

const Setsalarlist = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/setsalarList")
);

const AttenForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/Time-sheet/attenform")
);
const LeaveForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/Time-sheet/leaveform")
);
const IncenForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/TCPA/incenform")
);

const BonusForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/TCPA/bonusform")
);

const GoalForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/TCPA/goltrackform")
);

const Indicatform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/Perfomence/indicatform")
);

const JobbForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/jobForm")
);
const AppResultForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/applresultForm")
);
const MockTestForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/practskillform")
);
const InterviewForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/interviewForm")
);

const OfferLetterForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/offerletterForm")
);

const EmployeeProfileForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/createempForm")
);

const TerminationForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/termiForm")
);
const PayslipForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/setsalaryForm")
);
const TrainingForm = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/RecPLace/trainingForm")
);

const Ruleform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/Setrule/ruleForm")
);
const Taform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/taform")
);
const Daform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/daform")
);
const Pfform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/pfform")
);
const Esiform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/esiform")
);
const Loanform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/loanform")
);

const Travellingform = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/travellingform")
);

const Insurance = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/Insurance")
);

const Over = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/Over")
);

const AdvanceComponente = lazy(() =>
  import("./views/apps/freshlist/customer/HRM/payrollsheet/Advance")
);

// hrm end by jayesh adsule
// end import hrm
const ProductReport = lazy(() =>
  import("./views/apps/freshlist/report/ProductReport")
);
const CommissionReport = lazy(() =>
  import("./views/apps/freshlist/report/CommissionReport")
);
const CustomerReport = lazy(() =>
  import("./views/apps/freshlist/report/CustomerReport")
);
const SaleReport = lazy(() =>
  import("./views/apps/freshlist/report/SaleReport")
);
const TaxReport = lazy(() => import("./views/apps/freshlist/report/TaxReport"));

// Category
const CategoryList = lazy(() =>
  import("./views/apps/freshlist/category/CategoryList")
);
const AddCategory = lazy(() =>
  import("./views/apps/freshlist/category/AddCategory")
);
const EditCategory = lazy(() =>
  import("./views/apps/freshlist/category/EditCategory")
);
const ViewCategory = lazy(() =>
  import("./views/apps/freshlist/category/ViewCategory")
);

// Subcategory SubCategoryList
const SubCategoryList = lazy(() =>
  import("./views/apps/freshlist/subcategory/SubCategoryList")
);
const Bills = lazy(() => import("./views/apps/freshlist/subcategory/Bills"));

const inVoiceRegenerator = lazy(() =>
  import("./views/apps/freshlist/subcategory/inVoiceRegenerator")
);

const inVoices = lazy(() =>
  import("./views/apps/freshlist/subcategory/inVoices")
);

const PaymentStatus = lazy(() =>
  import("./views/apps/freshlist/subcategory/PaymentStatus")
);
const paymentcompleted = lazy(() =>
  import("./views/apps/freshlist/subcategory/paymentcompleted")
);
const AddSubCategory = lazy(() =>
  import("./views/apps/freshlist/subcategory/AddSubCategory")
);
const EditSubCategory = lazy(() =>
  import("./views/apps/freshlist/subcategory/EditSubCategory")
);

// softNumen

const CancelledService = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/CancelledService")
);
const CompletedService = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/CompletedService")
);
const DraftService = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/DraftService")
);
const PendingService = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/PendingService")
);
const RejectedService = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/RejectedService")
);
const ServiceRequest = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/ServiceRequest")
);
const TransferService = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/TransferService")
);
const AdminReport = lazy(() =>
  import("./views/apps/freshlist/customer/ReportManagement/Admin")
);
const CustomerReports = lazy(() =>
  import("./views/apps/freshlist/customer/ReportManagement/CustomerReport")
);
const EarningReport = lazy(() =>
  import("./views/apps/freshlist/customer/ReportManagement/EarningReport")
);
const ProductReports = lazy(() =>
  import("./views/apps/freshlist/customer/ReportManagement/ProductReport")
);
const StaffReport = lazy(() =>
  import("./views/apps/freshlist/customer/ReportManagement/StaffReport")
);
const TransactionReport = lazy(() =>
  import("./views/apps/freshlist/customer/ReportManagement/TransactionReport")
);
const DiscountCoupon = lazy(() =>
  import("./views/apps/freshlist/customer/PromotionManagement/DiscountCoupon")
);
const Promotion = lazy(() =>
  import("./views/apps/freshlist/customer/PromotionManagement/Promotion")
);
const ChatStatus = lazy(() =>
  import("./views/apps/freshlist/customer/MediaStatus/ChatStatus")
);
const Livestreamstatus = lazy(() =>
  import("./views/apps/freshlist/customer/MediaStatus/Livestreamstatus")
);
const HelpandSupports = lazy(() =>
  import("./views/apps/freshlist/customer/Help&Support/Help&Support")
);
const OemWarranty = lazy(() =>
  import("./views/apps/freshlist/customer/WarrantyCLaims/OemWarranty")
);
const CreateWarrenty = lazy(() =>
  import("./views/apps/freshlist/customer/WarrantyCLaims/CreateWarrenty")
);
const SearchWarrenty = lazy(() =>
  import("./views/apps/freshlist/customer/WarrantyCLaims/SearchWarrenty")
);
const Campaignlist = lazy(() =>
  import("./views/apps/freshlist/customer/Campaign/Campaignlist")
);
const ClosingStock = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/ClosingStock")
);
const LowStock = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/LowStock")
);
const LowStockList = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/LowStockList")
);
const DamagedStock = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/DamagedStock")
);
const CreateSupport = lazy(() =>
  import("./views/apps/freshlist/customer/Support/CreateSupport")
);
const ServicingList = lazy(() =>
  import("./views/apps/freshlist/customer/Support/ServicingList")
);
const SupportSearch = lazy(() =>
  import("./views/apps/freshlist/customer/Support/SupportSearch")
);
const WikiList = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/WikiList")
);
const CreateCampaign = lazy(() =>
  import("./views/apps/freshlist/customer/Campaign/CreateCampaign")
);
const StockReport = lazy(() =>
  import("./views/apps/freshlist/customer/StockManagement/StockReport")
);

const StockTransfer = lazy(() =>
  import("./views/apps/freshlist/customer/StockManagement/StockTransfer")
);
const SupplierWarranty = lazy(() =>
  import("./views/apps/freshlist/customer/WarrantyCLaims/SupplierWarranty")
);

const CreateOrder = lazy(() =>
  import("./views/apps/freshlist/order/CreateOrder")
);
const CreatePayment = lazy(() =>
  import("./views/apps/freshlist/order/CreatePayment")
);
const CreateReceipt = lazy(() =>
  import("./views/apps/freshlist/order/CreateReceipt")
);
const Addorderbycashbook = lazy(() =>
  import("./views/apps/freshlist/parts/Addorderbycashbook")
);
const OrderList = lazy(() => import("./views/apps/freshlist/order/OrderList"));
const PendingOrder = lazy(() =>
  import("./views/apps/freshlist/order/PendingOrder")
);
const EditPending = lazy(() =>
  import("./views/apps/freshlist/order/pending/EditPending")
);

const PurchaseOrderList = lazy(() =>
  import("./views/apps/freshlist/order/purchase/PurchaseOrderList")
);
const PurchaseReturnList = lazy(() =>
  import("./views/apps/freshlist/order/purchase/PurchaseReturnList")
);
const PendingPurchase = lazy(() =>
  import("./views/apps/freshlist/order/purchase/PendingPurchase")
);
const PurchaseCompleted = lazy(() =>
  import("./views/apps/freshlist/order/purchase/PurchaseCompleted")
);
const PaymentListAll = lazy(() =>
  import("./views/apps/freshlist/order/purchase/PaymentList")
);
const EditPurchase = lazy(() =>
  import("./views/apps/freshlist/order/purchase/EditPurchase")
);
const PurchaseReturn = lazy(() =>
  import("./views/apps/freshlist/order/purchase/PurchaseReturn")
);

const SalesReturnView = lazy(() =>
  import("./views/apps/freshlist/order/SalesReturnView")
);
const AddPlaceOrder = lazy(() =>
  import("./views/apps/freshlist/order/PlaceOrder")
);
const PlaceOrderList = lazy(() =>
  import("./views/apps/freshlist/order/PlaceOrderList")
);
const PlaceOrderReturn = lazy(() =>
  import("./views/apps/freshlist/order/PlaceOrderReturn")
);
// app/softNumen/order/OrderSearch
const InvoiceGenerator = lazy(() =>
  import("./views/apps/freshlist/subcategory/InvoiceGenerator")
);

const WarehouseStock = lazy(() =>
  import("./views/apps/freshlist/subcategory/WarehouseStock")
);
const AddTaxSoft = lazy(() =>
  import("./views/apps/freshlist/subcategory/AddTax")
);
const CourierShipping = lazy(() =>
  import("./views/apps/freshlist/subcategory/CourierShipping")
);
const AddCourierCharges = lazy(() =>
  import("./views/apps/freshlist/subcategory/AddCourierCharges")
);
const AddSupplier = lazy(() =>
  import("./views/apps/freshlist/customer/Quotation/AddSupplier")
);
const SupplierLists = lazy(() =>
  import("./views/apps/freshlist/customer/Quotation/SupplierList")
);
const AddNewSupplier = lazy(() =>
  import("./views/apps/freshlist/customer/Quotation/AddNewSupplier")
);
const CreateQuote = lazy(() =>
  import("./views/apps/freshlist/customer/Quotation/CreateQuote")
);
// const DebitNotes = lazy(() =>
//   import("./views/apps/freshlist/customer/Quotation/DebitNotes")
// );
// const CreateNotes = lazy(() =>
//   import("./views/apps/freshlist/customer/Quotation/CreateNotes")
// );

const WareHouseListSoft = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/WareHouseList")
);
const SettingTab = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/SettingTab")
);

const CreateWareHouse = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/CreateWareHouse")
);
const Inwordwarehousecreate = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/Inwordwarehousecreate")
);
const RawMaterialInward = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/RawMaterialInward")
);
const RawmaterialOutward = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/RawmaterialOutward")
);
const StockTransferwarehouse = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/StockTransfer")
);
const InwardStock = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/InwardStock")
);
const OutwardStock = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/OutwardStock")
);
const WareHouseStock = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/WareHouseStock")
);
const AddDamage = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/AddDamage")
);
const DamageReport = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/DamageReport")
);
const StockStorage = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/StockStorage")
);
const WastageDetail = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/WastageDetail")
);
const DispatchDetail = lazy(() =>
  import("./views/apps/freshlist/customer/warehouse/DispatchDetail")
);
const TransporterList = lazy(() =>
  import("./views/apps/freshlist/customer/transporter/TransporterList")
);
// const CreateTransporter = lazy(() =>
//   import("./views/apps/freshlist/customer/transporter/CreateTransporter")
// );
const UnitList = lazy(() =>
  import("./views/apps/freshlist/customer/unit/UnitList")
);
const CreateUnit = lazy(() =>
  import("./views/apps/freshlist/customer/unit/CreateUnit")
);
const EditUnit = lazy(() =>
  import("./views/apps/freshlist/customer/unit/EditUnit")
);
const InVoiceSystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/InVoice")
);
const OrdersSystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/Orders")
);
const PartsCatelogueSystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/PartsCatelogue")
);
const ScrutinySystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/Scrutiny")
);
const AddScrutinySystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/AddScrutiny")
);
const ServiceSystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/Service")
);
const ServiceCard = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/ServiceCard")
);
const SparePartsSystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/SpareParts")
);
const SupportsSystem = lazy(() =>
  import("./views/apps/freshlist/customer/SystemManagement/Supports")
);
const EditProduct_Type = lazy(() =>
  import("./views/apps/Softnemen Parts/EditParts/EditProduct_Type")
);
const Soft_ProductType = lazy(() =>
  import("./views/apps/Softnemen Parts/ProductType")
);

const Addmodel = lazy(() => import("./views/apps/Softnemen Parts/Addmodel"));
const ModalTypeList = lazy(() =>
  import("./views/apps/Softnemen Parts/ModalTypeList")
);

const AddEngineType = lazy(() =>
  import("./views/apps/Softnemen Parts/AddEngineType")
);
const EngineType = lazy(() =>
  import("./views/apps/Softnemen Parts/EngineType")
);

// const AddValveType = lazy(() =>
//   import("./views/apps/Softnemen Parts/AddValveType")
// );
const ValvesTypeList = lazy(() =>
  import("./views/apps/Softnemen Parts/ValvesTypeList")
);

const AddBodyStyle = lazy(() =>
  import("./views/apps/Softnemen Parts/AddBodyStyle")
);
const BodyStyleList = lazy(() =>
  import("./views/apps/Softnemen Parts/BodyStyleList")
);

const AddColorList = lazy(() =>
  import("./views/apps/Softnemen Parts/AddColorList")
);
const ColorList = lazy(() => import("./views/apps/Softnemen Parts/ColorList"));

// softNumen Product add
const AddProductType = lazy(() =>
  import("./views/apps/Softnemen Parts/AddProductType")
);
const ProductNamelist = lazy(() =>
  import("./views/apps/Softnemen Parts/ProductNamelist")
);
const AddValveType = lazy(() =>
  import("./views/apps/Softnemen Parts/AddValveType")
);
const VariantList = lazy(() =>
  import("./views/apps/Softnemen Parts/VariantList")
);
const AddVarient = lazy(() =>
  import("./views/apps/Softnemen Parts/AddVarient")
);

// Brand
const BrandList = lazy(() => import("./views/apps/freshlist/brand/BrandList"));
const AddBrand = lazy(() => import("./views/apps/freshlist/brand/AddBrand"));
const EditBrand = lazy(() => import("./views/apps/freshlist/brand/EditBrand"));
const ViewBrand = lazy(() => import("./views/apps/freshlist/brand/ViewBrand"));
// Product Attributes

// Batch
const AddBatch = lazy(() => import("./views/apps/freshlist/batch/AddBatch"));
const BatchList = lazy(() => import("./views/apps/freshlist/batch/BatchList"));
const EditBatch = lazy(() => import("./views/apps/freshlist/batch/EditBatch"));
const ViewBatch = lazy(() => import("./views/apps/freshlist/batch/ViewBatch"));

const ProductAttributeList = lazy(() =>
  import("./views/apps/freshlist/attribute/ProductAttributeList")
);
const AddProductAttribute = lazy(() =>
  import("./views/apps/freshlist/attribute/AddProductAttribute ")
);
const EditProductAttribute = lazy(() =>
  import("./views/apps/freshlist/attribute/EditProductAttribute")
);
// Account
const AddRoleNew = lazy(() =>
  import("./views/apps/freshlist/accounts/AddRoleNew")
);
const CreateHeirarchy = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateHeirarchy")
);
const AssignTeamMember = lazy(() =>
  import("./views/apps/freshlist/accounts/AssignTeamMember")
);
const EditTeamRolePosition = lazy(() =>
  import("./views/apps/freshlist/accounts/EditTeamRolePosition")
);
const EditRole = lazy(() => import("./views/apps/freshlist/accounts/EditRole"));

const UpdateExistingRole = lazy(() =>
  import("./views/apps/freshlist/accounts/UpdateExistingRole")
);
const CreateAccount = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateAccount")
);
const Createitemforproduction = lazy(() =>
  import("./views/apps/freshlist/Production/Createitemforproduction")
);
const pricecalculaterproduction = lazy(() =>
  import("./views/apps/freshlist/Production/pricecalculaterproduction")
);
const productionprocesspage = lazy(() =>
  import("./views/apps/freshlist/Production/productionprocesspage")
);
const wastagematerialproduction = lazy(() =>
  import("./views/apps/freshlist/Production/wastagematerialproduction")
);
const wastagestockreturnproduction = lazy(() =>
  import("./views/apps/freshlist/Production/wastagestockreturnproduction")
);

const CreateStockTrx = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateStockTrx")
);
const CreatePromotionalActivity = lazy(() =>
  import("./views/apps/freshlist/accounts/CreatePromotionalActivity")
);
const EditPromotionalActivity = lazy(() =>
  import("./views/apps/freshlist/accounts/EditPromotionalActivity")
);
const CreateTarget = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateTarget")
);
const CreateCustomerGroup = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateCustomerGroup")
);
const EditTarget = lazy(() =>
  import("./views/apps/freshlist/accounts/EditTarget")
);
const PartyLedgersView = lazy(() =>
  import("./views/apps/freshlist/accounts/PartyLedgersView.js")
);
const CreateReturnSalesOrder = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateReturnSalesOrder")
);
const PartyCreation = lazy(() =>
  import("./views/apps/freshlist/accounts/PartyCreation")
);
const CreateCustomer = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateCustomer")
);
const CreateTransporter = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateTransporter")
);
const CreateSalesTeam = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateSalesTeam")
);
const CreateSalesManag = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateSalesManager")
);
const CreateDispach = lazy(() =>
  import("./views/apps/freshlist/accounts/CreateDispach")
);
const GoodDispatchList = lazy(() =>
  import("./views/apps/freshlist/accounts/GoodDispatchList")
);
const CreditNoteList = lazy(() =>
  import("./views/apps/freshlist/customer/notes/CreditNoteList")
);
const DebitNoteList = lazy(() =>
  import("./views/apps/freshlist/customer/notes/DebitNoteList")
);

const EditAccount = lazy(() =>
  import("./views/apps/freshlist/accounts/EditAccount")
);
const ViewAccount = lazy(() =>
  import("./views/apps/freshlist/accounts/ViewAccount")
);

// policy
const CreatePolicy = lazy(() =>
  import("./views/apps/freshlist/policy/CreatePolicy")
);
const SearchPolicy = lazy(() =>
  import("./views/apps/freshlist/policy/SearchPolicy")
);
// ticket
const CreateTicket = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/CreateTicket")
);
const Stockreport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/Stockreport")
);

const OverdueReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/OverdueReport")
);
const purchasereportamount = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/purchasereportamount")
);
const WareHouseReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/WareHouseReport")
);
const Partywiseledger = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/Partywiseledger")
);
const TransporterReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/TransporterReport")
);
const targerReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/targerReport")
);
const DispatchReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/DispatchReport")
);
const GSTR1 = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/GSTR1")
);
const ProductListwithHSNandGST = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/ProductListwithHSNandGST")
);
const OutStandingReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/OutStandingReport")
);
const CashbookReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/CashbookReport")
);
const PendingOrderReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/PendingOrderReport")
);
const LockInReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/LockInReport")
);
const HSNWisesaleReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/HSNWisesaleReport")
);
const GSTR9 = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/GSTR9")
);
const GSTR3B = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/GSTR3B")
);
const GSTR2B = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/GSTR2B")
);
const TeamandtargerReport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/TeamandtargerReport")
);
const Salesreport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/Salesreport")
);
const DeadParty = lazy(() =>
  import("./views/apps/freshlist/customer/StockManagement/DeadParty")
);
const OpeningStock = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/OpeningStock")
);
const ClosingStockList = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/ClosingStockList")
);
const WarehouseDispatchlist = lazy(() =>
  import("./views/apps/freshlist/accounts/WarehouseDispatchlist")
);
const OverDueStockReport = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/OverDueStockReport")
);
const AllOverdueStockList = lazy(() =>
  import("./views/apps/freshlist/customer/ProductWIKI/AllOverdueStockList")
);
const Orderreport = lazy(() =>
  import("./views/apps/freshlist/customer/Ticketing/Orderreport")
);

// inspection
const CreateInspections = lazy(() =>
  import("./views/apps/freshlist/inspection/CreateInspections")
);
const InspectionsSearch = lazy(() =>
  import("./views/apps/freshlist/inspection/InspectionsSearch")
);
const RoleList = lazy(() => import("./views/apps/freshlist/accounts/RoleList"));
const ViewLedger = lazy(() =>
  import("./views/apps/freshlist/accounts/ViewLedger")
);
const DepartmentRoleAssign = lazy(() =>
  import("./views/apps/freshlist/accounts/DepartmentRoleAssign")
);
const AssignToSuperAdmin = lazy(() =>
  import("./views/apps/freshlist/accounts/AssignToSuperAdmin")
);
// INhouseProduct
const HouseProductList = lazy(() =>
  import("./views/apps/freshlist/house/HouseProductList")
);

const AddProduct = lazy(() =>
  import("./views/apps/freshlist/house/AddProduct")
);
const EditAddProduct = lazy(() =>
  import("./views/apps/freshlist/house/EditAddProduct")
);
const ProductRegistration = lazy(() =>
  import(
    "./views/apps/freshlist/customer/ProductManagement/ProductRegistration"
  )
);
const PurchaseInvoice = lazy(() =>
  import("./views/apps/freshlist/customer/ProductManagement/PurchaseInvoice")
);
const ProductSearch = lazy(() =>
  import("./views/apps/freshlist/customer/ProductManagement/ProductSearch")
);
const ProductAttribute = lazy(() =>
  import("./views/apps/freshlist/customer/ProductManagement/Attribute")
);
const EditMyProduct = lazy(() =>
  import("./views/apps/freshlist/house/EditProduct")
);
const EditInventory = lazy(() =>
  import("./views/apps/freshlist/house/EditInventory")
);
const AssignToClient = lazy(() =>
  import("./views/apps/freshlist/house/AssignToClient")
);
const AssignToClientlist = lazy(() =>
  import("./views/apps/freshlist/house/AssignedCLientlist")
);
const CustomerGroupList = lazy(() =>
  import("./views/apps/freshlist/house/CustomerGroupList")
);
const AssignedPage = lazy(() =>
  import("./views/apps/freshlist/house/AssignedPage")
);

const AddHouseProduct = lazy(() =>
  import("./views/apps/freshlist/house/AddHouseProduct")
);
const ProductDashboard = lazy(() =>
  import("./views/apps/freshlist/house/ProductDashboard")
);
const Assignedtoclient = lazy(() =>
  import("./views/apps/freshlist/house/AssignedList")
);
const ViewoneAssigned = lazy(() =>
  import("./views/apps/freshlist/house/ViewoneAssigned")
);
const RateMaster = lazy(() =>
  import("./views/apps/freshlist/house/RateMaster")
);

const ViewType = lazy(() => import("./views/apps/freshlist/house/ViewTypes"));
const AddRateMaster = lazy(() =>
  import("./views/apps/freshlist/house/AddRateMaster")
);
const AddType = lazy(() => import("./views/apps/freshlist/house/AddType"));
const EditType = lazy(() => import("./views/apps/freshlist/house/EditType"));
const Typelist = lazy(() => import("./views/apps/freshlist/house/Typelist"));
const Inventory = lazy(() => import("./views/apps/freshlist/house/Inventory"));
const ServiceMaster = lazy(() =>
  import("./views/apps/freshlist/house/ServiceMaster")
);
const AccounSearch = lazy(() =>
  import("./views/apps/freshlist/house/AccounSearch")
);

const StockTransferList = lazy(() =>
  import("./views/apps/freshlist/house/StockTransferList")
);
const PromotionalActivityList = lazy(() =>
  import("./views/apps/freshlist/house/PromotionalActivityList")
);
const Productionitem = lazy(() =>
  import("./views/apps/freshlist/Production/Itemproduct")
);
const Wastageproduction = lazy(() =>
  import("./views/apps/freshlist/Production/Wastageproduction")
);
const ReturnProductionProduct = lazy(() =>
  import("./views/apps/freshlist/Production/ReturnProduct")
);
const TargetCreationList = lazy(() =>
  import("./views/apps/freshlist/house/TargetCreation")
);
const HeadtargetingList = lazy(() =>
  import("./views/apps/freshlist/house/HeadtargetingList")
);
const SalesOrderReturn = lazy(() =>
  import("./views/apps/freshlist/house/SalesOrderReturn")
);
const PartyList = lazy(() => import("./views/apps/freshlist/house/PartyList"));
const CustomerSearch = lazy(() =>
  import("./views/apps/freshlist/house/CustomerSearch")
);
const CreateTransportList = lazy(() =>
  import("./views/apps/freshlist/house/CreateTransportList")
);
const CreateSalesMan = lazy(() =>
  import("./views/apps/freshlist/house/SalesManList")
);
const CreateSalesManager = lazy(() =>
  import("./views/apps/freshlist/house/SalesManagerList")
);
const OrderDispatchList = lazy(() =>
  import("./views/apps/freshlist/house/OrderDispatchList")
);
const SupplierList = lazy(() =>
  import("./views/apps/freshlist/house/SupplierList")
);
const EditProductType = lazy(() =>
  import("./views/apps/freshlist/house/EditProductType")
);
const EditHouseProduct = lazy(() =>
  import("./views/apps/freshlist/house/EditHouseProduct")
);
// const ViewHouseProduct = lazy(() =>
//   import("./views/apps/freshlist/house/ViewHouseProduct")
// );

// BundleList
const BundleList = lazy(() =>
  import("./views/apps/freshlist/bundle/BundleList")
);
const AddBundle = lazy(() => import("./views/apps/freshlist/bundle/AddBundle"));

// Freebies
const Freebies = lazy(() => import("./views/apps/freshlist/freebies/Freebies"));
// Cart /SuggestedProducts
const SuggestedProducts = lazy(() =>
  import("./views/apps/freshlist/cart/SuggestedProducts")
);
const BudgetAssignment = lazy(() =>
  import("./views/apps/freshlist/cart/BudgetAssignment")
);
const DateWiseReport = lazy(() =>
  import("./views/apps/freshlist/cart/DateWiseReport")
);
const Clientwisereport = lazy(() =>
  import("./views/apps/freshlist/cart/Clientwisereport")
);
const ViewoneFinalreport = lazy(() =>
  import("./views/apps/freshlist/cart/ViewOneReport")
);
const BranchwiseReport = lazy(() =>
  import("./views/apps/freshlist/cart/BranchwiseReport")
);
const ProductWise = lazy(() =>
  import("./views/apps/freshlist/cart/ProductWise")
);
const LogsReport = lazy(() => import("./views/apps/freshlist/cart/Logs"));
const UniqueCode = lazy(() => import("./views/apps/freshlist/cart/UniqueCode"));
// Subscriber
const SubscriberList = lazy(() =>
  import("./views/apps/freshlist/subscriber/SubscriberList")
);
// Notification;
const AllNotification = lazy(() =>
  import("./views/apps/freshlist/mobile/AllNotification")
);
const CustomerGroupWise = lazy(() =>
  import("./views/apps/freshlist/mobile/CustomerGroupWise")
);
const BannerSection = lazy(() =>
  import("./views/apps/freshlist/mobile/BannerSection")
);
const AddNotification = lazy(() =>
  import("./views/apps/freshlist/notif/AddNotification")
);

// policy
const PrivacyPolicy = lazy(() =>
  import("./views/apps/freshlist/privacyPolicy/PrivacyPolicy")
);

const addPolicy = lazy(() =>
  import("./views/apps/freshlist/privacyPolicy/AddPolicy")
);
// help

const HelpAndSupport = lazy(() =>
  import("./views/apps/freshlist/helpAndSupport/HelpAndSupport")
);
const AddTerms = lazy(() =>
  import("./views/apps/freshlist/helpAndSupport/AddTerms")
);
// Payout
const VendorPayout = lazy(() =>
  import("./views/apps/freshlist/payout/VendorPayout")
);
const DriverPayout = lazy(() =>
  import("./views/apps/freshlist/payout/DriverPayout")
);
// Earning
const VendorEarning = lazy(() =>
  import("./views/apps/freshlist/earning/VendorEarning")
);
// Profile
const userProfile = lazy(() => import("./views/pages/profile/UserProfile"));

const editUserProfile = lazy(() =>
  import("./views/pages/profile/EditUserProfile")
);
const viewUserProfile = lazy(() =>
  import("./views/pages/profile/ViewUserProfile")
);
const Location = lazy(() => import("./views/apps/freshlist/location/Location"));

const Subs = lazy(() =>
  import("./views/pages/authentication/subscription/Subs")
);
const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
);
const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword")
);
const myResetpass = lazy(() =>
  import("./views/pages/authentication/myResetpass")
);
const NewPassword = lazy(() =>
  import("./views/pages/authentication/NewPassword")
);

//Theme Component starts from here
const userList = lazy(() => import("./views/apps/user/list/List"));
const userEdit = lazy(() => import("./views/apps/user/edit/Edit"));
const userView = lazy(() => import("./views/apps/user/view/View"));
const email = lazy(() => import("./views/apps/email/Email"));
const chat = lazy(() => import("./views/apps/chat/Chat"));
const todo = lazy(() => import("./views/apps/todo/Todo"));
const calendar = lazy(() => import("./views/apps/calendar/Calendar"));
const shop = lazy(() => import("./views/apps/ecommerce/shop/Shop"));
const wishlist = lazy(() => import("./views/apps/ecommerce/wishlist/Wishlist"));
const checkout = lazy(() => import("./views/apps/ecommerce/cart/Cart"));
const productDetail = lazy(() =>
  import("./views/apps/ecommerce/detail/Detail")
);
const grid = lazy(() => import("./views/ui-elements/grid/Grid"));
const typography = lazy(() =>
  import("./views/ui-elements/typography/Typography")
);
const textutilities = lazy(() =>
  import("./views/ui-elements/text-utilities/TextUtilities")
);
const syntaxhighlighter = lazy(() =>
  import("./views/ui-elements/syntax-highlighter/SyntaxHighlighter")
);
const colors = lazy(() => import("./views/ui-elements/colors/Colors"));
const reactfeather = lazy(() =>
  import("./views/ui-elements/icons/FeatherIcons")
);
const basicCards = lazy(() => import("./views/ui-elements/cards/basic/Cards"));
const statisticsCards = lazy(() =>
  import("./views/ui-elements/cards/statistics/StatisticsCards")
);
const analyticsCards = lazy(() =>
  import("./views/ui-elements/cards/analytics/Analytics")
);
const actionCards = lazy(() =>
  import("./views/ui-elements/cards/actions/CardActions")
);
const Alerts = lazy(() => import("./components/reactstrap/alerts/Alerts"));
const Buttons = lazy(() => import("./components/reactstrap/buttons/Buttons"));
const Breadcrumbs = lazy(() =>
  import("./components/reactstrap/breadcrumbs/Breadcrumbs")
);
const Carousel = lazy(() =>
  import("./components/reactstrap/carousel/Carousel")
);
const Collapse = lazy(() =>
  import("./components/reactstrap/collapse/Collapse")
);
const Dropdowns = lazy(() =>
  import("./components/reactstrap/dropdowns/Dropdown")
);
const ListGroup = lazy(() =>
  import("./components/reactstrap/listGroup/ListGroup")
);
const Modals = lazy(() => import("./components/reactstrap/modal/Modal"));
const Pagination = lazy(() =>
  import("./components/reactstrap/pagination/Pagination")
);
const NavComponent = lazy(() =>
  import("./components/reactstrap/navComponent/NavComponent")
);
const Navbar = lazy(() => import("./components/reactstrap/navbar/Navbar"));
const Tabs = lazy(() => import("./components/reactstrap/tabs/Tabs"));
const TabPills = lazy(() =>
  import("./components/reactstrap/tabPills/TabPills")
);
const Tooltips = lazy(() =>
  import("./components/reactstrap/tooltips/Tooltips")
);
const Popovers = lazy(() =>
  import("./components/reactstrap/popovers/Popovers")
);
const Badge = lazy(() => import("./components/reactstrap/badge/Badge"));
const BadgePill = lazy(() =>
  import("./components/reactstrap/badgePills/BadgePill")
);

const Progress = lazy(() =>
  import("./components/reactstrap/progress/Progress")
);
const Media = lazy(() => import("./components/reactstrap/media/MediaObject"));
const Spinners = lazy(() =>
  import("./components/reactstrap/spinners/Spinners")
);
const Toasts = lazy(() => import("./components/reactstrap/toasts/Toasts"));
const avatar = lazy(() => import("./components/@vuexy/avatar/Avatar"));
const AutoComplete = lazy(() =>
  import("./components/@vuexy/autoComplete/AutoComplete")
);
const chips = lazy(() => import("./components/@vuexy/chips/Chips"));
const divider = lazy(() => import("./components/@vuexy/divider/Divider"));
const vuexyWizard = lazy(() => import("./components/@vuexy/wizard/Wizard"));
const listView = lazy(() => import("./views/ui-elements/data-list/ListView"));
const thumbView = lazy(() => import("./views/ui-elements/data-list/ThumbView"));
const select = lazy(() => import("./views/forms/form-elements/select/Select"));
const switchComponent = lazy(() =>
  import("./views/forms/form-elements/switch/Switch")
);
const checkbox = lazy(() =>
  import("./views/forms/form-elements/checkboxes/Checkboxes")
);
const radio = lazy(() => import("./views/forms/form-elements/radio/Radio"));
const input = lazy(() => import("./views/forms/form-elements/input/Input"));
const group = lazy(() =>
  import("./views/forms/form-elements/input-groups/InputGoups")
);
const numberInput = lazy(() =>
  import("./views/forms/form-elements/number-input/NumberInput")
);
const textarea = lazy(() =>
  import("./views/forms/form-elements/textarea/Textarea")
);
const pickers = lazy(() =>
  import("./views/forms/form-elements/datepicker/Pickers")
);
const inputMask = lazy(() =>
  import("./views/forms/form-elements/input-mask/InputMask")
);
const layout = lazy(() => import("./views/forms/form-layouts/FormLayouts"));
const formik = lazy(() => import("./views/forms/formik/Formik"));
const tables = lazy(() => import("./views/tables/reactstrap/Tables"));
const ReactTables = lazy(() =>
  import("./views/tables/react-tables/ReactTables")
);
const Aggrid = lazy(() => import("./views/tables/aggrid/Aggrid"));
const DataTable = lazy(() =>
  impoaccordianrt("./views/tables/data-tables/DataTables")
);

const faq = lazy(() => import("./views/pages/faq/FAQ"));
const knowledgeBase = lazy(() =>
  import("./views/pages/knowledge-base/KnowledgeBase")
);
const search = lazy(() => import("./views/pages/search/Search"));
const accountSettings = lazy(() =>
  import("./views/pages/account-settings/AccountSettings")
);
const invoice = lazy(() => import("./views/pages/invoice/Invoice"));
const comingSoon = lazy(() => import("./views/pages/misc/ComingSoon"));
const error404 = lazy(() => import("./views/pages/misc/error/404"));
const error500 = lazy(() => import("./views/pages/misc/error/500"));
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"));
const maintenance = lazy(() => import("./views/pages/misc/Maintenance"));
const apex = lazy(() => import("./views/charts/apex/ApexCharts"));
const chartjs = lazy(() => import("./views/charts/chart-js/ChartJS"));
const extreme = lazy(() => import("./views/charts/recharts/Recharts"));
const leafletMaps = lazy(() => import("./views/maps/Maps"));
const toastr = lazy(() => import("./extensions/toastify/Toastify"));
const sweetAlert = lazy(() => import("./extensions/sweet-alert/SweetAlert"));
const rcSlider = lazy(() => import("./extensions/rc-slider/Slider"));
const uploader = lazy(() => import("./extensions/dropzone/Dropzone"));
const editor = lazy(() => import("./extensions/editor/Editor"));
const drop = lazy(() => import("./extensions/drag-and-drop/DragAndDrop"));
const tour = lazy(() => import("./extensions/tour/Tour"));
const clipboard = lazy(() =>
  import("./extensions/copy-to-clipboard/CopyToClipboard")
);
const menu = lazy(() => import("./extensions/contexify/Contexify"));
const swiper = lazy(() => import("./extensions/swiper/Swiper"));
const i18n = lazy(() => import("./extensions/i18n/I18n"));
const reactPaginate = lazy(() => import("./extensions/pagination/Pagination"));
const tree = lazy(() => import("./extensions/treeview/TreeView"));
const Import = lazy(() => import("./extensions/import-export/Import"));
const Export = lazy(() => import("./extensions/import-export/Export"));
const ExportSelected = lazy(() =>
  import("./extensions/import-export/ExportSelected")
);
const lockScreen = lazy(() =>
  import("./views/pages/authentication/LockScreen")
);
const register = lazy(() =>
  import("./views/pages/authentication/register/Register")
);
const accessControl = lazy(() =>
  import("./extensions/access-control/AccessControl")
);

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};
const AppRoute = connect(mapStateToProps)(RouteConfig);
class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <HashRouter history={history}>
        <Switch>
          {/* <Route
         exact
         path="/"
         component={
          loading
           ? () => <div>Loading posts...</div>
         : () => <Home posts={posts} />
        }
      />
    <Route path="/login" component={Login} /> */}
          <AppRoute exact path="/dashboard" component={MainDash} />
          <AppRoute
            path="/ecommerce-dashboard"
            component={ecommerceDashboard}
          />
          {/* Customer */}
          <AppRoute
            path="/app/freshlist/customer/customergroup"
            component={CustomerGroup}
          />
          <AppRoute
            path="/app/freshlist/customer/addCustomer"
            component={AddCustomer}
          />
          <AppRoute
            path="/app/freshlist/customer/customerList"
            component={CustomerList}
          />
          <AppRoute
            path="/app/SoftNumen/Customer/Customer_Registration"
            component={CustomerRegistration}
          />
          <AppRoute path="/app/SoftNumen/parts/AddPart" component={AddPart} />
          <AppRoute
            path="/app/SoftNumen/parts/SchedulerTime"
            component={Scheduler}
          />
          <AppRoute path="/app/SoftNumen/parts/PartList" component={PartList} />
          <AppRoute path="/app/SoftNumen/parts/Cashbook" component={Cashbook} />
          <AppRoute
            path="/app/rupioo/parts/PartyLedger"
            component={PartyLedger}
          />
          <AppRoute
            path="/app/rupioo/parts/UserLedger"
            component={UserLedger}
          />
          <AppRoute
            path="/app/SoftNumen/parts/ReceiptList"
            component={ReceiptList}
          />
          <AppRoute
            path="/app/SoftNumen/parts/Addorderbycashbook"
            component={Addorderbycashbook}
          />
          <AppRoute
            path="/app/SoftNumen/parts/PartCatalougue"
            component={PartCatalougue}
          />
          <AppRoute
            path="/app/freshlist/customer/viewCustomer/:id"
            component={ViewCustomer}
          />
          <AppRoute
            path="/app/freshlist/customer/editCustomer/:id"
            component={EditCustomer}
          />
          <AppRoute
            path="/app/freshlist/customer/customerReview"
            component={CustomerReview}
          />
          <AppRoute
            path="/app/freshlist/customer/reviewTable"
            component={ReviewTable}
          />
          {/* Wallet */}
          <AppRoute
            path="/app/freshlist/wallet/walletType"
            component={WalletType}
          />
          <AppRoute
            path="/app/freshlist/wallet/addtransactions"
            component={AddTransactions}
          />
          <AppRoute
            path="/app/freshlist/wallet/viewWallet/:id"
            component={ViewWallet}
          />
          <AppRoute
            path="/app/freshlist/customer/filterOption"
            component={FilterOption}
          />
          <AppRoute
            path="/app/freshlist/customer/summary"
            component={Summary}
          />
          <AppRoute
            path="/app/freshlist/customer/addFund"
            component={AddFund}
          />
          {/* Banner */}
          <AppRoute
            path="/app/freshlist/banner/addBanner"
            component={AddBanner}
          />
          <AppRoute
            path="/app/freshlist/banner/viewBanner/:id"
            component={ViewBanner}
          />
          <AppRoute
            path="/app/freshlist/banner/reportsdatewise"
            component={BannerList}
          />
          <AppRoute
            path="/app/freshlist/banner/editBanner/:id"
            component={EditBanner}
          />
          {/* Sales
          <AppRoute
            path="/app/freshlist/sales/totalsales"
            component={TotalSales}
          />
          <AppRoute path="/app/freshlist/sales/hubsales" component={HubSales} /> */}
          {/* Zone */}
          <AppRoute path="/app/freshlist/zone/addzone" component={AddZone} />
          <AppRoute
            path="/app/freshlist/zone/zoneslist"
            component={ZonesList}
          />
          <AppRoute
            path="/app/freshlist/zone/AddDeliveryCharges"
            component={AddDeliveryCharges}
          />
          {/* vendor */}
          <AppRoute
            path="/app/freshlist/vendor/addVendor"
            component={AddVendor}
          />
          <AppRoute
            path="/app/freshlist/vendor/vendorList"
            component={VendorList}
          />
          <AppRoute
            path="/app/freshlist/vendor/viewVendor/:id"
            component={ViewVendor}
          />
          <AppRoute
            path="/app/freshlist/vendor/editVendor/:id"
            component={EditVendor}
          />
          <AppRoute
            path="/app/freshlist/vendor/withDraws"
            component={WithDraws}
          />
          <AppRoute
            path="/app/freshlist/vendor/viewWithDraws"
            component={ViewWithDraws}
          />
          {/* Driver */}
          <AppRoute
            path="/app/freshlist/driver/addDriver"
            component={AddDriver}
          />
          <AppRoute
            path="/app/freshlist/driver/editDriver/:id"
            component={EditDriver}
          />
          <AppRoute
            path="/app/freshlist/driver/driverList"
            component={DriverList}
          />
          {/* Employee */}
          <AppRoute
            path="/app/freshlist/user/manageRole"
            component={ManageRole}
          />
          <AppRoute path="/app/freshlist/user/userList" component={UserList} />
          {/* Special */}
          <AppRoute
            path="/app/freshlist/special/SpecialList"
            component={SpecialList}
          />
          {/* Coupon */}
          <AppRoute
            path="/app/freshlist/coupon/couponList"
            component={CouponList}
          />
          {/* FlashSale */}
          <AppRoute
            path="/app/freshlist/flashSale/flashSale"
            component={FlashSale}
          />
          <AppRoute
            path="/app/freshlist/flashSale/editFlashSale"
            component={EditFlashSale}
          />
          <AppRoute
            path="/app/freshlist/flashSale/addFlashSale"
            component={AddFlashSale}
          />
          {/* Deal */}
          <AppRoute
            path="/app/freshlist/dealOfDay/dealOfDay"
            component={DealOfDay}
          />
          {/* Discount */}
          <AppRoute
            path="/app/freshlist/discount/discountList"
            component={DiscountList}
          />
          <AppRoute
            path="/app/freshlist/discount/addDiscount"
            component={AddDiscount}
          />
          <AppRoute
            path="/app/freshlist/discount/editDiscount"
            component={EditDiscount}
          />
          <AppRoute path="/app/freshlist/points/Points" component={Points} />
          <AppRoute
            path="/app/freshlist/dealOfDay/editDeal"
            component={EditDeal}
          />
          {/* feature Deal */}
          <AppRoute
            path="/app/freshlist/featuredeal/featureDeal"
            component={FeatureDeal}
          />
          <AppRoute
            path="/app/freshlist/featuredeal/editFeatureDeal"
            component={EditFeatureDeal}
          />
          <AppRoute
            path="/app/freshlist/featuredeal/addFeatureDeal"
            component={AddFeatureDeal}
          />
          {/* Language */}
          <AppRoute
            path="/app/freshlist/language/languageList"
            component={LanguageList}
          />
          <AppRoute
            path="/app/freshlist/language/addLanguage"
            component={AddLanguage}
          />
          {/* gallery */}
          <AppRoute path="/app/freshlist/gallery/gallery" component={Gallery} />
          <AppRoute
            path="/app/freshlist/gallery/addGallery"
            component={AddGallery}
          />
          {/* hrm links start */}
          <AppRoute
            path="/app/ajgroup/HRM/Recruitmentandplacement"
            component={Recruitmentandplacement}
          />
          <AppRoute path="/app/ajgroup/HRM/jobcreate" component={jobcreate} />
          <AppRoute path="/app/ajgroup/HRM/jobappList" component={JobappList} />
          <AppRoute
            path="/app/ajgroup/HRM/practiceList"
            component={practiceList}
          />
          <AppRoute path="/app/ajgroup/HRM/JobList" component={JobList} />
          <AppRoute
            path="/app/ajgroup/HRM/ViewHrm/JobeditList/:id"
            component={JobeditList}
          />
          <AppRoute
            path="/app/ajgroup/HRM/ViewHrm/JobviewList/:id"
            component={JobViewform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/HrmjpbApp/JobapView/:id"
            component={JobApView}
          />
          <AppRoute
            path="/app/ajgroup/HRM/HrminterView/InterView/:id"
            component={InterView_viewList}
          />
          <AppRoute
            path="/app/ajgroup/HRM/HrmjpbApp/JobapeditList/:id"
            component={JobapEdList}
          />
          <AppRoute
            path="/app/ajgroup/HRM/HrminterView/InterViewedit/:id"
            component={IntereditList}
          />
          <AppRoute
            path="/app/ajgroup/HRM/interviewList"
            component={InterviewList}
          />
          <AppRoute path="/app/ajgroup/HRM/offerList" component={offerList} />
          <AppRoute
            path="/app/ajgroup/HRM/empList"
            component={CreateemployeList}
          />
          <AppRoute
            path="/app/ajgroup/HRM/trainList"
            component={TrainingList}
          />
          <AppRoute path="/app/ajgroup/HRM/attenList" component={AttendList} />
          <AppRoute path="/app/ajgroup/HRM/leaveList" component={LeaveList} />
          <AppRoute path="/app/ajgroup/HRM/indicatList" component={IndicList} />
          <AppRoute path="/app/ajgroup/HRM/incentList" component={IncenList} />
          <AppRoute path="/app/ajgroup/HRM/bonusList" component={BonusList} />
          <AppRoute path="/app/ajgroup/HRM/goalList" component={GoalList} />
          <AppRoute path="/app/ajgroup/HRM/termList" component={TermList} />
          <AppRoute
            path="/app/ajgroup/HRM/advanceList"
            component={AdvanceList}
          />
          <AppRoute path="/app/ajgroup/HRM/overtList" component={OvertList} />
          <AppRoute path="/app/ajgroup/HRM/ruleList" component={RuleList} />
          <AppRoute path="/app/ajgroup/HRM/pfList" component={Pflist} />
          <AppRoute path="/app/ajgroup/HRM/esiList" component={Esilist} />
          <AppRoute path="/app/ajgroup/HRM/loneList" component={Lonelist} />
          <AppRoute path="/app/ajgroup/HRM/taList" component={Talist} />
          <AppRoute path="/app/ajgroup/HRM/daList" component={Dalist} />
          <AppRoute
            path="/app/ajgroup/HRM/travlingList"
            component={Travllinglist}
          />
          <AppRoute
            path="/app/ajgroup/HRM/insuranceList"
            component={Insurancelist}
          />
          <AppRoute
            path="/app/ajgroup/HRM/setsalarList"
            component={Setsalarlist}
          />
          <AppRoute
            path="/app/ajgroup/HRM/Time-sheet/attenform"
            component={AttenForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/Time-sheet/leaveform"
            component={LeaveForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/TCPA/incenform"
            component={IncenForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/TCPA/bonusform"
            component={BonusForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/TCPA/goltrackform"
            component={GoalForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/Perfomence/indicatform"
            component={Indicatform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/jobForm"
            component={JobbForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/applresultForm"
            component={AppResultForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/practskillform"
            component={MockTestForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/interviewForm"
            component={InterviewForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/offerletterForm"
            component={OfferLetterForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/createempForm"
            component={EmployeeProfileForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/termiForm"
            component={TerminationForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/setsalaryForm"
            component={PayslipForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/RecPlace/trainingForm"
            component={TrainingForm}
          />
          <AppRoute
            path="/app/ajgroup/HRM/Setrule/ruleForm"
            component={Ruleform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/payrollsheet/taform"
            component={Taform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/payrollsheet/daform"
            component={Daform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/payrollsheet/pfform"
            component={Pfform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/payrollsheet/esiform"
            component={Esiform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/payrollsheet/travellingform"
            component={Travellingform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/payrollsheet/loanform"
            component={Loanform}
          />
          <AppRoute
            path="/app/ajgroup/HRM/payrollsheet/Over"
            component={Over}
          />
          <AppRoute path="/app/ajgroup/HRM/Insurance" component={Insurance} />
          <AppRoute
            path="/app/ajgroup/HRM/Advance"
            component={AdvanceComponente}
          />
          {/* hrm link */}
          {/* order */}
          <AppRoute
            path="/app/softnumen/order/createorder"
            component={CreateOrder}
          />
          <AppRoute
            path="/app/ajgroup/order/CreatePayment/:id"
            component={CreatePayment}
          />
          <AppRoute
            path="/app/ajgroup/order/CreateReceipt/:id"
            component={CreateReceipt}
          />
          <AppRoute
            path="/app/softnumen/order/pendingOrder"
            component={PendingOrder}
          />
          <AppRoute
            path="/app/AJGroup/order/editPending/:id"
            component={EditPending}
          />
          <AppRoute
            path="/app/softnumen/order/orderList"
            component={OrderList}
          />
          <AppRoute
            path="/app/AJgroup/order/purchaseOrderList"
            component={PurchaseOrderList}
          />
          <AppRoute
            path="/app/AJgroup/order/PurchaseReturnList"
            component={PurchaseReturnList}
          />
          <AppRoute
            path="/app/AJgroup/purchase/pendingPurchase"
            component={PendingPurchase}
          />
          <AppRoute
            path="/app/AJgroup/purchase/purchaseCompleted"
            component={PurchaseCompleted}
          />
          <AppRoute
            path="/app/AJgroup/purchase/PaymentListAll"
            component={PaymentListAll}
          />
          <AppRoute
            path="/app/AJgroup/order/AddPurchaseOrder"
            component={AddPurchaseOrder}
          />
          <AppRoute
            path="/app/AJgroup/order/editPurchase/:id"
            component={EditPurchase}
          />
          <AppRoute
            path="/app/AJGroup/order/salesReturn/:id"
            component={SalesReturnView}
          />
          <AppRoute
            path="/app/AJGroup/order/purchaseReturn/:id"
            component={PurchaseReturn}
          />
          <AppRoute
            path="/app/AJGroup/order/placeOrderReturn/:id"
            component={PlaceOrderReturn}
          />
          <AppRoute
            path="/app/softNumen/order/addplaceOrder"
            component={AddPlaceOrder}
          />
          <AppRoute
            path="/app/softNumen/order/confirmedOrder"
            component={ConfirmedOrder}
          />
          <AppRoute path="/app/softNumen/order/OrderOne" component={OrderOne} />
          <AppRoute
            path="/app/softNumen/order/OrderSearch"
            component={OrderSearch}
          />
          <AppRoute
            path="/app/jupitech/order/achivement"
            component={Achivement}
          />
          <AppRoute
            path="/app/freshlist/order/Selectedorder"
            component={Selectedorder}
          />
          <AppRoute
            path="/app/freshlist/order/editplaceorder/:id"
            component={editPlaceorder}
          />
          <AppRoute
            path="/app/freshlist/order/EditCompletedorders/:id"
            component={EditCompletedorders}
          />
          <AppRoute
            path="/app/freshlist/order/ViewoneInvoiceRegen"
            component={ViewoneInvoiceRegen}
          />
          <AppRoute
            path="/app/freshlist/order/ViewOneOrder/:id"
            component={ViewOneOrder}
          />
          <AppRoute
            path="/app/freshlist/order/ViewOneReceivedorder/:id"
            component={ViewOneReceivedOrder}
          />
          <AppRoute
            path="/app/AjGroup/order/placeOrderList"
            component={PlaceOrderList}
          />
          <AppRoute path="/app/freshlist/order/AddOrder" component={AddOrder} />
          <AppRoute
            path="/app/freshlist/order/editOrder/:id"
            component={EditOrder}
          />
          <AppRoute
            path="/app/freshlist/order/EditProductionProcess/:id"
            component={EditProductionProcess}
          />
          <AppRoute
            path="/app/freshlist/order/AddReturnProductionProduct/:id"
            component={AddReturnProductionProduct}
          />
          <AppRoute
            path="/app/freshlist/order/viewAll/:id"
            component={ViewAll}
          />
          {/* <AppRoute path="/app/softNumen/order/pending" component={Pending} /> */}
          <AppRoute
            path="/app/freshlist/order/viewPending"
            component={ViewPending}
          />
          <AppRoute
            path="/app/freshlist/order/{viewConfirmed}"
            component={ViewConfirmed}
          />
          <AppRoute
            path="/app/freshlist/order/inprocess"
            component={InProcess}
          />
          <AppRoute
            path="/app/freshlist/order/viewPackaging"
            component={ViewPackaging}
          />
          <AppRoute
            path="/app/freshlist/order/outfordelivery"
            component={Outfordelivery}
          />
          <AppRoute
            path="/app/freshlist/order/viewOutfordelivery"
            component={ViewOutfordelivery}
          />
          <AppRoute
            path="/app/softNumen/order/completed"
            component={Delivered}
          />
          <AppRoute
            path="/app/freshlist/order/viewDelivered"
            component={ViewDelivered}
          />
          <AppRoute path="/app/softNumen/order/returned" component={Returned} />
          <AppRoute
            path="/app/freshlist/order/viewReturned"
            component={ViewReturned}
          />
          <AppRoute
            path="/app/freshlist/order/failedtodeliver"
            component={Failedtodeliver}
          />
          <AppRoute
            path="/app/freshlist/order/viewFailedtodeliver"
            component={ViewFailedtodeliver}
          />
          <AppRoute path="/app/softNumen/order/canceled" component={Canceled} />
          <AppRoute
            path="/app/freshlist/order/viewCanceled"
            component={ViewCanceled}
          />
          <AppRoute
            path="/app/SoftNumen/order/OrderTracking"
            component={OrderTracking}
          />
          <AppRoute
            path="/app/SoftNumen/order/PaymentGateway"
            component={PaymentGateway}
          />
          {/* Refund Request */}
          <AppRoute
            path="/app/softnumen/InvoiceGenerator"
            component={InvoiceGenerator}
          />
          <AppRoute
            path="/app/softnumen/warehouseStock"
            component={WarehouseStock}
          />
          <AppRoute path="/app/softnumen/AddTaxSoft" component={AddTaxSoft} />
          <AppRoute
            path="/app/softnumen/CourierShipping"
            component={CourierShipping}
          />
          <AppRoute
            path="/app/softnumen/addcouriercharges"
            component={AddCourierCharges}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/addrefund"
            component={AddRefund}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/pendingRequest"
            component={PendingRequest}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/viewPendingRequest"
            component={ViewPendingRequest}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/approvedRequest"
            component={ApprovedRequest}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/viewApprovedRequest"
            component={ViewApprovedRequest}
          />
          <AppRoute
            path="/app/softnumen/rejectedRequest"
            component={RejectedRequest}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/viewRejectedRequest"
            component={ViewRejectedRequest}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/completedRequest"
            component={CompletedRequest}
          />
          <AppRoute
            path="/app/freshlist/refundrequest/viewRefundRequest"
            component={ViewRefundRequest}
          />
          {/* T&C */}
          <AppRoute
            path="/app/freshlist/termsAndCondition/tAndCList"
            component={TermsAndCondition}
          />
          <AppRoute
            path="/app/freshlist/termsAndCondition/addTAndC"
            component={AddTAndC}
          />
          {/* Options */}
          <AppRoute
            path="/app/freshlist/options/createAttribute"
            component={CreateAttribute}
          />
          <AppRoute
            path="/app/freshlist/options/AttributeList"
            component={AttributeList}
          />
          {/* Report */}
          <AppRoute
            path="/app/freshlist/report/productReport"
            component={ProductReport}
          />
          <AppRoute
            path="/app/freshlist/report/commissionReport"
            component={CommissionReport}
          />
          <AppRoute
            path="/app/freshlist/report/customerReport"
            component={CustomerReport}
          />
          <AppRoute
            path="/app/freshlist/report/saleReport"
            component={SaleReport}
          />
          <AppRoute
            path="/app/freshlist/report/taxReport"
            component={TaxReport}
          />
          {/* category */}
          <AppRoute
            path="/app/freshlist/category/categoryList"
            component={CategoryList}
          />
          <AppRoute
            path="/app/freshlist/category/addCategory"
            component={AddCategory}
          />
          <AppRoute
            path="/app/freshlist/category/editCategory/:id"
            component={EditCategory}
          />
          <AppRoute
            path="/app/freshlist/category/viewCategory/:id"
            component={ViewCategory}
          />
          {/* Subcategory */}
          <AppRoute
            path="/app/freshlist/subcategory/subCategoryList"
            component={SubCategoryList}
          />
          <AppRoute path="/app/freshlist/subcategory/Bills" component={Bills} />
          <AppRoute
            path="/app/freshlist/subcategory/inVoices"
            component={inVoices}
          />
          <AppRoute
            path="/app/freshlist/subcategory/inVoiceRegenerator"
            component={inVoiceRegenerator}
          />
          <AppRoute
            path="/app/freshlist/subcategory/PaymentStatus"
            component={PaymentStatus}
          />
          <AppRoute
            path="/app/freshlist/subcategory/paymentcompleted"
            component={paymentcompleted}
          />
          <AppRoute
            path="/app/freshlist/subcategory/addSubCategory"
            component={AddSubCategory}
          />
          <AppRoute
            path="/app/freshlist/subcategory/editSubCategory/:cid/:sid"
            component={EditSubCategory}
          />
          {/* Brand */}
          <AppRoute
            path="/app/freshlist/brand/brandList"
            component={BrandList}
          />
          {/* softNumen */}
          <AppRoute
            path="/app/softNumen/ticketing/CancelledService"
            component={CancelledService}
          />
          <AppRoute
            path="/app/softNumen/ticketing/CompletedService"
            component={CompletedService}
          />
          <AppRoute
            path="/app/softNumen/ticketing/DraftService"
            component={DraftService}
          />
          <AppRoute
            path="/app/softNumen/ticketing/PendingService"
            component={PendingService}
          />
          <AppRoute
            path="/app/softNumen/ticketing/RejectedService"
            component={RejectedService}
          />
          <AppRoute
            path="/app/softNumen/ticketing/ServiceRequest"
            component={ServiceRequest}
          />
          <AppRoute
            path="/app/softNumen/ticketing/TransferService"
            component={TransferService}
          />
          <AppRoute
            path="/app/softNumen/report/CustomerReports"
            component={CustomerReports}
          />
          <AppRoute
            path="/app/softNumen/report/DeadParty"
            component={DeadParty}
          />
          <AppRoute
            path="/app/softNumen/warranty/openingStock"
            component={OpeningStock}
          />
          <AppRoute
            path="/app/ajgroup/stock/ClosingStockList"
            component={ClosingStockList}
          />
          <AppRoute
            path="/app/AjGroup/dispatch/WarehouseDispatchlist"
            component={WarehouseDispatchlist}
          />
          <AppRoute
            path="/app/Ajgroup/Stock/OverDueStockReport/:id"
            component={OverDueStockReport}
          />
          <AppRoute
            path="/app/Ajgroup/Stock/AllOverdueStockList"
            component={AllOverdueStockList}
          />
          <AppRoute
            path="/app/softNumen/report/EarningReport"
            component={EarningReport}
          />
          <AppRoute
            path="/app/softNumen/report/ProductReports"
            component={ProductReports}
          />
          <AppRoute
            path="/app/softNumen/report/StaffReport"
            component={StaffReport}
          />
          <AppRoute
            path="/app/softNumen/promotion/DiscountCoupon"
            component={DiscountCoupon}
          />
          <AppRoute
            path="/app/softNumen/media/ChatStatus"
            component={ChatStatus}
          />
          <AppRoute
            path="/app/softNumen/media/Livestreamstatus"
            component={Livestreamstatus}
          />
          <AppRoute
            path="/app/softNumen/support/HelpandSupports"
            component={HelpandSupports}
          />
          <AppRoute
            path="/app/softNumen/promotion/Promotion"
            component={Promotion}
          />
          <AppRoute
            path="/app/softNumen/report/TransactionReport"
            component={TransactionReport}
          />
          <AppRoute
            path="/app/softNumen/report/AdminReport"
            component={AdminReport}
          />
          <AppRoute
            path="/app/softNumen/report/stockReport"
            component={StockReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/OverdueReport"
            component={OverdueReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/Salesreport"
            component={Salesreport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/purchasereportamount"
            component={purchasereportamount}
          />
          <AppRoute path="/app/SoftNumen/ticket/GSTR1" component={GSTR1} />
          <AppRoute path="/app/SoftNumen/ticket/GSTR3B" component={GSTR3B} />
          <AppRoute path="/app/SoftNumen/ticket/GSTR2B" component={GSTR2B} />
          <AppRoute path="/app/SoftNumen/ticket/GSTR9" component={GSTR9} />
          <AppRoute
            path="/app/SoftNumen/ticket/HSNWisesaleReport"
            component={HSNWisesaleReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/ProductListwithHSNandGST"
            component={ProductListwithHSNandGST}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/LockInReport"
            component={LockInReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/PendingOrderReport"
            component={PendingOrderReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/CashbookReport"
            component={CashbookReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/OutStandingReport"
            component={OutStandingReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/TeamandtargerReport"
            component={TeamandtargerReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/Partywiseledger"
            component={Partywiseledger}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/TransporterReport"
            component={TransporterReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/targerReport"
            component={targerReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/DispatchReport"
            component={DispatchReport}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/WareHouseReport"
            component={WareHouseReport}
          />
          <AppRoute
            path="/app/softNumen/report/Orderreport"
            component={Orderreport}
          />
          <AppRoute
            path="/app/softNumen/report/StockTransfer"
            component={StockTransfer}
          />
          <AppRoute
            path="/app/softNumen/warranty/SupplierWarranty"
            component={SupplierWarranty}
          />
          <AppRoute
            path="/app/softNumen/warranty/OEMWarranty"
            component={OemWarranty}
          />
          <AppRoute
            path="/app/softNumen/warranty/createWarrenty"
            component={CreateWarrenty}
          />
          <AppRoute
            path="/app/softNumen/warranty/SearchWarrenty"
            component={SearchWarrenty}
          />
          <AppRoute
            path="/app/softNumen/warranty/Campaignlist"
            component={Campaignlist}
          />
          <AppRoute
            path="/app/Ajgroup/stock/ClosingStock/:id"
            component={ClosingStock}
          />
          <AppRoute
            path="/app/ajgroup/stock/LowStock/:id"
            component={LowStock}
          />
          <AppRoute
            path="/app/Ajgroup/stock/LowStockList"
            component={LowStockList}
          />
          <AppRoute
            path="/app/softNumen/warranty/DamagedStock"
            component={DamagedStock}
          />
          <AppRoute
            path="/app/softNumen/warranty/CreateSupport"
            component={CreateSupport}
          />
          <AppRoute
            path="/app/softNumen/warranty/ServicingList"
            component={ServicingList}
          />
          <AppRoute
            path="/app/softNumen/warranty/SupportSearch"
            component={SupportSearch}
          />
          <AppRoute
            path="/app/softNumen/warranty/WikiList"
            component={WikiList}
          />
          <AppRoute
            path="/app/softNumen/warranty/createCampaign"
            component={CreateCampaign}
          />
          <AppRoute
            path="/app/softNumen/system/AddSupplier"
            component={AddSupplier}
          />
          <AppRoute
            path="/app/softNumen/system/SupplierLists"
            component={SupplierLists}
          />
          <AppRoute
            path="/app/softNumen/system/SupplierLis"
            component={AddNewSupplier}
          />
          <AppRoute
            path="/app/softNumen/system/CreateQuote"
            component={CreateQuote}
          />
          {/* <AppRoute
            path="/app/softNumen/system/DebitNotes"
            component={DebitNotes}
          /> */}
          {/* <AppRoute
            path="/app/Ajgroup/system/CreateNotes"
            component={CreateNotes}
          /> */}
          <AppRoute
            path="/app/softNumen/system/WareHouseListSoft"
            component={WareHouseListSoft}
          />
          <AppRoute
            path="/app/softNumen/system/SettingTab"
            component={SettingTab}
          />
          <AppRoute
            path="/app/softNumen/warehouse/CreateWareHouse/:id"
            component={CreateWareHouse}
          />
          <AppRoute
            path="/app/softNumen/warehouse/Inwordwarehousecreate"
            component={Inwordwarehousecreate}
          />
          <AppRoute
            path="/app/softNumen/warehouse/RawMaterialInward"
            component={RawMaterialInward}
          />
          <AppRoute
            path="/app/softNumen/warehouse/RawmaterialOutward"
            component={RawmaterialOutward}
          />
          <AppRoute
            path="/app/softNumen/warehouse/StockTransfer"
            component={StockTransferwarehouse}
          />
          <AppRoute
            path="/app/softNumen/warehouse/InwardStock"
            component={InwardStock}
          />
          <AppRoute
            path="/app/Ajgroup/warehouse/OutwardStock"
            component={OutwardStock}
          />
          <AppRoute
            path="/app/softNumen/warehouse/WareHouseStock/:id"
            component={WareHouseStock}
          />
          <AppRoute
            path="/app/Jupitech/warehouse/AddDamage"
            component={AddDamage}
          />
          <AppRoute
            path="/app/softNumen/warehouse/DamageReport"
            component={DamageReport}
          />
          <AppRoute
            path="/app/softNumen/warehouse/StockStorage"
            component={StockStorage}
          />
          <AppRoute
            path="/app/softNumen/warehouse/WastageDetail"
            component={WastageDetail}
          />
          <AppRoute
            path="/app/softNumen/warehouse/DispatchDetail"
            component={DispatchDetail}
          />
          <AppRoute
            path="/app/softNumen/transporter/TransporterList"
            component={TransporterList}
          />
          <AppRoute
            path="/app/ajgroup/transporter/CreateTransporter/:id"
            component={CreateTransporter}
          />
          <AppRoute
            path="/app/softNumen/Unit/CreateUnit"
            component={CreateUnit}
          />
          <AppRoute path="/app/softNumen/Unit/UnitList" component={UnitList} />
          <AppRoute
            path="/app/softNumen/Unit/editUnit/:id"
            component={EditUnit}
          />
          {/* <AppRoute
            path="/app/SoftNumen/account/EditAccount/:id"
            component={EditAccount}
          />
          <AppRoute
            path="/app/SoftNumen/account/ViewAccount/:id"
            component={ViewAccount}
          /> */}
          <AppRoute
            path="/app/softNumen/system/SupportsSystem"
            component={SupportsSystem}
          />
          <AppRoute
            path="/app/softNumen/system/SparePartsSystem"
            component={SparePartsSystem}
          />
          <AppRoute
            path="/app/softNumen/system/ServiceSystem"
            component={ServiceSystem}
          />
          <AppRoute
            path="/app/softNumen/system/servicecard"
            component={ServiceCard}
          />
          <AppRoute
            path="/app/softNumen/system/ScrutinySystem"
            component={ScrutinySystem}
          />
          <AppRoute
            path="/app/softNumen/system/AddScrutiny"
            component={AddScrutinySystem}
          />
          <AppRoute
            path="/app/softNumen/system/PartsCatelogueSystem"
            component={PartsCatelogueSystem}
          />
          <AppRoute
            path="/app/softNumen/system/InVoiceSystem"
            component={InVoiceSystem}
          />
          <AppRoute
            path="/app/softNumen/system/OrdersSystem"
            component={OrdersSystem}
          />
          <AppRoute
            path="/app/softNumen/inhouse/EditProduct_Type/:id"
            component={EditProduct_Type}
          />
          <AppRoute
            path="/app/softNumen/inhouse/productType"
            component={Soft_ProductType}
          />
          <AppRoute
            path="/app/Producttype/AddProductType"
            component={AddProductType}
          />
          <AppRoute
            path="/app/SoftNumen/product/ProductRegistration"
            component={ProductRegistration}
          />
          <AppRoute
            path="/app/AJGroup/product/PurchaseInvoice"
            component={PurchaseInvoice}
          />
          <AppRoute
            path="/app/SoftNumen/product/ProductSearch"
            component={ProductSearch}
          />
          <AppRoute
            path="/app/SoftNumen/product/ProductAttribute"
            component={ProductAttribute}
          />
          <AppRoute path="/app/Producttype/Addmodel" component={Addmodel} />
          <AppRoute
            path="/app/Producttype/ModalTypeList"
            component={ModalTypeList}
          />
          <AppRoute
            path="/app/Producttype/AddEngineType"
            component={AddEngineType}
          />
          <AppRoute path="/app/Producttype/EngineType" component={EngineType} />
          <AppRoute
            path="/app/Producttype/AddValiveType"
            component={AddValveType}
          />
          <AppRoute
            path="/app/Producttype/ValvesTypeList"
            component={ValvesTypeList}
          />
          <AppRoute
            path="/app/Producttype/AddBodyStyle"
            component={AddBodyStyle}
          />
          <AppRoute
            path="/app/Producttype/BodyStyleList"
            component={BodyStyleList}
          />
          <AppRoute
            path="/app/Producttype/AddColorList"
            component={AddColorList}
          />
          <AppRoute path="/app/Producttype/ColorList" component={ColorList} />
          <AppRoute
            path="/app/Producttype/VariantList"
            component={VariantList}
          />
          <AppRoute path="/app/Producttype/AddVarient" component={AddVarient} />
          <AppRoute
            path="/app/Producttype/ProductNamelist"
            component={ProductNamelist}
          />
          {/* end */}
          <AppRoute path="/app/freshlist/brand/addBrand" component={AddBrand} />
          <AppRoute
            path="/app/freshlist/brand/editBrand/:id"
            component={EditBrand}
          />
          <AppRoute
            path="/app/freshlist/brand/viewBrand/:id"
            component={ViewBrand}
          />
          {/* Batch */}
          <AppRoute path="/app/freshlist/batch/addbatch" component={AddBatch} />
          <AppRoute
            path="/app/freshlist/batch/batchList"
            component={BatchList}
          />
          <AppRoute
            path="/app/freshlist/batch/editBatch/:id"
            component={EditBatch}
          />
          <AppRoute
            path="/app/freshlist/batch/viewBatch/:id"
            component={ViewBatch}
          />
          {/* Product Attribute */}
          <AppRoute
            path="/app/freshlist/attribute/productAttributeList"
            component={ProductAttributeList}
          />
          <AppRoute
            path="/app/freshlist/attribute/addProductAttribute"
            component={AddProductAttribute}
          />
          <AppRoute
            path="/app/freshlist/attribute/editProductAttribute"
            component={EditProductAttribute}
          />
          {/* Account */}
          <AppRoute
            path="/app/freshlist/account/addRoleNew"
            component={AddRoleNew}
          />
          <AppRoute
            path="/app/freshlist/account/CreateHeirarchy"
            component={CreateHeirarchy}
          />
          <AppRoute
            path="/app/Ajgroup/account/AssignTeamMember"
            component={AssignTeamMember}
          />
          <AppRoute
            path="/app/Ajgroup/account/EditTeamRolePosition"
            component={EditTeamRolePosition}
          />
          <AppRoute
            path="/app/freshlist/account/editRole/:id"
            component={EditRole}
          />
          <AppRoute
            path="/app/freshlist/account/UpdateExistingRole/:id"
            component={UpdateExistingRole}
          />
          {/* create Account */}
          <AppRoute
            path="/app/SoftNumen/account/CreateAccount"
            component={CreateAccount}
          />
          <AppRoute
            path="/app/ajgroup/account/CreateStockTrx"
            component={CreateStockTrx}
          />
          <AppRoute
            path="/app/ajgroup/account/CreatePromotionalActivity"
            component={CreatePromotionalActivity}
          />
          <AppRoute
            path="/app/ajgroup/account/EditPromotionalActivity/:id"
            component={EditPromotionalActivity}
          />
          <AppRoute
            path="/app/SoftNumen/account/CreateTarget"
            component={CreateTarget}
          />
          <AppRoute
            path="/app/Ajgroup/account/CreateCustomerGroup/:id"
            component={CreateCustomerGroup}
          />
          <AppRoute
            path="/app/AJGroup/account/EditTarget/:id"
            component={EditTarget}
          />
          <AppRoute
            path="/app/AJGroup/account/PartyLedgersView"
            component={PartyLedgersView}
          />
          <AppRoute
            path="/app/SoftNumen/account/CreateReturnSalesOrder"
            component={CreateReturnSalesOrder}
          />
          {/* create Party */}
          <AppRoute
            path="/app/SoftNumen/account/PartyCreation"
            component={PartyCreation}
          />
          <AppRoute
            path="/app/SoftNumen/account/CreateCustomer/:id"
            component={CreateCustomer}
          />
          <AppRoute
            path="/app/SoftNumen/account/CreateSalesTeam"
            component={CreateSalesTeam}
          />
          <AppRoute
            path="/app/SoftNumen/account/CreateSalesManag"
            component={CreateSalesManag}
          />
          <AppRoute
            path="/app/AjGroup/dispatch/CreateDispach/:id"
            component={CreateDispach}
          />
          <AppRoute
            path="/app/AjGroup/dispatch/goodDispatchList"
            component={GoodDispatchList}
          />
          <AppRoute
            path="/app/AjGroup/note/CreditNoteList"
            component={CreditNoteList}
          />
          <AppRoute
            path="/app/AjGroup/note/DebitNoteList"
            component={DebitNoteList}
          />
          <AppRoute
            path="/app/SoftNumen/account/EditAccount/:id"
            component={EditAccount}
          />
          <AppRoute
            path="/app/SoftNumen/account/ViewAccount/:id"
            component={ViewAccount}
          />
          {/* policy */}
          <AppRoute
            path="/app/SoftNumen/policy/CreatePolicy"
            component={CreatePolicy}
          />
          <AppRoute
            path="/app/SoftNumen/policy/SearchPolicy"
            component={SearchPolicy}
          />
          {/* ticketing */}
          <AppRoute
            path="/app/SoftNumen/ticket/CreateTicket"
            component={CreateTicket}
          />
          <AppRoute
            path="/app/SoftNumen/ticket/Stockreport"
            component={Stockreport}
          />
          {/* Inspections */}
          <AppRoute
            path="/app/SoftNumen/Inspections/CreateInspections"
            component={CreateInspections}
          />
          <AppRoute
            path="/app/SoftNumen/Inspections/InspectionsSearch"
            component={InspectionsSearch}
          />
          <AppRoute path="/app/Trupee/account/RoleList" component={RoleList} />
          <AppRoute
            path="/app/ajgroup/Ledger/ViewLedger/:id"
            component={ViewLedger}
          />
          <AppRoute
            path="/app/Ajgroup/account/DepartmentRoleAssign"
            component={DepartmentRoleAssign}
          />
          <AppRoute
            path="/app/Ajgroup/account/AssignToSuperAdmin"
            component={AssignToSuperAdmin}
          />
          {/* inhouse Product */}
          <AppRoute
            path="/app/freshlist/house/houseProductList"
            component={HouseProductList}
          />
          <AppRoute
            path="/app/freshlist/house/AddProduct"
            component={AddProduct}
          />
          <AppRoute
            path="/app/freshlist/house/EditAddProduct/:id"
            component={EditAddProduct}
          />
          <AppRoute
            path="/app/freshlist/house/editmyproduct/:id"
            component={EditMyProduct}
          />
          <AppRoute
            path="/app/freshlist/house/editinventory/:id"
            component={EditInventory}
          />
          <AppRoute
            path="/app/freshlist/house/assignedPage/:id"
            component={AssignedPage}
          />
          <AppRoute
            path="/app/freshlist/house/assigntoclient"
            component={AssignToClient}
          />
          <AppRoute
            path="/app/freshlist/house/AssignToClientlist"
            component={AssignToClientlist}
          />
          <AppRoute
            path="/app/ajgroup/house/CustomerGroupList"
            component={CustomerGroupList}
          />
          <AppRoute
            path="/app/freshlist/house/ProductDashboard"
            component={ProductDashboard}
          />
          <AppRoute
            path="/app/freshlist/house/Assignedtoclient"
            component={Assignedtoclient}
          />
          <AppRoute
            path="/app/freshlist/house/viewoneassigned/:id"
            component={ViewoneAssigned}
          />
          <AppRoute
            path="/app/freshlist/house/ratemaster"
            component={RateMaster}
          />
          <AppRoute
            path="/app/freshlist/house/AddRateMaster"
            component={AddRateMaster}
          />
          <AppRoute path="/app/freshlist/house/AddType" component={AddType} />
          <AppRoute
            path="/app/freshlist/house/EditType/:id"
            component={EditType}
          />
          <AppRoute path="/app/house/ViewType/:id" component={ViewType} />
          <AppRoute path="/app/freshlist/house/Typelist" component={Typelist} />
          <AppRoute
            path="/app/freshlist/house/inventory"
            component={Inventory}
          />
          <AppRoute
            path="/app/freshlist/house/serviceMaster"
            component={ServiceMaster}
          />
          <AppRoute path="/app/SoftNumen/PartyList" component={PartyList} />
          <AppRoute
            path="/app/SoftNumen/accounSearch"
            component={AccounSearch}
          />
          <AppRoute
            path="/app/AjGroup/StockTransferList"
            component={StockTransferList}
          />
          <AppRoute
            path="/app/AjGroup/PromotionalActivityList"
            component={PromotionalActivityList}
          />
          <AppRoute
            path="/views/apps/freshlist/Production/Itemproduct"
            component={Productionitem}
          />
          <AppRoute
            path="/views/apps/AjGroup/Production/Wastageproduction"
            component={Wastageproduction}
          />
          <AppRoute
            path="/views/apps/AjGroup/Production/ReturnProductionProduct"
            component={ReturnProductionProduct}
          />
          <AppRoute
            path="/views/apps/freshlist/Production/Createitemforproduction"
            component={Createitemforproduction}
          />
          <AppRoute
            path="/views/apps/freshlist/Production/pricecalculaterproduction"
            component={pricecalculaterproduction}
          />
          <AppRoute
            path="/views/apps/freshlist/Production/productionprocesspage"
            component={productionprocesspage}
          />
          <AppRoute
            path="/views/apps/freshlist/Production/wastagematerialproduction"
            component={wastagematerialproduction}
          />
          <AppRoute
            path="/views/apps/freshlist/Production/wastagestockreturnproduction"
            component={wastagestockreturnproduction}
          />
          <AppRoute
            path="/app/rupioo/TargetCreationList/:id"
            component={TargetCreationList}
          />
          <AppRoute
            path="/app/rupioo/HeadtargetingList/:id"
            component={HeadtargetingList}
          />
          <AppRoute
            path="/app/SoftNumen/SalesOrderReturnList"
            component={SalesOrderReturn}
          />
          <AppRoute
            path="/app/SoftNumen/CustomerSearch"
            component={CustomerSearch}
          />
          <AppRoute
            path="/app/ajgroup/CreateTransportList"
            component={CreateTransportList}
          />
          <AppRoute
            path="/app/SoftNumen/CreateSalesMan"
            component={CreateSalesMan}
          />
          <AppRoute
            path="/app/SoftNumen/CreateSalesManager"
            component={CreateSalesManager}
          />
          <AppRoute
            path="/app/Ajgroup/order/OrderDispatchList"
            component={OrderDispatchList}
          />
          <AppRoute
            path="/app/freshlist/house/SupplierList"
            component={SupplierList}
          />
          <AppRoute
            path="/app/freshlist/house/editProductType/:id"
            component={EditProductType}
          />
          <AppRoute
            path="/app/freshlist/house/EditHouseProduct/:id"
            component={EditHouseProduct}
          />
          {/* <AppRoute
            path="/app/freshlist/house/ViewHouseProduct/:id"
            component={ViewHouseProduct}
          /> */}
          {/* Bundle*/}
          <AppRoute
            path="/app/freshlist/bundle/BundleList"
            component={BundleList}
          />
          <AppRoute
            path="/app/freshlist/bundle/AddBundle"
            component={AddBundle}
          />
          <AppRoute
            path="/app/freshlist/freebies/Freebies"
            component={Freebies}
          />
          <AppRoute
            path="/app/freshlist/cart/budgetlist"
            component={SuggestedProducts}
          />
          <AppRoute
            path="/app/freshlist/cart/BudgetAssignment"
            component={BudgetAssignment}
          />
          <AppRoute
            path="/app/freshlist/cart/DateWiseReport"
            component={DateWiseReport}
          />
          <AppRoute
            path="/app/freshlist/cart/Clientwisereport"
            component={Clientwisereport}
          />
          <AppRoute
            path="/app/freshlist/cart/ViewoneFinalreport"
            component={ViewoneFinalreport}
          />
          <AppRoute
            path="/app/freshlist/cart/BranchwiseReport"
            component={BranchwiseReport}
          />
          <AppRoute
            path="/app/freshlist/cart/ProductWise"
            component={ProductWise}
          />
          <AppRoute
            path="/app/freshlist/report/LogsReport"
            component={LogsReport}
          />
          <AppRoute
            path="/app/freshlist/code/UniqueCode"
            component={UniqueCode}
          />
          <AppRoute
            path="/app/freshlist/subscriber/subscriberList"
            component={SubscriberList}
          />
          {/* Mobile */}
          {/* <AppRoute
            path="/app/freshlist/mobile/Notification"
            component={Notification}
          /> */}
          <AppRoute
            path="/app/freshlist/mobile/bannerSection"
            component={BannerSection}
          />
          <AppRoute
            path="/app/freshlist/mobile/allNotify"
            component={AllNotification}
          />
          <AppRoute
            path="/app/freshlist/mobile/customerGroupWise"
            component={CustomerGroupWise}
          />
          {/* <AppRoute
            path="/app/freshlist/notif/addNotification"
            component={AddNotification}
          /> */}
          {/* Privacy Police */}
          <AppRoute
            path="/app/freshlist/privacyPolicy/privacyPolicy"
            component={PrivacyPolicy}
          />
          <AppRoute
            path="/app/freshlist/privacyPolicy/addPolicy"
            component={addPolicy}
          />
          {/* help */}
          <AppRoute
            path="/app/freshlist/helpAndSupport/helpAndSupport"
            component={HelpAndSupport}
          />
          <AppRoute
            path="/app/freshlist/helpAndSupport/AddTerms"
            component={AddTerms}
          />
          {/* Payout */}
          <AppRoute
            path="/app/freshlist/payout/vendorPayout"
            component={VendorPayout}
          />
          <AppRoute
            path="/app/freshlist/payout/driverPayout"
            component={DriverPayout}
          />
          {/* Earning */}
          <AppRoute
            path="/app/freshlist/earning/vendorEarning"
            component={VendorEarning}
          />
          {/* Profile */}
          <AppRoute path="/pages/profile/userProfile" component={userProfile} />
          <AppRoute
            path="/pages/profile/editUserProfile/:id"
            component={editUserProfile}
          />
          <AppRoute
            path="/pages/profile/viewUserProfile/:id"
            component={viewUserProfile}
          />
          {/* Map */}
          <AppRoute
            path="/app/freshlist/location/location"
            component={Location}
          />
          {/* Sales */}
          <AppRoute
            path="/app/freshlist/sales/totalSales"
            component={TotalSales}
          />
          <AppRoute
            path="/pages/newPassword/:id"
            exact
            component={NewPassword}
            fullLayout
          />
          <AppRoute path="/app/freshlist/sales/hubSales" component={HubSales} />
          {/* hub List */}
          <AppRoute path="/app/freshlist/hubs/AddHub" component={AddHub} />
          <AppRoute path="/app/freshlist/hubs/hubList" component={HubList} />
          <AppRoute
            path="/app/freshlist/hubs/viewHub/:id"
            component={ViewHub}
          />
          <AppRoute path="/app/freshlist/hubs/editHub" component={EditHub} />
          <AppRoute path="/app/user/list" component={userList} />
          <AppRoute path="/app/user/edit" component={userEdit} />
          <AppRoute path="/app/user/view" component={userView} />
          <AppRoute path="/pages/subs" component={Subs} fullLayout />
          {/* <AppRoute path="/pages/logDemo" component={ logDemo} fullLayout /> */}
          <AppRoute path="/" component={Login} fullLayout />
          <AppRoute
            path="/pages/forgotpassword"
            component={forgotPassword}
            fullLayout
          />
          <AppRoute
            path="/pages/reset-password"
            component={resetPassword}
            fullLayout
          />
          <AppRoute
            path="/pages/resetpassword"
            component={myResetpass}
            fullLayout
          />
          {/* Theme Components Starts from here all the demo components*/}
          <AppRoute
            path="/email"
            exact
            component={() => <Redirect to="/email/inbox" />}
          />
          <AppRoute path="/email/:filter" component={email} />
          <AppRoute path="/chat" component={chat} />
          <AppRoute
            path="/todo"
            exact
            component={() => <Redirect to="/todo/all" />}
          />
          <AppRoute path="/todo/:filter" component={todo} />
          <AppRoute path="/calendar" component={calendar} />
          <AppRoute path="/ecommerce/shop" component={shop} />
          <AppRoute path="/ecommerce/wishlist" component={wishlist} />
          <AppRoute
            path="/ecommerce/product-detail"
            component={productDetail}
          />
          <AppRoute
            path="/ecommerce/checkout"
            component={checkout}
            permission="admin"
          />
          <AppRoute path="/data-list/list-view" component={listView} />
          <AppRoute path="/data-list/thumb-view" component={thumbView} />
          <AppRoute path="/ui-element/grid" component={grid} />
          <AppRoute path="/ui-element/typography" component={typography} />
          <AppRoute
            path="/ui-element/textutilities"
            component={textutilities}
          />
          <AppRoute
            path="/ui-element/syntaxhighlighter"
            component={syntaxhighlighter}
          />
          <AppRoute
            path="/Colored Select
s/colors"
            component={colors}
          />
          <AppRoute path="/icons/reactfeather" component={reactfeather} />
          <AppRoute path="/cards/basic" component={basicCards} />
          <AppRoute path="/cards/statistics" component={statisticsCards} />
          <AppRoute path="/cards/analytics" component={analyticsCards} />
          <AppRoute path="/cards/action" component={actionCards} />
          <AppRoute path="/components/alerts" component={Alerts} />
          <AppRoute path="/components/buttons" component={Buttons} />
          <AppRoute path="/components/breadcrumbs" component={Breadcrumbs} />
          <AppRoute path="/components/carousel" component={Carousel} />
          <AppRoute path="/components/collapse" component={Collapse} />
          <AppRoute path="/components/dropdowns" component={Dropdowns} />
          <AppRoute path="/components/list-group" component={ListGroup} />
          <AppRoute path="/components/modals" component={Modals} />
          <AppRoute path="/components/pagination" component={Pagination} />
          <AppRoute path="/components/nav-component" component={NavComponent} />
          <AppRoute path="/components/navbar" component={Navbar} />
          <AppRoute path="/components/tabs-component" component={Tabs} />
          <AppRoute path="/components/pills-component" component={TabPills} />
          <AppRoute path="/components/tooltips" component={Tooltips} />
          <AppRoute path="/components/popovers" component={Popovers} />
          <AppRoute path="/components/badges" component={Badge} />
          <AppRoute path="/components/pill-badges" component={BadgePill} />
          <AppRoute path="/components/progress" component={Progress} />
          <AppRoute path="/components/media-objects" component={Media} />
          <AppRoute path="/components/spinners" component={Spinners} />
          <AppRoute path="/components/toasts" component={Toasts} />
          <AppRoute
            path="/extra-components/auto-complete"
            component={AutoComplete}
          />
          <AppRoute path="/extra-components/avatar" component={avatar} />
          <AppRoute path="/extra-components/chips" component={chips} />
          <AppRoute path="/extra-components/divider" component={divider} />
          <AppRoute path="/forms/wizard" component={vuexyWizard} />
          <AppRoute path="/forms/elements/select" component={select} />
          <AppRoute path="/forms/elements/switch" component={switchComponent} />
          <AppRoute path="/forms/elements/checkbox" component={checkbox} />
          <AppRoute path="/forms/elements/radio" component={radio} />
          <AppRoute path="/forms/elements/input" component={input} />
          <AppRoute path="/forms/elements/input-group" component={group} />
          <AppRoute
            path="/forms/elements/number-input"
            component={numberInput}
          />
          <AppRoute path="/forms/elements/textarea" component={textarea} />
          <AppRoute path="/forms/elements/pickers" component={pickers} />
          <AppRoute path="/forms/elements/input-mask" component={inputMask} />
          <AppRoute path="/forms/layout/form-layout" component={layout} />
          <AppRoute path="/forms/formik" component={formik} />{" "}
          <AppRoute path="/tables/reactstrap" component={tables} />
          <AppRoute path="/tables/react-tables" component={ReactTables} />
          <AppRoute path="/tables/agGrid" component={Aggrid} />
          <AppRoute path="/tables/data-tables" component={DataTable} />
          <AppRoute path="/pages/faq" component={faq} />
          <AppRoute
            path="/pages/knowledge-base"
            component={knowledgeBase}
            exact
          />
          <AppRoute
            path="/pages/knowledge-base/category"
            component={knowledgeBaseCategory}
            exact
          />
          <AppRoute
            path="/pages/knowledge-base/category/questions"
            component={knowledgeBaseQuestion}
          />
          <AppRoute path="/pages/search" component={search} />
          <AppRoute
            path="/pages/account-settings"
            component={accountSettings}
          />
          <AppRoute path="/pages/invoice" component={invoice} />
          <AppRoute
            path="/misc/coming-soon"
            component={comingSoon}
            fullLayout
          />
          <AppRoute path="/misc/error/404" component={error404} fullLayout />
          <AppRoute path="/pages/register" component={register} fullLayout />
          <AppRoute
            path="/pages/lock-screen"
            component={lockScreen}
            fullLayout
          />
          <AppRoute path="/misc/error/500" component={error500} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute
            path="/misc/maintenance"
            component={maintenance}
            fullLayout
          />
          <AppRoute path="/charts/apex" component={apex} />
          <AppRoute path="/charts/chartjs" component={chartjs} />
          <AppRoute path="/charts/recharts" component={extreme} />
          <AppRoute path="/maps/leaflet" component={leafletMaps} />
          <AppRoute path="/extensions/sweet-alert" component={sweetAlert} />
          <AppRoute path="/extensions/toastr" component={toastr} />
          <AppRoute path="/extensions/slider" component={rcSlider} />
          <AppRoute path="/extensions/file-uploader" component={uploader} />
          <AppRoute path="/extensions/wysiwyg-editor" component={editor} />
          <AppRoute path="/extensions/drag-and-drop" component={drop} />
          <AppRoute path="/extensions/tour" component={tour} />
          <AppRoute path="/extensions/clipboard" component={clipboard} />
          <AppRoute path="/extensions/context-menu" component={menu} />
          <AppRoute path="/extensions/swiper" component={swiper} />
          <AppRoute
            path="/extensions/access-control"
            component={accessControl}
          />
          <AppRoute path="/extensions/i18n" component={i18n} />
          <AppRoute path="/extensions/tree" component={tree} />
          <AppRoute path="/extensions/import" component={Import} />
          <AppRoute path="/extensions/export" component={Export} />
          <AppRoute
            path="/extensions/export-selected"
            component={ExportSelected}
          />
          <AppRoute path="/extensions/pagination" component={reactPaginate} />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </HashRouter>
    );
  }
}
export default AppRouter;
