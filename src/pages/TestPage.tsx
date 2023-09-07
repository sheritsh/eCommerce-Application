// import React, { useState } from 'react';
// import { Alert, AlertTitle } from '@mui/material';
// import Collapse from '@mui/material/Collapse';
// import { useNavigate } from 'react-router';
// import Container from '../components/UI/container/Container';
// import Popup from '../components/UI/popup/Popup';

// const TestPage: React.FC = () => {
//   const [open, setOpen] = React.useState(true);
//   const [isSuccessPopupActive, setSuccessPopupActive] = useState(false);
//   const [isErrorPopupActive, setErrorPopupActive] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSuccess = (): void => {
//     setSuccessPopupActive(true);
//     setPopupMessage('Congratulations! Registration successful.');
//     setTimeout(() => {
//       setSuccessPopupActive(false);
//       navigate('/');
//     }, 5000);
//   };

//   return (
//     <div className="content">
//       <Container>
//         <button onClick={handleSuccess}>Show Success Popup</button>
//         <Popup
//           active={isSuccessPopupActive}
//           setActive={setSuccessPopupActive}
//           popupType="success"
//           message={popupMessage}
//         />
//       </Container>
//     </div>
//   );
// };

// export default TestPage;
