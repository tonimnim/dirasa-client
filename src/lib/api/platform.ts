import { apiClient } from "./client";
import { encodePath, jsonBody, withQuery } from "./query";
import type { components } from "@/types/generated/platform";

type Schema = components["schemas"];

export const platformApi = {
  listTenants: (page = 1, pageSize = 50) =>
    apiClient<Schema["PagedResponseOfTenantResponse"]>(
      withQuery("/api/v1/platform/tenants", { page, pageSize })
    ),
  getTenant: (tenantId: string) =>
    apiClient<Schema["TenantResponse"]>(`/api/v1/platform/tenants/${encodePath(tenantId)}`),
  createTenant: (input: Schema["CreateTenantRequest"]) =>
    apiClient<Schema["TenantResponse"]>("/api/v1/platform/tenants", {
      method: "POST",
      body: jsonBody(input),
      idempotencyKey: true,
    }),
  suspendTenant: (tenantId: string, version: number | string) =>
    apiClient<void>(`/api/v1/platform/tenants/${encodePath(tenantId)}/suspend`, {
      method: "POST",
      body: jsonBody({ version }),
    }),
  reactivateTenant: (tenantId: string, version: number | string) =>
    apiClient<void>(`/api/v1/platform/tenants/${encodePath(tenantId)}/reactivate`, {
      method: "POST",
      body: jsonBody({ version }),
    }),
};
