import { Provider, web3 } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export const getProvider = async (wallet:AnchorWallet) => {
    if (!wallet) {
        return
    }
    const network = 'http://127.0.0.1:8899';
    const conn = new web3.Connection(network, "confirmed");
    return new Provider(conn, wallet, {
        preflightCommitment: "confirmed",
        commitment: "confirmed"
    })
}