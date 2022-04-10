import { getProvider } from "../../methods/provider"
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { getProgram } from "../../methods/program"
import { Provider, web3 } from "@project-serum/anchor"
import { LAMPORTS_PER_SOL, TransactionInstruction } from "@solana/web3.js"
import { notification } from "antd"
import idl from '../../idl/sol_pay.json'

const Pay = () => {
    const router = useRouter()
    const { slug } = router.query
    const wallet = useAnchorWallet()
    const [amount, setAmount] = useState(0)
    const [receiverPubkey, setReceiverPubkey] = useState<web3.PublicKey>()
    // const [address, setAddress] = useState("")
    useEffect(() => {
        if (!wallet) {
            return
        }
        console.log(slug);

        const getAccount = async () => {
            const provider = await getProvider(wallet)
            const program = await getProgram(provider as Provider)
            const accountPublickey = new web3.PublicKey(slug as string)
            const accountDetails = await program.account.receiverLamportDetails.fetch(accountPublickey)
            setAmount(accountDetails.amount.toString())
            setReceiverPubkey(accountDetails.receiverPubkey)
        }

        getAccount()
    }, [slug, wallet])

    const transfer = async () => {
        if (!wallet) {
            return
        }
        try {
            const provider = await getProvider(wallet)
            const program = await getProgram(provider as Provider)
            const transaction = new web3.Transaction().add(
                web3.SystemProgram.transfer({
                    fromPubkey: wallet?.publicKey,
                    toPubkey: receiverPubkey as web3.PublicKey,
                    lamports: amount * LAMPORTS_PER_SOL
                })
            )
            // const closeAccountTx = new web3.Transaction().add(
            //     new TransactionInstruction({
            //         keys: [
            //             {
            //                 pubkey: receiverPubkey as web3.PublicKey,
            //                 isSigner: false,
            //                 isWritable: true,
            //               },
            //               {
            //                 pubkey: wallet.publicKey,
            //                 isSigner: false,
            //                 isWritable: true,
            //               },
            //         ],
            //         programId: new web3.PublicKey(idl.metadata.address) 
            //     })
            // )
            transaction.feePayer = wallet.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash();
            transaction.recentBlockhash = await blockhashObj?.blockhash;
            // closeAccountTx.feePayer = wallet.publicKey
            // closeAccountTx.recentBlockhash = blockhashObj?.blockhash
            const signedTx = await wallet?.signTransaction(transaction)
            const txid = await provider?.connection.sendRawTransaction(signedTx.serialize())
            // const closeid = await provider?.connection.sendRawTransaction(signedTx[1].serialize())
            
            if (txid) {
                notification.success({
                    message: "Your transaction has been processed successfully",
                    placement: "bottomLeft"
                })
            }
        } catch (e) {
            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }
        
    }
    return (
        <div className="h-screen relative bg-gray-100">
            <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-6 rounded-md shadow-md xl:w-2/6 w-1/2 flex flex-col gap-10 ${wallet ? "items-start" : "items-center"}`}>
                {
                    wallet ?
                        <>
                            <h1 className="text-lg font-bold">
                                Transfer SOL
                        </h1>

                            <div className="flex flex-col items-center gap-2 w-full">
                                <div>
                                    {receiverPubkey?.toBase58()} is asking for
                            </div>
                                <h2 className="text-xl">
                                    {amount}SOL
                            </h2>
                            </div>

                            <div className="flex flex-row justify-center w-full">

                                <button className="font-bold w-3/4 py-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white" onClick={transfer}>
                                    Transfer
                                </button>

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

export default Pay