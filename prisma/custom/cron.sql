set search_path = recipebook;

-- CreateFunction
CREATE OR REPLACE FUNCTION getRandomRecipeId() RETURNS text AS $$
	BEGIN
		RETURN (select
      id
    from
      recipebook.recipe
    where
      is_published = true
    offset
      floor(
        random() * (
          select
            count(*)
          from
            recipebook.recipe
          where
            is_published = true
        )
      )
    limit
      1);
	END;
$$ LANGUAGE plpgsql;

-- CreateProcedure
CREATE OR REPLACE PROCEDURE pickFeaturedRecipes() AS $$
	DECLARE
		recipeId text = select recipebook.getRandomRecipeId();
	BEGIN
		truncate recipebook.featured_recipe;
		insert into recipebook.featured_recipe (id) values (recipeId);

	END;
$$ LANGUAGE plpgsql;

-- set up cron
select cron.schedule (
	'pick-featured-recipes', -- name of the cron job
	'0 0 * * *', -- every day

	$$ call recipebook.pickFeaturedRecipes(); $$
);