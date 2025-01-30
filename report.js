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
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Token,Institution Name,Branch Code,Complaint/Issue,Date & Time,Feedback/Summary\n"; // Header

    queries.forEach(query => {
        const row = [
            query.token,
            query.institutionName,
            query.branchCode,
            query.complaint,
            query.dateTime,
            query.feedback
        ].join(",");
        csvContent += row + "\n"; // Add each row
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "queries.csv");
    document.body.appendChild
