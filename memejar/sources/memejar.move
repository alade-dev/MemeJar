#[allow(duplicate_alias)]
module memejar::memejar {
    
    use sui::url::{Self, Url};
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use sui::clock::{Self, Clock};

    use sui::object_table::{Self, ObjectTable};

    use std::option::{Self, Option};
    use std::string::{Self, String};

    // ===== Errors =====
    const ENonExistentMeme: u64 = 0;
    const EMemeAlreadyExist: u64 = 1;
    const ENoFeesToTake: u64 = 2;
    const EContestNotExist: u64 = 4;

    // Meme struct represents a meme posted by a user
    public struct Meme has key, store {
        id: UID,
        url: Url,
        name: String,
        likes: u64,
        poster: address,
    }

    // Contest struct represents a meme contest
    public struct Contest has key, store {
        id: UID,
        name: string::String,
        startTime: u64,
        endTime: u64,
        totalLikes: u64,
        topMeme: Option<Meme>,
        prizePool: Balance<SUI>,
    }

    // AdminCap for managing the platform
    public struct AdminCap has key {
        id: UID,
    }

    // MemeJarManager keeps track of all memes and contests
    public struct MemeJarManager has key {
        id: UID,
        memes: ObjectTable<address, Meme>,
        contests: ObjectTable<ID, Contest>,
        platformFees: Balance<SUI>,
    }

    // ===== Events =====
    public struct MemeLiked has copy, drop {
        meme_id: ID,
        liker: address,
        likes: u64,
    }

    #[allow(unused_field)]
    public struct ContestEnded has copy, drop {
        contest_id: ID,
        winner: address,
        prize: u64,
    }

    #[allow(unused_field)]
    public struct NoWinner has copy, drop {
        contest_id: ID,
        reason: String,
    }

    fun init(ctx: &mut TxContext) {
        transfer::share_object(MemeJarManager {
            id: object::new(ctx),
            memes: object_table::new(ctx),
            contests: object_table::new(ctx),
            platformFees: balance::zero<SUI>(),
        });

        transfer::transfer(AdminCap {
            id: object::new(ctx),
        }, tx_context::sender(ctx));
    }

    // ===== Public functions =====

    // Post a meme to the platform
    public entry fun postMeme(manager: &mut MemeJarManager, url_bytes: vector<u8>, name_bytes: vector<u8>, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        let meme_id = object::new(ctx);
        let url = url::new_unsafe_from_bytes(url_bytes);
        let name = string::utf8(name_bytes);

        let meme = Meme {
            id: meme_id,
            url,
            name,
            likes: 0,
            poster: sender,
        };

        assert!(!object_table::contains(&manager.memes, sender), EMemeAlreadyExist);
        object_table::add(&mut manager.memes, sender, meme);
    }

    // Like a meme
    public entry fun likeMeme(manager: &mut MemeJarManager, meme_id: ID, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);

        let meme = object_table::borrow_mut(&mut manager.memes, sender);
        assert!(object::id(meme) == meme_id, ENonExistentMeme);
        meme.likes = meme.likes + 1;

        event::emit(MemeLiked {
            meme_id,
            liker: sender,
            likes: meme.likes,
        });
    }

    // Create a contest
    public entry fun createContest(manager: &mut MemeJarManager, name_bytes: vector<u8>, clock: &Clock, duration: u64, ctx: &mut TxContext) {
        let name = string::utf8(name_bytes);
        let current_timestamp = clock::timestamp_ms(clock);
        let end_time = current_timestamp + duration;

        let contest = Contest {
            id: object::new(ctx),
            name,
            startTime: current_timestamp,
            endTime: end_time,
            totalLikes: 0,
            topMeme: option::none(),
            prizePool: balance::zero<SUI>(),
        };

        let contest_id_key = object::id(&contest);

        assert!(!object_table::contains(&manager.contests, contest_id_key), EContestNotExist);
        object_table::add(&mut manager.contests, contest_id_key, contest);
    }

    // End a contest and reward the top meme
    // public entry fun endContest(manager: &mut MemeJarManager, contest_id: ID, clock: &Clock, ctx: &mut TxContext) {
    //     let contest = object_table::borrow_mut(&mut manager.contests, contest_id);
    //     assert!(clock::timestamp_ms(clock) >= contest.endTime, EContestTimeNotReached);

    //     if (option::is_some(&contest.topMeme)) {
    //         let top_meme = option::extract(&mut contest.topMeme);
    //         let prize = balance::value(&contest.prizePool);

    //         // Ensure prize pool is not zero
    //         assert!(prize > 0, ENoPrizeToDistribute);

    //         let reward = coin::take<SUI>(&mut contest.prizePool, prize, ctx);
    //         transfer::public_transfer(reward, top_meme.poster);

    //         event::emit(ContestEnded {
    //             contest_id,
    //             winner: top_meme.poster,
    //             prize,
    //         });

    //         balance::destroy_zero(&mut contest.prizePool);
    //         object::delete(object::id(&contest.id));
    //     } else {
    //         // Handle case where no memes were posted in the contest
    //         event::emit(NoWinner {
    //             contest_id,
    //             reason: string::utf8(b"No memes were posted in the contest"),
    //         });
    //         object::delete(object::id(&contest.id));
    //     }
    // }

    // Collect fees
    public entry fun collectFees(_: &AdminCap, manager: &mut MemeJarManager, ctx: &mut TxContext) {
        let fees = balance::value(&manager.platformFees);
        assert!(fees > 0, ENoFeesToTake);

        let collected_fees = coin::take<SUI>(&mut manager.platformFees, fees, ctx);
        transfer::public_transfer(collected_fees, tx_context::sender(ctx));
    }

    // ===== Public view functions =====

    // Get the number of contests
    public fun getContests(manager: &MemeJarManager): u64 {
        return object_table::length(&manager.contests)
    }

    // Get the number of memes
    public fun getMemes(manager: &MemeJarManager): u64 {
        return object_table::length(&manager.memes)
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}


