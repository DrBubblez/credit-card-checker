// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const validateCred = arr => { 
    /* 
        This function takes an array of numbers and 
        uses the Luhn algorithm to determine whats a valid 
        credit card number. 
    */
    const total = arr.reduceRight((sum, currentVal, index, orginalArr) => { // reduceRight is used to start from the right side of the array
        if ((orginalArr.length - 1 - index) % 2 === 1){ // check if the current index is odd
            currentVal *= 2; // double the value
            if (currentVal > 9) { // if the value is greater than 9, subtract 9
                currentVal -= 9;
            };
        };
        return sum += currentVal; // add the current value to the sum
    }, 0);
    return total % 10 === 0; // return true if the total is divisible by 10
};

const findInvalidCards = arr => { // This function filters the batch using the validateCred(), and returns the invalid cards.
    const invalidCards = arr.filter(card => !validateCred(card));
    return invalidCards;
};

const idInvalidCardCompanies = arr => {
    const invalidCards = findInvalidCards(arr); // Collects invalid cards
    let needsContact = []; // Will add to if company needs to be contacted. 
    
    invalidCards.forEach((card) => { // This will check the first digit and see which company it belongs to.
       switch(card[0]) {
        case 3: // Amex
            if (needsContact.indexOf('Amex') === -1) {
                needsContact.push('Amex'); 
            }
            break;
        case 4: // Visa
            if (needsContact.indexOf('Visa') === -1) {
                needsContact.push('Visa');
            }
            break;
        case 5: // Master Card
            if (needsContact.indexOf('Master Card') === -1) {
                needsContact.push('Master Card');
            }
            break;
        case 6: // Discover
            if (needsContact.indexOf('Discover') === -1) {
                needsContact.push('Discover');
            }
            break;
        default: // If the company is not found
            console.log('Company not found');
            break;
       };
    });
    return needsContact;
};

console.log(idInvalidCardCompanies(batch));