# ShoppingListApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**compileForRecipes**](ShoppingListApi.md#compileForRecipes) | **GET** /api/shopping-list/v1/compile_for_recipes | Compile a ingredient shopping list for a list of recipes


<a name="compileForRecipes"></a>
# **compileForRecipes**
> List compileForRecipes(recipes)

Compile a ingredient shopping list for a list of recipes

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **recipes** | [**List**](..//Models/Long.md)| Recipes to shop for | [default to null]

### Return type

[**List**](..//Models/Ingredient.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

