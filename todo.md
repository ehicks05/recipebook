# todo ideas

* dev env
  * add recipebook-dev app
  * add prod -> dev dump script
  * look for shared functionality b/w backup script and dump script
* e2e testing
  * add recipebook-test app
* backup script
  * backup files
  * send offsite
* embed ingredients within recipes
  * pros: simplify writes by avoiding ordering issues, since order is implicit and based on creation date
  * cons: can't index json fields so no search by ingredient. would have client-side search all recipes. which is fine as long as there are only 100s of recipes.
* general ui/ux:
  * image uploader
    * add remove image flow
  * recipe editor layout. ok at full width but lots of awkward empty space at different screen breakpoints
  * recipe viewer layout. what to do with description...
  * recipe browser cards take up a lot of space...
* social
  * user 'groups' or 'families' that can have their own siloed existence on the app
  * users can see a list of everyone in the group and recipes they've created
  * comments on recipes
  * recipe publish state could be:
```ts 
type PublishState = 'private' | 'group' | 'public'
```
  * billing, if added, could apply at the group level. 'families can create x recipes...'

## bugs
* recipe viewer: duplicate ingredient warning
