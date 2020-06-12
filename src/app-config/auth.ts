import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { AppConfigurationClient } from "@azure/app-configuration";

if (process.env.NODE_ENV !== "test") {
  require("dotenv").config();
}

// Validate environment variables
if (!process.env.AZURE_APP_CONFIG_NAME) {
  throw new Error("AZURE_APP_CONFIG_NAME variable missing!");
}

// Setup Azure Credentials
const credential = new DefaultAzureCredential();
const url = process.env.AZURE_KEYVAULT_NAME
  ? `https://${process.env.AZURE_KEYVAULT_NAME}.vault.azure.net`
  : null;
const endpoint = `https://${process.env.AZURE_APP_CONFIG_NAME}.azconfig.io`;

// Export authenticated clients
export const vaultClient = url ? new SecretClient(url, credential) : null;
export const appClient = new AppConfigurationClient(endpoint, credential);
