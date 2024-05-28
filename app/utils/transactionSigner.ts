//
// export async function confirmTransactionFromFrontend(connection: {
//     sendRawTransaction: (arg0: any) => any
// }, encodedTransaction: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string }, wallet: {
//     signTransaction: undefined | { (transaction: T): Promise<T> };
//     wallet: null | Wallet
// }) {
//     const recoveredTransaction = Transaction.from(
//         Buffer.from(encodedTransaction, 'base64'),
//     )
//     const signedTx = await wallet.signTransaction(recoveredTransaction)
//     return await connection.sendRawTransaction(
//         signedTx.serialize({ requireAllSignatures: false }),
//     )
// }
//
// export async function signTransactionFromFrontend(encodedTransaction: WithImplicitCoercion<string> | {
//     [Symbol.toPrimitive](hint: 'string'): string;
// }, signer: any) {
//     const recoveredTransaction = Transaction.from(
//         Buffer.from(encodedTransaction, 'base64'),
//     )
//     recoveredTransaction.partialSign(...signer)
//     const serializedTransaction = recoveredTransaction.serialize({ requireAllSignatures: false })
//     return serializedTransaction.toString('base64')
// }