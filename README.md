# crypto-exchange
----CRYPTO-DASHBOARD----

---USER-FLOWS---

- [ ] New-User:
User creates account => system creates account with $10,000 => User sees dashboard showing $10,000 cash, $0 crypto, and an empty transaction history

- [ ] View-Dashboard:
User logs in => Sees dashboard with: 
	---------------------------------
	[ Total Portfolio Value ] [ P&L ]
	---------------------------------
	[         Trade Button          ]
	---------------------------------
	[ USD Balance   ] [    Top 5    ]
	----------------- [             ]
	[ Market Trends ] [   Holdings  ]
	---------------------------------

- [ ] View-Portfolio:
User clicks on portfolio => Sees portfolio with:
	---------------------------------
	[ Total Portfolio Value ] [ P&L ]
	-----------------------------------------------------------------------
	[ [Asset 1] [Amount] [Value] [Up/Down Value Indicator] [Trade Button] ]
	-----------------------------------------------------------------------
	[ [Asset 2] [Amount] [Value] [Up/Down Value Indicator] [Trade Button] ]
	-----------------------------------------------------------------------
	[ [Asset 3] [Amount] [Value] [Up/Down Value Indicator] [Trade Button] ]
	-----------------------------------------------------------------------

- [ ] View-Asset:
User clicks on asset name => Sees asset page with:
	-----------------------------------------------------
	[        Asset       ] [       Current Price        ]
	-----------------------------------------------------
	[ Amount Held ] [ Value ] [ Up/Down Value Indicator ]
	-----------------------------------------------------
	[                  Last 5 Trades                    ]
	-----------------------------------------------------
	[                  Trade Button                     ] 
	-----------------------------------------------------

- [ ] Execute-Trade:
User on dashboard => Clicks buy => Shows trade form with preview:
	------------------------------------
	[     USD     ]    [    Asset >    ]
	------------------------------------
	[ USD Balance ]    [ Asset Balance ]
	------------------------------------
	[     USD     ] -> [     Asset     ]
	[    Amount   ] <- [     Amount    ]
	------------------------------------
	[          Confirm Trade           ]
	------------------------------------
=> User fills in & confirms => System checks balances => Dashboard updates showing new balances + P&L

- [ ] View-Transaction-History:
User clicks "History" => Sees chronological list of trades:
	----------------------------------------------------
	[                  Filter Options                  ]
	----------------------------------------------------
	[ [Asset 1] [Type] [Amount] [Value] [Price] [Date] ]
	----------------------------------------------------
	[ [Asset 2] [Type] [Amount] [Value] [Price] [Date] ]
	----------------------------------------------------
	[ [Asset 3] [Type] [Amount] [Value] [Price] [Date] ]
	----------------------------------------------------
=> Can filter by coin, trade type, date, amount, value, price

- [ ] View-Analytics:
User clicks "Analytics" => Selects cryptocurrency => Sees analytics for that currency, graphs, metrics etc #NOT IN MVP


---DB-SCHEMA---

Users:
------
id
email
password_digest
username
timestamps

Sessions:
---------
id
fk=user_id
token
expires_at
revoked_at
timestamps

Wallets:
--------
id
fk=user_id
usd_amount

Cryptocurrencies:
-----------------
id
name
abbreviation 

Cryptocurrency-Holdings:
------------------------
id
fk=wallet_id
fk=cryptocurrency_id
amount
timestamps

Cryptocurrency-Transactions:
----------------------------
id
fk=wallet_id
fk=cryptocurrency_id
transaction_type
crypto_amount
price_per_unit
usd_amount
timestamps

Cryptocurrency-Prices:
----------------------
id
fk=cryptocurrency_id
price_usd
updated_at

[ Users ] - < [ Sessions ]
	  - < [ Wallets ] 
[ Wallets ] - < [ Cryptocurrency-Holdings ] > - [ Cryptocurrencies]
	    - < [ Cryptocurrency-Transactions ] > - [ Cryptocurrencies ] 
[ Cryptocurrencies ] - [ Cryptocurrency-Prices ]


---API-ENDPOINTS---
/api/<version>:

POST /signup
POST /login
DELETE /logout

POST /trades
GET /portfolio
GET /portfolio/:cryptocurrency_id
GET /transactions
GET /dashboard

GET /cryptocurrencies
GET /cryptocurrencies/:id

QOL - NOT MVP:
PUT /users/:id
DELETE /users/:id

ADMIN - NOT MVP:

GET /users #ADMIN
GET /users/:id #ADMIN

GET /sessions #ADMIN
GET /sessions/:id #ADMIN
PUT /sessions/:id #ADMIN

POST /cryptocurrencies #ADMIN
PUT /cryptocurrencies/:id #ADMIN
DELETE /cryptocurrencies/:id #ADMIN

GET /wallets #ADMIN
GET /wallets/:id #ADMIN
POST /wallets #ADMIN
PUT /wallets/:id #ADMIN
DELETE /wallets/:id #ADMIN

GET /cryptocurrency_holdings #ADMIN
GET /cryptocurrency_holdings/:id #ADMIN
POST /cryptocurrency_holdings #ADMIN
PUT /cryptocurrency_holdings/:id #ADMIN
DELETE /cryptocurrencies/:id #ADMIN

GET /cryptocurrency_transactions #ADMIN
GET /cryptocurrency_transactions/:id #ADMIN
POST /cryptocurrency_transactions #ADMIN
PUT /cryptocurrency_transactions/:id #ADMIN
DELETE /cryptocurrency_transactions/:id #ADMIN











