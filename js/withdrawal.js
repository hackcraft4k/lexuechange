
        document.addEventListener('DOMContentLoaded', function() {
            const amountInput = document.getElementById('amountInput');
            const receivableAmount = document.getElementById('receivable-amount');
            const totalGHS = document.getElementById('total-ghs');
            const withdrawalForm = document.getElementById('withdrawalForm');
            const accountNumberInput = document.getElementById('accountNumber');

            amountInput.addEventListener('input', function() {
                const amount = parseFloat(amountInput.value);
                if (!isNaN(amount)) {
                    receivableAmount.textContent = `${amount.toFixed(2)} USD`;
                    totalGHS.textContent = `${(amount * 10.35).toFixed(2)} GHS`;
                } else {
                    receivableAmount.textContent = '';
                    totalGHS.textContent = '';
                }
            });

            withdrawalForm.addEventListener('submit', async function(event) {
                event.preventDefault();

                const withdrawalAmount = parseFloat(amountInput.value);
                const phoneNumber = accountNumberInput.value;
                const withdrawalMethod = document.getElementById('withdrawalMethod').value;
               
                try {
                    const response = await fetch('https://lexuechange-1.onrender.com/api/withdraw', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            amount: withdrawalAmount,
                            phoneNumber: phoneNumber,
                            gateway: withdrawalMethod
                        })
                    });
                   
                    const data = await response.json();
                   
                    if (response.ok) {
                        alert(data.message);
                        window.location.href = 'dashboard.html';
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    alert('Failed to connect to the server.');
                }
            });
        });