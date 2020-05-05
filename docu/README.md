# Documentation for OpenAPI definition

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost:8080*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*IngredientApi* | [**addIngredient**](Apis/IngredientApi.md#addingredient) | **POST** /api/ingredient/v1/ | Add a new ingredient
*IngredientApi* | [**deleteIngredient**](Apis/IngredientApi.md#deleteingredient) | **DELETE** /api/ingredient/v1/{id} | Delete an ingredient
*IngredientApi* | [**updateIngredient**](Apis/IngredientApi.md#updateingredient) | **PUT** /api/ingredient/v1/{id} | Update an ingredient
*IngredientProtoApi* | [**addIngredient1**](Apis/IngredientProtoApi.md#addingredient1) | **POST** /api/ingredient-proto/v1/ | Add a new ingredient prototype
*IngredientProtoApi* | [**deleteIngredient1**](Apis/IngredientProtoApi.md#deleteingredient1) | **DELETE** /api/ingredient-proto/v1/{id} | Delete an ingredient
*IngredientProtoApi* | [**getIngredient**](Apis/IngredientProtoApi.md#getingredient) | **GET** /api/ingredient-proto/v1/{id} | Retrieve an ingredient prototype
*IngredientProtoApi* | [**listIngredients**](Apis/IngredientProtoApi.md#listingredients) | **GET** /api/ingredient-proto/v1/ | Get a list of all ingredient prototypes
*IngredientProtoApi* | [**updateIngredient1**](Apis/IngredientProtoApi.md#updateingredient1) | **PUT** /api/ingredient-proto/v1/{id} | Update an ingredient prototype
*RecipeApi* | [**addRecipe**](Apis/RecipeApi.md#addrecipe) | **POST** /api/recipe/v1/recipes | Add a new ingredient prototype
*RecipeApi* | [**deleteRecipe**](Apis/RecipeApi.md#deleterecipe) | **DELETE** /api/recipe/v1/recipe/{id} | Delete an existing recipe
*RecipeApi* | [**getRecipe**](Apis/RecipeApi.md#getrecipe) | **GET** /api/recipe/v1/recipe/{id} | Retrieve a recipe
*RecipeApi* | [**listRecipes**](Apis/RecipeApi.md#listrecipes) | **GET** /api/recipe/v1/recipes | Get a list of all recipes
*RecipeApi* | [**updateRecipe**](Apis/RecipeApi.md#updaterecipe) | **PUT** /api/recipe/v1/recipe/{id} | Update an existing recipe
*ShoppingListApi* | [**compileForRecipes**](Apis/ShoppingListApi.md#compileforrecipes) | **GET** /api/shopping-list/v1/compile_for_recipes | Compile a ingredient shopping list for a list of recipes


<a name="documentation-for-models"></a>
## Documentation for Models

 - [Ingredient](.//Models/Ingredient.md)
 - [IngredientDto](.//Models/IngredientDto.md)
 - [IngredientPrototype](.//Models/IngredientPrototype.md)
 - [Recipe](.//Models/Recipe.md)
 - [SimplePageIngredientPrototype](.//Models/SimplePageIngredientPrototype.md)
 - [SimplePageRecipe](.//Models/SimplePageRecipe.md)
 - [SimplePageable](.//Models/SimplePageable.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

All endpoints do not require authorization.
