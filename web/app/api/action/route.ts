import { ActionGetResponse, ActionPostResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey, Transaction } from "@solana/web3.js";
import { closeEmptyAccounts } from "./helper";
import { createCloseAccountInstruction, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    title: 'Fee Redeemer',
    // icon: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
    // icon: 'http://localhost:3001/fee3.png',
    icon: new URL(request.url).origin+'/fee5.png',
    description:
      'Recover Accounts rent fees by closing the Empty token accounts',
    label: 'BLINK',
    links: {
      actions: [
        {
          label: 'Close Token Program Accounts',
          href: request.url + '?pg=token',
        },
        {
          label: 'Close Token22 Program Accounts',
          href: request.url + '?pg=token22',
        },
      ],
    },
  };
  return Response.json(response,{headers:ACTIONS_CORS_HEADERS});
}

export const OPTIONS=GET;

export async function POST(request:Request){
  const connection=new Connection(clusterApiUrl("devnet"));
  const reqBody=await request.json();
  let sender=new PublicKey(reqBody.account);
  
  const pg=new URL(request.url).searchParams.get("pg");
  const programId=(pg=='token')?TOKEN_PROGRAM_ID:TOKEN_2022_PROGRAM_ID;
  const emptyTAs=await closeEmptyAccounts(connection,sender,programId);

  const tx=new Transaction();
  tx.feePayer=sender;
  const blockHeight=await connection.getLatestBlockhash();
  tx.recentBlockhash=blockHeight.blockhash;
  tx.lastValidBlockHeight=blockHeight.lastValidBlockHeight;
  const ixs=emptyTAs.map((acc)=>createCloseAccountInstruction(acc,sender,sender,undefined,programId));
  
  if(ixs.length>0){
    tx.add(...ixs);
  }
  const serialisedTx=tx.serialize({requireAllSignatures:false,verifySignatures:false}).toString("base64");
  

  const response:ActionPostResponse={
    transaction:serialisedTx,
    // transaction:"",
    message:"Wooh!!, Closed all Empty Token Accounts"
  }
  return Response.json(response,{headers:ACTIONS_CORS_HEADERS});
}