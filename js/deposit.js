document.addEventListener('DOMContentLoaded', function() {
    const gatewaySelect = document.getElementById('gateway');
    const amountInput = document.getElementById('amount');
    const depositDetailsDiv = document.getElementById('depositDetails');
    const depositLimitDiv = document.querySelector('.deposit-limit');
    const payableAmountDiv = document.querySelector('.payable-amount');
    const conversionRateDiv = document.querySelector('.conversion-rate');
    const totalGhsDiv = document.querySelector('.total-ghs');
    const depositForm = document.getElementById('depositForm');

    // Define gateway-specific rates and limits
    const gateways = {
        korapay: {
            limit: '27 USD - 500 USD',
            rate: 10.93
        },
        myghpay: {
            limit: '50 USD - 500 USD',
            rate: 10.93
        },
        usdt: {
            limit: 'Any amount',
            rate: 11.25 // Example rate, adjust as needed
        }
    };

    // Listen for changes in both gateway and amount
    gatewaySelect.addEventListener('change', updateDetails);
    amountInput.addEventListener('input', updateDetails);

    function updateDetails() {
        const selectedGateway = gatewaySelect.value;
        const amountUSD = parseFloat(amountInput.value);

        if (selectedGateway && amountInput.value && !isNaN(amountUSD)) {
            const gatewayInfo = gateways[selectedGateway];
            if (gatewayInfo) {
                const totalGHS = (amountUSD * gatewayInfo.rate).toFixed(2);

                depositLimitDiv.textContent = gatewayInfo.limit;
                payableAmountDiv.textContent = amountUSD.toFixed(2) + ' USD';
                conversionRateDiv.textContent = `1 USD = ${gatewayInfo.rate} GHS`;
                totalGhsDiv.textContent = totalGHS + ' GHS';
                depositDetailsDiv.style.display = 'block';
            }
        } else {
            depositDetailsDiv.style.display = 'none';
        }
    }

    depositForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedGateway = gatewaySelect.value;
        const amountUSD = parseFloat(amountInput.value);

        if (!selectedGateway) {
            alert('Please select a deposit gateway.');
            return;
        }

        const gatewayInfo = gateways[selectedGateway];
        let isValid = true;
       
        if (selectedGateway === 'korapay') {
            if (amountUSD < 27 || amountUSD > 500) {
                isValid = false;
                alert('For Korapay, the deposit amount must be between 27 USD and 500 USD.');
            }
        } else if (selectedGateway === 'myghpay') {
            if (amountUSD < 50 || amountUSD > 500) {
                isValid = false;
                alert('For MyGHPAY, the deposit amount must be between 50 USD and 500 USD.');
            }
        }

        if (isValid) {
            const totalGHS = (amountUSD * gatewayInfo.rate).toFixed(2);
           
            // Store data in local storage before redirecting
            localStorage.setItem('depositUSD', amountUSD.toFixed(2));
            localStorage.setItem('depositGHS', totalGHS);
            localStorage.setItem('depositGateway', selectedGateway.charAt(0).toUpperCase() + selectedGateway.slice(1));

            // Redirect to the new payment page
            window.location.href = 'deposit-payment.html';
        }
    });
});