import * as token from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

export async function closeEmptyAccounts(connection:Connection,userPub:PublicKey,programId:PublicKey){
    
    const allAccounts=await connection.getTokenAccountsByOwner(userPub,{
        programId:programId
    });
    const emptyAccounts:PublicKey[]=[];
    const empty=allAccounts.value.forEach((acc)=>{
        const amount=acc.account.data.readBigUInt64LE(64)
        if(!amount){
            emptyAccounts.push(acc.pubkey)
        }
    })
    console.log("found "+allAccounts.value.length+" total accounts ");
    console.log("found "+emptyAccounts.length+" empty accounts ");
    // console.log("allAccounts : ,", allAccounts);
    // console.log("empty : ,", emptyAccounts);
    return emptyAccounts;
}