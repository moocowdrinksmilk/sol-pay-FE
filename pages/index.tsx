import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const Home: NextPage = () => {
    return (
        <div>
            <div className="h-20 bg-blue-400 px-10 flex justify-between items-center">
                <div>
                    Somelogo
                </div>

                <WalletModalProvider>
                    <WalletMultiButton />
                </WalletModalProvider>
            </div>

            <div className="h-80 bg-yellow-500">

            </div>
        </div>
    )
}

export default Home
