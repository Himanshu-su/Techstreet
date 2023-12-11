import { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();


export const useCompanyContext = () => {
    return useContext(CompanyContext);
  };
export const CompanyProvider = ({ children }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [apiUrl, setApiUrl] = useState('https://vendor.bizprocure.com/api/central'); // Set the default API URL


    const updateSelectedCompany = (companyData) => {
        setSelectedCompany(companyData);

      };
      const updateApiUrl = (newApiUrl) => {
        setApiUrl(newApiUrl);
      };

  return(
<CompanyContext.Provider  value={{selectedCompany,updateSelectedCompany,apiUrl,updateApiUrl}}>
    {children}
</CompanyContext.Provider>
  )
  
};
