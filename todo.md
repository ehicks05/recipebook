# todo ideas

* send backups offsite
* embed ingredients within recipes?
  * pros: simplify writes by avoiding ordering issues, since order is implicit and based on creation date
  * cons: can't index json fields so no search by ingredient. would have client-side search all recipes. which is fine as long as there are only 100s of recipes.
* review recipe browser cards taking up a lot of space...
* e2e testing
  * add recipebook-test app
* social
  * user 'groups' or 'families' that can have their own siloed existence on the app
  * users can see a list of everyone in the group and recipes they've created
  * comments on recipes
  * recipe publish state could be:
```ts 
type PublishState = 'private' | 'group' | 'public'
```
  * billing, if added, could apply at the group level. 'families can create x recipes...'
