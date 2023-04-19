# BlockChain Project

1. Make sure you have installed Hardhat and Ganache. If you haven't, you can install them using npm:


2. `npm install --save-dev hardhat ganache-cli`
Create a new directory for your project and cd into it.

3. Run `npx hardhat compile` to compile the contract and generate the necessary artifacts.

4. Run `npx ganache-cli` to start a local Ganache network.

5. In a separate terminal window, run `npx hardhat test` to run the test cases against the local Ganache network.

6. This should output the results of the test cases. If any tests fail, you will see an error message in the output.


7. Make sure to update the hardhat.config.js file to include the network configuration for Ganache. Here's an example configuration:

```json
module.exports = {
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    }
  },
  solidity: "0.8.0",
};
```
8. This configuration specifies a Ganache network running on http://127.0.0.1:8545 with a chain ID of 1337. You can update these values as necessary to match your Ganache configuration.

9. Deploy the contract in local blockchain network using

`npx hardhat run --network ganache scripts/deploy.js`
