function calculate() {
    const bills = {
        1: parseInt(document.getElementById('b1').value) || 0,
        2: parseInt(document.getElementById('b2').value) || 0,
        5: parseInt(document.getElementById('b5').value) || 0,
        10: parseInt(document.getElementById('b10').value) || 0,
        20: parseInt(document.getElementById('b20').value) || 0,
        50: parseInt(document.getElementById('b50').value) || 0,
        100: parseInt(document.getElementById('b100').value) || 0,
    };
    
    let other = parseInt(document.getElementById('other').value) || 0;
    
    let total = Object.entries(bills).reduce((sum, [denom, count]) => sum + denom * count, 0) + other;
    
    // Find the largest value ending in 00 or 50
    let largestValidTotal = total;
    while (largestValidTotal % 100 !== 0 && largestValidTotal % 50 !== 0) {
        largestValidTotal--;
    }
    
    let difference = total - largestValidTotal;
    let holdBack = {};

    // Try reducing amounts logically
    for (let denom of Object.keys(bills).reverse()) {
        while (difference >= denom && bills[denom] > 0) {
            difference -= denom;
            bills[denom]--;
            holdBack[denom] = (holdBack[denom] || 0) + 1;
        }
    }

    document.getElementById('result').innerHTML =
        `<p>Largest valid total: $${largestValidTotal}</p>
         <p>Hold back these bills: ${JSON.stringify(holdBack)}</p>`;
}
