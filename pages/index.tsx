import type { NextPage } from 'next'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { BN, Program, Provider, web3 } from "@project-serum/anchor";
import idl from '../idl/sol_pay.json'
import { useEffect, useState } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {getProvider} from '../methods/provider'
import {CopyOutlined} from '@ant-design/icons'
import { message, notification } from 'antd';
// import idl from '../idl/sol_pay'

const Home: NextPage = () => {
    // const connection = new Connection(network, preflightCommitment);
    // const provider = new Provider(connection, wallet, preflightCommitment);
    const wallet = useAnchorWallet()
    const [amount, setAmount] = useState<number>()
    const [accountKey, setKey] = useState<web3.PublicKey>()

    const createReceiverAccount = async () => {
        if (!wallet) {
            return
        }
        try {
            const provider = await getProvider(wallet)
            const idlJson = JSON.stringify(idl)
            const parsedIdl = JSON.parse(idlJson)
            const program = new Program(parsedIdl, idl.metadata.address, provider)
            const newAccount = web3.Keypair.generate()
            const tx = program.transaction.initializeLamports(
                new BN(amount as number),
                {
                    accounts: {
                        receiver: newAccount.publicKey,
                        user: wallet.publicKey,
                        systemProgram: web3.SystemProgram.programId
                    },
                    signers: [newAccount]
                }
            )
    
            tx.feePayer = wallet.publicKey
            console.log(wallet)
            let blockhashObj = await provider?.connection.getRecentBlockhash();
            tx.recentBlockhash = await blockhashObj?.blockhash;
            tx.sign(newAccount)
            const signedTx = await wallet.signTransaction(tx)
            const txid = await provider?.connection.sendRawTransaction(signedTx.serialize())
            await provider?.connection.confirmTransaction(txid as string)
            const deployedAccount = await program.account.receiverLamportDetails.fetch(newAccount.publicKey)
            setKey(newAccount.publicKey)
        } catch(e) {
            console.log(e.message);
            
            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }
        
    }

    const copyLink = () => {
        navigator.clipboard.writeText("http://localhost:3000/pay/" + accountKey?.toBase58())
        message.success("Copied to Clipboard")
    }

    return (
        <div className="h-screen relative bg-gray-100">
            <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-6 rounded-md shadow-md xl:w-2/6 w-1/2 flex flex-col gap-10 ${wallet ? "items-start" : "items-center"}`}>
                {
                    wallet ?
                    <>
                        <h1 className="text-lg font-bold">
                            U poor? Ask for $SOL
                        </h1>

                        <div className="flex flex-row items-center gap-2 w-full">
                            <input className="border flex-1 h-12 text-lg px-1" type="number" onChange={(e) => { setAmount(Number(e.target.value)) }} />
                            <h2 className="text-xl">
                                SOL
                            </h2>
                        </div>

                        <div className="flex flex-row justify-center w-full">
                            {
                                !accountKey ? 
                                <button className="font-bold w-3/4 py-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white" onClick={createReceiverAccount}>
                                    Generate Link
                                </button>
                                :
                                <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer" onClick={copyLink}>
                                    <div>Send this link to beg for money</div>
                                    <CopyOutlined />

                                </div>
                            }
                        </div>
                    </>
                    :
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                }
            </div>

        </div>
    )
}

export default Home
