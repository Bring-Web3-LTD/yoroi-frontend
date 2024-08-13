// @flow

import type {
  lf$Database,
  lf$Transaction,
} from 'lovefield';
import { op } from 'lovefield';
import {
  getRowFromKey, getRowIn,
} from '../../utils';
import * as Tables from '../tables';
import type {
  UtxoAtSafePointRow,
  UtxoDiffToBestBlock,
  UtxoDiffToBestBlockRow,
} from '../tables';

export class GetUtxoAtSafePoint {
  static ownTables: {|
    UtxoAtSafePointTable: typeof Tables.UtxoAtSafePointSchema,
  |} = Object.freeze({
    [Tables.UtxoAtSafePointSchema.name]: Tables.UtxoAtSafePointSchema,
  });

  static depTables: {||} = Object.freeze({});

  static forWallet(
    db: lf$Database,
    tx: lf$Transaction,
    publicDeriverId: number,
  ): Promise<$ReadOnly<UtxoAtSafePointRow> | void> {
    return getRowFromKey<UtxoAtSafePointRow>(
      db, tx,
      publicDeriverId,
      GetUtxoAtSafePoint.ownTables[Tables.UtxoAtSafePointSchema.name].name,
      GetUtxoAtSafePoint.ownTables[Tables.UtxoAtSafePointSchema.name].properties.PublicDeriverId,
    );
  }
}

export class GetUtxoDiffToBestBlock {
  static ownTables: {|
    UtxoDiffToBestBlock: typeof Tables.UtxoDiffToBestBlockSchema,
  |} = Object.freeze({
    [Tables.UtxoDiffToBestBlockSchema.name]: Tables.UtxoDiffToBestBlockSchema,
  });

  static depTables: {||} = Object.freeze({});

  static async forWallet(
    db: lf$Database,
    tx: lf$Transaction,
    publicDeriverId: number,
  ): Promise<Array<UtxoDiffToBestBlock>> {
    const rows = await getRowIn<UtxoDiffToBestBlockRow>(
      db, tx,
      GetUtxoDiffToBestBlock.ownTables[Tables.UtxoDiffToBestBlockSchema.name].name,
      GetUtxoDiffToBestBlock.ownTables[
        Tables.UtxoDiffToBestBlockSchema.name
      ].properties.PublicDeriverId,
      ([publicDeriverId]: Array<number>),
    );
    return rows.map(r => ({
      lastBestBlockHash: r.lastBestBlockHash,
      spentUtxoIds: r.spentUtxoIds,
      newUtxos: r.newUtxos
    }));
  }

  // return only one object because there is an unique index on lastBestBlockHash
  static async findLastBestBlockHash(
    db: lf$Database,
    tx: lf$Transaction,
    publicDeriverId: number,
    lastBestBlockHash: string,
  ): Promise<$ReadOnly<UtxoDiffToBestBlock> | void> {
    const schema = GetUtxoDiffToBestBlock.ownTables[Tables.UtxoDiffToBestBlockSchema.name];
    const table = db.getSchema().table(schema.name);

    const query = db
          .select()
          .from(table)
          .where(
            op.and(
              table[schema.properties.PublicDeriverId].eq(publicDeriverId),
              table[schema.properties.lastBestBlockHash].eq(lastBestBlockHash)
            )
          );
    const rows = await tx.attach(query);
    if (rows.length === 0) {
      return undefined;
    }
    return {
      lastBestBlockHash: rows[0].lastBestBlockHash,
      spentUtxoIds: rows[0].spentUtxoIds,
      newUtxos: rows[0].newUtxos
    };
  }
}
