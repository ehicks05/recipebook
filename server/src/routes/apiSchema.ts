/**
 * Open-API definitions must be in proper YAML format
 * 2 spaces indentation, not tabs
 */

/**
 * @openapi
 * definitions:
 *   Recipe:
 *     properties:
 *       id:
 *         type: string
 *         example: f5a62a52-d632-459c-a5b6-571ffc70f0d2
 *       createdAt:
 *         type: string
 *         example: 2022-03-12 19:54:54
 *       updatedAt:
 *         type: string
 *         example: 2022-03-12 19:54:54
 *       name:
 *         type: string
 *         example: Peanut Butter Blossoms
 *       cookingTime:
 *         type: string
 *         example: 35
 *       course:
 *         type: string
 *         example: as
 *       description:
 *         type: string
 *         example: This is where a description would go...if we HAD one! It would tell you what you can expect from this recipe.
 *       difficulty:
 *         type: number
 *         example: 6
 *       emoji:
 *         type: string
 *         example: 🥘
 *       servings:
 *         type: number
 *         example: 4
 *       author:
 *         type: object
 *         $ref: '#/definitions/Author'
 *       directions:
 *         type: array
 *         items:
 *           allOf:
 *             -  $ref: '#/definitions/Direction'
 *       ingredients:
 *         type: array
 *         items:
 *           allOf:
 *             -  $ref: '#/definitions/Ingredient'
 *       userFavorites:
 *         type: array
 *         items:
 *           allOf:
 *             -  $ref: '#/definitions/UserFavorite'
 *   Ingredient:
 *     properties:
 *       id:
 *         type: string
 *         example: ac2ee7fb-3a6e-4a87-bc24-bfb70f0cb879
 *       recipeId:
 *         type: string
 *         example: 5d3075b2-acff-4eb3-a693-99961ecfbcb2
 *       createdAd:
 *         type: string
 *         example: 2022-03-12 19:54:54
 *       updatedAt:
 *         type: string
 *         example: 2022-03-12 19:54:54
 *       name:
 *         type: string
 *         example: Chocolate chips
 *       quantity:
 *         type: string
 *         example: 1
 *       unit:
 *         type: string
 *         example: lb
 *   Direction:
 *     properties:
 *       id:
 *         type: string
 *         example: 663dfa3c-9407-4fcf-8958-d0d7a3971bbd
 *       recipeId:
 *         type: string
 *         example: 0603306a-579d-41d6-9cf9-d043114f86bc
 *       createdAt:
 *         type: string
 *         example: 2022-03-12 19:54:54
 *       updatedAt:
 *         type: string
 *         example: 2022-03-12 19:54:54
 *       index:
 *         type: number
 *         example: 0
 *       text:
 *        type: string
 *        example: Add a bit of oil to your wok and let it heat up.
 *   Author:
 *     properties:
 *       id:
 *         type: string
 *         example: 6cd30c91-3047-476c-85df-7f3ba6e5e267
 *       createdAt:
 *         type: string
 *         example: 2022-03-29 01:53:25
 *       updatedAt:
 *         type: string
 *         example: 2022-03-29 01:53:25
 *       displayName:
 *         type: string
 *         example: JohnUser
 *   UserFavorite:
 *     properties:
 *       userId:
 *         type: string
 *         example: 6cd30c91-3047-476c-85df-7f3ba6e5e267
 *       recipeId:
 *         type: string
 *         example: 6cd30c91-3047-476c-85df-7f3ba6e5e267
 */

/**
 * @openapi
 * /api/recipes:
 *   get:
 *     description: Get all recipes
 *     responses:
 *       200:
 *         description: Returns the list of all recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   -  $ref: '#/definitions/Recipe'
 */

/**
 * @openapi
 *
 * /api/recipes/{recipeId}:
 *  get:
 *    description: Get recipe by recipeId
 *    parameters:
 *      -  in: path
 *         name: recipeId
 *         required: true
 *         description: Recipe Id
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: Returns the updaed recipe
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/Recipe'
 */

/**
 * @openapi
 *
 * /api/recipes/{recipeId}:
 *  put:
 *    description: Update a recipe by recipeId
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/Recipe'
 *    parameters:
 *      -  in:  path
 *         name: recipeId
 *         required: true
 *         description: Recipe Id
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: Returns the updated recipe
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/Recipe'
 */

/**
 * @openapi
 *
 * /api/recipe:
 *  post:
 *    description: Create a new Recipe
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/Recipe'
 *    responses:
 *      200:
 *        description: Returns the newly created recipe
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/Recipe'
 */

/**
 *@openapi
 *
 * /api/recipes/{recipeId}:
 *   delete:
 *     description: Delete a recipe
 *     parameters:
 *       -  in:  path
 *          name: recipeId
 *          required: true
 *          description: Recipe Id
 *          schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nothing
 *         content:
 *           application/json:
 *             schema:
 *             type: string
 */

/**
 * @openapi
 *
 * /api/user/recipes:
 *  get:
 *    description: Get user's authored recipes
 *    responses:
 *      200:
 *        description: Returns the list of recipes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                allOf:
 *                  -  $ref: '#/definitions/Recipe'
 */

/**
 * @openapi
 *
 * /api/user/favorites:
 *  get:
 *    description: Get user's favorite recipes
 *    responses:
 *      200:
 *        description: Returns the list of recipes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                allOf:
 *                  -  $ref: '#/definitions/Recipe'
 */

/**
 * @openapi
 *
 * /api/user/favorites:
 *  post:
 *    description: Create a new user favorite
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/UserFavorite'
 *    responses:
 *      200:
 *        description: Returns the updated list of user favorites
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/UserFavorite'
 *
 *
 *
 */
