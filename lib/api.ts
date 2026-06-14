const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "حدث خطأ في الطلب");
    }

    return {
      data,
      status: response.status,
    };
  }

  // Companies
  async createCompany(companyData: any) {
    return this.request("/companies/", {
      method: "POST",
      body: JSON.stringify(companyData),
    });
  }

  async getCompanies() {
    return this.request("/companies/");
  }

  async getCompany(id: string) {
    return this.request(`/companies/${id}`);
  }

  async updateCompany(id: string, companyData: any) {
    return this.request(`/companies/${id}`, {
      method: "PUT",
      body: JSON.stringify(companyData),
    });
  }

  async deleteCompany(id: string) {
    return this.request(`/companies/${id}`, {
      method: "DELETE",
    });
  }

  // Products
  async createProduct(productData: any) {
    return this.request("/products/", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async getCompanyProducts(companyId: string) {
    return this.request(`/products/company/${companyId}`);
  }

  async updateProduct(id: string, productData: any) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    });
  }

  // Conversations
  async getCompanyConversations(companyId: string) {
    return this.request(`/conversations/company/${companyId}`);
  }

  async getCustomerConversations(customerId: string) {
    return this.request(`/conversations/customer/${customerId}`);
  }

  async getNeedsHuman(companyId: string) {
    return this.request(`/conversations/needs-human/${companyId}`);
  }
}

export const api = new ApiClient();
