// System Data State
    const correctPin = 1234;
    let balance = 2000;
    let attempts = 3;

    const screen = document.getElementById('screen');

    // App Initialize
    showPinScreen();

    // 1. PIN Screen
    function showPinScreen() {
        screen.innerHTML = `
            <div class="screen-title">Welcome</div>
            <div class="screen-text">Please enter your 4-digit PIN to proceed.<br><small style="color: #e74c3c;">Attempts left: ${attempts}</small></div>
            <input type="password" id="pinInput" class="atm-input" maxlength="4" placeholder="XXXX" autofocus>
            <button class="atm-btn neutral" style="width: 50%; margin-top: 5px;" onclick="verifyPin()">Submit PIN</button>
        `;
    }

    // PIN Verification Logic
    function verifyPin() {
        const inputVal = document.getElementById('pinInput').value;
        
        if (parseInt(inputVal) === correctPin) {
            showMenuScreen();
        } else {
            attempts--;
            if (attempts > 0) {
                alert("Incorrect PIN! Try again.");
                showPinScreen();
            } else {
                screen.innerHTML = `
                    <div class="screen-title" style="color: #e74c3c;">CARD BLOCKED</div>
                    <div class="screen-text">You have exceeded maximum PIN attempts.<br>Please contact your home bank branch.</div>
                `;
            }
        }
    }

    // 2. Main Menu Screen
    function showMenuScreen() {
        screen.innerHTML = `
            <div class="screen-title">Main Menu</div>
            <div class="screen-text">Select an option below:</div>
            <div class="menu-grid">
                <button class="atm-btn" onclick="showDepositScreen()">1. Deposit</button>
                <button class="atm-btn" onclick="showWithdrawScreen()">2. Withdraw</button>
                <button class="atm-btn neutral" onclick="checkBalance()">3. Balance</button>
                <button class="atm-btn danger" onclick="exitATM()">4. Exit</button>
            </div>
        `;
    }

    // 3. Deposit UI
    function showDepositScreen() {
        screen.innerHTML = `
            <div class="screen-title">Deposit Money</div>
            <div class="screen-text">Enter deposit amount (PKR):</div>
            <input type="number" id="depositInput" class="atm-input" placeholder="0.00">
            <div class="menu-grid" style="margin-top: 10px;">
                <button class="atm-btn" onclick="executeDeposit()">Confirm</button>
                <button class="atm-btn danger" onclick="showMenuScreen()">Cancel</button>
            </div>
        `;
    }

    function executeDeposit() {
        const amt = parseFloat(document.getElementById('depositInput').value);
        if (amt > 0) {
            balance += amt;
            showSuccessScreen(`Successfully Deposited: PKR ${amt}`);
        } else {
            alert("Please enter a valid positive amount.");
        }
    }

    // 4. Withdraw UI
    function showWithdrawScreen() {
        screen.innerHTML = `
            <div class="screen-title">Withdraw Cash</div>
            <div class="screen-text">Available Balance: PKR ${balance}<br>Enter amount to withdraw:</div>
            <input type="number" id="withdrawInput" class="atm-input" placeholder="0.00">
            <div class="menu-grid" style="margin-top: 10px;">
                <button class="atm-btn" onclick="executeWithdraw()">Confirm</button>
                <button class="atm-btn danger" onclick="showMenuScreen()">Cancel</button>
            </div>
        `;
    }

    function executeWithdraw() {
        const amt = parseFloat(document.getElementById('withdrawInput').value);
        if (amt <= 0 || isNaN(amt)) {
            alert("Please enter a valid positive amount.");
        } else if (amt > balance) {
            alert("Insufficient Funds!");
        } else {
            balance -= amt;
            showSuccessScreen(`Withdrawn: PKR ${amt}<br>Please collect your cash.`);
        }
    }

    // 5. Balance Check
    function checkBalance() {
        screen.innerHTML = `
            <div class="screen-title">Account Balance</div>
            <div class="screen-text" style="font-size: 20px; color: #fff; margin: 20px 0;">PKR ${balance}</div>
            <button class="atm-btn neutral" style="width: 60%;" onclick="showMenuScreen()">Back to Menu</button>
        `;
    }

    // Success Status Helper
    function showSuccessScreen(message) {
        screen.innerHTML = `
            <div class="screen-title" style="color: #2ecc71;">Transaction Success</div>
            <div class="screen-text">${message}<br><br>Current Balance: PKR ${balance}</div>
            <button class="atm-btn neutral" style="width: 60%;" onclick="showMenuScreen()">Continue</button>
        `;
    }

    // 6. Exit ATM
    function exitATM() {
        screen.innerHTML = `
            <div class="screen-title">Thank You</div>
            <div class="screen-text" style="font-size: 16px;">Please collect your card.<br>Have a great day ahead!</div>
            <button class="atm-btn" style="width: 50%; margin-top: 10px;" onclick="resetATM()">Insert Card</button>
        `;
    }

    function resetATM() {
        attempts = 3;
        showPinScreen();
    }
