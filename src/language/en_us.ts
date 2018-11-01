export default {
  title: {
    '/':'NNS',
    '/tutorial': 'Tutorial',
    '/exchange': 'CGAS exchange',
    '/auction': 'My auction',
    '/manager': 'My domain',
    '/manager/detail': 'My domain',
    '/auction/detail':'My auction',
    '/bonus': 'Bonus',
    '/record': 'Record',
    '/topup':'Topup',
    '/withdraw':'Withdraw',
  },
  header:{
    back:'Back'
  },
  btn:{
    withdraw:"Withdraw",
    withdrawin: "Withdraw...",
    topup:"Top up",
    topingup:"Topping up...",
    exchange:"Exchange",
    claimdomain:"Claim domain",
    claimingdomain:"Claiming domain",
    reclaimcgas:"Reclaim CGAS",
    claiming:"Claiming",
    reclaiming:"Reclaiming",
    claimed:"Claimed",
    reclaimed:"Reclaimed",
    placebid:"Place bid",
    placing:"Placing bid...",
    reset:"Reset",
    renew:"Renew",
    set:"Set",
    confirm:"Confirm",
    confirming:"Confirming...",
    startauction:"Start auction",
    starting:"Starting auction...",
    join:"Join auction",
    gotit:"OK，got it",
    select:"Filter"
  },
  home:{
    action:{
      title:"Function",
      tutorial:'Tutorial',
      exchange: 'CGAS exchange',
      auction:'My auction',
      manager:'My domain',
      bonus:'Bonus',
      record:'Record'
    },
    account:{
      title:"Auction account",
    },
    auction:{
      title:"Domain auction",
      errmsg1:"Domain names must be English characters or numbers, and can only be 6 to 32 characters in length",
      errmsg2:"This domain was auctioned",
      successmsg:"This domain is available",
      successmsg2:'This domain is currently in auction.Click "Join auction" to bid for it.',
    }
  },
  topup:{
    title:"Top up",
    title2:"Amount you want to top up",    
    wallet:"Wallet",
    account:"Auction account",
    balance:"Balance：",
    max:"Max",
    msg:"The amount of CGAS required：",
    errmsg:"Insufficient balance in Wallet",
    title3:"Withdraw",
    title4:"Amount you want to withdraw",
  },
  exchange:{
    forcgas:"For CGAS",
    forgas:"For GAS",
    title:"CGAS exchange",
    balance:"Balance：",
    title2:"Amount",
    msg1:"The amount of GAS required：99",
    errmsg1:"Insufficient balance"
  },
  myauction:{
    title:"My auction",
    search:"Search by domain",
    highbid:"Highest bid：",
    bidder:"Current bidder：",
    starttime:"Bid start time：",
    hammerprice:"Hammer price: ",
    buyer:"Buyer: ",    
    stage:"Stage",
    period:"Auction period",
    overtime:"Overtime bidding",
    ended:"Ended",
    other:"Other",
    me:"Me",
    all:"All",
    selecttype:"Filter by auction status",
    selecttype2:"Filter by highest bidder",
    tip1:"The auction period is the first stage of the auction and its duration is 3 days, during which all bids are valid. An overtime bidding of up to 2 days will be triggered when someone bids on the last day of the auction period. Otherwise the auction ends at the end of the fixed period.",
    tip2:"The overtime bidding is the second stage of the auction. Its maximum duration is 2 days. During this period, any bid may trigger the end of the bidding of this domain and the bid will be invalid. The latter one bids, the more likely it triggers the end of the bidding. So it's advised to place a bid as early as possible to avoid missing this domain.",
    info:{
      title:"Domain info",
      title2:"Timeline",
      mybidmsg:"My cumulative bid：",
      tips1:"Tips: The auction period is the first stage of the auction and its duration is 3 days, during which all bids are valid. An overtime bidding of up to 2 days will be triggered when someone bids on the last day of the auction period. Otherwise the auction ends at the end of the fixed period.",
      tips2:"Tips: The overtime bidding is the second stage of the auction. Its maximum duration is 2 days. During this period, any bid may trigger the end of the bidding of this domain and the bid will be invalid. The latter one bids, the more likely it triggers the end of the bidding. So it's advised to place a bid as early as possible to avoid missing this domain.",
      starttime:"Bid start time",
      title3:"Raise bid",
      raisebid:"Raise bid：",
      msg:"Balance in auction account：",
      msg2:"My cumulative bid will be：",
      errmsg:"Insufficient balance in Auction account",
      errmsg2:"your cumulative bid is lower than the highest price",
      tips3:"Tips:The minimum bid increment is 0.1 CGAS. If your cumulative bid is lower than the highest bid, your raise will be  unsuccessful.",
    }
  },
  manager:{
    title:"My domain",
    resolver:"Address resolver",
    mapping:"Address mapping",
    expirationtime:"Expiration time",
    msg:"（ Expiring soon ）",
    msg2:"（ Expired ）",
    title2:"Domain",
    noset:"not configured"
  },
  bonus:{
    title:"Bonus History",
    dividends:"My dividends:",
    pool:"Distribution pool snapshot：",
    mytotal:"My total NNC holdings：",
    time:"Snapshot time："
  },
  record:{
    title:"Record",
    tips:"Tips : These records will be emptied when you logout or close the page.",
    transfer:"Transfer to",
    gasclaim:"GAS claim",
    cgasexchange:"CGAS exchange",
    startauction:"Start auction",
    raisebid:"Raise bid",
    claimdomain:"Claim domain",
    reclaimcgas:"Reclaim CGAS",
    topup:"Top up",
    withdraw:"Withdraw",
    editdomain:"Edit domain",
    status:"Status",
    waitingmsg:"confirmation pending...",
    failmsg:"unconfirmed ( Please try again )",
    successmsg:"confirmed",
    resolver:"Address resolver: ",
    mapping:"Address mapping: ",
  },
  message:{
    successmsg:"Successful operation",
    waitmsg:"Please be patient and wait for the operation to be confirmed！",
    errmsg: "Operation failed",
    errmsgtip1: "Wrong request, please try again...",
    isok:" is confirmed！",
    exchangemsg:'"CGAS exchange"',
    startauctionmsg:'"Start auction" ',
    raisebidmsg:'"Raise bid" ',
    claimdomainmsg:'"Claim domain" ',
    reclaimmsg:'"Reclaim CGAS" ',
    topupmsg:'"Top up" ',
    withdrawmsg:'"Withdraw" ',
    editdomainmsg:'"Edit domain - address resolver" ',
    editdomainmsg2:'"Edit domain - address mapping" ',
    editdomainmsg3:'"Edit domain - renewal" ',
    isnotok:" is unconfirmed！Please try it again！",
    empty:"It's empty."
  }
}