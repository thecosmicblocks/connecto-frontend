import get from 'lodash.get'

export const t = (key: string, text = '') => {
    const object = {
        "header": "Connecto",
        "top": {
            "feature_posts": "Top {{total}} posts"
        },
        "channel": {
            "label": "Channel",
            "country": "Country",
            "founded": "FOUNDED",
            "followers": "FOLLOWERS",
            "youtube_followers": "YOUTUBE FOLLOWERS",
            "twitch_followers": "TWITCH FOLLOWERS",
            "gender": "Gender",
            "birthday": "Date Of Birqwth",
            "perfessional_field": "Professional Field",
            "donate": "Donate",
            "donate_idol": "Donate for idol",
            "subscribed": "Subscribed",
            "subscribe": "Subscribe",
            "donate_failed": "Donate failed",
            "donate_success": "Successful donation to Idol with {{donate}} SOL",
            "subscribe_success": "Subscribe channel success!",
            "subscribe_failed": "Subscribe channel failed!",
            "about_me": "About Me",
            "posts": "Posts",
            "detail": "Detail",
            "collection": "Collection",
            "post": {
                "by": "By",
                "in": "in {{time}}"
            },
            "task": {
                "claim_failed": "Claim NFT failed",
                "title": "Tasks",
                "claimed": "Claimed",
                "claim_nft": "Claim NFT",
                "claim_nft_successs": "Claim NFT successful!",
                "view_nft": "View your NFT on Explorer",
                "inventory_page": "Go to My Inventory",
                "verify_success": "Verify task successful!",
                "verify_failed": "Verify task failed!",
                "completed": "Completed",
                "verify": "Verify",
                "join_channel": "Join this channel"
            },
            "statistic": "Statistic",
            "published_posts": "Published Posts"
        },
        "nft": {
            "no_data": "Nothing to display",
            "symbol": "Symbol: {{symbol}}",
            "released_at": "Released at: {{time}}"
        },
        "modal": {
            "donate": {
                "header": "Donate to idol",
                "amount_placeholder": "Enter donation...",
                "btn_donate": "Donate",
                "required_amount": "Please enter donation amount"
            },
            "btn_cancel": "Cancel",
            "listing": {
                "header": "Listing nft",
                "amount_placeholder": "Enter price ...",
                "select_item_placeholder": "Select listing item...",
                "btn_listing": "Listing nft",
                "required_amount": "Please enter price"
            }
        },
        "social_link": "Social Link",
        "please_connect_wallet": "Please connect wallet",
        "menu": {
            "channel": "Channel",
            "my_inventory": "My Inventory",
            "collection": "Collection",
            "reward": "Reward",
            "detail": "Detail",
            "profile": "Profile",
            "marketplace": "Marketplace"
        },
        "btn_wallet": {
            "change": "Change wallet",
            "connecting": "Connecting ...",
            "copy_address": "Copy address",
            "copied": "Copied",
            "disconnect": "Disconnect",
            "connect": "Connect",
            "select": "Select Wallet"
        },
        "inventory": {
            "nothing_to_display": "Nothing to display",
            "collection_information": "Collection Information",
            "reward_information": "Reward Information",
            "exchange": "Exchange",
            "confirm": "Confirm",
            "close": "Close",
            "exchange_msg": "By this action, you have to sign {{amount}} burn Compressed NFT transaction to get {{name}} reward!",
            "exchanged_at": "Exchanged at"
        },
        "profile": {
            "authorize_discord_failed": "Authorize Discord failed",
            "confirm_connect_with_discord_failed": "Confirm connect with Discord failed",
            "wallet_address": "Wallet address",
            "connect_with_discord": "Connect to Discord",
            "disconnect_discord_success": "Disconnect with Discord successful",
            "disconnect": "Disconnect"
        },
        "msg": {
            "something_went_wrong": "Something went wrong"
        },
        "btn": {
            "listing": "Listing NFT",
            "cancel_listing": "Cancel Listing"
        },
        "listing": {
            "success": "Listing NFT successfully",
            "failed": "Listing NFT failed",
            "cancel_success": "Cancel Listing successfully",
            "cancel_failed": "Cancel Listing failed"
        },
        "marketplace": {
            "header": "NFT Marketplace",
            "buy_now": "Buy now",
            "seller": "Seller",
            "current_price": "Current price",
            "noti_buy_nft_success": "Buy NFT successfully",
            "noti_buy_nft_failed": "Buy NFT failed",
            "buy": {
                "header": "Buy NFT",
                "nft_name": "NFT name: {{name}}",
                "btn_buy": "Buy"
            }
        }
    }
    let value = get(object, key, '')
    if (text) {
        value = value.concat(' ', text)
    }
    return value
}
