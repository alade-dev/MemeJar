import { TransactionBlock } from "@mysten/sui.js/transactions";
import { PACKAGE_ID, FULLNODE_URL } from "./constant";
import { SuiClient } from "@mysten/sui.js/client";
import { AuthService } from "./zkLogin";
import { MIST_PER_SUI, SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
import { Meme, CreateProfile, Like, Message, Wallet } from "./../types";

// a service to interact with the smart contract using SUI SDK
export class MemeJarService {
  // const txb = new TransactionBlock();
  // const txData = {
  //     target: `${PACKAGE_ID}::memejar::getMemes`,
  //     arguments: [

  //     ]
  // };
  // return this.makeMoveCall(txData, txb);

  // create a meme
  async post_meme({ name, url, id, likes }: Meme) {
    // const { signature, sender } = await this.getSuiMessageCall();
    const txb = new TransactionBlock();
    const txData = {
      target: `${PACKAGE_ID}::memejar::postMeme`,
      arguments: [
        // txb.pure(id),
        txb.pure.string(name),
        txb.pure.string(url),
        // txb.pure(likes),
        // txb.pure.string(sender),
      ],
    };
    try {
      await this.makeMoveCall(txData, txb);
      return { success: true }; // Return success object on successful submission
    } catch (err) {
      console.error("Error creating meme post:", err);
      throw err; // Re-throw the error for handling in the frontend
    }
  }
  // get all memes
  async get_meme() {
    const sender = AuthService.walletAddress();
    let ownedObjects = await new SuiClient({
      url: FULLNODE_URL,
    }).getOwnedObjects({
      owner: sender,
    });
    let ownedObjectsDetails = await Promise.all(
      ownedObjects.data.map(async (obj) => {
        if (obj.data)
          return await new SuiClient({ url: FULLNODE_URL }).getObject({
            id: obj.data.objectId,
            options: { showType: true, showContent: true },
          });
      })
    );

    return ownedObjectsDetails
      .filter((obj) => {})
      .map((obj) => {
        if (obj && obj.data && obj.data.content) obj.data.content["fields"];
      });
  }
  // Path: frontend/src/hooks/memeJarCall.tsx
  async like_meme({ meme_id, liker, likes }: Like) {
    const txb = new TransactionBlock();
    const txData = {
      target: `${PACKAGE_ID}::meme::likeMeme`,
      arguments: [txb.pure(meme_id), txb.pure.string(liker), txb.pure(likes)],
    };
    return this.makeMoveCall(txData, txb);
  }

  private async makeMoveCall(txData: any, txb: TransactionBlock) {
    const keypair = AuthService.getEd25519Keypair();
    const sender = AuthService.walletAddress();
    txb.setSender(sender);
    txb.setGasBudget(100000000);
    const [coin] = txb.moveCall(txData);

    const { bytes, signature: userSignature } = await txb.sign({
      client: new SuiClient({ url: FULLNODE_URL }),
     signer:keypair, 
    });
    coin && txb.transferObjects([coin], sender);
    const zkLoginSignature = await AuthService.generateZkLoginSignature(
      userSignature
    );
    const transaction1 = new SuiClient({
      url: FULLNODE_URL,
    }).executeTransactionBlock({
      transactionBlock: bytes,
      signature: userSignature,
    });

    console.log("Processing ======", transaction1);
    return transaction1;
  }

  async getSuiMessageCall() {
    const keypair = AuthService.getEd25519Keypair();
    const sender = AuthService.walletAddress();
    const txb = new TransactionBlock();
    txb.setSender(sender);
    const { bytes, signature: userSignature } = await txb.sign({
        client: new SuiClient({
          url: FULLNODE_URL,
        }),
        signer: keypair,
    });
    const zkLoginSignature = await AuthService.generateZkLoginSignature(userSignature);

    console.log("Generated Signature:", { userSignature, zkLoginSignature, sender });

    return { signature: zkLoginSignature };
  }
}
