# IngredientProtoApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addIngredient1**](IngredientProtoApi.md#addIngredient1) | **POST** /api/ingredient-proto/v1/ | Add a new ingredient prototype
[**deleteIngredient1**](IngredientProtoApi.md#deleteIngredient1) | **DELETE** /api/ingredient-proto/v1/{id} | Delete an ingredient
[**getIngredient**](IngredientProtoApi.md#getIngredient) | **GET** /api/ingredient-proto/v1/{id} | Retrieve an ingredient prototype
[**listIngredients**](IngredientProtoApi.md#listIngredients) | **GET** /api/ingredient-proto/v1/ | Get a list of all ingredient prototypes
[**updateIngredient1**](IngredientProtoApi.md#updateIngredient1) | **PUT** /api/ingredient-proto/v1/{id} | Update an ingredient prototype


<a name="addIngredient1"></a>
# **addIngredient1**
> IngredientPrototype addIngredient1(ingredientPrototype)

Add a new ingredient prototype

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ingredientPrototype** | [**IngredientPrototype**](..//Models/IngredientPrototype.md)| Ingredient prototype to add |

### Return type

[**IngredientPrototype**](..//Models/IngredientPrototype.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

<a name="deleteIngredient1"></a>
# **deleteIngredient1**
> Object deleteIngredient1(id)

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

<a name="getIngredient"></a>
# **getIngredient**
> IngredientPrototype getIngredient(id)

Retrieve an ingredient prototype

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**| ID of the ingredient to retrieve | [default to null]

### Return type

[**IngredientPrototype**](..//Models/IngredientPrototype.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listIngredients"></a>
# **listIngredients**
> SimplePageIngredientPrototype listIngredients(query, page, size, sort)

Get a list of all ingredient prototypes

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **query** | **String**| Filter for the recipe name | [optional] [default to null]
 **page** | **Integer**| Zero-based page index (0..N) | [optional] [default to null]
 **size** | **Integer**| The size of the page to be returned | [optional] [default to null]
 **sort** | [**List**](..//Models/String.md)| Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | [optional] [default to null]

### Return type

[**SimplePageIngredientPrototype**](..//Models/SimplePageIngredientPrototype.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateIngredient1"></a>
# **updateIngredient1**
> Object updateIngredient1(id, ingredientPrototype)

Update an ingredient prototype

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**| ID of the ingredient to update | [default to null]
 **ingredientPrototype** | [**IngredientPrototype**](..//Models/IngredientPrototype.md)| New ingredient data |

### Return type

[**Object**](..//Models/object.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

