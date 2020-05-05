# IngredientApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addIngredient**](IngredientApi.md#addIngredient) | **POST** /api/ingredient/v1/ | Add a new ingredient
[**deleteIngredient**](IngredientApi.md#deleteIngredient) | **DELETE** /api/ingredient/v1/{id} | Delete an ingredient
[**updateIngredient**](IngredientApi.md#updateIngredient) | **PUT** /api/ingredient/v1/{id} | Update an ingredient


<a name="addIngredient"></a>
# **addIngredient**
> Ingredient addIngredient(ingredientDto)

Add a new ingredient

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ingredientDto** | [**IngredientDto**](..//Models/IngredientDto.md)| Ingredient to add |

### Return type

[**Ingredient**](..//Models/Ingredient.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

<a name="deleteIngredient"></a>
# **deleteIngredient**
> Object deleteIngredient(id)

Delete an ingredient

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**| Ingredient to delete | [default to null]

### Return type

[**Object**](..//Models/object.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

<a name="updateIngredient"></a>
# **updateIngredient**
> Object updateIngredient(id, ingredient)

Update an ingredient

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**| ID of the ingredient to update | [default to null]
 **ingredient** | [**Ingredient**](..//Models/Ingredient.md)| New ingredient data |

### Return type

[**Object**](..//Models/object.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

