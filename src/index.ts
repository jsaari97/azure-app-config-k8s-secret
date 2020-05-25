import { loadConfigurations } from "./fs/load";
import { parseConfig } from "./app-config";

export interface GenerateOptions {
  input: string;
  output: string;
}

const main = async (opts: GenerateOptions) => {
  try {
    const configs = await loadConfigurations(opts.input);
    const parsedConfigs = await Promise.all(configs.map(parseConfig));
    console.log(parsedConfigs);
  } catch (e) {
    console.log(e);
  }
};

main({ input: "./configs", output: "./outputs" });