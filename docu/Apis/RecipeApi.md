# RecipeApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addRecipe**](RecipeApi.md#addRecipe) | **POST** /api/recipe/v1/recipes | Add a new ingredient prototype
[**deleteRecipe**](RecipeApi.md#deleteRecipe) | **DELETE** /api/recipe/v1/recipe/{id} | Delete an existing recipe
[**getRecipe**](RecipeApi.md#getRecipe) | **GET** /api/recipe/v1/recipe/{id} | Retrieve a recipe
[**listRecipes**](RecipeApi.md#listRecipes) | **GET** /api/recipe/v1/recipes | Get a list of all recipes
[**updateRecipe**](RecipeApi.md#updateRecipe) | **PUT** /api/recipe/v1/recipe/{id} | Update an existing recipe


<a name="addRecipe"></a>
# **addRecipe**
> Recipe addRecipe(recipe)

Add a new ingredient prototype

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **recipe** | [**Recipe**](..//Models/Recipe.md)|  |

### Return type

[**Recipe**](..//Models/Recipe.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="deleteRecipe"></a>
# **deleteRecipe**
> Object deleteRecipe(id)

Delete an existing recipe

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**| ID of the recipe to delete | [default to null]

### Return type

[**Object**](..//Models/object.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

<a name="getRecipe"></a>
# **getRecipe**
> Recipe getRecipe(id)

Retrieve a recipe

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**| ID of the recipe to retrieve | [default to null]

### Return type

[**Recipe**](..//Models/Recipe.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listRecipes"></a>
# **listRecipes**
> SimplePageRecipe listRecipes(query, page, size, sort)

Get a list of all recipes

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **query** | **String**| Filter for the recipe name | [optional] [default to null]
 **page** | **Integer**| Zero-based page index (0..N) | [optional] [default to null]
 **size** | **Integer**| The size of the page to be returned | [optional] [default to null]
 **sort** | [**List**](..//Models/String.md)| Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | [optional] [default to null]

### Return type

[**SimplePageRecipe**](..//Models/SimplePageRecipe.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateRecipe"></a>
# **updateRecipe**
> Object updateRecipe(id, recipe)

Update an existing recipe

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**| ID of the recipe to update | [default to null]
 **recipe** | [**Recipe**](..//Models/Recipe.md)| New recipe data |

### Return type

[**Object**](..//Models/object.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

