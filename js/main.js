/**
 * @file main
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */
  
/**
 * Dummy hash values.
 */
var dummyHashes = [
  "c249ec8dd75fce70369ebd33efd87a8a716031ea22bda8d53e16f78092736caf",
  "7ae99ee863c6b2a20d03784791143dd53cbe0ba3483b011eedf5fe6a5cb18479",
  "6806fc0935c2046f6a0bf673c11b9b413d122b9814285e9bbc3020c1b5903f68",
  "9ac99b7599f9567653a4f9f213cdcfd925bdb4dcf9e44846f85a22be6793fc8e",
  "ae73d8adff558c5627e647ead6ab3682bd743a48f9ae6b593e0371333ae39137",
  "0d82af3a922cf21fa569d21ae01e14320bd5fc2ea9ea2914b5b16af3adc81dfa",
  "f154a60fe462beff3a4afe5c64c7443baca6772f21ce57d626788f65865f4969",
  "b50561d5d326f4d826b8bfca8e8866cedd303ef2660b944f879e2be345f03505",
  "4c40aa52026cfe3624949d356a18151a2391da6e8b71c45fc8f35bbdbf9916f7",
  "2d0638b0ad4b1ed4bc69804cd218da333b3262151bdad75f50b775aa054f751f",
  "88c8ea7f3a8638883f1294911ac2a21becd485934c7adf32daf6283352a6e39c",
  "c44e93778563f5de35516f0f86c7ba76ac5ef6ff47ff50e18d57b629e8c41b3a",
  "995bd1dcb6244c288b6ed58c0505979c183c7426de61fda896d359217b370122",
  "c6cb95518ce7fb0f0de626bee0b74f028b4e49ce91e359bdbbcf88e0429a713f",
  "e8a5f5a268a7001b7fbea06adfdc4764c1093df8b38941437b92005baf0692d0",
  "b2033a799f64004c8bdf576d85c25919f2f9349e25eca6af2dc9b3eaf7b40e20",
  "a34162ab986bf52f6709ecf393ade671bf4dde57075570057ecec18e6d49cdd0",
  "a6051d321d2004a33449a8f5122f399be8c48d6099a576e0deee2df0f2ba4bde",
  "d0cc108ec7e01e27e8d6faafbacd12cf1efab58b38061bf8895e3876548f6dd3",
  "98d46bb46e48d7c772651b53f2c9e361618f6181f5cf78ca8e91f770879e8793",
  "b834c6862474665391f133b63697014d5a8fa2dd95d6d9417961b002fbd94e5e",
  "5c63bd54fa84cd62e251e17880747f49a6264d85d13a740f31e73b153876b092",
  "5f664be325f1f957c6c722defb5ccf2e889c44bc11e878c45e7c40ee3ef21b81",
  "8eb440b40529980bdf9c43f80ce216882aa1247873dc90c6409ee311a82da853",
  "6f5d1f21f0b115a808aaeb47ba5575decf0f533b1ad813a5eb8dbe8ea6cb4be2",
  "10bf47c648fd933234e59d4f723b23a107e35c20ee3bca144c9c22ca7b7a9000",
  "1eec164eaf30aa10f4ceaef2bc4a9e91f1a8f2b89699956d628ead37eea595c9",
  "626ececefb90b00b92a171f9100359340ef4c51279ba3cea7a577230412e24b0",
  "0c399d48d28d90b3fbc76aba1b66da039f7facfda1c6924ae166678bb2674199",
  "83213fccda1547aef621c9369097893119af4976deb19f5c4639d478e5632371",
  "b0f1cae1319ab0c7a9f384ec02fc0db3430857794b73e67ec061614b92edfc7d",
  "18689097a9c1bd9f951c5d13670f1276fcd91eb93a37a91709a98c864210494f",
  "33cd5338e8908db9eb2f3222eba1560044424bc1e2668b43ed91efb935d46e94",
  "a9bc70dfabd00cc0ecea734d0e1d7adc2c2ab964073825eee00f6dc41a919d1c",
  "ca7ae486a6559410fe8675b624d1784e194907d7269880f4876de859785730b5",
  "c291b71cef50e6dafe9a7a98c38caaf9f113a602cb669c12c37f944cab93f2a7",
  "39078aa12ca668cb121774e20c53859336364fbdf6f803ba9963fa3160679c1b",
  "8232f6f9604e70696924a085cebe13abeab34045d9920b9cdc345a186fedea53",
  "204604c4f230851436805afc474e96a4d26f60db538dc475a26fd0e371dee51d",
  "c22e5fc39d302b8da0890df80140674de3ce1e53a7bf9a69e1611333d45b0be1"
];

/**
 * Starting block height.
 */
let blockHeight = 39840824;
  
/**
 * Add a new block to the Recent Blocks table.
 */
function addNewBlock() {                    
  // Get the <table> element with id="recent-blocks".
  var table = document.getElementById("recent-blocks").getElementsByTagName("tbody")[0];

  // Keep at most 8 rows in the table.
  if (table.rows.length == 8)
    table.deleteRow(7);

  // Create an empty row (<tr> element) and add it to the 1st position of the table.
  var row = table.insertRow(0);

  // Fade in the row using jQuery.
  $(row).hide();
  $(row).fadeIn(500); 

  var date = new Date();
  var transactions = 0 + getRandomInt(0, 12);

  // Insert cells (<td> elements).
  row.insertCell(0).innerHTML = blockHeight.toLocaleString();
  row.insertCell(1).innerHTML = date.toLocaleString();
  var cell =  row.insertCell(2);
  cell.className = "text-right";
  cell.innerHTML = transactions.toLocaleString();

  blockHeight++;
}

/**
 * Add a new transaction to the Recent Transactions table.
 */
function addNewTransaction() {                    
  // Get the <table> element with id="recent-txns".
  var table = document.getElementById("recent-txns").getElementsByTagName("tbody")[0];

  // Keep at most 8 rows in the table.
  if (table.rows.length == 8)
      table.deleteRow(7);

  // Create an empty row (<tr> element) and add it to the 1st position of the table.
  var row = table.insertRow(0);

  // Fade in the row.
  $(row).hide();
  $(row).fadeIn(500); 

  var hash = dummyHashes[getRandomInt(0, dummyHashes.length - 1)]
  var dfn = getRandomNumber(1, getRandomNumber(0, 1) > 0.5 ? 1000 : 100);

  // Insert cells (<td> elements).
  var cell =  row.insertCell(0);
  cell.className = "truncate";
  cell.innerHTML = hash.toString();
  cell =  row.insertCell(1);
  cell.className = "text-right";
  cell.innerHTML = dfn.toFixed(8).toString() + " DFN";
}

// Add initial blocks/transactions.
$(document).ready(function() {
  for (var i = 0; i < 8; i++) {
    addNewBlock();
    addNewTransaction();
  }
});

// Add transactions using a d3 interval.
var transactionTimeMs = 1000;
d3.interval(function(elapsed) {addNewTransaction();}, transactionTimeMs);
  
/**
 * Return a random number between start and end.
 * @param {Number} start The starting number.
 * @param {Number} end The ending number.
 * @return {Number} The random number.
 * @private
 */
function getRandomNumber(start, end) {
  return Math.random() * (end - start) + start;
}

/**
 * Return a random integer between start and end.
 * @param {Number} start The starting number.
 * @param {Number} end The ending number.
 * @return {Number} The random integer.
 * @private
 */
function getRandomInt(start, end) {
  return Math.floor(this.getRandomNumber(start, end));
}