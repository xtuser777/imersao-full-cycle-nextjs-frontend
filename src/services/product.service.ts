import { Product } from "../models";

export class ProductService {
  async getProducts({
    search,
    category_id,
  }: {
    search: string | undefined;
    category_id: string | undefined;
  }): Promise<Product[]> {
    let url = `${process.env.CATALOG_API_URL}/products`;

    if (category_id) {
      url += `/category/${category_id}`;
    }

    const response = await fetch(url, {
      next: {
        revalidate: 1,
      },
    }); //revalidate on demand
    let data = await response.json();
    data = !data ? [] : data;
    const products: Product[] = [];
    for (let item of data) {
      products.push({
        id: item.ID,
        name: item.Name,
        description: item.Description,
        price: item.Price,
        image_url: item.ImageURL,
        category_id: item.CategoryID,
      });
    }
    if (search) {
      return products.filter((product: Product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    return products;
  }

  async getProductsByIds(productIds: string[]): Promise<Product[]> {
    const responses = await Promise.all(
      productIds.map((productId) =>
        fetch(`${process.env.CATALOG_API_URL}/products/${productId}`, {
          next: {
            revalidate: 1,
          },
        })
      )
    );

    return Promise.all(responses.map(async (response) => {
      const data = await response.json();
      const product: Product = {
        id: data.ID,
        name: data.Name,
        description: data.Description,
        price: data.Price,
        image_url: data.ImageURL,
        category_id: data.CategoryID,
      };
      return product;
    }));
  }

  async getProduct(productId: string): Promise<Product> {
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/products/${productId}`,
      {
        next: {
          revalidate: 1,
        },
      }
    ); //revalidate on demand
    const data = await response.json();
    const product: Product = {
      id: data.ID,
      name: data.Name,
      description: data.Description,
      price: data.Price,
      image_url: data.ImageURL,
      category_id: data.CategoryID,
    };
    return product;
  }
}
