import { Routes, Route } from "react-router-dom";
import React from "react";
import FigR2rNavbar from "./FigR2rNavbar";
import R2RDashboard from "./R2RDashboard";
import DbsPurchaseRequest from "./DbsPurchaseRequest";
import RFQPage from "./RFQPage";
import PurchaseOrders from "./PurchaseOrders";
import GRNOverview from "./GRNOverview";
import NewPurchaseReqst from "./NewPurchaseReqst";
import PrRequstInitSuccess from "./PrRequstInitSuccess";
import PRMaterialRequirement from "./PRMaterialRequirement";
import CreateRFQNewcase from "./CreateRFQNewcase";
import RFQInitsucess from "./components/RFQInitsucess";
import RFQForm from "./RFQForm";
import RFQGenerateModal from "./components/RFQGenerateModal";
import PRRequestApproved from "./components/PRRequestApproved";
import RFQsucessfinal from "./components/RFQsucessfinal";
import CreatePurchaseOrder from "./components/CreatePurchaseOrder";
import POInitiatedSucess from "./components/POInitiatedSucess";
import POdetailform from "./POdetailform";
import POSubmitted from "./components/POSubmitted";
import R2RLoginpage from "./R2RLoginpage";
import PRLineReport from "./components/PRLineReport"
import AdminPortal from "./components/AdminPortal";
function App() {

  return (

    <Routes>
      <Route path="/" element={<R2RLoginpage />} />
      <Route path="/admin-portal" element={<AdminPortal />} />

      <Route path="/app" element={<FigR2rNavbar />}>

        <Route index element={<R2RDashboard />} />
        <Route path="DbsPurchaseRequest" element={<DbsPurchaseRequest />} />
        <Route path="RFQPage" element={<RFQPage />} />
        <Route path="PurchaseOrders" element={<PurchaseOrders />} />
        <Route path="GRNOverview" element={<GRNOverview />} />
        <Route path="NewPurchaseReqst" element={<NewPurchaseReqst />} />
        <Route path="PrRequstInitSuccess" element={<PrRequstInitSuccess />} />
        <Route path="PRMaterialRequirement" element={<PRMaterialRequirement />} />
        <Route path="CreateRFQNewcase" element={<CreateRFQNewcase />} />
        <Route path="RFQInitsucess" element={<RFQInitsucess />} />
        <Route path="RFQForm" element={<RFQForm />} />
        <Route path="RFQGenerateModal" element={<RFQGenerateModal />} />
        <Route path="PRRequestApproved" element={<PRRequestApproved />} />
        <Route path="RFQsucessfinal" element={<RFQsucessfinal />} />
        <Route path="CreatePurchaseOrder" element={<CreatePurchaseOrder />} />
        <Route path="POInitiatedSucess" element={<POInitiatedSucess />} />
        <Route path="POdetailform" element={<POdetailform />} />
        <Route path="POSubmitted" element={<POSubmitted />} />
        <Route path="PRLineReport/:RequisitionNumber" element={<PRLineReport />} />
      </Route>

    </Routes>


  );
}

export default App;