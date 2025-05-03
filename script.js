function calculate() {
    const bills = {
        1: Number(document.getElementById('b1').value) || 0,
        2: Number(document.getElementById('b2').value) || 0,
        5: Number(document.getElementById('b5').value) || 0,
        10: Number(document.getElementById('b10').value) || 0,
        20: Number(document.getElementById('b20').value) || 0,
        50: Number(document.getElementById('b50').value) || 0,
        100: Number(document.getElementById('b100').value) || 0,
    };
    
    let other = Number(document.getElementById('other').value) || 0;
    
    let total = Object.entries(bills).reduce((sum, [denom, count]) => sum + denom * count, 0) + other;

    // Find the largest value ending in 00 or 50
    let largestValidTotal = total;
    while (largestValidTotal % 100 !== 0 && largestValidTotal % 50 !== 0) {
        largestValidTotal--;
    }

    let difference = total - largestValidTotal;
    let holdBack = {};
    let totalHoldBack = 0;

    for (let denom of Object.keys(bills).reverse().map(Number)) {  // Ensure denominations are treated as numbers
        while (difference >= denom && bills[denom] > 0) {
            difference -= denom;
            bills[denom]--;
            holdBack[denom] = (holdBack[denom] || 0) + 1;
            totalHoldBack += denom;  // Now correctly summing numeric values
        }
    }

    document.getElementById('result').innerHTML =
        `<p>Largest valid total: $${largestValidTotal}</p>
         <p>Hold back these bills: ${JSON.stringify(holdBack)}</p>
         <p>Total amount held back: $${totalHoldBack}</p>`;
}
