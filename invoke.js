/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

module.exports.main= async function (opt,fabObj) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    
        if(opt == 'createCar'){
            // "color":"red","docType":"car","make":"Ford","model":"Mustang","owner":"Brad"
            await contract.submitTransaction('createCar', fabObj.carNumber, fabObj.make, fabObj.model,fabObj.color, fabObj.owner);
            // await contract.submitTransaction('createCar', 'CAR13', 'Ford', 'According', 'white', 'ma');
            console.log('Transaction has been submitted');
            return true;
        }

        if(opt == 'changeCarOwner'){
            await contract.submitTransaction('changeCarOwner', fabObj.carNumber, fabObj.owner);
            console.log('Transaction has been submitted');
            return true;
        }

       

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        // process.exit(1);
        throw new Error(error);
    }
}

