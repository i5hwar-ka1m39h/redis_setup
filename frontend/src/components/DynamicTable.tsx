import React, { useState, useEffect } from 'react';

const DynamicTable = ({ data }) => {
  // Extract column headers dynamically
  const [headers, setHeaders] = useState<any>([]);

  useEffect(() => {
    // If data exists and is not empty, extract unique headers
    if (data && data.length > 0) {
      const extractHeaders = (item) => {
        const getAllKeys = (obj, prefix = '') => {
          return Object.keys(obj).reduce((acc, key) => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            // If the value is an object, recursively get its keys
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
              return [...acc, ...getAllKeys(obj[key], newKey)];
            }
            
            return [...acc, newKey];
          }, []);
        };
        
        return getAllKeys(item);
      };

      // Get unique headers from the first item
      const uniqueHeaders = [...new Set(extractHeaders(data[0]))];
      setHeaders(uniqueHeaders);
    }
  }, [data]);

  // Helper function to safely access nested properties
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => 
      acc && acc[part] !== undefined ? acc[part] : 'N/A', obj);
  };

  // Render nothing if no data
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>
                  {/* Convert nested object values to string representation */}
                  {typeof getNestedValue(item, header) === 'object'
                    ? JSON.stringify(getNestedValue(item, header))
                    : getNestedValue(item, header)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;