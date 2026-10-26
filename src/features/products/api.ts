import { env } from '@/config/env'
import {
  mockCreateProduct,
  mockDeleteProduct,
  mockListProducts,
  mockUpdateProduct,
} from '@/features/products/mock'
import type {
  Product,
  ProductCategory,
  ProductInput,
  ProductListParams,
  ProductListResult,
} from '@/features/products/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function listProducts(params: ProductListParams): Promise<ProductListResult> {
  if (env.useMockApi) {
    return mockListProducts(params)
  }

  return http.get<ProductListResult>(endpoints.products.list, { params })
}

export async function createProduct(
  category: ProductCategory,
  input: ProductInput,
): Promise<Product> {
  if (env.useMockApi) {
    return mockCreateProduct(category, input)
  }

  return http.post<Product>(endpoints.products.create, { ...input, category })
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  if (env.useMockApi) {
    return mockUpdateProduct(id, input)
  }

  return http.put<Product>(endpoints.products.update(id), input)
}

export async function deleteProduct(id: string): Promise<void> {
  if (env.useMockApi) {
    return mockDeleteProduct(id)
  }

  await http.delete<void>(endpoints.products.remove(id))
}
