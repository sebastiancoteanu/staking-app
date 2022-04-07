/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { DecentralBankContract } from "./DecentralBank";
import { MigrationsContract } from "./Migrations";
import { RwdContract } from "./Rwd";
import { TetherContract } from "./Tether";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "DecentralBank"): DecentralBankContract;
      require(name: "Migrations"): MigrationsContract;
      require(name: "Rwd"): RwdContract;
      require(name: "Tether"): TetherContract;
    }
  }
}

export { DecentralBankContract, DecentralBankInstance } from "./DecentralBank";
export { MigrationsContract, MigrationsInstance } from "./Migrations";
export { RwdContract, RwdInstance } from "./Rwd";
export { TetherContract, TetherInstance } from "./Tether";