document.addEventListener('DOMContentLoaded', function () {
  const fileUrl = 'dates/15-11-2024.xlsx'; // Replace with the actual URL of your Excel file

  fetch(fileUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.arrayBuffer();
      })
      .then(data => {
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0]; // Get the first sheet
          const worksheet = workbook.Sheets[sheetName];

          // Convert the sheet to JSON format
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Debugging: Log the JSON data to see what was read
          console.log("JSON Data:", jsonData);

          // Check if there are enough rows and columns
          if (jsonData.length < 2 || jsonData[0].length < 2) {
              alert("The Excel file must have at least 2 rows and 2 columns.");
              return;
          }

          // Get the table body element
          const tableBody = document.querySelector('.mdc-data-table__content');
          if (!tableBody) {
              console.error("Table body not found");
              return; // Exit if the table body is not found
          }
          
          tableBody.innerHTML = ''; // Clear previous data

          // Loop through the data starting from row 2 (index 1) to include A2 and B2
          for (let i = 1; i < jsonData.length; i++) {
              const time = jsonData[i][0]; // Column 1 (A)
              const content = jsonData[i][1]; // Column 2 (B)

              // Create a new row
              const row = document.createElement('tr');
              row.className = 'mdc-data-table__row';

              // Create the first cell (th) for time
              const timeCell = document.createElement('th');
              timeCell.className = 'mdc-data-table__cell';
              timeCell.scope = 'row';
              timeCell.textContent = time;

              // Create the second cell (td) for content
              const contentCell = document.createElement('td');
              contentCell.className = 'mdc-data-table__cell mdc-data-table__cell';
              contentCell.innerHTML = content; // Use innerHTML if content has HTML tags (like <br>)

              // Append cells to the row
              row.appendChild(timeCell);
              row.appendChild(contentCell);

              // Append the row to the table body
              tableBody.appendChild(row);
          }
      })
      .catch(error => {
          console.error('Error fetching the Excel file:', error);
      });
});