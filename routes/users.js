var express = require('express');
var router = express.Router();
class CreditCard {
  constructor(creditLimit = 10000) {
      if (creditLimit <= 0) {
          throw new Error("Credit limit must be a positive number.");
      }
      this.creditLimit = creditLimit;      
      this.availableLimit = creditLimit;   
      this.balance = 0;                    
  }

  // Helper method for logging
  logState(action, amount) {
      console.log(`After ${action} ${amount}: Balance = ${this.balance}, Available Limit = ${this.availableLimit}`);
  }

  // Helper method to update balance and available limit
  updateLimits(amount) {
      this.availableLimit = this.creditLimit - this.balance;
  }

  addMoney(amount) {
      if (amount <= 0) {
          return "Error: Amount to add must be greater than zero.";
      }

      this.balance += amount;
      this.logState("adding", amount);
      return `Added ${amount} to the account. Current balance: ${this.balance}`;
  }

  pay(amount) {
      if (amount <= 0) {
          return "Error: Payment amount must be greater than zero.";
      }

      if (amount > this.balance) {
          return `Error: Insufficient balance. Short by ${amount - this.balance}. Payment could not be completed.`;
      }

      this.balance -= amount;
      this.updateLimits();
      this.logState("paying", amount);
      return `Paid ${amount} from the account. Current balance: ${this.balance}`;
  }

  transferBalance(amount, recipientCard) {
      if (amount <= 0) {
          return "Error: Transfer amount must be greater than zero.";
      }

      if (amount > this.balance) {
          return `Error: Insufficient balance. Short by ${amount - this.balance}. Transfer could not be completed.`;
      }

      if (!(recipientCard instanceof CreditCard)) {
          return "Error: Recipient must be a valid CreditCard instance.";
      }

      this.balance -= amount;
      recipientCard.balance += amount;
      this.updateLimits();

      this.logState("transferring", amount);
      console.log(`After transferring ${amount} to recipient: Balance = ${recipientCard.balance}, Available Limit = ${recipientCard.availableLimit}`);
      return `Transferred ${amount} to recipient card. Sender balance: ${this.balance}, Recipient balance: ${recipientCard.balance}`;
  }

  getBalance() {
      return `Current balance: ${this.balance}`;
  }

  getCreditLimit() {
      return `Credit limit: ${this.creditLimit}`;
  }

  getAvailableLimit() {
      return `Available limit: ${this.availableLimit}`;
  }
}








// Testing the refined CreditCard class functionality
      // Display the credit limit
/* GET users listing. */
router.get('/deneme', function(req, res, next) {
  
  const senderCard = new CreditCard(5000);
const recipientCard = new CreditCard(3000);

console.log(senderCard.addMoney(2000));                  // Load money into sender's card
console.log(senderCard.getBalance());                     // Show sender's balance
console.log(recipientCard.getBalance());                  // Show recipient's initial balance

console.log(senderCard.transferBalance(1000, recipientCard)); // Transfer balance from sender to recipient
console.log(senderCard.getBalance());                     // Show updated sender balance
console.log(recipientCard.getBalance());                  // Show updated recipient balance

  res.send('Deneme route\'u çalışıyor');
});

module.exports = router;
