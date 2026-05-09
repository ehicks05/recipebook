# todo ideas

* Embed ingredients within recipes
  * Benefits: simplify writes by avoiding ordering issues, since order is implicit and based on creation date
  * Downsides: How will we search by ingredient? You can't index json fields. Would currently require fetching all recipes and client-side searching. Which to be fair is not an issue as long as there are only 100s of recipes.

* General UI/UX:
  * image uploader
    * remove image
  * recipe editor layout. ok at full width but lots of awkward empty space at different screen breakpoints
  * recipe viewer layout. what to do with description...
  * Recipe Browser cards take up a lot of space...