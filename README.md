# JordanTyler_INF653_Final
## REST API uisng Node.js, Express, MongoDB, and Mongoose.
### [Deployed Project on Repl.it](https://jordantylerinf653final.voltorik.repl.co)

+ Gathers U.S. state data from included statesData.json file. 
+ Stores fun facts for each state in MongoDB.
+ Combines both data sets when a request is made.

*:state* is a placeholder for a state code. Full state names not accepted. Valid state codes: NE, MI, WA, etc.

*requestMade* - *dataReturned*

GET requests:
- /states/ - All state data returned
- /states/?contig=true - All state data for contiguous states (Not AK or HI)
- /states/?contig=false - All state data for non-contiguous states (AK, HI)
- /states/:state - All data for the state URL parameter
- /states/:state/funfact - A random fun fact for the state URL parameter
- /states/:state/capital - { ‘state’: stateName, ‘capital’: capitalName }
- /states/:state/nickname - { ‘state’: stateName, ‘nickname’: nickname }
- /states/:state/population - { ‘state’: stateName, ‘population’: population }
- /states/:state/admission - { ‘state’: stateName, ‘admitted’: admissionDate }

POST Requests. Requires an array *funfacts* passed as JSON:
- /states/:state/funfact - The result received from MongoDB

PATCH Requests. Requires a num *index* > 0 (location of fun fact to update) and a string *funfact*:
- /states/:state/funfact - The result received from MongoDB

DELETE Requests. Requires a num *index* > 0 (location of fun fact to delete):
- /states/:state/funfact - The result received from MongoDB
