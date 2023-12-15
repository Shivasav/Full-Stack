// helpers.js

 function formatDate (dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
}


// Placeholder function to check if user values are default
function areUserValuesDefault(user) {
    // For example, check if licenseNo is a default value
    return user.licenceNo === 'default';
}

module.exports = { 
    formatDate,
    areUserValuesDefault
}