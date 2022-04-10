import { Program, Provider } from "@project-serum/anchor"
import idl from '../idl/sol_pay.json'

export const getProgram = async (provider: Provider) => {
    const idlJson = JSON.stringify(idl)
    const parsedIdl = JSON.parse(idlJson)
    return new Program(parsedIdl, idl.metadata.address, provider)
}