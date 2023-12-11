// import { useState } from 'react';
// // @mui
// import { alpha } from '@mui/material/styles';
// import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

// // ----------------------------------------------------------------------

// const LANGS = [
//   {
//     value: 'en',
//     label: 'English',
//     icon: '/assets/icons/ic_flag_en.svg',
//   },
//   {
//     value: 'de',
//     label: 'German',
//     icon: '/assets/icons/ic_flag_de.svg',
//   },
//   {
//     value: 'fr',
//     label: 'French',
//     icon: '/assets/icons/ic_flag_fr.svg',
//   },
// ];

// // ----------------------------------------------------------------------

// export default function LanguagePopover() {
//   const [open, setOpen] = useState(null);

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleClose = () => {
//     setOpen(null);
//   };

//   return (
//     <>
//       <IconButton
//         onClick={handleOpen}
//         sx={{
//           padding: 0,
//           width: 44,
//           height: 44,
//           ...(open && {
//             bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
//           }),
//         }}
//       >
//         <img src={LANGS[0].icon} alt={LANGS[0].label} />
//       </IconButton>

//       <Popover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: {
//             p: 1,
//             mt: 1.5,
//             ml: 0.75,
//             width: 180,
//             '& .MuiMenuItem-root': {
//               px: 1,
//               typography: 'body2',
//               borderRadius: 0.75,
//             },
//           },
//         }}
//       >
//         <Stack spacing={0.75}>
//           {LANGS.map((option) => (
//             <MenuItem key={option.value} selected={option.value === LANGS[0].value} onClick={() => handleClose()}>
//               <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

//               {option.label}
//             </MenuItem>
//           ))}
//         </Stack>
//       </Popover>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useCompanyContext } from './selecompany/companyselection';



const WholeCompanyData = [
  {
    "app_name": "MKUVMS",
    "company_fullname": "MKUVMS",
    "company_shortname": "MKU",
    "homepage": "https://mkuvms.bizprocure.com",
    "api_url": "https://mkuvms.bizprocure.com/api",
    "is_locked": null,
    "default": "0",
    "logo": "https://mkuvms.bizprocure.com/assets/media/logos/mku.png",
    "last_synced_at": "2023-12-06 12:00:29",
    "last_active_at": null,
    "enabled": "1",
    "created_at": "2023-12-06 12:00:29",
    "updated_at": "2023-12-06 18:04:40",
    "service_token": "1|R6drZxR0FA8JBk7wDTjiem0k0BLzMo7DBdH48hmv"
  },
  {
    "app_name": "GLEN",
    "company_fullname": "GLEN",
    "company_shortname": "GLEN",
    "homepage": "https://b1.techstreet.in",
    "api_url": "https://b1.techstreet.in/api",
    "is_locked": null,
    "default": "1",
    "logo": "https://b1.techstreet.in/assets/media/logos/glen.png",
    "last_synced_at": "2023-12-06 17:55:16",
    "last_active_at": null,
    "enabled": "1",
    "created_at": "2023-12-06 17:55:16",
    "updated_at": "2023-12-06 18:04:40",
    "service_token": "31|wJ5g6z9FCL6uC8Ib7JBLSHOx0mNUOrPW2KSHGjP1"
  }
];


const CompanyDropdown = () => {
    // const [selectCompany, setSelectCompany] = useState('');

    //   const handleChange = (e) => {
    //     const selectedCompany = e.target.value;
    //     setSelectCompany(selectedCompany);
    
    //     // Assuming 'WholeCompanyData' is available in the scope
    //     const companyData = WholeCompanyData.find((company) => company.app_name === selectedCompany);
    
    //     if (companyData) {
    //       // Store the selected company as a JSON string in localStorage
    //       localStorage.setItem('selectcompany', JSON.stringify(companyData));
    //     }
    //   };

    const { selectedCompany, updateSelectedCompany } = useCompanyContext();
    const [selectCompany, setSelectCompany] = useState('');
  
    const handleChange = (e) => {
      const selectedCompany = e.target.value;
      setSelectCompany(selectedCompany);
  
      const companyData = WholeCompanyData.find((company) => company.app_name === selectedCompany);
  
      if (companyData) {
        updateSelectedCompany(companyData);
      }
    };

    return (
        <FormControl>
        <InputLabel id="company-dropdown-label">Select Company Name</InputLabel>
        <Select
          labelId="company-dropdown-label"
          id="company-dropdown"
          onChange={handleChange}
          value={selectCompany}
          label="Select Company"
          SelectProps={{ native: true }}
        >
          {WholeCompanyData.map((company, index) => (
            <MenuItem key={index} value={company.company_fullname}>
              {company.company_fullname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
//         <select className="form-select" aria-label="Default select example">
//   <option selected> Select Company</option>
//   {WholeCompanyData.map((company, index) => (
//                     <option key={index} value={company.company_fullname}>
//                         {company.company_fullname}
//                     </option>
//                 ))}
// </select>
    );
};

export default CompanyDropdown;


