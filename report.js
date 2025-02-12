function displayQueries() {
    const queries = JSON.parse(localStorage.getItem('queries')) || [];
    const queryTableBody = document.getElementById('queryTable').getElementsByTagName('tbody')[0];
    queryTableBody.innerHTML = ''; // Clear existing rows

    queries.forEach((query, index) => {
        const row = queryTableBody.insertRow();
        row.insertCell(0).textContent = query.token;
        row.insertCell(1).textContent = query.institutionName;
        row.insertCell(2).textContent = query.branchCode;
        row.insertCell(3).textContent = query.complaint;
        row.insertCell(4).textContent = query.dateTime;
        row.insertCell(5).textContent = query.feedback;

        // Create a delete button
        const deleteCell = row.insertCell(6);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            deleteQuery(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

function deleteQuery(index) {
    // Retrieve the existing queries from local storage
    let queries = JSON.parse(localStorage.getItem('queries')) || [];
    
    // Remove the query at the specified index
    queries.splice(index, 1);
    
    // Save the updated queries back to local storage
    localStorage.setItem('queries', JSON.stringify(queries));
    
    // Refresh the displayed queries
    displayQueries();
}

document.getElementById('exportBtn').addEventListener('click', function() {
    const queries = JSON.parse(localStorage.getItem('queries')) || [];
    let xlsContent = '<table><tr><th>Token</th><th>Institution Name</th><th>Branch Code</th><th>Complaint/Issue</th><th>Date & Time</th><th>Feedback/Summary</th></tr>';

    queries.forEach(query => {
        xlsContent += `<tr>
            <td>${query.token}</td>
            <td>${query.institutionName}</td>
            <td>${query.branchCode}</td>
            <td>${query.complaint}</td>
            <td>${query.dateTime}</td>
            <td>${query.feedback}</td>
        </tr>`;
    });

    xlsContent += '</table>';

    const blob = new Blob([xlsContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "kimis_queries_report.xls";
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "kimis_queries_report.xls".
    document.body.removeChild(link); // Clean up
});

// Initial call to display any existing queries
displayQueries();
