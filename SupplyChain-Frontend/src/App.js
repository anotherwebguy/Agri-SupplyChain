import Recommendation from "./components/farmer/Recommendation";
import Dashboard from "./components/farmer/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Prediction from "./components/farmer/Prediction";
import Result from "./components/farmer/Result";
import Broadcast from "./components/farmer/Broadcast";
import FarmerBroadcast from "./components/farmer/FarmerBroadcast";
import MicroFinance from "./components/farmer/MicroFinance";
import ProcessorRequest from "./components/farmer/ProcessorRequest";
import Transactions from "./components/farmer/Transactions";
import ProcessorDashboard from "./components/processor/ProcessorDashboard";
import ProcessorBroadcast from "./components/processor/ProcessorBroadcast";
import YourBroadcast from "./components/processor/YourBroadcast";
import OrderDetails from "./components/processor/OrderDetails";
import FarmerProductBroadcast from "./components/processor/FarmerProductBroadcast";
import ProcessorInterest from "./components/processor/ProcessorInterest";
import PendingPayments from "./components/processor/PendingPayments";
import QualityReports from "./components/quality checker/QualityReports";
import RetailerDashboard from "./components/retailer/RetailerDashboard";
import RProcessorBroadcast from "./components/retailer/RProcessorBroadcast";
import PreviousOrder from "./components/retailer/PreviousOrder";
import BroadcastToCustomer from "./components/retailer/BroadcastToCustomer";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import CustomerRetailerBroadcast from "./components/customer/CustomerRetailerBroadcast";
import PreviousPurchases from "./components/customer/PreviousPurchases";
import Crop from "./components/farmer/Crop";
import TrackStatus from "./utils/TrackStatus";
import Admin from "./components/admin/Admin";
import Registration from "./utils/Registration";
import Verification from "./components/admin/Verification";
import InvestorHome from "./components/investor/InvestorHome";
import Farmer from "./components/investor/Farmer";
import InvestorFarmerBroadcast from "./components/investor/InvestorFarmerBroadcast";
import InvestorPayments from "./components/investor/InvestorPayments";
import Investments from "./components/investor/Investments";
import Welcome from "./components/Welcome";
import ProcessorTracking from "./components/processor/ProcessorTracking";
import CustomerTracking from "./components/customer/CustomerTracking";
import RetailerTracking from "./components/retailer/RetailerTracking";
import InvestorDeals from "./components/farmer/InvestorDeals";
import AcceptedDeals from "./components/farmer/AcceptedDeals";
import ProtectedRoutes from "./ProtectedRoute";
import ReturnToInvestor from "./components/farmer/ReturnToInvestor";
import Actions from "./components/admin/Actions";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome screen */}
        <Route path="/" element={<Welcome />} />

        {/* Registration screen */}
        <Route path="/register" element={<Registration />} />
        <Route element={<ProtectedRoutes />}>
          {/* Admin panel */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/verification" element={<Verification />} />
          <Route path="/admin/status" element={<Actions />}></Route>
          {/* Farmer Routing */}

          <Route path="/farmer" element={<Dashboard />}></Route>
          <Route path="/farmer/predictions" element={<Prediction />}></Route>
          <Route
            path="/farmer/recommendations"
            element={<Recommendation />}
          ></Route>
          <Route
            path="/farmer/recommendations/result"
            element={<Result />}
          ></Route>
          <Route path="/farmer/broadcast" element={<Broadcast />}></Route>
          <Route
            path="/farmer/farmerbroadcast"
            element={<FarmerBroadcast />}
          ></Route>
          <Route path="/farmer/microfinance" element={<MicroFinance />}></Route>
          <Route
            path="/farmer/processorRequests"
            element={<ProcessorRequest />}
          ></Route>
          <Route path="/farmer/transactions" element={<Transactions />}></Route>
          <Route
            path="/farmer/predictions/commodity"
            element={<Crop />}
          ></Route>
          <Route path="/farmer/status" element={<TrackStatus />}></Route>
          <Route
            path="/farmer/investordeals"
            element={<InvestorDeals />}
          ></Route>
          <Route path="/farmer/accepted" element={<AcceptedDeals />}></Route>
          <Route path="/farmer/payback" element={<ReturnToInvestor />}></Route>
          {/* Investor */}

          <Route path="/investor" element={<InvestorHome />}></Route>
          <Route
            path="/investor/farmerbroadcast"
            element={<InvestorFarmerBroadcast />}
          ></Route>
          <Route path="/investor/farmer" element={<Farmer />}></Route>
          <Route
            path="/investor/payments"
            element={<InvestorPayments />}
          ></Route>
          <Route path="/investor/investments" element={<Investments />}></Route>

          {/* Processor Routing */}

          <Route path="/processor" element={<ProcessorDashboard />}></Route>
          <Route
            path="/processor/broadcast"
            element={<ProcessorBroadcast />}
          ></Route>
          <Route
            path="/processor/ybroadcasts"
            element={<YourBroadcast />}
          ></Route>
          <Route
            path="/processor/orderDetails"
            element={<OrderDetails />}
          ></Route>
          <Route
            path="/processor/fbroadcasts"
            element={<FarmerProductBroadcast />}
          ></Route>
          <Route
            path="/processor/pInterest"
            element={<ProcessorInterest />}
          ></Route>
          <Route
            path="/processor/payments"
            element={<PendingPayments />}
          ></Route>
          <Route
            path="/processor/status"
            element={<ProcessorTracking />}
          ></Route>

          {/* Quality Checker Routing */}

          <Route path="/qualityChecker" element={<QualityReports />}></Route>

          {/* Retailer Routing */}

          <Route path="/retailer" element={<RetailerDashboard />}></Route>
          <Route
            path="/retailer/processorbroadcast"
            element={<RProcessorBroadcast />}
          ></Route>
          <Route
            path="/retailer/previousorders"
            element={<PreviousOrder />}
          ></Route>
          <Route
            path="/retailer/broadcastToCustomer"
            element={<BroadcastToCustomer />}
          ></Route>
          <Route path="/retailer/status" element={<RetailerTracking />}></Route>

          {/* Customer Routing */}

          <Route path="/consumer" element={<CustomerDashboard />}></Route>
          <Route
            path="/consumer/retailerbroadcast"
            element={<CustomerRetailerBroadcast />}
          ></Route>
          <Route
            path="/consumer/history"
            element={<PreviousPurchases />}
          ></Route>
          <Route path="/consumer/status" element={<CustomerTracking />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
