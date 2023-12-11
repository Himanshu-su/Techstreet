import { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();


export const useCompanyContext = () => {
    return useContext(CompanyContext);
  };
export const CompanyProvider = ({ children }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    const updateSelectedCompany = (companyData) => {
        setSelectedCompany(companyData);
      };


  return(
<CompanyContext.Provider  value={{selectedCompany,updateSelectedCompany}}>
    {children}
</CompanyContext.Provider>
  )
  
};
