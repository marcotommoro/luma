/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.ALCHEMY_KEY;

const needsNodeAPI =
    process.env.npm_config_argv &&
    (process.env.npm_config_argv.includes("rinkeby") ||
        process.env.npm_config_argv.includes("live"));

if ((!MNEMONIC || !NODE_API_KEY) && needsNodeAPI) {
    console.error("Please set a mnemonic and ALCHEMY_KEY or INFURA_KEY.");
    process.exit(0);
}

const rinkebyNodeUrl = "https://eth-rinkeby.alchemyapi.io/v2/" + NODE_API_KEY;

const getHDWallet = () => {
    for (const env of[process.env.MNEMONIC, process.env.PRIVATE_KEY]) {
        if (env && env !== "") {
            return env;
        }
    }
    throw Error("Private Key Not Set! Please set up .env");
};

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 8545, // Standard Ethereum port (default: none)
            network_id: "*", // Any network (default: none)
        },
        cronos: {
            provider: new HDWalletProvider(
                getHDWallet(),
                "https://cronos-testnet-3.crypto.org:8545"
            ),
            network_id: "*",
            skipDryRun: true,
        },
        rinkeby: {
            provider: function() {
                return new HDWalletProvider(MNEMONIC, rinkebyNodeUrl);
            },
            gas: 5000000,
            network_id: 4,
        },
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },
    compilers: {
        solc: {
            version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
        },
    },
    db: {
        enabled: false,
    },
};