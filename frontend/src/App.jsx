import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HospitalRegister from './component/Hospital/HospitalRegistration';
import HospitalLogin from './component/Hospital/HospitalLogin';
import Home from './Home';
import DonorRegistration from './component/users/DonorRegistration';
import DonorLogin from './component/users/DonorLogin';
import BloodBankAvailability from './component/Hospital/BloodBank';
import HospitalAddDonor from './component/Hospital/HospitalAddDonor';
import ViewHospitalDonor from './component/Hospital/ViewHospitalDonor';
import DonorDetails from './component/Hospital/DonerDetails';
import Hospital from './component/Hospital/Hospital';
import SearchDonors from './component/users/SearchDonors';
import RegisterLaboratory from './component/Laboratary/LaborataryRegister';
import LoginLaboratory from './component/Laboratary/LaborataryLogin';
import BloodBankDetails from './component/BloodBank/BloodBankDetails';
import RegisterBloodBank from './component/BloodBank/BloodBankRegister';
import BloddDashboard from './component/BloodBank/BloddDashboard';
import LaboratoryDashboard from './component/Laboratary/LaboratoryDashboard';
import LaboratoryDonorRegister from './component/Laboratary/LaboratoryAddDonor';
import HospitalDonorViews from './component/Hospital/hd';
import DonorDashboard from './component/users/DonorDashboard';
import Login from './component/BloodBank/BloodBankLogin';
import AddBloodBank from './component/BloodBank/AddBlood';

function App() {
  const [hospitalId, setHospitalId] = useState(null);
  const [donorId, setDonnerId] = useState(null);
  const [id, setId] = useState(null);
  const [donorid, onLogin] = useState(null);
  const [LaboratoryId, setLaboratory] = useState(null);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/HospitalRegister" element={<HospitalRegister />} />
          <Route path="/HospitalLogin" element={<HospitalLogin setHospitalId={setHospitalId} />} />
          <Route path="/DonorRegistration" element={<DonorRegistration hospitalId={hospitalId} setDonnerId={setDonnerId} />} />
          <Route path="/DonorLogin" element={<DonorLogin onLogin={onLogin}/>} />
          <Route path="/BloodBankAvailability" element={<BloodBankAvailability />} />
          <Route path="/HospitalAddDonor" element={<HospitalAddDonor setDonnerId={setDonnerId} />} />
          <Route path="/Hospital" element={<Hospital></Hospital>} />
          <Route path="/HospitalDonorViews" element={<HospitalDonorViews setId={setId} />} />
        
           
          <Route path="/ViewHospitalDonor" element={<ViewHospitalDonor donorId={donorId} />} />
          <Route path="/Login" element={<Login></Login>} />
          <Route path="/DonorDetails/:id" element={<DonorDetails />} />

          <Route path="/SearchDonors" element={<SearchDonors></SearchDonors>} />
          <Route path="/RegisterLaboratory" element={<RegisterLaboratory></RegisterLaboratory>} />
          <Route path="/LoginLaboratory" element={<LoginLaboratory setLaboratory={setLaboratory}></LoginLaboratory>} />
          <Route path="/BloodBankDetails" element={<BloodBankDetails  ></BloodBankDetails>} />
          <Route path="/AddBlood" element={<AddBloodBank></AddBloodBank>}/>

          <Route path="/RegisterBloodBank" element={<RegisterBloodBank></RegisterBloodBank>} />
          <Route path="/BloddDashboard" element={<BloddDashboard></BloddDashboard>} />
          <Route path="/LaboratoryDashboard" element={<LaboratoryDashboard></LaboratoryDashboard>} />

          <Route path="/LaboratoryDonorRegister" element={<LaboratoryDonorRegister LaboratoryId={LaboratoryId}></LaboratoryDonorRegister>} />
          
          <Route path="/DonorDashboard" element={<DonorDashboard donorid={donorid}></DonorDashboard>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
