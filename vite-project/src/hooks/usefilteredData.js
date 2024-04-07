import { useEffect, useState } from "react";

function useFilteredData(searchTerm, initialData) {
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = initialData.filter((item) => {
      return (
        item.FirstName.toLowerCase().includes(lowercasedFilter) ||
        item.LastName.toLowerCase().includes(lowercasedFilter) ||
        item.Team.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, initialData]);

  return filteredData;
}

export default useFilteredData;
