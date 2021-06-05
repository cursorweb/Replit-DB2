# Replit DB 2
This library includes improvements and fixes from the original (`@replit/database` and `replitdb-client`).

## Differences
The `set`, `empty`, `delete`, and other similar methods now return an empty promise instead of the instance. The reason for this is because this feature had no use, and made code cluttered.

Many additional features have been added, like `zipAll`, and it is now more configurable.

## Local Dev
Introducing Local Dev. Now you can use this library outside of replit, and all subsequent data will be stored in a JSON file called `database.json`